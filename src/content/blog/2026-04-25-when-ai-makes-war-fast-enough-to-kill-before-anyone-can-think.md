---
title: "When AI Makes War Fast Enough to Kill Before Anyone Can Think"
description: "Project Maven turned battlefield targeting from hours to seconds. The real cost isn't just the bugs, it's that we built systems too fast for humans to stop."
date: 2026-04-25 12:00:54 +0530
tags: rollup, artificial intelligence, ethics, military-tech
image: 'https://images.unsplash.com/photo-1727434032792-c7ef921ae086?q=80&w=2232'
featured: false
---

There's something deeply unsettling about reading that the US military can now hit five thousand targets a day. Not because of the raw capability itself, but because of what had to break for us to get there. Katrina Manson's new book on Project Maven pulls back the curtain on how [artificial intelligence](https://mgks.dev/tags/artificial-intelligence/) didn't just enhance military operations but fundamentally rewired the pace at which we decide who lives and dies.

I've spent years thinking about AI systems and their failure modes. But this is different. This isn't about a chatbot making up facts or a recommendation algorithm showing you weird ads. This is about building systems so fast that human judgment becomes a bottleneck to be eliminated rather than a safeguard to be preserved.

## From Excel to Execution in Seconds

The origin story of Maven is almost mundane. Colonel Drew Cukor was frustrated that intelligence data in Afghanistan lived in PowerPoint slides and Excel spreadsheets. Information wasn't being passed between rotating troops. The US was essentially fighting the same war over and over every six months because institutional memory died on a hard drive somewhere.

His vision was simple: white dots on a map, each one tagged with coordinates, elevation, intelligence data. A living, breathing database that front-line operators could actually use. It's the kind of problem any developer would recognize. You have messy data, no standardization, and users who need information yesterday.

But here's where it gets uncomfortable. The goal wasn't just better information management. Multiple sources in Manson's book confirm that offensive targeting was always part of the plan. When Google employees protested in 2018, the company tried to thread the needle by saying the tech was for "non-offensive uses only." That was, to put it generously, incomplete. As one military operator told Manson: "The goal of the intel is to take out high-value targets."

Google eventually backed out. Microsoft, Amazon, Palantir, and later Anthropic stepped in.

## The Ukraine Inflection Point

Ukraine is where Maven really came into its own. When Russia invaded, the 18th Airborne Corps was in Germany using computer vision on satellite imagery to track Russian positions. The algorithms immediately failed because they'd been trained on Middle Eastern deserts and couldn't recognize tanks in snow.

They retrained the models fast. Really fast. Then they started sending "points of interest" to Ukrainian forces. Not "targets" mind you, because that would make the US a direct participant in the war. Just highly detailed intelligence about Russian equipment and personnel positions that stopped one step short of a formal targeting decision. At peak, the US was passing 267 of these not-quite-targets to Ukraine in a single day.

The linguistic gymnastics here are fascinating in the worst way. A target is something that's gone through a process. A point of interest is everything just shy of that. It's the kind of distinction that makes sense in a legal framework and absolutely nowhere else.

## Six Steps Down to Two

The 18th Airborne Corps used to require humans at six key steps in the targeting process: deciding when and how to shoot, assessing operational approach, assessing collected data, deciding to act, communicating the decision, executing fire, and communicating results.

With Maven's [AI](https://mgks.dev/tags/artificial-intelligence/) integration, they reduced human involvement to just two points: the decision to act and the action itself. Everything else is machine-assessed, machine-communicated, machine-executed. Even the National Geospatial-Intelligence Agency is now producing intelligence reports that no human has touched.

The military's position is that nothing is "automated" because a human still makes the final targeting decision. But when you compress a process that used to take hours or days down to seconds, and you're presenting that human with AI-generated targets from an AI-analyzed database through an AI-enabled interface, how much decision-making is really happening?

This is where the gamification concern comes in. Military ethicists quoted in the book worry that operators will trust the targets they see on screen without understanding the data behind them. And why wouldn't they? The system is fast, it's confident, and it's giving you five thousand target recommendations a day.

## The School That Used to Be a Base

On the first day of strikes against Iran, the US hit over a thousand targets. One of them was a girls' school that killed more than 150 people, mostly children. The school had previously been part of an Iranian naval base. It was listed online as a school. Playgrounds were visible in satellite imagery.

A lot of initial coverage focused on whether Claude, Anthropic's LLM that Central Command was using to speed up processes, had hallucinated incorrect information. But technology historian Kevin Baker wrote in The Guardian that we're looking at the wrong thing. "A chatbot did not kill those children," he wrote. "People failed to update a database, and other people built a system fast enough to make that failure lethal."

This hits at something I keep coming back to as a developer. We're really good at building systems that work fast. We're really bad at building systems that fail safely. And we're catastrophically bad at building systems that stay correct over time when the world changes faster than our databases can keep up.

## The Map That Didn't Update

There's a historical parallel that Manson keeps returning to. In 1999, the US bombed the Chinese Embassy in Belgrade. The post-strike analysis revealed that the embassy had moved recently. One map had been updated. Others hadn't. Someone even tried to make a verification call because something felt wrong, but they couldn't reach anyone in time.

In a world of connected digital systems, that kind of error could be caught instantly. Or it could be propagated instantly. The difference is in how you build the system and what incentives you're optimizing for.

If you're optimizing for speed and you've got commanders excited about hitting five thousand targets a day instead of a hundred, which way do you think that optimization pressure goes?

## The Direction of Travel

There's significant debate inside the US military about how far to lean into this. Some see it as inevitable. Others warn that human assessment at the last minute is what saves lives. But the direction of travel is clear. Maven is becoming a program of record. Central Command commanders are taking time during active operations to post on X about how helpful they're finding AI.

Retired Defense Secretary Jim Mattis has said that targeting is no substitute for strategy, that hitting a lot of things doesn't get you to victory. But Maven isn't being sold as strategy. It's being sold as speed, as efficiency, as finally bringing the US military's intelligence apparatus into the 21st century.

The book also reveals that the military is developing fully autonomous weapons, including an explosive-laden drone Jet Ski capable of targeting and destroying things on its own. Because apparently we looked at the trolley problem and decided the real issue was that the trolley wasn't moving fast enough.

## What We're Really Building

I think a lot about the distinction between tools and systems. A tool extends human capability but remains under human control. A system creates its own logic and incentives that humans then have to navigate.

Maven started as a tool, a way to apply computer vision to drone footage that was going unanalyzed. But it's become a system, one that's reshaping how military operations work, how fast decisions get made, and what role humans play in those decisions.

The thing that keeps me up at night isn't that Claude might hallucinate a target. LLMs are probabilistic; we know they make mistakes. It's that we built infrastructure that moves faster than human judgment, faster than database updates, faster than the verification calls that might have stopped the Belgrade embassy bombing.

We built systems where speed is the feature and where slowing down to check, to verify, to question feels like failure. And we did it with the same tools and same architectural patterns that we use to optimize ad serving and content recommendations.

The technology itself is neutral. Computer vision, LLMs, database systems, these are just tools. But the system we've built around them, the incentives we've encoded, the speed we've prioritized, that's not neutral at all. That's a choice, made by people, enabled by technology companies who decided that military contracts were worth taking even after Google employees said they weren't.

I don't have a clean answer here. I'm not going to tell you that we shouldn't use AI in [military applications](https://mgks.dev/tags/military-tech/) or that all defense tech is inherently unethical. But I do think we need to be honest about what we're building and what breaks when we optimize for speed over everything else. Because the school in Iran wasn't destroyed by a hallucinating chatbot. It was destroyed by a system we built to move faster than we could think, and that might be the most human mistake of all.