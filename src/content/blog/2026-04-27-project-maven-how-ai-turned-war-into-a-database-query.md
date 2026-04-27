---
title: "Project Maven: How AI Turned War Into a Database Query"
description: "The military's AI targeting system can now hit 5,000 targets daily. We should talk about what happens when warfare moves at database speed."
date: 2026-04-27 12:00:54 +0530
tags: rollup, artificial intelligence, machine-learning, ethics
image: 'https://images.unsplash.com/photo-1747920523600-bd6a3d064f4d?q=80&w=2070'
featured: false
---

I've been thinking a lot about speed lately. Not the kind of speed we obsess over in tech, like shaving milliseconds off API calls or optimizing React renders. I'm talking about the speed at which decisions get made when the consequences are life and death.

Katrina Manson's new book on Project Maven dropped some numbers that I can't stop thinking about. The US military struck over 1,000 targets in the first 24 hours of the Iran assault. That's nearly double the "shock and awe" campaign in Iraq. One of those targets was a girls' school that killed over 150 people, mostly children. The school was listed online as a school. Satellite imagery showed playgrounds. But the database said it was part of a naval base.

Here's the thing that keeps me up at night: this wasn't a hallucination problem, even though Claude from Anthropic caught most of the initial blame. This was a database problem. Someone didn't update a record. And the system moved so fast that nobody caught it.

## From Computer Vision to Kill Chain Acceleration

Project Maven started in 2017 as a computer vision experiment. The military had mountains of drone footage and was analyzing maybe 4 percent of it. They needed [AI](https://mgks.dev/tags/artificial-intelligence/) to watch video feeds and flag things for human review. Classic [machine learning](https://mgks.dev/tags/machine-learning/) application, right?

But that was never the whole story. When Google employees protested their involvement in 2018, Google said the tech wouldn't be used for killing. My read of Manson's reporting is that this was, let's say, a very narrow interpretation of the project's goals. One military operator told her directly: "The goal of the intel is to take out high-value targets." Not exactly defensive use.

After Google pulled out, Palantir stepped in. Microsoft and AWS provided algorithms and compute. What emerged wasn't just computer vision anymore. It became a workflow management system that synthesizes satellite imagery, radar, social media, and dozens of other data sources. It finds targets, pairs them with weapons, and lets users click through the targeting cycle.

The 18th Airborne Corps originally had humans at six key decision points in the targeting process. With Maven's AI, they reduced that to two: the decision to act and the action itself. Everything else got automated or AI-enabled.

A process that took hours now takes seconds. The military went from under 100 targets per day to 1,000. With large language models added to the mix, they're claiming capability for 5,000 targets daily.

## The Ukraine Inflection Point

Ukraine was where this all crystallized into something real. When Russia invaded, the US 18th Airborne Corps in Germany started using Maven's computer vision to track Russian positions. The algorithms immediately failed because they'd been trained on desert imagery from the Middle East. They couldn't spot tanks in snow.

So they collected new satellite footage, sent it back to the US, and retrained the models. Fast iteration, right? Exactly what we do in tech. Except the feedback loop here involves people dying.

The US started passing "points of interest" to Ukraine. Not targets, mind you. That's a legal distinction. A target has gone through a formal process. These were just... highly specific locations that might be interesting to strike. At the peak in 2022, they passed 267 of these in a single day.

The language games here are fascinating from a technical perspective. It's like when we call something a "beta" to manage liability, except the stakes are international law and potential nuclear escalation.

## When Your Database Becomes Your Strategy

There's a quote in Manson's book from retired Defense Secretary Jim Mattis that hits hard: "Targeting is no substitute for strategy." He's saying that hitting a lot of things doesn't mean you're winning.

But here's what worries me as someone who builds systems. When you optimize for throughput, throughput becomes the metric that matters. The National Geospatial-Intelligence Agency is now producing intelligence reports that no human has touched. Entirely [AI](https://mgks.dev/tags/artificial-intelligence/) generated.

Military ethicists quoted in the book talk about the risk of "gamification." When targets appear on a screen with AI-generated confidence scores, there's a psychological shift. It starts feeling like reviewing pull requests or triaging bug reports. The system vouches for the data. Why would you question it?

The counterargument is that this AI-based system is actually more auditable than the old analog process of phones and swivel chairs. Every decision is logged. Every data source is tagged. Headquarters can see what operators at the edge are doing with unprecedented transparency.

And honestly? That's probably true. The 1999 strike on the Chinese Embassy in Belgrade happened because someone used an outdated map. The embassy had moved. One map was updated; others weren't. Someone tried to call and check but couldn't reach anyone in time.

With a unified digital system, that kind of error should be easier to catch. Multiple data sources should flag contradictions. But that only works if the system is slow enough for those checks to happen and for humans to notice them.

## The Autonomous Weapons Pipeline

Manson uncovered programs developing fully autonomous weapons. Explosive-laden drone Jet Skis that can target and destroy things on their own. No human in the loop at all.

This feels inevitable once you've built the infrastructure. You've already got the targeting pipeline. You've already got the computer vision models. You've already got the workflow automation. Why not close the loop entirely?

From an engineering perspective, it's the logical next step. From an [ethical](https://mgks.dev/tags/ethics/) perspective, it's terrifying. We're building systems that make decisions at machine speed about human lives, and we're training a generation of operators to trust those systems because they're usually right.

The problem is that "usually right" in a system processing thousands of targets means "wrong often enough to matter." When your false positive rate is 0.1 percent and you're hitting 5,000 targets, that's five mistakes. Five schools, five hospitals, five wedding parties.

Colonel Drew Cukor, who led Maven's development, had a vision he called "white dots." Points on a map infused with intelligence data. Coordinates, elevation, known information. A God's eye view of the battlefield, updated in real time.

I think about this a lot when I'm building dashboards or admin panels. The interface shapes how people think about the data. A dot on a map is abstract. It's clean. It doesn't bleed or scream or have parents who will spend the rest of their lives wondering why.

We've built a system that turns warfare into a database query, and now we're discovering that all the problems we know about databases apply here too: stale data, race conditions, cascade failures, and the eternal question of whether you can trust what you're seeing on the screen.