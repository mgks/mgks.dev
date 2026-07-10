---
title: "Profiling Attention in PyTorch: From Naive to FlashAttention"
description: "A deep dive into profiling attention mechanisms in PyTorch, comparing naive, SDPA math, efficient, and FlashAttention backends using GPU traces."
date: 2026-07-10 18:01:00 +0530
tags: rollup, artificial-intelligence, pytorch, profiling, transformers
image: "https://images.unsplash.com/photo-1666462296991-45c5eb42067c?q=80&w=2076"
featured: false
---

If you have been following along with my [profiling series](https://mgks.dev/tags/profiling/), you already know the drill: guess what the profiler should show, then open the trace and see how wrong you were. Attention is where that habit pays off the most, because the gap between what you expect and what actually happens is enormous.

## Building Attention From Scratch

Attention is just a sequence of primitives: two matmuls, a scale, a mask, a softmax. Writing it by hand in PyTorch is almost embarrassingly short. When I profiled it, the GPU lane showed exactly five kernels per forward pass, and one of them was a `Memcpy` that had no business being there.

The culprit was `masked_fill`. PyTorch's default out-of-place behavior copies the tensor before applying the operation, which is the safe choice for autograd but wasteful under `torch.no_grad`. Swapping in `masked_fill_` (the trailing underscore is PyTorch's convention for in-place ops) eliminated the copy entirely. One character change, one kernel gone. Multiply that by dozens of attention layers in a real transformer and the saving is real money.

In-place operations get a bad reputation because they break autograd. That reputation is deserved in training loops. But for inference under `torch.no_grad`, they are not just safe, they are the right call. They save time and memory simultaneously, which is exactly what you want when you are serving a model.

## The SDPA Surprise

Here is where things get humbling. PyTorch ships `torch.nn.functional.scaled_dot_product_attention`, a single function that replaces the entire hand-written module. Fewer lines, handles the causal mask for you, dispatches to optimized backends automatically. I expected it to be faster. The math backend clocked in at 3.7x slower.

Opening the trace explained everything. Where my naive implementation launched 5 GPU kernels, the math backend launched 20. It upcasts inputs from bf16 to fp32 for numerical safety, which doubles memory traffic and abandons the Tensor Cores entirely. It rebuilds the causal mask from scratch on every single call because `is_causal=True` is a convenience flag, not a cached optimization. It runs `_safe_softmax` instead of plain softmax to guard against fully-masked rows producing NaNs.

None of this is a bug. The math backend is the reference implementation. Its job is to always produce a correct answer, not a fast one. Reading kernel names like `sgemm` versus `s16816` tells you immediately whether you are on the Tensor Core fast path or the CUDA core slow path. That habit alone is worth developing if you work with [pytorch](https://mgks.dev/tags/pytorch/) models seriously.

## What FlashAttention Actually Does

The efficient and flash backends are a different story. Where the math backend's 20 kernels hand off intermediate matrices to HBM (the GPU's main memory) repeatedly, FlashAttention refuses to materialize the full score matrix at all.

For a sequence length of 4096, the score matrix per head is 4096 x 4096, roughly 16 million numbers. The math backend writes that to HBM, reads it back to scale, writes it again for the mask, reads it again for softmax. Attention's real cost is not the matmuls, it is all that memory traffic. FlashAttention tiles the computation over keys and values, maintains a running softmax as it goes (the online softmax trick), and accumulates the output without ever writing the full score matrix anywhere but on-chip registers and shared memory.

The result is one fused kernel where the math backend had twenty. The trace goes from busy and wide to almost empty and extremely fast.

There is one thing that confuses people when they first look at a FlashAttention trace: the occupancy looks terrible. Low occupancy sounds like a bad kernel. Here it means the opposite. Flash uses large amounts of shared memory and registers per block deliberately, to keep all the intermediate values on-chip and avoid HBM round trips. The kernel is memory-bound by design, and it wins by minimizing the memory it touches rather than maximizing the threads it runs. Occupancy is the wrong metric here. Actual runtime is the right one.

The efficient backend (the xformers-derived `fmha_cutlassF` kernel) takes the same approach and produces a similarly compact trace. Both collapse the full attention pipeline into a single fused kernel that stays in bf16 on the Tensor Cores.

The practical takeaway for anyone building on top of [transformers](https://mgks.dev/tags/transformers/) is that `scaled_dot_product_attention` is the right function to call, but you should know which backend it selects and why. The `sdpa_kernel` context manager lets you pin a specific backend for profiling, which is exactly how I captured these traces. Do not assume the automatic selection is always optimal for your specific hardware, dtype, and sequence length combination.

The real lesson from this entire exercise is that the profiler trace is not just a diagnostic tool. It is a map of what your hardware is actually doing, and there is always a gap between the abstraction you write and the instructions that execute. The closer you can read that map, the harder it becomes to ship a model that is quietly 3.7x slower than it needs to be.