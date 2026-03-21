---
title: "The Eugenic Roots of AI: Why Your Model Keeps Being Racist"
description: "Generative AI's bias problem isn't a bug to be fixed. It's baked into the statistical foundations borrowed from Victorian-era race science."
date: 2026-03-22 00:00:32 +0530
tags: rollup, artificial intelligence, machine learning, ethics, open-ai
image: 'https://images.unsplash.com/photo-1680783954745-3249be59e527?q=80&w=1064'
featured: false
---

I've been thinking a lot about why [artificial intelligence](https://mgks.dev/tags/artificial-intelligence/) models produce racist outputs. Not the surface-level "garbage in, garbage out" explanation we all toss around, but the deeper structural reasons. Valerie Veatch's new documentary "Ghost in the Machine" traces a line from Victorian eugenics to modern [machine learning](https://mgks.dev/tags/machine-learning/) that honestly made my stomach turn.

The story starts with Francis Galton, Charles Darwin's cousin, who invented eugenics and spent his time measuring the attractiveness of African versus European women using what he called multidimensional modeling. This wasn't some fringe hobby. This was respected academic work in Victorian England, and the statistical techniques Galton developed to quantify his racist beliefs directly influenced Karl Pearson's work on logistic regression.

You know, that logistic regression we all learn about in our intro to ML courses? The one that's fundamental to how modern neural networks actually function? Yeah, that one.

## The Math Doesn't Forget Its Origins

Veatch's documentary makes an uncomfortable argument: the statistical tools we use to build AI weren't developed in a vacuum. They were explicitly designed to prove that races could be quantified, measured, and ranked. Pearson didn't wake up one day and invent regression analysis for fun. He was trying to provide mathematical rigor to Galton's eugenic theories.

When I first played with [OpenAI](https://mgks.dev/tags/open-ai/)'s Sora, I noticed weird things. Women in generated videos would develop exaggerated features. Professional settings would automatically lighten skin tones. But I chalked it up to training data bias, something we could theoretically fix with better datasets.

Veatch's experience was more direct. She watched a woman of color in an AI artists' Slack group repeatedly get whitewashed by Sora when she tried to place herself in an art gallery. The model kept her braids and fashion but changed her skin tone because it understood "art gallery" as a white space. When Veatch brought this up to the group, she got complete silence. Zero reaction in a normally hyperactive chat.

## Nobody Wants To Talk About It

What really gets me is [OpenAI](https://mgks.dev/tags/open-ai/)'s response when Veatch reported these issues directly. They basically told her it was "cringe" to bring up and that nothing could be done. Not "we're working on it." Not "this is a priority." Just a dismissal.

This isn't ignorance. The companies building these models know exactly what they're producing. But acknowledging the eugenic roots of their statistical foundations would require admitting that the bias isn't just in the training data. It's in the fundamental mathematical frameworks we use to process that data.

Think about what "intelligence" even means in artificial intelligence. The entire concept that human intelligence can be measured and ranked comes directly from Galton's work. IQ tests, standardized testing, the idea that we can reduce human cognitive ability to a single number or set of metrics? All eugenics derivatives. And we've built an entire industry on the assumption that we can create "artificial" versions of this already problematic concept.

## The Problem With Calling It Intelligence

Veatch makes a point that I've been dancing around for years: "artificial intelligence" is fundamentally a marketing term. John McCarthy coined it in 1956 specifically to secure more funding for his computer science projects. It worked because it tapped into this existing cultural belief, inherited from race science, that intelligence is a quantifiable, machine-like property.

We're not building intelligent machines. We're building statistical pattern matchers trained on human-generated data that reflects all our historical biases. But "artificial statistical pattern matcher" doesn't get venture capital excited.

I used to think we could engineer our way out of AI bias. Better datasets, more diverse training examples, careful prompt engineering, constitutional AI constraints. But if the mathematical foundations themselves carry eugenic assumptions about measurement, categorization, and hierarchy, we're essentially trying to build an equitable system on top of a racist framework.

When Veatch tried to show other AI enthusiasts the sexist outputs Sora was generating, outputs where women would "start growing extra tits and twerking after like two rounds of generating a scene," she expected concern. Instead she got silence and corporate deflection. The AI community doesn't want to examine these roots because it would require fundamentally rethinking what we're building and why.

## What This Means For Developers

I'm not saying we should stop using regression analysis or throw out decades of statistical research. But we need to be honest about where these tools came from and what assumptions they carry. When your model consistently produces biased outputs across different training datasets, maybe the issue isn't just what you're feeding it but how it's processing information at a structural level.

The documentary features AI researchers, historians, and critical theorists who all point to the same conclusion: every facet of modern AI has been shaped by its connection to discriminatory pseudoscience. That's not a bug we can patch. That's architecture.

I keep thinking about Veatch's comment that she would never interview Sam Altman for this documentary because it would require compromises that make the film "complicit in gen AI's harms." There's something clarifying about that refusal. We've spent so much time platforming the people building these systems, letting them define the terms of debate, that we've lost sight of what the technology actually does versus what they promise it will do.

The hype cycle around AI keeps pointing toward some theoretical future benefit while ignoring present harm, and maybe that's not accidental when your technology is built on frameworks designed to justify hierarchy and inequality.