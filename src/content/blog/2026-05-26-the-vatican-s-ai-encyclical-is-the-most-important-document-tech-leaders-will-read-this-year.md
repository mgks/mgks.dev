---
title: "The Vatican's AI Encyclical Is the Most Important Document Tech Leaders Will Read This Year"
description: "Pope Leo XIV just dropped a masterclass on AI ethics that every developer needs to absorb"
date: 2026-05-26 12:00:14 +0530
tags: rollup, engineering, artificial-intelligence, ethics, tech-industry
image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072"
featured: false
---

I've been thinking about this encyclical ever since it dropped. The Vatican doesn't publish documents like this very often, and when they do, folks in my line of work tend to dismiss them as philosophical hand-wringing. We're busy shipping code, training models, and wrestling with production systems. What does a 19th-century institution have to say about transformer architectures?

Quite a lot, it turns out. Pope Leo XIV's "Magnifica Humanitas" on safeguarding the human person in the age of artificial intelligence is genuinely one of the clearest pieces on AI ethics I've ever read. The man clearly understands the technical landscape. There's a section about large language models that made me stop and think about my entire career.

## The Interpretability Problem Hits Different

Section 98 of the encyclical contains what I think is the most honest description of how modern AI systems actually work that I've seen from any major institution. Let me quote directly:

"Current AI systems are more 'cultivated' than 'built,' for developers do not directly design every detail, but instead create a framework within which the intelligence 'grows.'"

That's exactly right. We've spent the last five years building systems where we set up the training infrastructure, dump in vast amounts of data, and hope something useful emerges. We can measure outputs, tune hyperparameters, and iterate on architectures, but nobody at OpenAI or Anthropic can fully explain why their models produce the specific reasoning traces they do. The weights exist, the attention patterns are visible in cross-sections, but the actualinternal representations remain mysterious.

This has massive implications for anyone building production systems. If we can't fully explain why a model makes a particular decision, how do we debug it when it fails? How do we guarantee safety properties? The encyclical calls this out as a core challenge for the entire field, and I think he's right that it deserves more attention than it typically gets in industry.

There's another angle here too. When the people building these systems acknowledge they don't fully understand them, it undercuts a certain kind of techno-optimist argument. You know the one: "trust us, the engineers, we know what we're doing." Well, do we? The Pope is effectively saying no, we don't, and that's a problem when these systems are making decisions that affect people's lives.

## The Environmental Question No One Wants to Face

Section 101 hits on something I've been worried about for a while. The computing requirements for training frontier models have been growing roughly 10x per year. We're talking about data centers consuming gigawatts of power, cooling systems using millions of gallons of water, and a carbon footprint that makes aviation look modest.

The encyclical doesn't mince words: "Current AI systems require enormous amounts of energy and water, significantly influencing carbon dioxide emissions." That's a direct statement from the leader of the Catholic Church calling out the environmental cost of our industry. Whether you're religious or not, that's a serious voice added to the debate.

As developers, we need to think about this. Not just the environmental impact of training, but the ongoing cost of inference. Every API call, every generated response, every chat interaction has a physical footprint. The industry keeps pushing the "scale solves everything" narrative, but at some point the physics catch up. We need more efficient architectures, better inference strategies, and honest conversations about whether we need trillion-parameter models for most use cases.

## When Algorithms Decide Who Gets a Loan

This one's personal because I've worked on systems that make exactly these kinds of decisions. Section 102 warns about delegating "important and sensitive decisions" to automated systems that "do not know compassion, mercy, forgiveness, and above all, the hope that people are able to change."

Think about what that means in practice. A machine learning model decides whether you get approved for a mortgage. It doesn't know that you had a rough year three years ago but rebuilt your credit since then. It can't account for the extenuating circumstances that a human underwriter would consider. It's optimizing for a loss function, not understanding a life.

ThePope is pointing out that there's something essential about human judgment that these systems lack. Not because they're malicious, but because they're fundamentally incapable of the kind of contextual, compassionate reasoning that we expect from other humans. We can argue about whether AI should make these decisions at all, but if we're going to use them, we absolutely need human oversight.

This connects to section 105 on accountability. If an algorithm denies your loan application, who do you appeal to? In many cases, the internal processes are opaque enough that even the company running the system can't fully explain why a particular decision was made. That's a problem. That's a really serious problem for anyone who cares about due process or basic fairness.

## The Power Concentration Problem

Section 108 gets into territory that should concern everyone in the industry. The encyclical notes that "AI tends to amplify the power of those who already possess economic resources, expertise and access to data." Small groups can "shape information and consumption patterns, influence democratic processes and steer economic dynamics to their own advantage."

This is the political economy of AI, and it's easy to ignore if you're just focused on the technical layer. But the implications are enormous. We have a handful of companies controlling the most transformative technology of our time. They set the terms of access, they decide what capabilities are released, and they shape the public understanding of what's possible. That's not a criticism of those companies per se, it's a structural observation about how concentrated power works.

The encyclical suggests treating data as a "common or shared good" rather than purely private property. That's a provocative idea. Your browsing history, your location data, your interactions with systems: these are collectively generated and collectively valuable. Should they be controlled by a few corporations, or should there be more democratic oversight? It's not a comfortable question, but it's one we need to grapple with.

## What This Means for Developers

Reading through this document, I'm struck by how directly it speaks to the work I do. Not as abstract philosophy, but as practical guidance for building systems that affect millions of people.

We need to think harder about interpretability. We need to account for environmental costs. We need to push back on replacing human judgment in sensitive contexts. We need to ask hard questions about who benefits from the systems we build.

ThePope throws in a Tolkien quote at the end that I keep coming back to: "It is not our part to master all the tides of the world, but to do what is in us for the succour of those years wherein we are set, uprooting the evil in the fields that we know." That's the spirit. We're not going to solve everything, but we can try to build things that are genuinely good, or at least avoid the worst harms.

This encyclical won't change the industry overnight. But it adds a voice to the conversation that carries weight, and it names problems that we as developers are uniquely positioned to address. Whether you're building [artificial intelligence](https://mgks.dev/tags/artificial-intelligence/) systems or just using them, the questions it raises are yours to answer.