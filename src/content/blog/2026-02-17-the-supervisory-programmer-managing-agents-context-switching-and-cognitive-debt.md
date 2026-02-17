---
title: "The Supervisory Programmer: Managing Agents, Context Switching, and Cognitive Debt"
description: "Senior devs thrive with LLMs while mid-level careers face challenges. But can we really manage multiple AI agents without burning out?"
date: 2026-02-17 12:00:57 +0530
tags: rollup, architecture, artificial-intelligence, software-development, developer-experience
image: 'https://images.unsplash.com/photo-1534998158219-e4b687b062c4?q=80&w=1674'
featured: false
---

I've been digging through my notes from the Thoughtworks Future of Software Development Retreat, and there's this recurring theme that keeps nagging at me. We're all starting to realize that the future of programming might look less like writing code and more like managing a team of tireless [artificial intelligence](https://mgks.dev/tags/artificial-intelligence/) agents. But here's the thing nobody's talking about enough: are we really prepared for what that actually means day to day?

The conventional wisdom says senior developers will be fine. We'll float up to the architectural level, letting the LLMs handle the messy syntax details while we focus on the big picture. And honestly, there's some truth to that. One attendee shared this fascinating story about senior developers who were completely resistant to LLMs until they were forced into a hands-on exercise. A third of them converted immediately. The rest probably just had opinions that were, as someone quipped, "so January."

But it's the junior and mid-level developers where things get interesting, and not necessarily in a good way.

## The Career Ladder Gets Weird

Junior developers might actually be okay. They're already used to asking dumb questions and having mentors correct them constantly. Swap out a human mentor for an AI one, and the dynamic isn't that different. Sure, they need to maintain some skepticism, but they should be skeptical of human mentors too. Not all of us are as brilliant as we like to think we are.

The real squeeze is on mid-level developers. They formed their careers without LLMs. They know how to code, they understand patterns, but they haven't reached that senior level where they can effectively drive and orchestrate AI agents. They're stuck in this weird middle ground where the skills they spent years developing might be less valuable than they thought.

I've seen this play out in my own work. The developers who struggle most with [AI tools](https://mgks.dev/tags/artificial-intelligence/) aren't the beginners or the experts. It's the people in the middle who have muscle memory for certain coding patterns but haven't yet developed the judgment to know when to let the AI run and when to grab the wheel.

## Cognitive Debt vs Technical Debt

Margaret-Anne Storey wrote about cognitive debt, and it's worth unpacking because I think we're conflating two different problems here. There's this great example from an entrepreneurship course where a student team hit a wall by week 7 or 8. They blamed technical debt, messy code, poor architecture. But the real problem was simpler and worse: nobody could explain why design decisions were made or how the system worked together.

That's not technical debt. That's ignorance.

Technical debt is when you know the code is messy but you're choosing to live with it because refactoring would cost more than the pain of working around it. Cognitive debt is when you don't even know what you don't know anymore. The cost of that ignorance compounds every time you need to add a feature or fix a bug.

Here's where it gets interesting with LLMs. The debt metaphor still applies, but now it applies to both humans and the AI. Either we pay the interest by making every change harder, or we pay down the principal by explicitly investing in gaining knowledge. And LLMs suffer from the same problem. They work better with clean, well-documented, modular code. The Genie's "galaxy brain" might theoretically comprehend a confusing codebase, but there's growing evidence that good naming and clear structure helps transformers just like it helps our squishy neural networks.

## Developer Experience Becomes Agent Experience

Laura Tacho made this observation that stung a bit: "The Venn Diagram of Developer Experience and [Agent Experience](https://mgks.dev/tags/developer-experience/) is a circle."

Everything we've been advocating for years to improve developer experience also helps LLMs work better. Smooth tooling, clear environment documentation, good modularity. Management is finally paying attention to these things, but only because it helps the robots work faster. They wouldn't do it for the humans.

That's depressing, but also pragmatic. If executive interest in AI productivity finally funds the developer experience improvements we've been begging for, I'll take it.

## The IDE Isn't Dead, Just Different

IDEs need to evolve, but they're not going away. There are tasks where you absolutely don't want to use an LLM. Renaming a function with an AI is like using a sledgehammer to hang a picture. It's wasteful and imprecise.

But imagine this workflow: you want to change "person" to "contact" throughout your domain. It appears in function names, field names, documentation, test cases. A simple find and replace won't cut it. Instead of having the LLM operate on the entire codebase, the LLM uses the IDE's refactoring capabilities, orchestrating the deterministic tools to make surgical changes. Analysis shows that renames tend to happen in clusters anyway, so this would actually be useful.

The future IDE becomes a smart conductor, helping you choose when to use AI, when to use traditional tools, and when to choreograph both together.

## Two Pizza Teams and Pair Programming

Someone asked whether two-pizza teams would shrink to one-pizza teams because LLMs don't eat pizza. I don't think so. There's something about that team size that balances collaboration benefits against coordination costs. We'll probably keep the same team sizes but accomplish much more.

But here's a question that came up during a panel with Gergely Orosz and Kent Beck: what happens to pair programming? The common assumption is one programmer driving multiple LLM agents. But what if two humans paired to drive a bunch of agents together? You'd combine the benefits of human collaboration with the code generation power of AI.

That feels right to me, but nobody's really tried it systematically yet.

## The Hidden Cost of Supervision

There's this Harvard Business Review study that should scare everyone. Researchers watched a tech company adopt generative AI over eight months. Employees worked faster, took on broader tasks, extended work into more hours of the day. Sounds great, right?

Except once the excitement faded, people realized their workload had quietly exploded. They were juggling too much. Cognitive fatigue set in. Decision-making got worse. The productivity surge gave way to lower quality work and burnout.

And here's the kicker I didn't fully appreciate until recently: when you become a "supervisory programmer" managing multiple AI agents, you're not just coding anymore. You're context switching constantly. You're keeping many tasks going at once. You know what job description that sounds like? Being a manager. And that's one of the hardest parts of management: the mental fatigue of context switching.

We're all about to experience what managers deal with, whether we wanted to or not.

## What Makes Effective Supervisory Programming?

The shift is coming. Programmers will move from engaging directly with code to supervising agents. But we'll still be accountable for what those agents produce. That's not changing.

The open question is whether all that context switching will undermine our effectiveness. Can you really drive five or ten agents productively, or will the overhead of switching between them eat all your gains?

I suspect we'll see practices emerge that try to harvest the parallelism of agents while minimizing context switching. Maybe that means batching similar tasks. Maybe it means pairing humans to share the supervisory load. Maybe it means something we haven't thought of yet.

What I do know is that over the next few months, we're going to see a lot of experimentation with workflows for supervisory programming, and not all of it is going to work, and the industry is going to have to learn the hard way what the actual human costs are when everyone becomes a manager of digital labor.