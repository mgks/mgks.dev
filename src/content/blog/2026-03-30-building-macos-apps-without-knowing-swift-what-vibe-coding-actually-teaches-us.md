---
title: "Building macOS Apps Without Knowing Swift: What Vibe Coding Actually Teaches Us"
description: "I built two monitoring tools for my M5 MacBook using Claude and GPT without writing Swift myself. The results work, but should they?"
date: 2026-03-30 00:00:56 +0530
tags: rollup, engineering, ai, llm
image: 'https://images.unsplash.com/photo-1727434032792-c7ef921ae086?q=80&w=2232'
featured: false
---

I have a confession to make about those two macOS apps I just built. I have no idea if they're reporting accurate information.

Let me back up. I got a new 128GB M5 MacBook Pro and Activity Monitor was driving me nuts. So I decided to build my own monitoring tools using what's become known as "vibe coding." Two Claude sessions later, I had Bandwidther (for network monitoring) and Gpuer (for GPU/RAM stats). They look professional, they run smoothly, and I genuinely cannot tell you if the numbers they show are remotely correct.

This morning Gpuer told me I had 5GB of memory left when Activity Monitor disagreed. I showed Claude a screenshot and it "fixed" the calculations. Now the numbers look better. But look better to whom? I don't understand macOS memory pressure APIs. I barely glanced at the Swift code. This is vibe coding at its purest and most terrifying.

## The Workflow That Shouldn't Work This Well

The process was absurdly simple. For Bandwidther, I started with "show me how much network bandwidth is in use from this machine to the internet as opposed to local LAN." I wanted to see if Dropbox was using my local network or downloading from the internet. Then I said "mkdir /tmp/bandwidther and write a native Swift UI app in there that shows me these details on a live ongoing basis."

That actually worked.

The clever part came next. I asked Claude to suggest features because frankly, Claude knows more about what's possible with macOS networking APIs than I do. This is the uncomfortable truth about modern [AI](https://mgks.dev/tags/artificial-intelligence/) assisted development. The model has better domain knowledge than me in areas I've never worked in.

For Gpuer, I just pointed Claude at the Bandwidther code and said "create a similar app in /tmp/gpuer" for GPU monitoring. This cross pollination between projects is one of my favorite tricks. The agents can recombine patterns from different codebases without me understanding either one deeply.

## SwiftUI Fits In Context Windows Now

There's something important happening here that's easy to miss. A full SwiftUI app fits in a single text file. This means the entire application state lives within Claude's context window. I never opened Xcode. The edit, compile, run loop happened entirely through terminal commands that Claude generated.

This is fundamentally different from how we built software even two years ago. The constraint isn't my knowledge of Swift anymore. It's whether the task can be expressed clearly enough and whether the solution fits in one coherent bundle.

Both apps are now menu bar icons that open panels. The UI has two column layouts. Bandwidther does reverse DNS lookups while keeping original IPs visible. These weren't features I knew how to build. They were features Claude suggested and then implemented while I watched.

## The Verification Problem Nobody Talks About

Here's what keeps me up at night. I shipped these to GitHub with big warnings that I can't vouch for their accuracy. But people will use them anyway. People always do.

When I write Python or JavaScript, I can usually spot when something's wrong because I understand the domain. With these Swift apps using system_profiler and memory_pressure and network statistics APIs I've never touched, I'm flying blind. The apps compile. They run. They show numbers that seem plausible. That's a really low bar.

This is the dark side of vibe coding that doesn't get enough attention. We're generating applications faster than we can verify them. The [artificial intelligence](https://mgks.dev/tags/artificial-intelligence/) models are confident. The code looks clean. But correctness is a different beast entirely.

I fixed that memory reporting bug this morning by showing Claude a screenshot. It adjusted some calculations. How do I know the new version is right? Because Activity Monitor agrees? What if Activity Monitor and my app are measuring different things and both are technically correct but measuring different aspects of memory pressure?

## What This Actually Unlocked

Despite my paranoia, I did learn something valuable. Building macOS apps in SwiftUI is now in my capability set, even though I don't know Swift. That's weird to say out loud.

I can prototype native Mac utilities in an afternoon. I can iterate on UI layouts by describing what I want. I can pull in system APIs I've never heard of and get working implementations. This is genuinely new.

The quality bar is "good enough for personal tools" not "good enough for the App Store." But that's actually fine for a lot of use cases. I needed better visibility into what my new M5 was doing. These apps give me that, even if the numbers might be slightly off.

This was my second experiment with vibe coding macOS apps. The first was a presentation tool a few weeks ago. Both convinced me this is worth pursuing further, with eyes wide open about the limitations.

The transcripts are public. The code is on GitHub. The warnings are prominently displayed. And somewhere in Cupertino, an Apple engineer is probably reading this and cringing at my memory pressure calculations, but at least I'm honest about not knowing what I'm doing.