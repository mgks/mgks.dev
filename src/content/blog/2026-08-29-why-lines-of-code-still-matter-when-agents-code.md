---
title: "Why Lines of Code Still Matter When Agents Code"
description: "Coding agents are changing productivity metrics. I argue lines of code remains meaningful when measuring agent output - if the quality stays high."
date: 2026-08-29 06:00:51 +0530
tags: rollup, engineering, ai-coding, productivity, agents
image: "https://images.unsplash.com/photo-1765707886613-f4961bbd07dd?q=80&w=988"
featured: false
---

Last week I recorded an episode of the Talking Postgres podcast with Claire Giordano discussing how AI is reshaping software development. We covered a lot of ground, but two ideas stuck with me: one about measuring productivity with coding agents, and another about how easy it is to build architectural chaos when the cost of shipping features collapses.

I've spent months building an argument around lines of code as a productivity metric, and I think I finally got it right on tape. The conventional wisdom says measuring productivity by lines of code is meaningless. Most of us learned this in computer science 101: LOC is a terrible metric because code quality matters infinitely more than quantity.

But I'd actually push back on that, especially in the context of AI agents. Here's why: there's a hard physical limit to what humans can produce. In the pre-agent era, a software engineer producing 200 lines of debugged, production-ready code in a day was having an incredibly good day. Most days you'd ship 50 or 60 lines. That's just the reality of careful software engineering.

If agents let you produce a thousand lines of debugged code per day, maintaining the same quality standards (maintainability, test coverage, architectural sensibility), that really does represent a meaningful improvement. The catch is massive: you need serious skill and knowledge to maintain that quality bar. That's what separates senior engineers from everyone else.

## The New Bottleneck Isn't Code Output

This creates an interesting paradox. As a single engineer, I can now accomplish perhaps 100 times more work than I could without agents. So why would any company need more than one engineer? Beyond the obvious bus factor risk, the answer is cognitive capacity.

I can churn out code a hundred times faster. I absolutely cannot maintain cognitive oversight of a hundred times the amount of code. The bottleneck shifted. It used to be my hands and my ability to type. Now it's my brain's capacity to understand, reason about, and make decisions across a vastly larger codebase.

This is why teams remain essential even in an agent-assisted world. You need to distribute cognitive load across multiple engineers so someone can actually comprehend what's happening in different parts of the system. Load balancing cognitive capacity is the real work now.

## The Winchester Mystery House Problem

Claire made a brilliant connection during our conversation: the Winchester Mystery House. For those unfamiliar, it's a mansion with 140 rooms built over 40 years where construction never stopped. Each phase added new rooms in different directions, resulting in architectural chaos - stairways that go nowhere, doors opening into walls, no coherent design.

This is exactly what happens with coding agents and software architecture. Fred Brooks wrote about conceptual integrity in The Mythical Man-Month: well-designed software has an integrity to it, with no surprises, covering exactly the right domain, everything fitting together sensibly.

Coding agents make this exponentially harder. You can have an idea for a feature, run a prompt, and five minutes later you've got it shipped. Your software starts growing weird bumps in different directions because the cost of adding new rooms has collapsed. What used to be a week-long effort requiring serious justification now takes an hour.

## Discipline Becomes Structural

The real issue is that constraint used to enforce discipline. You'd think up a crazy feature request and consider "that would take me a week, I can't justify that time" and let it go. When implementation takes an hour, justification becomes trivial. The feature probably ships.

This is where senior engineers earn their keep in the AI era. It's not about writing code anymore. It's about saying no to features that don't fit the architectural vision. It's about maintaining conceptual integrity as a deliberate choice, not as something enforced by the tyranny of implementation time. That discipline has to come from somewhere - now it comes from human judgment, not from physics.

The tools are incredible. But they've fundamentally changed what software engineering leadership looks like. The constraint moved from your hands to your judgment. And that's a much harder problem to solve.