---
title: "Running 0.2B Image Inpainting Models Directly in Your Browser"
description: "How I used Claude Code to port Moebius to WebGPU and ONNX, avoiding CUDA entirely"
date: 2026-06-29 12:00:19 +0530
tags: rollup, engineering, artificial intelligence, webgpu, web development
image: "https://images.unsplash.com/photo-1765707886613-f4961bbd7d7d?q=80&w=988"
featured: false
---

I've been fascinated by the idea of running full [artificial intelligence](https://mgks.dev/tags/artificial-intelligence/) models directly in the browser for a while now. It's one of those things that feels like science fiction until you actually see it working. This week, I got to experience that magic firsthand when I successfully ported Moebius, a 0.2 billion parameter image inpainting model, to run entirely in Chrome using WebGPU.

The story starts with a Hacker News post I spotted this morning about Moebius. It's described as a "lightweight image inpainting framework with 10B-level performance" and it's genuinely impressive technology. You can load any image, highlight regions you want removed, and the model figures out what should fill that space. The catch? The original release required PyTorch and NVIDIA CUDA.

That's a pretty significant barrier for most people. But 0.2B parameters isn't actually that large in the grand scheme of things. I started wondering if we could run this in a browser instead.

My first step was asking regular Claude about feasibility. I had it clone the repo and check what options existed for running the model. Python and CUDA only, at least officially. But Claude suggested using ONNX Runtime Web with the WebGPU backend, which is essentially the lower-level layer that Transformers.js builds on top of.

This was convincing enough that I decided to fire up Claude Code and see what it could accomplish.

I like using Claude Code for experimental projects like this because the model can handle all the busywork that would otherwise eat up my afternoon. I set up a research folder, gathered everything Claude might need, and then gave it a pretty open-ended prompt: read the research and port the model to ONNX and WebGPU so we can run it directly in a browser.

I also asked it to maintain a notes.md file and write out a plan, updating both as the work progressed. I've found that asking agents to keep notes produces surprisingly useful artifacts, both for future reference and for the next time I work on something similar.

Then I mostly stepped back and let it work while I focused on other things, checking in periodically to see how it was progressing.

When it looked like there was something working, I'd ask for the URL and try it in my own browser, then paste any errors back into the conversation. After a few rounds of this, we had something that actually functioned.

The final step was getting it published. The converted ONNX weights came out to about 1.24GB, which we published to Hugging Face. I wanted the frontend on GitHub Pages so users could actually try it without setting up anything locally.

This is where things got interesting from a technical standpoint. Every time someone loaded the demo, they were downloading roughly 1.3GB of model weights. That's not ideal for user experience, and I was worried the Hugging Face redirects might be interfering with browser caching.

I looked at how Whisper Web handles this problem and found it was using the CacheStorage API, specifically caches.open("transformers-cache"). This lets the browser cache large files persistently, which is essential for a demo like this. We added the same mechanism to our project.

The whole project was what I call vibe coding. I didn't look at a single line of code from the actual implementation. My contributions were testing, suggesting small improvements like a progress bar for downloads, and pointing Claude toward examples of how I wanted things to work.

Once it was all done, I had Claude teach me about the underlying technology. I learned that ONNX is fascinating because it's a framework-neutral format that describes what to compute without dictating how or on what hardware. The operators are versioned by something called an opset number, which pins down exactly what operations exist and what they mean. This repo uses opset 18, and PyTorch actually has built-in mechanisms for exporting to ONNX, which made the conversion process surprisingly straightforward.

The most important thing I learned from this whole experience isn't the technical details though. It's realizing that running reasonably capable AI models directly in a browser is genuinely viable now. We're not talking about tiny, crippled models here either; 0.2B parameters with 10B-level performance is impressive work.

This changes the calculus for how we deploy AI features. No server costs, no CUDA infrastructure, no API calls to third parties. Just drop the weights in the browser and let the user's GPU do the work.

The next time you see an interesting model release that requires CUDA, it's worth asking whether that requirement is actually necessary or just the path of least resistance.