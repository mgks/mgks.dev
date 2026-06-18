---
title: "GLM-5.2 Is the New King of Open Weights AI"
description: "A deep dive into Z.ai's massive 753B parameter model that's dominating benchmarks"
date: 2026-06-18 12:00:15 +0530
tags: rollup, engineering, artificial intelligence, open ai
image: "https://images.unsplash.com/photo-1747920523600-bd6a3d064f4d?q=80&w=2070"
featured: false
---

So here's something interesting that dropped this week. Z.ai released GLM-5.2 to their coding plan subscribers on June 13th, then yesterday (June 16th) dropped the full open weights under an MIT license. This thing is an absolute unit. We're talking 753 billion parameters, 1.51 terabytes of model weights, with 40 active Mixture of Experts. Just to put that in perspective, that's bigger than most people's entire hard drives, and it's running as a text-only model.

The context window got a massive bump too. We're now at 1 million tokens, up from 200,000 in GLM-5.1. That's a 5x increase in context length, which matters a lot when you're working on large codebases or long documents. If you've been keeping track of open weights models, you know this is a huge leap.

Now here's where it gets really interesting. According to Artificial Analysis, who run one of the most respected independent benchmarks out there, GLM-5.2 is the new leading open weights model on their Intelligence Index. It's scoring 51, beating out MiniMax-M3 at 44, DeepSeek V4 Pro at 44, and Kimi K2.6 at 43. This isn't some internal benchmark that the company made up either; Artificial Analysis has been independently evaluating these models for a while now and their methodology is solid.

## What Makes This Model Different

One thing that caught my attention is the output token usage. GLM-5.2 uses about 43,000 output tokens per Intelligence Index task, which is significantly higher than GLM-5.1's 26,000. Compare that to MiniMax-M3 at 24,000, Kimi K2.6 at 35,000, and DeepSeek V4 Pro at 37,000. This suggests the model is doing more extensive reasoning and generating more comprehensive responses rather than stopping early. That's both impressive and a little concerning from a compute cost perspective.

The model also just hit #2 on the Code Arena WebDev leaderboard, sitting right behind Claude Fable 5. Given that GLM-5.2 is text-only and doesn't have vision capabilities, this is pretty remarkable. I've always thought you needed image input for truly great frontend coding tasks, but Z.ai is proving me wrong here. The model can apparently handle agentic coding workflows for web development without seeing what it's building.

## The Pricing Situation

If you want to try this via OpenRouter, you have options. There are 9 different providers hosting it, and most are charging around $1.40 per million input tokens and $4.40 per million output tokens. For comparison, GPT-5.5 runs $5/$30 and Claude Opus 4.5-4.8 is $5/$25. So the pricing is actually quite competitive, especially considering the benchmark performance. You're getting top-tier results at a fraction of the cost of the big closed models. That matters a lot for developers building applications at scale.

## The SVG Test

Now I have to be honest with you. I first got interested in GLM-5.1 because of its SVG generation capabilities. The model produced one of my favorite pelicans ever, and my all-time favorite opossum for the prompt "Generate an SVG of a NORTH VIRGINIA OPOSSUM ON AN E-SCOOTER." What was really cool about those outputs is that GLM-5.1 wrapped the SVG in an HTML document and added CSS animations on top. That extra step showed real creativity and understanding of how to make the output more useful.

I had to test GLM-5.2 with the pelican prompt. The result? A fully self-contained animated SVG where everything actually works. No broken animations, no eyes falling off, no wheels rotating independently from the bicycle. Everything is synchronized and looks great. It's a genuinely impressive vector illustration.

But then I tried the opossum on an e-scooter. Oh boy. Let's just say it's a significant step down from GLM-5.1. The 5.1 version had character. This one... doesn't. It's one of those cases where a newer model actually regressed on a specific task, which is weird given all the benchmark improvements. Maybe the training data shifted, or maybe certain creative capabilities got traded off for reasoning performance. Either way, it's a reminder that benchmark scores don't tell the whole story.

## What This Means for the Industry

Here's the thing about open weights models like this. They're becoming genuinely viable alternatives to the closed API giants. You can self-host them, customize them, and avoid vendor lock-in. The performance gap between open and closed models is narrowing fast. For developers and companies, that means more choice and potentially much lower costs at scale.

Z.ai deserves credit for releasing this under MIT license. That openness enables the community to inspect, fine-tune, and build on top of this model in ways that simply aren't possible with closed systems. We're seeing a real shift in the [artificial intelligence](https://mgks.dev/tags/artificial-intelligence/) landscape where open weights models aren't just competitors anymore, they're leaders.

And that's saying something, because just eighteen months ago, the idea that an open weights model would top the benchmarks seemed optimistic at best. The pace of improvement in this space shows no signs of slowing down, and I'm genuinely curious what we'll see in the next release.