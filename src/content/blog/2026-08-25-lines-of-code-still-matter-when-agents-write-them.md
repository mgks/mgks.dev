---
title: "Lines of Code Still Matter When Agents Write Them"
description: "Why measuring productivity by lines of code makes sense with AI coding agents, and the real challenge isn't speed but maintaining conceptual integrity as code grows cheaper to write."
date: 2026-08-25 12:00:50 +0530
tags: rollup, engineering, ai-agents, software-engineering, productivity
image: "https://images.unsplash.com/photo-1747920523600-bd6a3d064f4d?q=80&w=2070"
featured: false
---

I recently had a fascinating conversation with Claire Giordano on the Talking Postgres podcast about how AI is reshaping software development. One thread we kept circling back to was something counterintuitive: lines of code as a productivity metric actually makes sense now, but not the way anyone expected.

The conventional wisdom is that measuring productivity in lines of code is meaningless. Fewer lines are better lines, we tell ourselves. But there's a hard constraint that changes this calculation. Before AI agents, a skilled software engineer produced maybe 200 lines of production-ready, debugged, tested code on a really good day. Most days? 50 or 60 lines. That's the historical baseline.

If an agent lets you produce a thousand lines of similarly debugged, maintainable, tested code, that's a genuinely meaningful improvement. Not because lines of code are inherently valuable, but because you've fundamentally altered the human bottleneck. The constraint used to be "how much can one person write?". Now it's something much harder: "how much can one person think about?"

## The Cognitive Capacity Problem

This creates an interesting paradox. I can accomplish in a week what used to take me a quarter. So why does any company need more than one engineer?

The bus factor is obvious, but there's something deeper. The new limiting factor isn't code generation. It's cognitive load. I can churn out code a hundred times faster, but I don't have a hundred times the mental capacity to stay on top of that codebase. A team of one isn't a badly designed team because of redundancy; it's badly designed because humans have finite attention spans.

This reframes how we think about engineering teams entirely. We're not just hedging risk anymore. We're load-balancing cognitive capacity across multiple brains, each one capable of operating at superhuman code-generation speeds. That changes hiring, team structure, and what "senior" actually means in an AI-assisted world.

## The Winchester Mystery House Problem

But there's a darker side to cheap code. Fred Brooks wrote about conceptual integrity in The Mythical Man-Month: well-designed software has a coherent shape to it. Everything fits together. There are no weird surprises. It covers exactly the right domain and nothing else.

Coding agents make this brutally hard.

Imagine you have an idea for a feature. You prompt your agent. Five minutes later, you have it. The friction that used to force you to think critically - "is this worth a week of my time?" - evaporates. And so does your software's structural integrity. You end up with what I can only call the Winchester Mystery House of codebases: 140 rooms added randomly over 40 years, each one built whenever someone had a whim and a widow's inheritance of capital.

Claire's analogy was perfect. The psychic told the widow of the Winchester rifle's inventor that she'd be haunted unless she kept building forever. She did, for 40 years, and ended up with architectural chaos. That's exactly what happens when the cost of adding a feature drops from "a week of my time" to "an hour." Suddenly you can justify all the weird tangential rooms.

The problem isn't the speed. It's that we externalized the discipline. We used to make hard architectural choices because implementation was expensive. Now we need to make those choices explicitly, through other mechanisms: code review, design documents, architectural patterns. The constraint that kept us honest is gone.

## Discipline is the Real Skill

This is what separates senior engineers from everyone else in an AI-assisted world. A junior engineer with an agent is faster, but they'll build a Winchester Mystery House. A senior engineer with an agent might be equally fast, but they'll build a cathedral: intentional, coherent, elegant.

The skill isn't anymore "can you write code quickly?" Agents have democratized that. The skill is "can you make good architectural decisions under pressure, when the friction is gone, when you could add that feature in five minutes instead of five days?"

We're moving into a world where lines of code is a meaningful productivity metric precisely because it's so cheap to generate them. And that means we need to get serious about the discipline of software design, or we'll all be lost in Winchester Mystery Houses of our own making.