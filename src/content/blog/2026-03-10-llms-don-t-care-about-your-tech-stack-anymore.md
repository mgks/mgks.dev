---
title: "LLMs Don't Care About Your Tech Stack Anymore"
description: "Modern coding agents work surprisingly well with new and obscure tools. The fear that AI would lock us into boring, popular tech seems outdated."
date: 2026-03-10 00:00:34 +0530
tags: rollup, engineering, artificial-intelligence, llm
image: 'https://images.unsplash.com/photo-1534998158219-e4b687b062c4?q=1674&w=1674'
featured: false
---

I've been worried about something for the past couple of years. Actually, a lot of us have been worried about it. The concern was pretty straightforward: as we lean more heavily on [artificial intelligence](https://mgks.dev/tags/artificial-intelligence/) for coding, would we all end up locked into the same boring technology choices? Python, JavaScript, React, the usual suspects. The tools that flooded the training data.

It made sense as a worry. Early [LLM](https://mgks.dev/tags/llm/) coding assistants were demonstrably better at popular languages. Ask about Python and you'd get clean, working code. Ask about something niche and you'd get something that looked plausible but fell apart under scrutiny. The implication seemed clear: innovation would stagnate because the AI couldn't help you with anything new.

Except that's not what's happening anymore.

## The Context Window Changed Everything

I've been testing this with my own brand new tools. Things that have zero presence in any training data because they literally didn't exist when these models were trained. My approach has been dead simple: I start the prompt with something like "use uvx showboat --help / rodney --help / chartroom --help to learn about these tools" and then describe what I need.

The agent reads the help output, absorbs the documentation, and just figures it out. The context windows on modern models are massive enough that you can dump entire API references, example codebases, and architecture decisions into the conversation before asking for a single line of code.

This shouldn't work as well as it does. But it does work.

## Pattern Recognition Over Memorization

Drop a coding agent into a private codebase using internal libraries and proprietary frameworks. Things that definitely aren't in any training corpus. My experience has been that the agent doesn't even break a sweat. It reads through existing examples, picks up on patterns, tests its output, iterates when things fail.

It's doing what we thought only experienced developers could do: learning a new system by reading code and experimenting. The difference is it does it faster and without complaining about documentation quality.

The mechanism here matters. These agents aren't just regurgitating memorized solutions anymore. They're actually reasoning about the problem space, using available documentation as context, and adapting their approach based on feedback loops. When they make mistakes (and they do), they read the error messages and try something different.

## Choose Boring Technology Is Dead, Long Live Choose Boring Technology

Here's what really surprised me. I expected [coding agents](https://mgks.dev/tags/artificial-intelligence/) to be the ultimate embodiment of "Choose Boring Technology." If the AI works best with popular tools, then obviously we'd all converge on those tools. Economic pressure would push us toward the path of least resistance.

That logic was sound two years ago. It's not sound anymore.

I'm not seeing any pressure to adjust my technology choices based on what the AI knows. I pick tools based on technical merit, developer experience, and project requirements. The AI figures out how to work with whatever I chose. Sometimes I'm using stuff that's been around for decades, sometimes I'm using something that shipped last month. The agent doesn't care either way.

This has implications that I'm still working through. For one, it means new tools and languages have a much better shot at adoption than I thought they would in an AI-assisted world. If the barrier to learning a new framework is just feeding its docs into a context window, then switching costs drop dramatically. 

For another, it means the value proposition of popular frameworks shifts. "Everyone uses it so the AI is better at it" is no longer a selling point. You have to compete on actual technical merits again.

The fear that AI would calcify our technology choices into a permanent popularity contest turns out to have been exactly backwards. Instead, AI might be lowering the barriers to trying new things enough that the industry becomes more experimental, not less.