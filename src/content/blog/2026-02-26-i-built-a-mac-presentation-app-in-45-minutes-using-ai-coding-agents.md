---
title: "I Built a Mac Presentation App in 45 Minutes Using AI Coding Agents"
description: "Vibe coding a native macOS presentation tool with Claude Code: what it means for engineers who want to expand beyond their comfort zones"
date: 2026-02-26 00:00:12 +0530
tags: rollup, engineering, artificial-intelligence, claude
image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=1720'
featured: false
---

I needed a presentation app for a talk I was giving at Social Science FOO Camp. Something simple: just a list of URLs I could click through with arrow keys. Nothing fancy, nothing complicated. The kind of thing that shouldn't exist as a separate app because surely someone has already built it.

Nobody had.

So I built it myself in about 45 minutes the night before my talk. In Swift. A language I don't really know. For a platform I don't develop for. Using [artificial intelligence](https://mgks.dev/tags/artificial-intelligence/) coding agents to do the heavy lifting.

The result is Present, a 355KB native macOS app that does exactly what I wanted. It loads URLs as slides, lets you reorder them, goes fullscreen for presentations, and even includes a mobile-friendly web server so I can use my phone as a remote control over Tailscale.

## Why This Isn't Just Another "AI Coded My App" Story

These vibe coding stories are everywhere now. Someone prompts an AI, gets an app, posts about it on social media. It's becoming background noise.

But this one hits different for me because it solved a real problem I've had for years.

I usually present using Keynote, but sometimes I want to show live web pages. Demo something interactive. Show real data that updates. The standard approach is to open a browser with multiple tabs and click through them during the talk.

This works until it doesn't. If your browser crashes mid-presentation, you're standing in front of an audience trying to manually recreate your entire deck from a notes file. It's not a good look.

Present solves this by being stupidly simple. It's just a list of URLs that auto-saves. If it crashes, you reopen it and you're back where you were. That's it. That's the whole value proposition.

## The Technical Reality of AI Assisted Development

I started with a straightforward prompt to [Claude](https://mgks.dev/tags/claude/) Code: build a SwiftUI app with a webview on the right, a sidebar for managing URLs on the left, and a fullscreen mode triggered by a menu option.

It produced a plan. I approved it. The code appeared.

The initial version worked well enough that I got greedy. I wanted a remote control. So I asked for a web server on port 9123 that would serve a mobile-friendly page with big prev/next buttons.

Claude decided to implement this using raw socket programming without any libraries. It wrote a minimal HTTP parser that looks for GET requests and routes them accordingly. The whole thing is vulnerable to CSRF attacks because it uses GET requests for state changes, but honestly, I don't care. It's a presentation remote running on localhost over a private Tailscale network.

The scroll control on the mobile interface is clunky. You slide your finger up and down a thin bar to scroll the page. It barely works. But "barely works" is enough when you just need to scroll past a fold during a talk.

## What This Actually Means for Software Engineers

Here's what I'm not saying: native Mac developers are obsolete. They're not. Someone who actually knows Swift and SwiftUI could have built something far more elegant in the same timeframe.

What I am saying is that the barrier to entry for platforms outside your expertise has collapsed. I'm not afraid of Swift anymore. I'm not intimidated by macOS development. Next time I need a small personal utility, I know I can build it.

This isn't about replacing expertise. It's about expanding the range of what feels achievable.

I still needed my accumulated technical knowledge to make this work. I already had Xcode installed. I understand how web servers and networking work. I know what Tailscale does and why it matters for accessing localhost from another device. I can read Swift code well enough to spot the socket programming decision and understand its implications.

The AI didn't make me a Swift developer. It made Swift development accessible enough that I could solve a specific problem on a tight timeline.

## The Vibe Coding Workflow

After pushing the code to GitHub, I realized I should probably understand what Claude had actually written. I've been experimenting with a pattern where I ask the model to present a linear walkthrough of the entire codebase, explaining how everything connects.

The resulting document is genuinely useful. It's not just comments explaining what each function does. It's a narrative that walks through the app's architecture, data flow, and key decisions. The kind of thing you'd want a senior engineer to explain during onboarding.

This is where coding agents shine. Not in writing perfect code, but in making codebases comprehensible. In lowering the cognitive load of context switching into unfamiliar territory.

Present weighs 355KB uncompressed, 76KB compressed. Swift apps are tiny. The entire thing is a single file for the app logic and another for the web server. There's something satisfying about software that fits in your head.

The app is rough around the edges. The scroll control is awkward. The HTTP implementation is naive. The UI could be prettier. But it shipped, it worked during my talk, and it solved the exact problem I had.

That's the real story here: AI coding agents don't make perfect software, but they make "good enough" software accessible to people who wouldn't otherwise build it at all.