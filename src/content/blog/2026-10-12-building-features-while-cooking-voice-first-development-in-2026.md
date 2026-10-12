---
title: "Building Features While Cooking: Voice-First Development in 2026"
description: "How I built a newsletter index feature for my blog almost entirely through voice conversation with Claude, and what it means for the future of developer workflows."
date: 2026-10-12 18:00:22 +0530
tags: rollup, engineering, ai-coding, voice-interfaces, developer-experience
image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2065"
featured: false
---

I shipped a new Newsletters page for my blog today, and I built most of it while cooking dinner. Not by multitasking in the traditional sense, but by actually writing code through conversation with an AI while standing at the stove.

This felt different from my usual voice-mode experiments. I've used ChatGPT voice on my phone during walks to brainstorm and sketch code, and it works fine for that. But adding a live preview of my local development environment, combined with the ability to switch between voice and typing as needed, created something genuinely more powerful. I could talk through my requirements while glancing at the site across the kitchen, then type in API keys or paste error messages when precision mattered.

## The Setup That Made It Work

I started by pointing Claude at my local checkout, which gave it context about my blog structure. Then I activated voice mode and set the laptop up strategically in my kitchen workflow. The model understood my rambling, half-formed requirements right away: a new Django model for newsletters, migrations, view code, templates, and import functions to pull data from both my public Substack and a private GitHub repository.

The transcript was full of disfluencies and correction, but Claude tracked my logic anyway. I wanted these newsletters searchable (unlike the Substack copies that just duplicate existing blog content), visible on date-archive pages but not tag pages or the main blog index. I didn't even need to repeat myself when I changed my mind mid-sentence.

That half-hour of voice conversation got the feature about 80% complete. The model would respond, ask clarifying questions, modify code, and occasionally ask me to check the preview. This is genuinely new territory compared to text-based interactions. The visual feedback loop compressed what might have taken several back-and-forth exchanges into something more like pair programming.

## Where Voice Hits Its Limits

Once I finished cooking and started the final push to ship, I switched back to typing. The imports needed work, particularly the mechanism for pulling from a private Git repository. Claude had reached for a subprocess-based Git approach, but I wanted an API-based import instead to match my other scripts. Describing that change vocally felt clunky. I needed to paste in code examples and show the exact pattern I preferred.

This revealed something important: voice is brilliant for high-level reasoning and architectural decisions, but terrible for the details that actually matter in code. Error messages, specific code patterns, API keys, the precise syntax you need in a particular situation - these all need typing or copy-paste. The model can't see my screen in detail, and I can't verbally describe a stack trace efficiently.

## The Real Unlock: Parallel Processing

Here's what surprised me most: I didn't actually lose time by using voice for the early stages. I usually code while listening to podcasts or scrolling, which means my development is serialized with my entertainment. Voice-driven development let me genuinely build while cooking, with zero context switching. The model handled the thinking while I handled the prep work.

I've seen OpenAI use voice demos at DevDay, and I understand why they do - it's compelling theater. But I don't think this becomes my daily driver for serious engineering work. The friction of switching between modalities, the difficulty of precision communication through speech, and the reality that I still need to sit and actually review code in text form all suggest this remains a specialized workflow.

That said, it's specialized in an interesting way. For one-off features where you have a clear idea but not much context-switching pressure, voice-first development actually works. And the implications matter: if this workflow scales, developers might spend significantly less time in full context-lock with their IDEs.

The real question isn't whether voice will replace typing for coding - it won't. The question is whether we'll stop treating "at the keyboard" as the default state for all creative work, and that's a much bigger shift.