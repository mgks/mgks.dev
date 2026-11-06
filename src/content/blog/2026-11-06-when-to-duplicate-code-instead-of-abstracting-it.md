---
title: "When to Duplicate Code Instead of Abstracting It"
description: "Premature abstraction costs more than duplication. Learn when to copy-paste and when to refactor using the rule of three."
date: 2026-11-06 06:00:20 +0530
tags: rollup, software-engineering, abstraction, refactoring, code-design
image: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?q=80&w=2070"
featured: false
---

Everyone in frontend development hears the same advice: make things reusable. Find similar screens, abstract the component, delete the duplicate code, feel virtuous. But I've learned that this conventional wisdom needs a hard asterisk next to it.

The problem with premature abstraction isn't just that it takes more time to code. It creates coordination overhead that compounds with every new requirement. And here's what most developers don't realize until it's too late: a wrong abstraction is exponentially more expensive to undo than the duplication it replaced.

I learned this the hard way years ago when I combined three different workflows into a single "item action" component. On the surface, they looked identical. Item list, select, confirm, results. Same tables, popups, toasts. Creating three separate implementations felt wasteful.

But I didn't understand the differences yet, because those differences hadn't revealed themselves. Approval was a bet about the future ("I will need this"). Modification happened instantly. Relocation required another system's acceptance, and that system could reject it. Partial failure handling, audit requirements, and information gathering needs were completely different.

The component started simple. Then it became a mess of flags and conditional logic. Each new requirement came with justification for why "this particular component" couldn't be changed. Every change needed approval from three workflow owners, a reviewer who understood all modes, and test cases covering every combination. A small tweak to the confirmation flow became a negotiation.

## The Cost of Coordination

This is what people don't talk about when they push abstraction. Yes, you delete 200 lines of code. But you've also created a new person: the abstraction owner. Now changes require consensus. The diff that feels like a win becomes a bottleneck.

The reason this happens is that abstraction based on current similarity can't predict future differences. Those differences will arrive as new policies, audit findings, or integrations that behave unexpectedly. When they do, the abstraction becomes a pile of flags and special cases.

My approach now is different. I wait. Not forever, but for the pattern to repeat three times for the same reason. This principle, attributed to Don Roberts in Martin Fowler's "Refactoring," makes sense: the first time you duplicate code, you just do it. The second time you wince but still do it. The third time, you refactor.

Sandi Metz made this concrete in "The Wrong Abstraction," arguing that duplication is far cheaper than the wrong abstraction. Kent C. Dodds called it AHA programming: Avoid Hasty Abstractions.

## The Real Test

But how do you know which abstractions are worth making immediately? I use three criteria.

First: is the shape determined somewhere external to my speculation? A date formatter deserves extraction because the format requirement comes from somewhere outside my code, not from my guess about what "might" be needed.

Second: does it have a single reason to change? Submit buttons might look identical, but if they're owned by different people making different decisions, combining them creates false dependencies.

Third: is it actually a primitive or utility, not a domain component? This is where the props test matters. Read the prop list. If props describe what to render (children, size, tone), the abstraction is probably fine. If props describe the situation (mode, variant, isSpecial), you've probably combined unrelated things.

My real test is simpler: "In case of change, who would I consult, and would all copies change simultaneously?" If the answer varies by copy, you're dealing with coincidence, not duplication.

When you do discover that pattern repeating three times, here's what I do now: inline the abstraction back into each call site. Copy the code to each workflow. Remove branches that workflow never takes. The code is now short and understandable. Workflows can change independently.

Then separate code by workflow, not layout. Once they stabilize, extract only the small pieces that genuinely share reasons for change. The table, the date formatter, the accessibility utilities. Small, focused, low-coordination extractions.

This approach feels slower at first. You're not deleting code immediately. But you're solving the real problem: you're keeping change authority distributed until the pattern proves itself.

The question I'd ask you is the one I ask myself: what piece of code are people dancing around in your codebase, and what special flag are you maintaining for that particular caller?