---
title: "Permission Hungry Agents and the Return to First Principles"
description: "ThoughtWorks' latest radar reveals AI isn't just pushing us forward, it's forcing us back to fundamentals like clean code and security basics."
date: 2026-04-26 12:00:56 +0530
tags: rollup, architecture, artificial-intelligence, security
image: 'https://images.unsplash.com/photo-1534998158219-e4b687b062c4?q=80&w=1674'
featured: false
---

ThoughtWorks dropped their 34th Technology Radar last week, and if you're looking for a sign that [artificial intelligence](https://mgks.dev/tags/artificial-intelligence/) has completely reshuffled the deck, this is it. What struck me wasn't just the dominance of AI topics, which we'd expect at this point. It was something more interesting: we're being forced to look backwards while racing forward.

The radar team noticed this too. As they assembled the 118 blips covering tools, techniques, platforms, and languages, they kept circling back to established practices. Pair programming. Zero trust architecture. Mutation testing. DORA metrics. Clean code. These aren't new ideas someone dusted off for nostalgia's sake. They're necessary counterweights to the chaos that AI tools can generate at breathtaking speed.

I've felt this tension in my own work. When you can spin up thousands of lines of code in minutes, the old disciplines matter more, not less. The complexity doesn't disappear just because you didn't type it yourself.

## The Permission Problem

The radar introduces a term I haven't heard before but immediately recognized: "permission hungry" agents. It's describing the bind we're all feeling right now. The agents worth building are exactly the ones that need access to everything. They need your private data, external communication channels, real systems. They argue that the payoff justifies it.

The metaphor they use is perfect: it's like a skier who just learned to turn confidently pointing themselves at the hardest black diamond run. The safeguards haven't caught up with the ambition.

Prompt injection alone means these models still can't reliably tell the difference between trusted instructions and untrusted input. Yet we're giving them the keys to the kingdom because the promise is too compelling to ignore. Jim Gumbley joining the radar writing team is timely. We need serious security thinking here, not hand-waving about "being careful."

This is why so many of the radar's blips focus on what Birgitta calls Harness Engineering. You need guides and sensors and fail-safes when you're moving this fast with this little certainty. The radar team expects that list to grow significantly by the next edition in six months. I expect they're right.

## When Developers Stop Reading Code

Mike Mason wrote something that gave me chills this week. He describes watching Claude produce a working Python codebase, unit tests passing, managing complex infrastructure. Around 100KB of total code, the main file had ballooned to 50KB and 2,000 lines. Then Claude started using sed to find and modify code within that file.

That was his alarm bell. Mine too, just reading about it.

He makes a point that cuts through all the hype: both things are true about AI-generated code. There is good architecture in there, and there is also an incomprehensible mess. You don't get to know which is which without reading the code.

His rough framework makes sense to me. Throw-away analysis scripts? Fine, vibe away with the AI. Tooling you need to maintain, durable code that matters? That needs regular human review. Even if the review is just a human asking a model to evaluate the code with hints about what good looks like.

The frustrating part is that the models know better. Mason noticed that the moment you say "I'm getting uncomfortable with how big this is getting, can we do something better?" it does the right thing. Sensible decomposition, new classes, sometimes even unit tests for the new thing. It knew. It just didn't volunteer it.

This feels like a design decision someone made somewhere. Make it easy and fast by default, require humans to ask for quality. I understand why, but I don't love the incentives it creates.

## The Command Line's Revenge

Here's something I didn't see coming: after years of abstracting away the command line in the name of usability, agentic tools are bringing developers back to the terminal as a primary interface. The radar team noticed this resurgence too.

It makes sense when you think about it. Text-based interfaces are what [large language models](https://mgks.dev/tags/large-language-models/) understand best. GUIs are hard to describe, hard to manipulate programmatically, full of state that's difficult to capture. The terminal is explicit, composable, scriptable.

We spent a decade building elaborate abstractions to make development more accessible. Now we're peeling some of that back because our AI assistants work better with the raw interfaces underneath. There's an irony there I'm still processing.

## The Deceptive Complexity of Simple Changes

Don Moynihan's essay on DirectFile isn't just about a failed government program. It's about a paradox that anyone working in large organizations will recognize immediately: the simpler a potential change appears, the more likely it has deceptive complexity that others have tried and failed to resolve.

DOGE dismantled DirectFile during their brief rampage through government services. DirectFile was a program that let people file taxes online directly with the government, bypassing the tax preparation industry. It worked. People used it. It saved them money.

But it's gone now, along with 25% of IRS staff. The IRS budget is 40% below what it was in 2010. We hate tax collectors, I get it. But this isn't actually good. An efficient tax system is critical infrastructure. Historians point to Britain's tax collection efficiency as a major reason they won their century-long struggle with France. France's broken tax system helped spark their revolution.

The people who worked on DirectFile drew a sharp contrast with DOGE's approach. One told Moynihan: "if you do not think government has a responsibility to serve people, I think it draws into question how good are you going to be at making government work better for people if you just don't believe in that underlying principle."

That hits on something important about [technology](https://mgks.dev/tags/technology/) work in general. If you don't believe in the mission, if you don't care about the users, you'll make different decisions. Faster isn't always better. Cheaper isn't always smarter. Simple isn't always possible.

The lesson extends beyond government. Every large organization has its DirectFiles, its deceptively simple problems that resist easy solutions because they're embedded in complex systems built over decades. The attitude you bring to that complexity matters more than the tools you use to address it.

We're in this weird moment where AI gives us unprecedented power to generate complexity quickly, while simultaneously exposing how much we've forgotten about managing that complexity once it exists.