---
title: "Meta Ditched Their FFmpeg Fork and What It Means for Video Infrastructure"
description: "How Meta deprecated their internal FFmpeg fork by pushing critical features upstream, and why this matters for the future of video processing at scale."
date: 2026-03-07 00:00:32 +0530
tags: rollup, software-engineering, open-source, video-processing
image: 'https://images.unsplash.com/photo-1727434032792-c7ef921ae086?q=80&w=2232'
featured: false
---

I've been thinking a lot about FFmpeg lately. Not because it's new or trendy, but because Meta just did something that most companies at their scale would never bother doing. They killed their internal fork and went all-in on upstream FFmpeg. This is actually a big deal, and not just for Meta.

When you're processing over a billion video uploads daily, you don't just pip install something and call it a day. Meta had built an entire internal fork of FFmpeg years ago because the upstream version simply couldn't handle their requirements. Threaded multi-lane encoding, real-time quality metrics during transcoding. These weren't nice-to-haves. They were necessary features for operating at that scale.

The problem with forks is that they're like technical debt that compounds exponentially. Every new FFmpeg release brings codec support, bug fixes, and reliability improvements. But if you're maintaining a fork, you're stuck rebasing your internal changes onto newer versions, praying you don't introduce regressions. It's a maintenance nightmare that only gets worse over time.

## The Multi-Lane Encoding Problem

Let me break down why this threading thing matters so much. When someone uploads a video to Instagram or Facebook, the platform doesn't just store that one file. It creates multiple encodings for [DASH playback](https://mgks.dev/tags/open-source/). Different resolutions, different bitrates, different codecs. The video player then switches between these on the fly based on your network conditions.

The naive approach is running separate FFmpeg commands for each encoding. That works, but it's wildly inefficient. You're decoding the same source video multiple times, spinning up multiple processes. At Meta's scale, that inefficiency translates to massive compute waste.

The smarter approach is decoding once and piping frames to multiple encoders in a single FFmpeg command. This eliminates the redundant decoding work. But here's where it gets interesting. Even with multiple encoders in one command, older FFmpeg versions would execute them serially for each frame. One finishes, then the next starts. That's leaving parallelism on the table.

Meta's fork ran all encoder instances in parallel. Better CPU utilization, faster throughput. This wasn't some marginal optimization. At billions of executions per day, even small per-process improvements compound into serious infrastructure savings.

## Pushing Changes Upstream

What's remarkable here isn't that Meta built these features. It's that they worked with FFmpeg developers, FFlabs, and VideoLAN to get them implemented upstream instead of just maintaining their fork forever. The multi-threaded encoding work landed in FFmpeg 6.0 and 8.0. According to Meta, it was "the most complex refactoring of FFmpeg in decades."

That's not hyperbole. FFmpeg has been around for 25 years. Its codebase is gnarly, battle-tested, and used everywhere. Refactoring core threading behavior without breaking thousands of existing use cases is legitimately hard.

The real-time quality metrics feature is equally interesting. Visual quality metrics like PSNR, SSIM, and VMAF let you quantify how much quality you're losing from compression. FFmpeg could already compute these, but only after encoding was finished. That's fine for video-on-demand, but useless for livestreaming.

Meta needed to compute quality metrics in real time during encoding. The solution was "in-loop" decoding, inserting a decoder after each encoder to get post-compression frames for comparison. This landed in FFmpeg 7.0, again thanks to collaboration with external developers.

## What Stays Internal

Not everything makes sense to upstream though. Meta built support for MSVP, their custom ASIC for video transcoding. It integrates through FFmpeg's standard hardware acceleration APIs, alongside NVIDIA's NVENC, AMD's UVD, and Intel's Quick Sync.

But MSVP only exists inside Meta's infrastructure. External FFmpeg developers can't test or validate patches for hardware they don't have access to. So those patches stay internal, and Meta takes on the burden of rebasing them onto newer FFmpeg versions.

This is the right call. [Open source](https://mgks.dev/tags/open-source/) doesn't mean dumping everything into the public repo. It means contributing changes that benefit the broader community while keeping truly infrastructure-specific code internal.

## Why This Actually Matters

Here's why I think this is significant beyond Meta's engineering blog. Most companies at scale build internal tooling and never look back. It's easier to maintain a fork than to collaborate with upstream maintainers. Especially for something as complex as FFmpeg.

But forks fragment the ecosystem. Features that could benefit everyone stay locked behind corporate walls. Bug fixes don't flow bidirectionally. The upstream project misses signals about real-world usage at scale.

Meta could have kept their fork running indefinitely. They have the engineering resources. Instead they invested in pushing features upstream, even when it meant complex refactoring work that didn't directly benefit them in the short term.

The cynic in me says they did it because maintaining the fork got too expensive. And sure, that's probably part of it. But the result is the same. FFmpeg is now more capable for everyone. Smaller companies and independent developers get access to threading improvements and real-time metrics without having to build them themselves.

I keep seeing this pattern where [artificial intelligence](https://mgks.dev/tags/artificial-intelligence/) companies open source models and frameworks, but only after they've extracted maximum competitive advantage. Meta's actually been decent about this with PyTorch and React. Maybe their [open source](https://mgks.dev/tags/open-source/) strategy is more genuine than I give them credit for.

The broader lesson here is about choosing your battles with technical debt. Some forks are necessary. Some should be temporary. And some should never have existed in the first place. Knowing the difference requires constantly asking whether your internal changes could be generalized and contributed back, even when it's harder than just maintaining the fork.