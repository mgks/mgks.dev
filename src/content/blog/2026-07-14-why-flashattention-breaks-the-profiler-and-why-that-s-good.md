---
title: "Why FlashAttention Breaks the Profiler (And Why That's Good)"
description: "FlashAttention shows low GPU occupancy yet outperforms all other attention backends. Here's what the profiler isn't telling you about modern kernel design."
date: 2026-07-14 18:00:30 +0530
tags: rollup, artificial-intelligence, pytorch, gpu-optimization, attention-mechanisms
image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072"
featured: false
---

I've been working through the Profiling in PyTorch series, and the attention mechanics chapter threw me for a loop. When I profiled FlashAttention against the math backend, PyTorch's profiler reported something counterintuitive: the fastest implementation showed the *lowest* occupancy. This is exactly the kind of surprise that makes profiler literacy essential for anyone serious about ML systems.

## The Profiler's Blind Spot

Most developers think low GPU occupancy means wasted potential. We're taught to keep the GPU saturated, threads busy, memory accessed predictably. FlashAttention violates this conventional wisdom entirely.

The math backend launches 20 separate kernels per attention call. Each one is "properly" occupancy-conscious, keeping streaming multiprocessors (SMs) filled with resident threads and warps. The profiler table shows you that math backend is 3.7x slower. So why does the fast path look lazy by comparison?

The answer lies in what actually matters: data movement, not thread count.

## The Real Bottleneck Nobody Talks About

Attention's computational complexity is O(N^2), sure. But that's not what kills performance on modern GPUs. The real cost is moving data to and from HBM (the GPU's main memory). Computing the full score matrix Q * K^T for a sequence of 4096 tokens produces a 4096x4096 matrix per attention head. That's 16 million numbers written to HBM, then read back multiple times for scaling, masking, softmax, and finally multiplying with values.

The math backend follows the naive algorithm faithfully. Build the full score matrix, write it out. Read it back, scale it, write it again. Read again, apply the mask, write again. This materialization-at-every-step pattern dominates runtime. You can see it in the profiler trace: 20 kernels, but they're mostly orchestrating data movement rather than computing anything complex.

FlashAttention inverts this design. Instead of computing one giant 4096x4096 matrix, it walks through K and V in tiles. For each tile, it computes a partial score matrix, applies the online softmax trick to accumulate running statistics, and contributes to the output incrementally. The full score matrix never materializes in HBM. It only lives on-chip, in the fast SRAM of an SM.

## Why Low Occupancy Can Be a Feature

FlashAttention uses a lot of per-thread registers and shared memory. This leaves less room on each SM for additional warps. The profiler sees this as low occupancy. But here's what's actually happening: by using on-chip resources cleverly, it *avoids* the HBM bottleneck entirely.

Think of it like traffic management. Occupancy measures how many cars fit on each highway. But if you can solve the problem using a fast local route that doesn't touch the highway, fewer cars (threads) might be sufficient. The overall travel time (latency) improves because you're not stuck in traffic (HBM contention).

This is why I always emphasize learning to read [profiler traces, not just tables](https://mgks.dev/tags/performance-profiling/). The summary numbers can actively mislead you. FlashAttention's single fused kernel (pytorch_flash) outperforms efficient-attention's fmha_cutlassF, which outperforms the math backend's 20-kernel decomposition. But if you only looked at kernel count or occupancy, you'd draw the opposite conclusion.

## Practical Implications

This matters because the attention pattern repeats across every transformer layer in every LLM and diffusion model in production. If you're running inference at scale, the choice of attention backend directly affects throughput and cost. I've seen teams optimize away numerical precision (upcasting to FP32) thinking they were improving accuracy, when actually they were losing everything FlashAttention gained.

The other lesson is that GPU programming evolves in layers. First you write naive code. Then you fuse kernels. Then you restructure the algorithm to exploit memory hierarchy differently. FlashAttention represents a fundamental algorithmic shift, not just a kernel engineering feat. It's [teaching us that the shape of the algorithm matters more than threads per block](https://mgks.dev/tags/gpu-optimization/).

The profiler can tell you what happened. But you need to understand *why* it happened to ship anything meaningful. When a backend shows low occupancy but crushes everything else, that's not a bug in your measurement technique. That's elegance.

How many other performance bottlenecks in your codebase are you fixing in the wrong place because the profiler's default narrative feels intuitive but incomplete?