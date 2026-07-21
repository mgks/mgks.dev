---
title: "Kimi K3 and the limits of the pelican benchmark"
description: "Moonshot AI's 2.8T parameter model is impressive, but my 21-month-old SVG test reveals why we need better ways to evaluate frontier AI models."
date: 2026-07-21 06:00:32 +0530
tags: rollup, engineering, model-evaluation, llm-benchmarks, chinese-ai
image: "https://images.unsplash.com/photo-1727434032792-c7ef921ae086?q=80&w=2232"
featured: false
---

Moonshot AI dropped Kimi K3 this morning, and it's hard not to be impressed on paper. 2.8 trillion parameters, self-reported benchmarks beating Claude Opus and GPT-5.5, and pricing that signals serious ambition at $3/$15 per million tokens. I ran it through my pelican benchmark anyway, because that's what I do with new models. The results were solid. The SVG output was clean. The multimodal capabilities worked well on the rendered image. And yet the exercise made something very clear to me: my 21-month-old test is becoming increasingly useless as a comparative tool.

The pelican benchmark started as a joke. I wanted to highlight how absurdly difficult it is to meaningfully compare these models when we're all pointing at different metrics and claiming victory. Generate an SVG of a pelican riding a bicycle. Simple prompt. Reveals something about instruction following, spatial reasoning, creative synthesis. For the first year, the results tracked pretty well with what I believed about model capabilities. Then the correlation broke down.

Today, GLM-5.2 produces a better pelican than Claude Fable 5 or GPT-5.6. I don't think GLM-5.2 is a Fable-class model. Gemini seems to have optimized incredibly well for... something, because those pelicans are exceptional. I'm not convinced the labs are gaming my specific benchmark (the results would be much better if they were), but the disconnect between a model's real-world capability and its pelican quality has widened into a chasm.

## Why the benchmark still matters

Here's the thing though: I'm not abandoning it. Running the pelican prompt forces me to actually use these models. If you see a pelican in one of my posts, that means I've successfully gotten inference from the system, dealt with any API quirks, managed authentication, and validated that the output is real. For open-weight models, it means I've figured out whether they fit on my hardware. That's valuable even if the pelican itself tells us almost nothing about whether K3 will be better at your actual use case.

The prompt also surfaces model characteristics that don't show up in typical benchmarks. With K3, I noticed immediately that it only has one thinking effort level, unlike GPT's family of models where varying reasoning effort produces dramatically different results on complex tasks. That's a real architectural difference worth noting, even if it showed up via a silly SVG test.

## The real gap: agentic capabilities

But I'll be honest about what the pelican benchmark completely misses. The single most important capability for modern language models isn't SVG generation or creative reasoning on absurd prompts. It's agentic tool calling. It's the ability to use functions reliably, maintain context across long conversations, and orchestrate complex workflows without hallucinating parameters or losing track of state.

K3 is being evaluated on benchmarks where it trades blows with Opus and GPT-5.5. Those benchmarks probably measure academic reasoning, code understanding, mathematical ability. They almost certainly underweight the thing that actually matters for production systems: can this model actually use my tools without breaking when the conversation gets long? Can it learn from examples of my specific tool signatures and not forget them halfway through? This is where many frontier models still struggle, and no pelican benchmark will ever catch it.

## What this means for builders

If you're considering Kimi K3 for production work, don't rely on my pelican. Don't rely on Artificial Analysis scores. Run it against your actual use cases. Test the tool calling on conversation lengths that matter to you. See whether the reasoning capabilities (encoded in those 13,000+ output tokens from my test) translate to better results on your domain-specific problems, or whether it's just verbose without being useful.

The pricing signals something important too. At $3/$15, K3 costs the same as Claude Sonnet and more than most open-source alternatives. That's a statement: Moonshot believes this model is worth enterprise pricing. That might be true. But "most capable model to date" needs to be validated on your infrastructure, against your problems, over time.

The pelican benchmark taught me something over 21 months, but that lesson was always going to have an expiration date. Maybe what we actually need is a shift toward open, standardized evaluation suites that labs can't easily optimize for, focused on the capabilities that matter for agentic systems. What do you evaluate when benchmarks stop tracking reality?