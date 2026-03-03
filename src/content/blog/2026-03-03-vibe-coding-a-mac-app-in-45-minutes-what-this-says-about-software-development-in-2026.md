---
title: "Vibe Coding a Mac App in 45 Minutes: What This Says About Software Development in 2026"
description: "Building a custom macOS presentation app overnight shows how AI coding tools are reshaping what's possible for developers outside their comfort zones."
date: 2026-03-03 12:00:34 +0530
tags: rollup, engineering, ai, development
image: 'https://images.unsplash.com/photo-1676825446819-284aad06dfdd?q=80&w=2070'
featured: false
---

I built a custom macOS app the night before giving a talk, and it worked flawlessly. The entire thing took about 45 minutes of active coding time. I've never seriously written Swift before. This would have been unthinkable two years ago.

The app itself is straightforward: a presentation tool that lets you create a deck from a sequence of URLs. You can reorder them, edit them, and then hit play to go fullscreen and arrow through your slides. The killer feature? If the browser crashes, you don't lose everything because the app saves state automatically.

This solves a real problem I've had for years. I sometimes present using browser tabs instead of Keynote, which works great until you accidentally close the window or the browser decides to update itself mid-talk. Having those URLs in a native app that weighs 76KB compressed felt like exactly the right solution.

## The Remote Control Rabbit Hole

But here's where it gets interesting. After getting the basic app working, I had time left over. So I asked Claude to add a web server that would let me control the presentation from my phone.

The resulting interface has big prev/next buttons, a slide indicator, font size controls, and even a clunky but functional touch-enabled scrollbar for when content loads below the fold. I can access it from anywhere in the world thanks to Tailscale running on both devices.

When I finally looked at the code after pushing it to GitHub, I discovered Claude had implemented the entire web server using raw socket programming. No libraries, no frameworks. Just a minimal HTTP parser that routes GET requests. It's technically vulnerable to CSRF attacks, but for a personal presentation tool that only I'm using? I genuinely don't care.

This is the part that fascinates me. The [AI](https://mgks.dev/tags/artificial-intelligence/) made architectural decisions I wouldn't have made, but they work perfectly fine for the use case. A professional Swift developer would probably be horrified, but the app shipped and did its job.

## What This Actually Means

Stories like this are common now in 2026. Everyone's building apps outside their expertise. But I think there's something specific worth examining here about what's changed and what hasn't.

I still needed my accumulated technical knowledge to make this work. I already had Xcode installed. I knew what questions to ask. I understood how to iterate on the prompts when the first attempt didn't quite nail it. I knew what Tailscale was and why it solved the networking problem cleanly.

A professional Mac developer could have built something far more polished in the same timeframe. The code quality probably makes SwiftUI experts wince. But that's not the point.

The point is that the barrier to "I need a small utility app for a specific problem" has dropped to nearly zero for anyone with general programming experience. I'm no longer afraid of Swift. Next time I need something Mac-specific, I know it's achievable.

This isn't making native developers obsolete. It's expanding what the rest of us can build when we need to step outside our usual stack. It's the difference between "I should probably learn Swift someday" and "I need this tonight, let's see what happens."

## The Linear Walkthrough Pattern

After shipping, I used another technique I've been refining: asking the model to present a complete linear walkthrough of the entire codebase. This produces documentation that's actually useful for understanding what got built while you were focused on the high-level features.

That's how I discovered the socket programming decision. That's how I learned the app automatically saves presentations as newline-delimited .txt files. These are implementation details I would have had to read through hundreds of lines of code to understand otherwise.

The [artificial intelligence](https://mgks.dev/tags/artificial-intelligence/) coded it, but I still needed the AI to explain what it had coded. There's something circular about that which feels very characteristic of where we are right now.

I wore a Gemini 3 sweater to the talk that was already outdated because Gemini 3.1 had launched. The app I built the night before was already serving as both the medium and the message about how fast things are moving. The presentation was about LLM developments over just three months because that's apparently the new timescale for meaningful change.

We're in this strange moment where the tools keep getting better at building things, but the real skill is knowing what to build and how to ask for it.