---
title: "The Human Bottleneck: What Nobody Tells You About AI Development Tools"
description: "Exploring how AI shifts the bottleneck from execution to coordination, and why our attention becomes the scarce resource."
date: 2026-06-03 12:00:15 +0530
tags: rollup, architecture, artificial-intelligence, software-development
image: "https://images.unsplash.com/photo-1666462296991-45c5eb42067c?q=80&w=2076"
featured: false
---

There's a moment that hits every developer who adopts AI tooling around the six-month mark. The initial excitement fades, the productivity claims settle into reality, and you start noticing something strange: you're not writing more code, you're managing more chaos. The machine got faster. Everything else got harder.

I've been thinking about this a lot lately, reading through the various voices in our space. There's Greg Wilson pointing out that we have no idea how to measure whether AI tools actually help. There's Benedict Evans showing that automation didn't kill accounting, it transformed it. And there's Jamie Hurst from booking.com, who put it most directly: the cost of building has collapsed, but the cost of aligning organisationally has not.

That line stuck with me. It captures something fundamental about where we are.

## The Metrics We Can't See

Let's start with the measurement problem, because it's worse than most people realize. Greg Wilson has been cataloging the various ways we try to quantify AI productivity, and the list is essentially a parade of failures. Lines of code generated? That's counting the wrong thing entirely, and everyone knows it. Tickets closed? That rewardsa brute force approach, not clever solutions. Developer surveys about how productive they feel? That's vulnerable to the placebo effect, and worse, it tends to reward the people who are most easily impressed.

I use that last one myself, somewhat sheepishly. There's something to knowing how developers feel about their tools, even if it's incomplete. But we should be honest about what it is: a dim light in a dark room. Better than nothing, sure, but let's not mistake it for a flashlight.

The real problem underneath all of this is that productivity isn't a single number waiting to be discovered. It's multidimensional, context-dependent, and almost impossible to separate from the quality of the decisions being made rather than the speed of the execution. And that's before we even get into the organizational dynamics that Jamie Hurst describes, where the gains from AI get absorbed not into slack time or quality improvements, but into raised expectations that eat up the remaining space for strategic thinking.

## The Attention Bottleneck

Andy Osmani made a point recently that deserves way more attention than it got. He said that spawning lots of AI agents is like launching a bunch of parallel processes that all rely on a single orchestrating thread: you. The analogy is to Python's Global Interpreter Lock, the mechanism that ensures only one thread executes Python bytecode at a time. You can spawn as many agents as you want, but when their work needs genuine understanding of the architecture or someone to resolve merge conflicts, that work has to acquire the lock. There is one lock. You hold it.

This is the insight that changes how you think about AI tooling. The skill isn't running twenty agents simultaneously. Anyone can do that. The skill is designing the workflow around the one serial resource that cannot be cloned or parallelized. That resource is your attention.

Think about what this means in practice. You hand off a task to an AI agent. It produces output. You need to review that output. But the review isn't just checking for correctness, it's bringing genuine understanding of the system to bear. It's catching the subtle bug, the architectural mismatch, the assumption that doesn't hold in your particular context. That's not something the agent can do for you, and it's not something you can batch review efficiently. Each piece of work that requires your judgment is fundamentally sequential.

This is why I get nervous when I see teams racing to adopt multi-agent systems without thinking hard about where the human bottlenecks will be. More agents doesn't mean more done. It means more things waiting for you to pay attention.

Jamie Hurst describes this from the inside. At booking.com, he's seen the productivity gains get captured by output volume rather than output quality. The org's expectations rose to absorb the speed-up, and the slack that used to exist between tasks, that unstructured time where strategic thinking actually happens, got eaten first because it's invisible on a dashboard. "I'm at a point in my career where thinking is supposed to be most of the job," he writes, "and most of it now happens on holiday because the working week doesn't accommodate it."

That's the human cost of the attention bottleneck. Not that we're being replaced, but that we're being pushed out of the part of the work that requires sustained, unstructured thought.

## The Debt That Multiplies

There's another dimension to this that Pavel Voronin surfaced well, building on ideas from Unmesh Joshi. He talks about "generative debt," the idea that LLMs multiply what's currently happening in your codebase. If you have good code, that's great: the model sees good examples and continues the pattern. But if you have cruft, confusion, and technical debt, the model doesn't see "debt." It sees examples. It sees precedent. It sees a style to continue.

This is the inversion of what we hoped AI would do. We thought it would help us clean up our messes. Instead, it's perfectly happy to replicate them at scale. The model doesn't judge your codebase against some ideal; it imitates what you have. Bad code multiplies.

And this connects to something deeper about the nature of expertise. There's "cognitive debt," which accumulates when a team uses abstractions they no longer understand. But there's now "generative debt," which accumulates when a codebase contains confused concepts that models are likely to reproduce. The first is a human problem. The second is a machine problem that becomes a human problem because we have to live with the outputs.

I think about this when I see teams rushing to ship AI-assisted features without paying attention to the quality of their existing codebases. You're not just accumulating technical debt anymore. You're accumulating debt that will be amplified by every future AI interaction. The interest rate is the model's tendency to imitate what it sees.

## The Quality Floor Drops

Nowhere is this more visible than in the hallucinated citations that have become endemic to AI-generated content. GPTZero has been documenting cases where major consulting firms publish reports with fabricated references. Ernst & Young Canada once put out a report on cyber threats where more than half the references were hallucinations. This isn't just embarrassing. It's a form of data injection into the collective pool of knowledge. When fake information gets published on high-traffic sites by reputable firms, it poisons the well for everyone who comes after.

This is the paradox of scale. As it becomes cheaper to produce content, the cost of verifying that content doesn't go down. It goes up, because the volume of unverified content explodes. We used to worry about bot-generated spam. Now we have to worry about sophisticated-seeming reports that are fundamentally unreliable, published by organizations with every incentive to be trustworthy but no mechanism for catching AI fabrications.

And then there's the downstream madness that Jason Koebler described. People so accustomed to AI writing that they now distrust their own instincts about what's human. He writes about the "humanizers," tools that add typos and random word replacements to make text look less like it was AI-generated. We're not just drowning in slop, we're developing anxiety about whether our own writing looks like slop. If I use phrasing that AI copied from me, does it seem like I'm copying AI?

This is the Zombie Internet in action. Not just bots talking to bots, but people talking to bots, people creating AI agents to talk to people, and people desperately trying to seem human by adding mistakes to their writing.

## The Moat That Isn't

There's one more thread worth pulling on. Stephen O'Grady has been tracking how closed and open [AI](https://mgks.dev/tags/artificial-intelligence/) models perform on benchmarks over time. What he finds is that closed models keep setting the pace, but open models catch up faster and faster. It took 13-18 months for open models to catch up to GPT-4 on various benchmarks, but only 2-7 months to catch up to GPT-4o.

The implication is unsettling. The capabilities that feel cutting-edge today become table stakes tomorrow. Whatever moat you think you have, it evaporates quickly. This is worth remembering when evaluating AI tools for your team. The question isn't just what can it do today, but how long until everyone has that capability. If you're building your workflow around a feature that's unique to one provider, you're building on sand.

Benedict Evans makes a related point from a different angle. Whenever we try to forecast how a technology will affect jobs, we're almost certainly wrong. We automated accounting for a century, built half the tech industry around it, and somehow the number of accountants kept going up. The nature of the work changed completely, but the headcount didn't shrink. We thought automation meant doing the same thing less; it usually means doing something different altogether.

No one with a smartphone in 2003 predicted that it would transform the economics of taxis through ride-sharing. The connections are too indirect, the second-order effects too hard to trace. So it is with AI. We're not going to forecast our way to understanding. We're going to learn by doing, badly, and adjusting.

## What Stays Human

I've been thinking about what all this adds up to. The theme that connects these various observations is that the bottleneck is moving. It's moving from execution to coordination, from building to reviewing, from code generation to context understanding. The machine can do more, but the space where human judgment matters hasn't shrunk. If anything, it's become more concentrated.

The people who thrive in this environment will be those who treat their attention as the scarce resource it is. They'll design workflows that protect time for thinking. They'll resist the temptation to spawn more agents than they can meaningfully review. They'll pay attention to the quality of their codebases not just for human maintainability, but because that quality now shapes what their AI tools will produce.

The gains from [AI](https://mgks.dev/tags/artificial-intelligence/) are real. But they're not the gains we expected. We thought we'd be freed from the grind. Instead, we've been freed to face the更高维度的挑战 that were always lurking underneath the mechanical work. The question was always what to build and why, not just how to build it. Now the how is cheap, and the what and why are everything.

The irony is that we've spent decades trying to automate away the mechanical parts of programming, and we mostly succeeded, only to discover that the parts that remain are the ones that resist automation most strongly. Judgment. Context. Understanding what the code is supposed to do in the world, not just what it does in the machine.

That's not a limitation to mourn. It's the thing that makes the work worth doing.