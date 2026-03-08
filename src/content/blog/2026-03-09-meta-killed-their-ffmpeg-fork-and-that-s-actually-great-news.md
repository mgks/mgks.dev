---
title: "Meta Killed Their FFmpeg Fork and That's Actually Great News"
description: "How Meta's collaboration with FFmpeg developers brought multi-lane encoding and real-time quality metrics to everyone, not just billion-user platforms."
date: 2026-03-09 00:00:32 +0530
tags: rollup, software-engineering, open-source, video-processing
image: 'https://images.unsplash.com/photo-1680783954745-3249be59e527?q=80&w=1064'
featured: false
---

I've been watching Meta's engineering blog for years now, and this FFmpeg announcement is genuinely one of the more interesting things they've published lately. Not because they built something proprietary and fancy, but because they actually went the other direction and killed their internal fork entirely.

Let me explain why this matters more than you might think.

## The Fork Problem Nobody Talks About

Meta runs FFmpeg tens of billions of times per day. That's not a typo. When you're operating at that scale, even tiny inefficiencies compound into massive resource waste. So years ago, they did what any engineering organization would do: they forked FFmpeg and added the features they desperately needed.

The problem with forks is they're like technical debt that grows exponentially. Every upstream improvement in FFmpeg means you need to carefully rebase your changes. Every new codec, every reliability fix, every security patch becomes a maintenance burden. You end up supporting two versions of the software, and the gap between them just keeps widening.

This is where most companies stay stuck forever. The fork becomes institutional knowledge. Engineers build tooling around it. The thought of migrating back feels impossible.

## What Meta Actually Needed

The requirements weren't exotic. When someone uploads a video to Instagram or Facebook, Meta generates multiple encodings for DASH playback. Different resolutions, different bitrates, different quality levels. The video player picks the right one based on your network conditions.

Running separate FFmpeg processes for each encoding is wasteful. You're decoding the same source video multiple times, starting up multiple processes, duplicating work everywhere. FFmpeg already supported multiple outputs in a single command, which helped.

But here's the catch: even with multiple outputs, FFmpeg was running each encoder serially. Decode a frame, encode it with encoder A, then encoder B, then encoder C. Yes, individual encoders might be multi-threaded internally, but you're still processing them one at a time per frame.

Meta's fork parallelized this. Run all encoders simultaneously for each frame. Better CPU utilization, faster processing, lower costs at their scale.

## The Upstream Contribution That Changed Everything

Instead of keeping this optimization locked up forever, Meta worked with FFmpeg developers, FFlabs, and VideoLAN to implement proper multi-threaded encoding upstream. This landed in FFmpeg 6.0 and 8.0, and apparently it was one of the most complex refactorings FFmpeg has seen in decades.

Think about what just happened there. A feature that Meta built specifically for processing a billion video uploads daily is now available to anyone running FFmpeg. Your hobby project encoding videos gets the same optimization that powers Instagram stories.

This is [open-source](/tags/open-source/) collaboration actually working the way it's supposed to.

## Real-Time Quality Metrics Are Harder Than You Think

The second piece Meta needed was real-time quality metrics during encoding. Visual quality metrics like PSNR, SSIM, and VMAF give you a numeric score for perceived video quality. They're crucial for understanding how much quality you're losing from compression.

FFmpeg could already compute these metrics, but only as a separate pass after encoding finished. You encode your video, then you run another FFmpeg command comparing the original to the encoded version. Fine for offline work, completely useless for livestreaming.

Meta's approach was clever: insert a decoder after each encoder in the pipeline. The encoder compresses the frame, the decoder immediately decompresses it, and you compare against the original in real-time. All in one FFmpeg command line.

This "in-loop" decoding feature also made it upstream, starting with FFmpeg 7.0. Again, a capability built for Meta's scale is now available to everyone.

## When Not to Contribute Upstream

Here's where it gets interesting. Meta didn't contribute everything back. They have patches for their custom ASIC called MSVP (Meta Scalable Video Processor), and those patches are staying internal.

This actually makes sense. FFmpeg supports hardware acceleration through standard APIs for NVIDIA, AMD, Intel chips. Meta implemented MSVP support through those same APIs, which means their tooling works consistently across different hardware. But since nobody outside Meta has access to MSVP hardware, there's no point pushing those patches upstream. The FFmpeg maintainers can't test it, can't validate it, can't support it.

I appreciate this pragmatism. Not everything needs to be [open source](/tags/open-source/). The distinction is clear: general improvements that benefit everyone go upstream, infrastructure-specific code stays internal.

## The Scale That Makes This Worth It

Processing over a billion video uploads daily means every optimization matters. If you can reduce per-process compute usage by even a small percentage, you're saving serious money and energy. Multi-lane encoding isn't just about faster uploads, it's about running fewer servers, consuming less power, reducing infrastructure costs.

But here's what's wild: these same optimizations now benefit someone running FFmpeg on their laptop to encode their YouTube videos. The performance characteristics that matter at Meta's scale also matter at smaller scales, just in different ways.

Your CI/CD pipeline encoding product demos? Faster now. Your media server transcoding your movie collection? More efficient now. Your livestream processing pipeline? Can compute quality metrics in real-time now.

## What This Means for Video Infrastructure

The video processing landscape is dominated by FFmpeg whether companies admit it or not. It's the engine behind countless products and services. When Meta invests in making FFmpeg better and actually contributes those improvements back, everyone wins.

I'm particularly interested in how this affects smaller companies and independent developers. You don't need Meta's scale to benefit from better threading or real-time quality metrics. These are capabilities that were previously locked behind proprietary solutions or custom forks that most teams couldn't maintain.

The fact that Meta successfully deprecated their internal fork entirely is proof that this approach worked. They're not running two versions anymore. They're on upstream FFmpeg with just their MSVP-specific patches layered on top. That's a much more maintainable position, and it means they'll continue getting all the benefits of upstream development without the rebase nightmares.

## The Bigger Pattern Here

This feels like part of a larger shift in how big tech companies interact with [open-source](/tags/open-source/) infrastructure. Instead of building everything proprietary and keeping it locked up, there's real value in pushing improvements upstream when they make sense.

Meta still gets their competitive advantages through scale, infrastructure, and integration. But the core video processing improvements? Those can be shared. And by sharing them, they reduce their own maintenance burden while making the entire ecosystem better.

It's not altruism, it's pragmatic engineering. But the results are the same: features that required a dedicated team at a billion-user company are now tools in every developer's toolbox.

I wonder how many other internal forks at large companies could follow this same path if they actually tried.