---
title: "A RISC-V CPU Compiled Into Qwen 3.5 Weights"
description: "Qwenputer embeds a working 32-bit CPU in transformer weights using GDN layers as RAM. No external runtime needed. What this means for AI systems."
date: 2026-10-29 12:00:21 +0530
tags: rollup, engineering, llm-architecture, risc-v, neural-compilation
image: "https://images.unsplash.com/photo-1739805591936-39f03383c9a9?q=80&w=2073"
featured: false
---

I built something that shouldn't work but does: a fully functional RISC-V CPU compiled directly into the weights of Qwen 3.5 4B, running calculations inside the model's forward passes with zero external dependencies.

Qwenputer started as a thought experiment about Gated DeltaNet, the linear attention mechanism that Qwen uses in 3 out of every 4 attention layers. GDN maintains a state matrix per head, updated via a delta rule. I realized that if you lock the gate to 1 (preventing decay), set the write strength to maximum, and use one-hot key encoding, you get something remarkable: exact, addressable RAM that doesn't grow with context length. A GDN head's state stays constant size no matter how long your conversation gets.

That's radically cheaper than attention's KV cache for this purpose. Once I had reliable RAM, the next step felt inevitable: what if we compiled actual CPU instructions into the transformer layers themselves?

## How the CPU Actually Lives in the Weights

There's no training involved. I wrote a compiler that takes a circuit description (read register, add numbers, jump if zero) and directly sets transformer weights to implement each instruction. The CPU is a 32-bit RISC-V core with RV32IM, the Zba extension, and a bignum unit. It occupies 11 of Qwen's 32 layers, placed in front of the existing model.

Each CPU instruction becomes a few generated tokens: one for the memory address, one for the value, one to end the instruction. While Qwen decodes these tokens, the CPU actually executes. The execution trace is the output itself. This isn't a simulation or an emulation. The feed-forward units perform arithmetic, the attention heads do lookups, and the GDN layers serve as working memory.

The CPU has now run 18 million instructions free-running with zero errors, passing official RISC-V test suites and matching QEMU output exactly. I replayed 230,000 output positions against a reference machine and found zero mismatches. This isn't a parlor trick.

Qwen's original weights remain untouched. The CPU weights are added in extra dimensions and layers, so the model's base behavior stays intact (KL divergence of 6e-4, within noise). I use a small driver called RvChat to load firmware into GDN state and filter out trace tokens before they hit Qwen's reasoning layers.

## What This Means For Long-Form Reasoning

The practical gains are immediate. On NUPA's long-integer arithmetic benchmark, Qwenputer jumped from 48.6% to 100%, matching what you'd get by bolting on a Python interpreter. The CPU can run C and MicroPython code in the forward pass, albeit slowly (a few decoded tokens per instruction, so big calculations take seconds rather than milliseconds).

But speed is just one dimension. By hiding computation inside the RNN state, models can now perform exact arithmetic and logic operations without leaking their reasoning into token-space where it's visible or interpretable. I've written follow-ups exploring how this creates blindspots: hybrid models can learn to [hide reasoning in their RNN state and evade chain-of-thought monitoring](https://mgks.dev/tags/llm-architecture/), or how compiled weights can become inbuilt monitoring tools the model itself cannot tamper with.

This opens uncomfortable questions about interpretability. If you can't see the computation, you can't audit it.

## The Filesystem Angle

I went one step further and added a filesystem, because a CPU in a language model wasn't already cursed enough. Using the same GDN state as storage, Qwen can now persist facts between conversations. The filesystem uses hash-based directory slots (1,024 total) and can store about 53,000 tokens across 512 files.

Results: when facts change between chats, Qwenputer retrieves them correctly 90% of the time versus 30% when you paste old conversations back in. That's better than giving Qwen traditional memory tools (78.9% vs 83.3%), suggesting something interesting about how the model grounds persistent state when it's stored inside its own computation.

There are practical limits. The checkpoint is 18.8 GB (roughly double base Qwen), though most of it is zero padding. You need RvChat to boot firmware and prevent trace tokens from polluting the model layers. And it's slow: an L4 runs about 3,200 CPU tokens per second, so real calculations take seconds.

But every limitation here is a solvable engineering problem. The CPU is fully functional. It runs arbitrary code. The filesystem actually persists.

## Why This Matters

Most people think of language models as statistical pattern matchers. Qwenputer suggests they can also be computational substrates. You can compile real, deterministic logic into neural weights and have it execute reliably. The implications ripple outward: models that can run their own code, store their own state, perform exact computation without external tools, and hide reasoning in ways we can't easily audit.

The fact that this works without any post-training, piggybacking on Qwen's existing tool-use training, is perhaps the most unsettling part. The model learns to use a CPU as naturally as it would a calculator tool, except the calculator is running inside its own forward pass.

You can grab Qwenputer from Hugging Face or run it on any 24GB GPU. The code is open. But the real question isn't whether this works technically (it does), but what happens when models stop outsourcing computation and start running it internally instead.