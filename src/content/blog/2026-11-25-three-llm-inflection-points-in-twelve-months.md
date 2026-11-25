---
title: "Three LLM Inflection Points in Twelve Months"
description: "How Claude Opus 4.5, Fable class models, and reasoning breakthroughs transformed coding agents from unreliable assistants to daily drivers."
date: 2026-11-25 18:00:22 +0530
tags: rollup, engineering, llms, ai-engineering, coding-agents
image: "https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?q=80&w=2070"
featured: false
---

One year ago today, Anthropic released Claude Opus 4.5. Looking back, it's clear this was a consequential moment, though I didn't fully appreciate it at the time.

I'd been skeptical of Claude Code as a daily tool. It made mistakes frequently enough that I spent more time correcting it than writing code myself. That changed with Opus 4.5. For the first time, the default result was generally correct. It handled ambiguous requirements, reasoned about tradeoffs without hand-holding, and when pointed at complex multi-system bugs, it figured out the fix. The model finally felt like a genuine accelerant rather than a productivity sink.

OpenAI's GPT-5.1 suite arrived around the same time with similar impact on their Codex agent. By January 2026, both ecosystems had matured enough that using these models felt like the obvious choice for daily work. That's the first inflection point: when coding agents became reliably useful.

## The Rise of Fable Class Models

The second inflection came more dramatically. In June, Anthropic released Claude Fable 5, a defanged version of their Mythos model. Where Opus excels at structured problem-solving, Fable class models are relentlessly proactive. Give them a goal and the right tools, and they don't just solve your immediate problem, they anticipate what you actually need.

I first experienced this when I asked Fable 5 to help fix a Safari display glitch. Instead of asking clarifying questions, it spun up its own pyobjc-framework-Quartz screenshot mechanism and built a CORS-enabled localhost logging server to debug the issue. More recently, I gave it access to five WebAudio microphones in a room full of boxes and asked it to find the source of an infuriating mysterious beep. It triangulated the signal to within 40cm using spatial reasoning I hadn't even asked for.

I now define Fable class models as those that combine exceptional reasoning with genuine agency. Claude Opus 5.5, GPT-6 Astra, and Gemini 4 Neon all qualify. These became my baseline expectation for what frontier models should do. This matters for developers because it shifted the problem from "can the model solve this" to "can I clearly describe what I want."

Around the same time, something unexpected happened across all frontier models: they got genuinely good at 3D modeling. Set them up with Blender or ask for Three.js code and they produce credible spatial models of almost anything. I suspect this correlates with labs investing in vision capabilities for robotics, though the causality isn't clear. What matters is that [AI for spatial reasoning](https://mgks.dev/tags/ai-engineering) suddenly works.

## Understanding Fun

The third inflection point caught me by surprise. In August, I asked Fable 5 to build me a raccoon heist game. It looked like a game and had 3D graphics, but played poorly. I was relieved. Game design, I thought, remained uniquely human.

Then Opus 5.5 came out on September 22nd. I told it "This game isn't fun enough yet. Make it a LOT more fun." It spent 12 hours playtesting new features and rebalancing gameplay. My Command & Conquer-style RTS went from boring to deeply entertaining overnight.

This was the first time an LLM appeared to understand fun as a concept, not just as a prompt. I've since worked on several game projects where suggestions like "Think hard about how to make sure it is both beautiful and fun" produced results that genuinely held my attention.

I've now attended two conferences where people showed me AI-assisted game projects that felt like proper, worthwhile games. The indie games community is in a full-blown culture war over this shift. Some are calling GTA VI the last pre-generative AI blockbuster.

## What Changes Now

This matters because we've crossed from "LLMs are tools that sometimes help" to "LLMs are tools that fundamentally change how creative work happens." The implications for [AI-assisted development](https://mgks.dev/tags/coding-agents) are staggering. I haven't typed most of my code by hand in months. The release notes for Datasette and LLM over the past three weeks alone show a flood of fixes and features that would have taken weeks to implement manually.

Fable 5.2, which I'm using right now, seems to have taste that almost exactly matches my own. I'm burning through problems I've procrastinated on for years. If this represents a true inflection point, the key insight is that if you can clearly describe a piece of software, Fable can build it.

Software development has transformed beyond recognition. The question isn't whether AI will reshape how we code, but whether we're ready for how fundamentally different the work will become.