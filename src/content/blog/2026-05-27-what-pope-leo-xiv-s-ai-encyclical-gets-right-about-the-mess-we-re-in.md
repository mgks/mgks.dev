---
title: "What Pope Leo XIV's AI Encyclical Gets Right About the Mess We're In"
description: "A developer's take on the Vatican’s new AI document and what it means for those building AI systems"
date: 2026-05-27 00:00:15 +0530
tags: rollup, engineering, artificial-intelligence, llms, ethics
image: "https://images.unsplash.com/photo-1666462296991-45c5eb42067c?q=80&w=2076"
featured: false
---

So the Vatican dropped a new encyclical on artificial intelligence. Pope Leo XIV — shoutout to the Leo XIII/Rerum novarum callback, that was a clever bit of brand positioning — dropped a 20,000 word document on AI ethics that actually manages to be readable. I listened to most of it on a walk with my dog using ElevenReader, which is genuinely how I consume most long-form content these days, and I kept finding myself nodding along as a developer who ships [AI](https://mgks.dev/tags/artificial-intelligence/) code for a living.

There's stuff in here that feels like it was written specifically for people like me.

## The Interpretability Problem Hits Different

Section 98 of the encyclical makes a point that I've been thinking about a lot lately. The document notes that current AI systems are more "cultivated" than "built" — developers create a framework within which intelligence "grows," and we don't fully understand the internal representations or computational processes of these systems.

This is the thing that keeps me up at night, honestly. I can show you exactly what tokens went into a prompt and exactly what tokens came out the other end. But asking me to explain *why* the model made a particular decision? That's often like asking a chef to explain exactly which molecular interactions made a sauce come together. It works, most of the time, but the why is fuzzy.

The encyclical frames this as a limitation that needs to be taken seriously. And it's right. When you're building systems that millions of people depend on, the fact that we can't fully explain their reasoning is a genuine problem, not just an academic curiosity.

## The Environmental Footprint Is Real

Another section that resonated: the encyclical calls out the enormous energy and water demands of current [AI](https://mgks.dev/tags/artificial-intelligence/) systems, particularly large language models. It mentions the carbon dioxide emissions, the computing infrastructure, the data centers.

As someone who runs a fair amount of inference locally and has thought about the compute economics of this stuff, this hits different when you see it framed as a moral issue rather than just an engineering problem. The encyclical isn't saying "build more efficient models" (though that's obviously good). It's saying the environmental impact is a *dignity* issue — we're fouling our common home in ways that affect the most vulnerable.

It's a useful reframing. I've been guilty of thinking about efficiency purely in terms of cost and latency. Maybe I should be thinking about it in terms of stewardship too.

## Decision Systems Without Compassion

Section 102 is the one that made me actually stop and think. The encyclical warns about algorithmic systems making decisions about employment, credit, access to public services, even people's reputations — decisions that affect real lives — without "compassion, mercy, forgiveness."

This is the cold reality of automated decision systems. A model doesn't care if you just went through a divorce or lost your job or had a medical emergency. It processes the inputs, spits out the output. Sometimes that's fine. Sometimes it's devastating.

The encyclical correctly identifies that these systems "do not know hope that people are able to change." An ML model trained on historical data is, by definition, biased toward the past. It doesn't believe in redemption. It just sees patterns.

For developers building these systems, the implication is clear: we need human-in-the-loop mechanisms, appeal processes, the ability to override. Not because the models aren't useful, but because the stakes are too high to fully delegate.

## Accountability Is Still the Hardest Problem

Section 105 tackles something I've been thinking about since the beginning of my [AI](https://mgks.dev/tags/artificial-intelligence/) work: who is responsible when things go wrong?

The encyclical notes that the internal processes leading to a result often remain opaque, making it harder to assign responsibility and correct errors. This is the classic accountability gap. The model is trained on data compiled by one team, fine-tuned by another, deployed by a third, and the person harmed by a decision might never interact with any of them.

What the Vatican is describing here is the same problem every engineer in this space knows about in their bones. We need clearer lines of responsibility. We need audit trails. We need the ability to say "this person made this decision" rather than "the system did it," because systems don't go to jail. People do.

## Data as a Public Good

Here's one that might ruffle some feathers in Silicon Valley. The encyclical explicitly calls out data ownership and suggests data should be thought of as more of a public good, a common resource rather than purely private property.

The reasoning is pretty compelling: data is the product of many contributors. It shouldn't be entrusted to a select few. The encyclical references Saint John Paul II on collective goods and suggests we need to "think creatively" about managing data in a spirit of participation.

As someone who works with models trained on data scraped from the internet, this raises uncomfortable questions. Who really owns the data these systems learn from? Should there be more collective governance over how it's used? These aren't questions the tech industry likes to grapple with, but they're exactly the questions we should be asking.

## The Power Amplification Problem

Section 108 gets at something I've been worried about for a while. As with every major technological shift, AI amplifies the power of those who already have resources, expertise, and data. A small number of companies can shape information, influence democratic processes, steer economic dynamics.

The encyclical puts this in terms of the common good and social justice. It's a framing that might sound foreign in startup circles, but it's worth taking seriously. When a handful of companies control the most powerful general-purpose technologies in human history, that's not just a market dynamics problem. It's a civilization-level question.

The document calls for clear criteria and effective oversight, grounded in participation and subsidiarity. I'm not sure the Vatican is going to solve that particular engineering challenge, but I appreciate that they're naming the problem clearly.

## What Do We Actually Do About It?

The famous Tolkien quote the encyclical pulls in — "It is not our part to master all the tides of the world, but to do what is in us for the succour of those years wherein we are set" — feels right. The scale of these challenges can be paralyzing. No single developer, no single company, is going to fix the interpretability problem or the environmental impact or the accountability gaps.

But we can do what is in us. We can build systems with better audit trails. We can push for human oversight in high-stakes decisions. We can think about data as something more than just fuel for the model. We can resist the temptation to offshore our ethics to the algorithm.

The Pope weigh ing in on [AI](https://mgks.dev/tags/artificial-intelligence/) feels significant, if only because it signals that these questions are no longer just technical ones. They're going to be debated in places far beyond our code reviews and engineering all-hands. That's going to change the job description for people like me, whether I like it or not.