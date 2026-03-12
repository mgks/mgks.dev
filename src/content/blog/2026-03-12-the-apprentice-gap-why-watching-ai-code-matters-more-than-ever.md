---
title: "The Apprentice Gap: Why Watching AI Code Matters More Than Ever"
description: "As AI agents automate more development work, we're creating a generation gap where juniors never learn the fundamentals. The ralph loop offers a solution."
date: 2026-03-12 12:00:33 +0530
tags: rollup, architecture, ai-agents, software-development
image: 'https://images.unsplash.com/photo-1675897634504-bf03f1a2a66a?q=80&w=2070'
featured: false
---

I've been thinking a lot about what Renaud Wilsius said about the Apprentice Gap. It's one of those observations that feels obvious the moment you hear it, but somehow nobody was saying it out loud. If we move humans out of the loop too early in their careers, we're going to end up with a generation of developers who can direct [AI](https://mgks.dev/tags/artificial-intelligence/) agents but don't actually understand what they're building.

This isn't just theoretical concern. I'm already seeing it happen.

The junior developers I talk to are getting really good at prompt engineering. They can coax Claude or GPT-4 into generating impressive amounts of code. But when something breaks in a subtle way, when there's a performance issue that doesn't show up in the happy path, when architectural decisions made six months ago start causing problems, they're lost. They never built the intuition that comes from writing thousands of lines of code, debugging production issues at 2am, and learning why certain patterns exist.

## The Ralph Loop Isn't What You Think

There's been a lot of buzz around "the ralph loop" lately, and I keep hearing people describe it as just letting [AI agents](https://mgks.dev/tags/ai-agents/) run autonomously. Set it and forget it. Let the machines do their thing while you go get coffee.

But that's not what the originator of the ralph loop actually meant.

The whole point is to watch the loop. To observe what the agent is doing, see where it fails, understand the failure domains, and then engineer solutions so those failures don't happen again. It's about doing the loop manually via prompting, or with automation that pauses and requires you to hit CTRL+C to progress. You're supposed to be learning from the process.

This distinction matters a lot. Watching the loop is how you avoid accumulating cognitive debt. It's how you maintain enough understanding of what's being built to direct the agent effectively in the future. It's the difference between being a developer who uses AI as a power tool versus someone who's just along for the ride.

## COBOL and the Modernization Fantasy

Anthropic recently wrote about using AI to modernize COBOL systems, and while they're not wrong about AI being useful here, the framing reveals a common misconception. People keep treating modernization as a translation problem. Just convert COBOL to Java, right?

Wrong.

A system is not just its source code. When you do a direct translation, you're faithfully reproducing all the architectural constraints, all the accumulated technical debt, all the outdated design decisions. You're taking 40 years of bad choices and restating them in a different language.

Real modernization is about aligning systems with current market demands and infrastructure paradigms. It's about understanding why the system exists, what business value it provides, and how it should work in a modern context. Even if AI could do perfectly reliable code translation (which it can't), blind conversion would just give you the same problems in a new syntax.

This is exactly the kind of thing you only understand if you've been in the loop. If you've debugged legacy systems, dealt with production issues, and felt the pain of technical debt firsthand.

## The Corporate Fine That Should Have Been Lethal

Speaking of things that only matter with context, there was a story about a tech firm getting fined $1.1 million for selling high school students' data. The coverage was predictably bad. No comparison to the company's revenue or profits. No mention that their last known valuation was $11 million back in 2017.

This drives me crazy. A $1.1 million fine against a company potentially worth $11 million should be existential. It should be a death sentence. Instead, corporations treat fines as a cost of doing business because, most of the time, they are.

We need fines that scale with the offense and the company's ability to pay. A million dollars should mean something different to a startup than to a trillion-dollar tech giant. Until we get there, we'll keep seeing companies make the calculation that breaking the law is profitable.

## Leaning Against Your Nature

Charity Majors gave a keynote at SRECon encouraging people to engage with generative AI, and one thing she said stuck with me: know your nature, and lean against it.

This is good advice for dealing with AI in general. If you're skeptical by nature, force yourself to experiment more. If you're an early adopter who jumps on every new technology, make yourself slow down and think critically about what you're actually getting.

I'm naturally suspicious of hype, so I've been forcing myself to use AI tools more seriously. To really try them, not just dismiss them. And I've found they're genuinely useful for certain tasks, while being completely unsuitable for others. But I wouldn't have learned that by following my instincts.

The Apprentice Gap is real, but it's not inevitable. We can have junior developers learn in an AI-assisted world, we just need to be intentional about it. Make them watch the loop. Make them understand what's happening. Give them the experience that builds intuition, even if the tools are different than what we used.

Because someone who never learned to code without AI might be able to direct agents effectively for a while, but they won't have the judgment to know when the agents are leading them astray.