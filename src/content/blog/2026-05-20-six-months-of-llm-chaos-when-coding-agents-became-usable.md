---
title: "Six Months of LLM Chaos: When Coding Agents Became Usable"
description: "November 2025 marked an inflection point in LLMs. Coding agents crossed a threshold from novelty to daily driver, while laptop-available models shattered expectations."
date: 2026-05-20 00:00:50 +0530
tags: rollup, engineering, ai, open-source
image: 'https://images.unsplash.com/photo-1680783954745-3249be59e527?q=80&w=1064'
featured: false
---

I've been tracking the <a href="https://mgks.dev/tags/artificial-intelligence/">AI</a> landscape pretty closely for the past six months, and honestly, the pace of change has been genuinely disorienting. But there's a through-line to all this chaos, and it's worth understanding because it fundamentally changes how we should be thinking about building with these tools.

The real story isn't about which model won the benchmark race this week. It's about two seismic shifts that happened roughly in parallel, and they're pointing in surprisingly different directions.

## The November Inflection Point

November 2025 was absolutely wild. The "best" model changed hands five times between OpenAI, Anthropic, and Google. Claude Sonnet 4.5 held the crown until GPT-5.1 arrived, then Gemini 3 took a swing at it, then OpenAI came back with GPT-5.1 Codex Max, and finally Claude Opus 4.5 claimed the top spot.

I tested each one using this ridiculous benchmark I created: generating an SVG of a pelican riding a bicycle. It's deliberately absurd because pelicans can't ride bicycles, they're hard to draw, and no lab would specifically train for this task. But that's precisely why it's useful. It cuts through the marketing and shows you what these models actually understand about visual composition and physics.

Gemini 3 drew the best pelican in that batch, if I'm being honest. But that's not what mattered. What mattered was what happened under the hood.

<a href="https://mgks.dev/tags/open-ai/">OpenAI</a> and Anthropic had spent most of 2025 running Reinforcement Learning from Verifiable Rewards on their models. They paired this with their Codex and Claude Code agent harnesses, specifically focusing on code quality. The work was intensive and methodical. And then, in November, it all clicked.

Coding agents went from "sometimes works but you'll spend half your time fixing bugs" to "actually works most of the time." That's a quality barrier. That's the difference between a toy and a tool you can use to ship real code.

## When Personal AI Actually Became Personal

Around the same time that coding agents crossed their threshold, a guy named Pete made the first commit to an obscure repo called Warelay. Most of us didn't pay attention yet.

Over the December and January break, a lot of developers (myself included) decided to go a little feral with these new coding agents. I spent weeks spinning up wildly ambitious projects to see how far I could push them. One of my favorite disasters was micro-javascript, a vibe-coded implementation of JavaScript in Python. I put it in a browser-based playground that runs Python through Pyodide through WebAssembly through JavaScript through a browser. It's ridiculous and pointless and I made it work.

I'm not proud of most of what I built during that period.

But here's the thing: we could build this stuff. Not because we're smarter, but because the coding agents actually worked well enough that we could use them as thinking partners instead of spending all our time debugging their outputs.

By February, Warelay had become OpenClaw. The project went from zero to mainstream in less than three months. Mac Minis started selling out in Silicon Valley because everyone wanted a dedicated machine to run their Claw (that's the industry term for these personal <a href="https://mgks.dev/tags/ai/">AI</a> assistants now).

Drew Breunig nailed the metaphor: they're digital pets. A Mac Mini is the aquarium. But my favorite comparison is Alfred Molina's Doc Ock from Spider-Man 2. The claws are powered by AI and perfectly safe until the inhibitor chip gets damaged. Then they take over.

## The Open Weight Renaissance

While all this was happening, something quieter but potentially more significant was unfolding.

In February, Gemini 3.1 Pro arrived and generated a genuinely impressive pelican on a bicycle. It even had a fish in the basket. Then Google's Jeff Dean posted a video that seemed to suggest the lab had been paying attention to my stupid benchmark the whole time. Animated pelicans, frogs on penny-farthings, giraffes driving tiny cars, ostriches on roller skates, dachshunds in stretch limousines. The absurdity was intentional.

Google dropped Gemma 4, which are the most capable open-weight models I've seen from a US company. But that wasn't even the headline.

In April, Chinese lab GLM released GLM-5.1. This is a 1.5TB open-weight monster. It drew a competent pelican on a bicycle. When it tried to animate it, the bicycle bounced off into space and warped, but that's beside the point. What matters is that this model works if you have the hardware to run it.

Then Qwen showed up with Qwen 3.6-35B-A3B. On my laptop. A 20.9GB open-weight model that runs locally and draws a better pelican than Claude Opus 4.7. That's not supposed to be possible. That's the kind of result that makes you question whether the gap between frontier and open-weight is actually closing faster than we thought.

## What This Means For Us

The inflection isn't about any single model becoming "the best." The inflection is about the frontier models becoming genuinely usable as coding partners, and simultaneously, the gap between what runs on your laptop and what the frontier labs can do is narrowing faster than expected.

This creates a weird bifurcation. You can build with frontier models through API calls if you want the cutting edge. Or you can download a 20GB model and run it locally and get 80% of the capability. The economics of that second option are getting harder to ignore.

For coding specifically, we've crossed into a regime where these tools are dependencies. Not optional enhancements. If you're not using AI coding agents to accelerate your work in 2026, you're choosing to move slower than you could.

But here's what I find genuinely unsettling: the pelican on a bicycle test has officially stopped being a useful discriminator. Qwen draws better pelicans than models that score higher on benchmarks. The models have gotten so good at arbitrary visual tasks that my deliberately absurd test is no longer telling us much.

So what do we test for now?