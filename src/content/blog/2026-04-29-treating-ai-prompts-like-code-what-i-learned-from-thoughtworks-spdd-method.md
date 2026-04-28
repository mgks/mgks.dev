---
title: "Treating AI Prompts Like Code: What I Learned From Thoughtworks' SPDD Method"
description: "Thoughtworks turned AI coding assistants into team assets with Structured Prompt-Driven Development. Here's why versioned prompts might matter more than speed."
date: 2026-04-29 00:00:56 +0530
tags: rollup, architecture, artificial-intelligence, software-development, prompts
image: 'https://images.unsplash.com/photo-1675897634504-bf03f1a2a66a?q=80&w=2070'
featured: false
---

I've been watching teams adopt AI coding assistants for the past year, and there's a pattern I keep seeing. Individual developers get faster. PRs land quicker. Everyone feels productive. Then three months later, the codebase is a mess and nobody can explain why half the logic works the way it does.

Thoughtworks' internal IT team ran into this exact problem and came up with something interesting: Structured Prompt-Driven Development (SPDD). The core idea is absurdly simple. Treat your prompts like first-class artifacts. Version them. Review them. Make them the source of truth instead of the code.

This feels backwards at first. We've spent decades teaching developers that code is the single source of truth. Now we're saying the prompt matters more? But the logic makes sense when you think about how [AI](https://mgks.dev/tags/artificial-intelligence/) actually works in a team setting.

## The Ferrari on Muddy Roads Problem

When you give a developer an AI assistant, their typing speed goes through the roof. They can draft entire modules in minutes. Refactoring becomes trivial. But delivery speed didn't suddenly 10x, did it?

That's because typing was never the bottleneck. The bottleneck is alignment. Understanding what to build. Reviewing what got built. Explaining to the next developer why you made certain choices. All that collaboration tax that makes software development a team sport instead of a typing competition.

Thoughtworks calls this the Ferrari on muddy roads metaphor. Your engine got more powerful, but you're still stuck in traffic. The road conditions didn't improve just because your car did.

SPDD tries to fix the road, not the car. It does this through something called the REASONS Canvas, which is a structured format for prompts that forces you to think through seven dimensions before generating any code: Requirements, Entity model, Approach, System structure, Operations, Norms, and Safeguards.

The workflow looks like this. Product owner writes a user story. Developer runs it through `/spdd-analysis` to extract domain concepts and risks. Then `/spdd-prompt` generates a complete REASONS Canvas that includes the domain model, the solution approach, the task breakdown, and all the constraints. Only after that document gets reviewed and committed do you run `/spdd-generate` to produce actual code.

## Why This Isn't Just Spec-Driven Development

If you've been around long enough, you're thinking this sounds like spec-driven development with extra steps. Write the spec first, then implement. We've tried this before and it didn't stick because specs drift the moment you touch the code.

SPDD's twist is the closed loop. When you find a bug, you fix the prompt first, then regenerate the code. When you refactor, you sync the changes back to the prompt using `/spdd-sync`. The prompt stays current because the workflow forces it to.

This is the part that makes it work as a team practice instead of individual discipline. Your structured prompt becomes a living design document that accumulates domain knowledge over time. The next person working on the feature doesn't have to reverse-engineer your intent from code and commit messages. They read the prompt.

I tried this on a small project last month. Added a new billing feature using their example workflow. The prompt generation took longer than I expected because the AI kept asking clarifying questions through the REASONS Canvas structure. What models exist? What are we NOT building? What are the acceptance criteria? But once that prompt was locked in, code generation was eerily smooth.

## The Three Skills That Actually Matter

The Thoughtworks team identified three core skills developers need to make SPDD work, and honestly, these are the skills that separate good developers from great ones regardless of AI.

First is alignment. You need to be crystal clear about what you're building before you build it. This sounds obvious but watch how most teams work. They start coding with a vague sense of direction and figure it out as they go. That worked when the feedback loop was slow enough to course-correct. With AI generating code at speed, unclear requirements amplify into large-scale rework.

Second is abstraction-first thinking. You need to know what objects exist, how they collaborate, and where the boundaries are before implementation. Without that, the AI generates fast code with broken architecture. I've seen this wreck codebases. The individual functions look fine but the system design is spaghetti because nobody thought through the object model first.

Third is iterative review. You can't treat AI output as a one-shot draft. You need a disciplined loop: generate, review, refine the prompt, regenerate. Most developers skip this because it feels like extra work. But without it, you either accumulate technical debt at AI speed or you restart from scratch repeatedly and blow your budget.

These skills aren't new. They're the same skills we've always valued in senior [software developers](https://mgks.dev/tags/software-development/). SPDD just makes them mandatory instead of optional.

## When This Makes Sense and When It Doesn't

The Thoughtworks article includes a rating table for different scenarios, and I appreciate the honesty. SPDD isn't always worth it.

Five star scenarios: complex business logic, systems with heavy rules, projects where long-term maintainability matters more than speed to market. If you're building financial systems or healthcare platforms, this approach pays off immediately.

One star scenarios: prototypes, UI-heavy work driven by aesthetic judgment, anything where the requirements are genuinely uncertain. If you're doing rapid experimentation or design exploration, the SPDD overhead kills your velocity without giving you much back.

Most projects fall somewhere in the middle. My take is this. If you're working solo on something disposable, skip it. If you're working in a team on something that will live for years, the upfront investment is worth it because versioned prompts become your institutional memory.

The thing nobody talks about is the skill floor. Right now, SPDD requires senior-level judgment about abstractions and domain modeling. The Thoughtworks team acknowledges this. They're working on making it more accessible through reusable prompt libraries and better tooling, but today it's still a method for people who already know how to design software.

## The Tooling Is Real

They built a CLI tool called [openspdd](https://github.com/tw-yjzhang/openspdd) that implements this workflow. I installed it and walked through their billing engine enhancement example. The commands are straightforward: `/spdd-story` to break down requirements, `/spdd-analysis` to extract domain concepts, `/spdd-prompt` to generate the canvas, `/spdd-generate` to produce code.

What surprised me is how much the tool enforces discipline. You can't skip steps. You can't generate code without a reviewed prompt. It's opinionated in a way that most AI tools aren't, and that's probably why it works.

The example they walk through is enhancing a billing system to support multiple subscription plans. They show the entire loop: writing the story, analyzing it, generating the structured prompt, reviewing it, generating code, finding a logic bug, fixing the prompt first, regenerating, refactoring for code quality, syncing back to the prompt. The full cycle.

It's tedious to read through but that's the point. Software development is tedious. SPDD doesn't make it faster in clock time. It makes it more predictable and governable.

## What This Means for How We Work

If this approach spreads, and I think parts of it will, it changes what we value in developers. Less emphasis on typing speed or memorizing syntax. More emphasis on problem decomposition, domain modeling, and maintaining a tight feedback loop between intent and implementation.

The prompt becomes your real work product. The code is just the compiled output. That's a weird mental shift for people who grew up thinking code was the craft.

It also changes code review. Instead of hunting for bugs in diffs, you're reviewing whether the structured prompt captures the right intent. Does the domain model make sense? Are the constraints correct? Is the task breakdown logical? You're reviewing the specification, and trusting that code generated from a good spec will be good code.

I'm not fully sold on that last part. Generated code can still have subtle bugs even from a perfect prompt. But I do think prompt review catches different classes of problems earlier than code review does. Architectural mistakes. Scope creep. Misaligned assumptions. The expensive stuff.

The teams that figure out how to operationalize this at scale, not just for greenfield projects but for maintaining existing systems, are going to have a real advantage. Because right now most organizations are treating AI coding assistants as personal productivity tools, and that's leaving all the collaboration value on the table.

The question isn't whether AI can generate code faster. It's whether we can build systems that let teams harness that speed without losing their ability to understand, govern, and evolve what they're building.