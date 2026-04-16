---
title: "When Benchmark Performance Stops Meaning What We Think It Means"
description: "A quantized local model outdraws Claude Opus 4.7 at pelicans on bicycles. What does that tell us about AI benchmarks? Probably nothing good."
date: 2026-04-17 00:00:55 +0530
tags: rollup, engineering, artificial-intelligence, benchmarks, llm
image: 'https://images.unsplash.com/photo-1739805591936-39f03383c9a9?q=80&w=2073'
featured: false
---

I've been running this ridiculous benchmark where I ask [AI](https://mgks.dev/tags/artificial-intelligence/) models to generate SVG images of pelicans riding bicycles. It started as a joke, a way to poke fun at how absurd it is to compare these massive language models that can do ten thousand different things. But here's the weird part: for months, there was actually a correlation between pelican quality and general model usefulness.

Not anymore.

Yesterday I tested both Qwen3.6-35B-A3B and Claude Opus 4.7 on the pelican benchmark. The Qwen model, a 21GB quantized version running locally on my MacBook Pro via LM Studio, absolutely crushed Anthropic's latest flagship release. Better bicycle frame, better pelican anatomy, better overall composition. I even tried giving Opus a second chance with `thinking_level: max` and it still produced a janky bicycle frame.

Then I burned one of my backup tests. I asked both models for a flamingo on a unicycle. Qwen won again, complete with an adorable `<!-- Sunglasses on flamingo! -->` comment in the SVG code.

## The Correlation That Broke

Look, I have zero illusions that my pelican test is scientifically rigorous. It's one task, hyper-specific, and probably says more about training data quirks than actual model capabilities. The early pelicans from October 2024 were absolute garbage. Recent ones from models like Gemini 3.1 Pro have been legitimately usable illustrations.

But now we've hit this bizarre inflection point. I absolutely do not believe that a quantized 35B parameter model running on a laptop is more capable than Opus 4.7 at the vast majority of tasks. Anthropic's engineers are brilliant, they have massive compute resources, and Opus has been trained on datasets I can only imagine. For coding assistance, complex reasoning, nuanced conversation? I'd bet on Opus every time.

Yet for this one specific thing, drawing bird-bicycle SVGs, the smaller local model wins decisively.

## What This Actually Means

There's a paranoid part of my brain that wonders if the labs are training specifically for my stupid benchmark. Some people genuinely believe this. I mostly don't, but I'll admit these results gave me a flicker of suspicion. More likely, though, this is just exposing how fractal and unpredictable these models' capabilities are.

We talk about [artificial intelligence](https://mgks.dev/tags/artificial-intelligence/) benchmarks like they're thermometers that measure some underlying "intelligence temperature." Better score equals smarter model. But what if capabilities are more like a jagged landscape? Model A might be incredible at legal reasoning and terrible at spatial SVG composition. Model B might nail the pelican but fumble complex ethical philosophy.

The industry obsesses over benchmark numbers because we desperately want a single axis to compare models on. We want to be able to say "this model scored 94.2 on MMLU therefore it's better than the model that scored 93.8." But my pelican test, as absurd as it is, keeps demonstrating that reality is messier than that.

## The Practical Takeaway Nobody Wants

If you're building something that needs SVG generation of birds on wheeled vehicles, apparently you should skip the expensive API calls and run Qwen locally. For literally everything else, that advice is probably backwards.

This feels like it should be a problem. If our benchmarks and intuitions about model quality can be this wrong about something as simple as "draw a pelican on a bicycle," how wrong are they about more complex, harder-to-evaluate capabilities? How many developers are paying for expensive [LLM](https://mgks.dev/tags/llm/) API access when a local model would actually serve their specific use case better? How many are doing the opposite, using local models that are genuinely worse for their needs because they don't want the API costs?

We're in this strange moment where the models are good enough to be genuinely useful but evaluation is still so primitive that a joke benchmark can reveal capability inversions that serious enterprise benchmarks miss entirely. That gap between "what the model can do" and "what we think the model can do" isn't closing as fast as the raw capabilities are improving, and I'm not sure anyone knows how to fix that.