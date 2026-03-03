---
title: "Vibe Coding a Mac App in 45 Minutes: What This Says About Development in 2026"
description: "Building a custom presentation app overnight shows how AI coding tools are reshaping what's possible for developers willing to explore unfamiliar territory."
date: 2026-03-04 00:00:34 +0530
tags: rollup, engineering, ai, swift
image: 'https://images.unsplash.com/photo-1765707886613-f4961bbd07dd?q=80&w=988'
featured: false
---

I built a native macOS app the night before giving a talk. Not a prototype or a proof of concept, but an actual application I used in front of an audience. It weighs 355KB, does exactly what I need, and I'd never written a Swift app before.

This is where we are now with [AI](https://mgks.dev/tags/artificial-intelligence/) assisted development. Not replacing developers, but dramatically lowering the barriers to building things outside your comfort zone.

The talk was at Social Science FOO Camp, covering the state of LLMs from November 2025 to February 2026. Three months. That's how compressed the timeline has become when tracking developments in [artificial intelligence](https://mgks.dev/tags/artificial-intelligence/). I used to write these retrospectives annually, then it became necessary to do them more frequently just to keep up.

But the meta story here isn't about LLMs themselves. It's about using them to build something I've wanted for years.

## The Problem With Browser Based Presentations

I've done this trick before: load up a browser with tabs for each slide, then click through them during a talk. It's great for showing live demos, switching between different web applications, keeping things dynamic. The web is my canvas and I can orchestrate it in real time.

The terror comes when you realize that if the browser crashes, your entire presentation disappears. Sure, you've got the URLs in a notes file somewhere, but manually clicking through twenty links while an audience watches is not the recovery plan you want.

I needed something that combined the flexibility of web based slides with the reliability of a proper presentation tool. And I needed it to automatically save state, support a remote control from my phone, and be simple enough that it wouldn't get in my way.

So I asked Claude to build it.

## What Vibe Coding Actually Means

The prompt was straightforward: build a SwiftUI app with a webview and a sidebar for managing URLs, add keyboard navigation, make it go fullscreen for presentation mode.

That produced a working prototype. Then I got ambitious.

I wanted a web server built into the app that would let me control presentations from my phone. Port 9123, mobile friendly interface, big buttons for prev/next, controls for font size. The kind of thing that sounds simple until you think about all the networking code and UI polish required.

Claude implemented it using raw socket programming. No libraries, just manual HTTP parsing. The resulting parser is hilariously minimal and absolutely shouldn't be used in production, but for a personal tool that listens on localhost? It's fine. It works.

```
Using GET requests for state changes like that opens up some fun CSRF vulnerabilities. For this particular application I don't really care.
```

That's the mindset shift. I'm not building enterprise software. I'm solving a specific problem I have with a tool that needs to work reliably on my machine. The security model is "don't let randos access localhost on my laptop," which Tailscale handles for me anyway.

## The Linear Walkthrough Pattern

After pushing the code to GitHub, I realized I should probably understand what Claude had actually built. This led to something I've been doing more lately: asking the model to walk through the entire codebase linearly, explaining how everything connects.

The resulting document is genuinely useful. It maps out the architecture, shows how different components interact, points out the socket programming approach. Reading through it gave me enough understanding to maintain and modify the app myself.

This is what practical [AI](https://mgks.dev/tags/artificial-intelligence/) assisted development looks like in 2026. Not writing all the code by hand, but understanding enough to direct the tool and comprehend what it produces. The walkthrough becomes documentation that bridges the gap between "I vibe coded this" and "I actually understand what's happening here."

## What This Doesn't Mean

Native Mac developers are not obsolete. Someone with real Swift experience could have built something far better in the same timeframe. They'd know the proper frameworks to use, the UI conventions to follow, how to structure the code for maintainability.

What changed is that I'm no longer afraid to try. Before these tools existed, building a native Mac app would have meant weeks of learning Swift, fighting Xcode, reading documentation about memory management and view lifecycles. The activation energy was too high for a throwaway presentation tool.

Now the activation energy is low enough that I can experiment. I can build small utilities for personal use. I can explore platforms and languages that would have previously required serious time investment to even get started.

The app I built has rough edges. The scroll control on the mobile interface is clunky. The HTTP parser is a security nightmare. The whole thing has exactly zero tests. But it solved my problem, worked during the talk, and now exists as a tool I can iterate on.

## The Acceleration Problem

My Gemini 3 sweater was out of date two weeks after I got it because Gemini 3.1 launched. That's the pace we're dealing with.

I've been tracking LLM developments since 2023, and the cadence keeps compressing. Annual retrospectives became semi-annual, then quarterly. At some point even quarterly summaries will feel too slow.

Building Present the night before my talk wasn't just a cool hack. It was a demonstration of the meta point: things are moving fast enough that you need tools which let you adapt quickly. I couldn't have predicted three months ago that I'd want this specific presentation setup, so having the ability to materialize it overnight matters.

The real shift isn't that [AI](https://mgks.dev/tags/artificial-intelligence/) can write code. It's that the barrier between "I wish this existed" and "I'm using this" has collapsed to the point where overnight builds are feasible for motivated individuals with some technical background.

Which raises an interesting question: if we can all build quick solutions to personal problems this easily, what happens to the entire category of "small utility apps" that used to be worth charging money for?