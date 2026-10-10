---
title: "Building a Feature While Cooking: Voice-First Development in 2026"
description: "How I built a Django feature entirely through voice conversation with Claude, discovering that multitasking with AI coding agents changes what productivity means."
date: 2026-10-10 12:00:20 +0530
tags: rollup, engineering, ai-development, voice-coding, developer-experience
image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070"
featured: false
---

I shipped a new newsletters index page for my blog today, and I built it almost entirely by talking to my laptop while cooking dinner. No keyboard needed during the initial development, just my voice and a local preview I could glance at across the kitchen.

This wasn't a quick Slack message or a simple prompt. I spent about thirty minutes in the ChatGPT desktop app's Codex tab, using voice conversation mode against my local development environment. I described what I wanted: a new Django model, database migrations, view code, templates, and import functions to pull newsletter data from external sources. The model (GPT-6 Astra High) handled all of it.

## The Setup That Changed Everything

What made this different from previous voice coding experiments wasn't just the voice interface itself. It was having a live preview of my site that I could actually see while talking. I'd set up my laptop in the kitchen and glance at it between stirring pots. When I said something like "I don't want newsletters showing up on tag pages, but they should appear in date-based archives," the model asked clarifying questions just like a colleague would.

The model would respond, occasionally ask for details, then modify the code. I could see the results immediately on the preview. This feedback loop is something that's been missing from previous voice-first development experiences I've tried.

## Where Voice Falls Short

Once I finished cooking and the feature was mostly complete, reality hit: I needed to switch back to the keyboard. The import scripts required creating a new API key for a private GitHub repository. Suddenly, all the verbal fluency in the world wouldn't help. I had to sit down and type.

When I reviewed the code in the GitHub PR interface, the model had made a choice I disagreed with: using Git in a subprocess for one import script. I needed it to use an API instead. That required pasting error messages, highlighting specific code sections, and typing detailed instructions. Voice would have been painfully inefficient here.

This is the honest truth about voice-first development in 2026: it's fantastic for the brainstorming and architectural phases, but the moment you need to communicate something specific, precise, or error-related, typing becomes dramatically more efficient. Pasting a stack trace and saying "fix this" beats describing it in words.

## The Actual Killer Feature

But here's what genuinely changed my workflow: I can multitask now. I usually cook with a podcast or TikTok running. Now I can actually ship code during that time. Before, I could maybe brainstorm or research while cooking. Now? Real development work happens.

That's not nothing. It's a shift in what productivity means for developers. I'm not replacing my main development process. I still sit at my desk for serious work. But those pockets of time where I'm doing something physical, something that doesn't require my hands or my focus, suddenly became development time.

I mainly work from home, which matters because I'd never do this in a shared workspace. There's something uncomfortable about narrating code to a machine while other people are around. But privately? It's genuinely efficient.

## What This Means for Development

The addition of a visual preview was the secret ingredient that other voice-first coding experiments have lacked. At DevDay, OpenAI showed this off brilliantly, and I understand why. It actually works. The combination of voice for high-level direction, a visual preview for feedback, and the ability to drop back to typing when precision matters creates something more powerful than any single mode alone.

The model's design choices for the newsletters page came from vocal feedback while I was literally looking at the preview. "Make that less spaced out," I said, and it adjusted. That kind of rapid iteration on aesthetics is harder to do through pure text prompts.

For the industry, this suggests something important: the future of AI-assisted development might not be fully hands-free. Instead, it's probably multi-modal. Sometimes I talk, sometimes I type, sometimes I just point at what needs changing. Tools that handle all three modes fluidly create a much better experience than tools optimized for any single approach.

The half-hour of review work, most of it typing-based, reminds me that voice-first development scales well for initial feature creation but falters during refinement. That's not a flaw; it's just a different tool for a different phase.

If voice-first coding means I can ship features while cooking dinner, what else becomes possible when we stop thinking of development time as something that only happens at a desk?