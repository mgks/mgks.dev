---
title: "I Built My Dream Presentation App in 45 Minutes With AI-Assisted Coding"
description: "Why vibe coding a custom macOS app taught me more about AI-assisted development than a thousand tutorials ever could."
date: 2026-03-04 12:00:34 +0530
tags: rollup, engineering, ai-assisted-coding, swift, macos
image: 'https://images.unsplash.com/photo-1676825446819-284aad06dfdd?q=80&w=2070'
featured: false
---

I've been giving talks about [artificial intelligence](https://mgks.dev/tags/artificial-intelligence/) and LLMs for years now, and I've always had this weird presentation workflow. I'd load up a browser with a tab for each slide, then click through them during my talk. It worked great until you remembered that browsers can crash. And when they crash mid-presentation, you're standing there in front of everyone trying to manually reload a dozen URLs from a notes file.

Last weekend I needed to present at Social Science FOO Camp about the state of LLMs. The night before, I decided to finally solve this problem. I vibe coded a custom macOS app in about 45 minutes that does exactly what I've wanted for years.

The app is called Present. It's 355KB, or 76KB compressed. Swift apps are ridiculously tiny.

## The Problem With Browser-Based Presentations

Here's the thing about using browser tabs as slides: it's actually a pretty elegant solution. You can use any web page as a slide. You can mix local HTML files with live websites. You can do data visualizations, interactive demos, whatever you want. Keynote could never.

But that crash risk haunted every talk. I always kept the URLs in a notes file as backup, but manually reloading them mid-presentation would be mortifying. The obvious solution was to build something that saves state automatically and can recover from crashes.

I'd been thinking about this for years but never bothered to learn Swift or SwiftUI properly. Too much overhead, too much to learn, not worth the time investment for one small utility app.

Then AI-assisted coding became good enough that I stopped caring about knowing the language.

## Building Present With Claude

I started with a simple prompt: "Build a SwiftUI app for giving presentations where every slide is a URL. The app starts as a window with a webview on the right and a UI on the left for adding, removing and reordering the sequence of URLs. Then you click Play in a menu and the app goes full screen and the left and right keys switch between URLs."

That produced a plan. Claude Code walked me through the implementation. Within minutes I had a working app with a sidebar for managing URLs and a fullscreen presentation mode. It automatically saved the URL list any time I made changes. Problem solved.

But I had time to kill, so I got ambitious.

## Adding A Remote Control

Wouldn't it be neat to control the presentation from my phone? I added another prompt: "Add a web server which listens on 0.0.0.0:9123 that serves a single mobile-friendly page with prominent left and right buttons. Clicking those buttons switches the slide left and right. There is also a button to start presentation mode or stop depending on the mode it is in."

A few more iterative prompts later, I had a mobile interface with prev/next buttons, a slide indicator, font size controls, and even a touch-enabled scroll bar for scrolling the current page. That last one is clunky as hell but it works just well enough.

The really nice part is that I have Tailscale on both my laptop and phone. My phone can access the control interface from anywhere in the world without worrying about Wi-Fi blocking or port forwarding nonsense.

I pushed the code to GitHub before I'd even looked at it properly. When I finally did, I discovered Claude had implemented the web server using raw socket programming without any libraries. It wrote a minimal HTTP parser from scratch. The routing logic is hilariously simple, and it uses GET requests for state changes which opens up some fun CSRF vulnerabilities.

For this particular application, I don't care.

## What This Actually Means

Vibe coding stories are everywhere now. Every developer has one. "I built X in Y minutes with Claude/ChatGPT/whatever" has become the new "I learned to code in 24 hours" humble-brag.

But this particular experience taught me something specific about where [AI](https://mgks.dev/tags/artificial-intelligence/)-assisted development actually shines.

I'm not a Swift developer. I've never shipped a real Swift app. I had Xcode installed from previous experiments but I barely know the ecosystem. Yet I built a functional, if rough, macOS app that solves a real problem I've had for years. The app is legitimately useful to me. I actually used it for my presentation.

This doesn't mean native Mac developers are obsolete. Someone who actually knows Swift could have built something far better in the same time. They would have used proper libraries instead of raw socket programming. They would have handled edge cases I haven't even thought about. They would have made it actually good.

What changed is that I'm no longer afraid to try. I know I can build something good enough for my personal needs without investing months learning a new language and ecosystem. The barrier to entry for scratching your own itches just collapsed.

## The Knowledge You Still Need

Here's what I brought to this that the AI couldn't provide: I knew what I wanted. I knew what was technically possible. I knew how to describe the architecture I needed. I knew that Tailscale would solve my networking problem. I knew when to ignore security issues and when to care.

I also knew when the AI was doing something weird (raw socket programming for a simple HTTP server?) and decided it was fine for this use case. Someone without any technical background would have shipped those CSRF vulnerabilities into production without realizing the implications.

The AI gave me the syntax and the boilerplate and the SwiftUI patterns. I gave it the architecture and the judgment calls and the problem decomposition.

This is the current equilibrium. It won't last forever, but it's where we are right now in early 2026.

## Why Present Matters To Me

I've been writing about LLM development acceleration for years. I documented December 2023, December 2024, December 2025. This February talk was the first time I shortened the window to just three months because the pace of change has gotten that ridiculous.

I even wore a Gemini 3 sweater to the talk that was already out of date thanks to Gemini 3.1 launching weeks after I got it.

Present is a perfect little artifact of this moment. It's a fully functional app built in less than an hour. It solves a real problem. It uses modern native frameworks. It has a web server and a remote control and automatic state saving. The code is on GitHub if anyone else wants to use it.

And I built it without really knowing how to write Swift, which would have been completely impossible just a couple years ago.

Next time I need a small personal macOS app for some weird specific problem, I know it's achievable with the tools we have right now. That's a meaningful expansion of what feels possible, and it changes how I think about solving problems in my daily work.