---
title: "Why Your AI Benchmark Is Probably Wrong: The N,K Trade-off"
description: "Google Research reveals why using 3-5 human raters per item isn't enough for reproducible AI evaluation. The depth vs breadth problem explained."
date: 2026-04-01 12:00:55 +0530
tags: rollup, research, machine-learning, artificial-intelligence
image: 'https://images.unsplash.com/photo-1666462296991-45c5eb42067c?q=80&w=2076'
featured: false
---

I've spent enough time building [machine learning](https://mgks.dev/tags/machine-learning/) models to know that the hardest part isn't training the model. It's evaluating whether the damn thing actually works. And according to new research from Google, most of us have been doing it wrong.

The paper "Forest vs Tree: The (N,K) Trade-off in Reproducible ML Evaluation" by Flip Korn and Chris Welty tackles something that's been bothering me for years. When you're evaluating an [AI](https://mgks.dev/tags/artificial-intelligence/) model on subjective tasks like toxicity detection or sentiment analysis, how many human raters do you actually need per item? And more importantly, is it better to have many items with few raters, or fewer items with many raters?

Most researchers I know just slap 3-5 raters on each item and call it a day. This research suggests that's nowhere near enough.

## The Problem With Humans

Here's the thing about ground truth data. It relies on humans, and humans are messy. We disagree. A lot. Take toxicity detection as an example. Show the same comment to five different people and you might get five different answers. One person's "mildly offensive" is another person's "toxic as hell."

The standard approach in ML evaluation is to just take the plurality vote and move on. But this completely ignores the variation in human judgment. Two items might have the same plurality label, but one could be clearly toxic (4 out of 5 raters agree) while another is ambiguous (2 out of 5 say toxic, 2 say mildly offensive, 1 says neutral). Treating these the same is ridiculous.

The researchers built a simulator to stress test different configurations. They varied N (number of items) and K (raters per item) across thousands of combinations using real datasets from toxicity detection, hate speech, and other subjective tasks. The goal was simple: find the most reproducible setup for a given budget.

## What They Actually Found

The results are pretty damning for current practices. First, using 1, 3, or even 5 raters per item is often insufficient. You need more like 10+ raters per item to capture the nuance of human disagreement and get truly reproducible results.

Second, there's no universal answer. The optimal N,K trade-off depends entirely on what you're measuring. High data skew (like 99% spam, 1% important emails) changes the game. More rating categories (toxic, mildly offensive, neutral, etc.) also shift the balance. You can't just copy someone else's evaluation setup and expect it to work for your use case.

But here's the good news. You don't need an infinite budget. With around 1,000 total annotations and the right N,K ratio for your specific task, you can achieve highly reproducible results. The catch? Choose the wrong balance and you're screwed, even if you throw more money at the problem.

## Why This Matters For Real Work

I think this research hits on something fundamental about where [artificial intelligence](https://mgks.dev/tags/artificial-intelligence/) is headed. For years we've operated under this "single truth" paradigm. Every input has one correct label. Find that label, train on it, move on.

That works fine for objective tasks. A photo either contains a cat or it doesn't. But as AI moves into more subjective territory like content moderation, ethical decision making, or understanding social interactions, that paradigm completely breaks down.

The researchers call this the "forest vs tree" problem, which is actually a decent metaphor. The forest approach (many items, few raters) gives you breadth. It's like asking 1,000 different people to each try one meal at a restaurant. You get a general sense of quality but miss the details.

The tree approach (fewer items, many raters) gives you depth. Ask 20 people to try the same 50 meals and you start seeing patterns in disagreement. Maybe the pasta is universally loved but the steak is polarizing. That information is actually useful.

Google has open-sourced their simulator on GitHub, which is probably the most valuable contribution here. Instead of guessing at your evaluation setup, you can actually test different configurations against your specific data characteristics and budget constraints.

## The Uncomfortable Truth

What bothers me most about this research is how it exposes a weakness in so much published ML work. How many papers have made bold claims about model performance based on evaluations with 3 raters per item? How many benchmarks are we collectively building on that don't actually capture human disagreement?

The researchers tested their framework on multiple datasets with different characteristics. They looked at what happens with messy, skewed data. They explored different numbers of rating categories. The pattern held: standard practices are insufficient.

This isn't just an academic problem either. If you're building a real product that needs to handle subjective judgments, using an unreproducible benchmark means you can't actually trust your evaluation metrics. You might think Model B is better than Model A, but run the evaluation again with different raters and suddenly the order flips.

Understanding why humans disagree might be just as important as knowing where they agree, and most of our current evaluation methods completely ignore that signal.