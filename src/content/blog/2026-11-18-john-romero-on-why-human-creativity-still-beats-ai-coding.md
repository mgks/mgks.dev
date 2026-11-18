---
title: "John Romero on Why Human Creativity Still Beats AI Coding"
description: "Legendary game developer John Romero explains the clever hacks behind Doom's modding architecture and why raw problem-solving beats AI agents."
date: 2026-11-18 18:00:20 +0530
tags: rollup, software-engineering, game-dev, ai-coding
image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2070"
featured: false
---

I recently caught John Romero's talk at WeAreDevelopers 2026, and it hit me harder than I expected. Here's a developer who fundamentally shaped how we build software, talking about techniques from the 1990s that feel more relevant today than ever.

Romero walked through the technical innovations that made Wolfenstein run like a dream on machines with kilobytes of RAM. The self-modifying code, the blitting techniques, the obsessive optimization. But what fascinated me wasn't the nostalgia. It was how those constraints forced *creative thinking* in a way modern development rarely demands.

## Constraints as Creative Fuel

When you have 640KB of memory and a processor that can barely breathe, you don't just write code. You sculpt it. You make decisions about every byte. Romero talked about how this discipline bred problem-solvers, not feature-factories.

That's the inverse of what I see happening now. We throw more resources at problems. We add layers of abstraction. We let frameworks solve problems for us. And I'm not saying that's bad, but it's a different kind of thinking.

When Romero designed Doom's architecture, he built something that *anticipated player creativity*. The WAD file format wasn't just clever engineering, it was architecture for extensibility. It said: "We're building the foundation, but you're going to build the city." That decision turned Doom from a great game into a cultural phenomenon. The modding community didn't just play Doom, they remixed it, reimagined it, built entirely new games inside it.

## Why Modding Architecture Matters for Modern Development

I think about this a lot when I look at modern APIs and plugin systems. Most of them are designed by committee, with every edge case accounted for. They're comprehensive but rigid. What Romero did was different: he designed for unknowns. He created a system flexible enough that people could do things he never anticipated.

That's the lesson that applies to anyone building platforms or libraries today. You can't predict every use case. You can't anticipate every hack someone will attempt. But if you design for extensibility at the core, you create space for innovation.

I've written about [AI coding agents](https://mgks.dev/tags/ai-coding/) before, and this conversation reinforced something I've been thinking: AI excels at filling in known patterns. It's fantastic at generating boilerplate, finding optimizations, automating the mechanical parts of coding. But the moment you step into genuine creative problem-solving, into designing architectures that enable unexpected uses, that's still human territory.

Romero made this point directly: Quake's development proved that raw creative problem-solving beats AI every time. Quake wasn't built by following best practices or existing patterns. It was built by people asking fundamentally different questions about how games could work. Those questions came from human intuition, frustration, and vision.

## The Open Source Parallel

There's a line connecting Doom's mod-friendly design to the entire open source movement. When you design software for modification, you're not just enabling features, you're distributing creative authority. You're saying the problem doesn't end when you ship version 1.0.

I think about [software-engineering](https://mgks.dev/tags/software-engineering/) philosophy here. The best systems I've worked with aren't the most complete or polished. They're the ones that acknowledge their own limitations and invite collaboration to overcome them.

We've swung hard into an era of closed platforms and managed services. Not everywhere, but everywhere enough. You use a framework, it's largely a black box. You use a hosted service, you're locked into their API design. There's convenience there, but there's also a cost: the reduction of creative agency for developers further down the chain.

What would software development look like if we applied Romero's philosophy more deliberately? Not building complete systems, but building foundations. Not anticipating every need, but creating clear extension points.

I don't have an answer, but I know this: the developers who shaped the digital landscape in the 90s did it not by building bigger systems, but by building smarter constraints. They understood that limitations force innovation. That permission structures matter. That sharing creative authority with your users or developers or modders creates something none of you could build alone.

Maybe the real question isn't whether AI will replace developers, but whether we'll keep building systems that assume we already know the answers.