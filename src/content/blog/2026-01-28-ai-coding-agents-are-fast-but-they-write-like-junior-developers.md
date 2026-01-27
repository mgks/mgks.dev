---
title: "AI Coding Agents Are Fast, But They Write Like Junior Developers"
description: "I spent months testing AI agents on a real codebase. They shipped features quickly, but the code quality tells a different story about sustainable development."
date: 2026-01-28 05:23:27 +0530
tags: ai, software-development, code-quality, swift, architecture
image: 'https://images.unsplash.com/photo-1764075832552-bd8cd81cc063?q=1035&w=1035'
featured: false
---

I've been hearing a lot about AI coding agents cranking out massive amounts of code at lightning speed. Features shipped in hours instead of days. Entire applications scaffolded while you grab coffee. The demos are impressive, and the reports paint a picture of productivity nirvana.

But there's something nobody talks about: what does that code actually look like under the hood?

I decided to find out by adding GitLab support to CCMenu, a Mac app I maintain that shows CI/CD build statuses in the menu bar. The app already supported GitHub Actions, so adding GitLab seemed like a perfect test case. Similar problem space, well-documented APIs, existing patterns to follow. I tried this experiment twice: first with Windsurf and Claude Sonnet 3.5 during the summer, then recently with Claude Code and Sonnet 4.5.

What I discovered wasn't what I expected.

## The Task Seemed Simple Enough

CCMenu has three GitHub-specific files that handle API interactions: a feed reader, a response parser, and wrapper functions for the GitHub API. The wrapper functions return URLRequest objects (part of the Swift SDK) and handle things like authentication tokens.

My first prompt was straightforward: "Based on the GitHub files for API, feed reader, and response parser, implement the same functionality for GitLab. Only write the equivalent for these three files. Do not make changes to the UI."

The agent picked up on key differences immediately. It recognized that GitHub's "repository" is called a "project" in GitLab. It handled the different JSON response structures. The code compiled, the complex function types looked correct, and I thought, okay, this is actually working pretty well.

Then I asked it to implement the UI for adding new pipelines, deliberately excluding authentication for now. That's when the first crack appeared.

## When Optionals Become Strings

In Swift, you declare optional values with a question mark after the type, like `String?`. This is idiomatic Swift, and the language forces you to handle optionality safely, avoiding the classic null pointer disasters that plague other languages. Some API wrapper functions in CCMenu need authentication tokens, while others work fine without them. The ones that must have a token declare it as non-optional, signaling to callers that it's required.

The agent's generated code in the first step had declared tokens as non-optional in all the wrapper functions, even though the underlying `makeRequest` function correctly used optional tokens. This compiled fine initially because when you pass a definite string to a function expecting an optional string, Swift is happy. But when I added the UI code with an optional `apiToken` variable (initialized to nil since we weren't handling auth yet), the compiler threw an error.

I copy-pasted the error back to the agent. Its fix? Add `?? ""` at every call site, substituting an empty string when no token was present.

This technically works. The code compiles. The feature runs. But it's wrong in a subtle, insidious way. The whole point of using optionals was to signal that tokens are optional. The agent threw that away and invented new semantics: an empty string now means "no token available." This is a classic code smell, the kind of [technical debt](https://mgks.dev/tags/architecture/) that accumulates silently until your codebase becomes a minefield.

The correct fix? Add a single `?` to the function argument's type. One character. Keeps the semantics intact. Requires no changes at call sites. Takes five seconds if you understand what optionals are for.

## The Cache That Nobody Asked For

At another point, the agent tried to introduce a cache. Not because the API was slow, not because there was any performance requirement, just... because. When I asked why, it couldn't explain. It just seemed like something that should be there.

This is a pattern I kept seeing. The agent would add complexity where none was needed, miss non-obvious functionality that actually mattered, and copy-paste logic instead of using existing helper functions. It "forgot" about the option to override base URLs for testing using macOS defaults. It implemented complicated logic to handle a user/org distinction that exists in GitHub but not GitLab, and no amount of pointing it at the documentation would convince it otherwise.

Every single one of these issues would have made the codebase worse. Not broken, necessarily. The features worked. But the internal quality degraded with each addition.

## When REST Gets Too RESTful

GitHub includes avatar URLs in build status responses. GitLab has a cleaner, more RESTful design and requires a separate API call to a `/user` endpoint. Both Windsurf and Claude Code completely stumbled over this. I had a lengthy back-and-forth where Claude Code insisted the URL was in the response, probably because multiple endpoints were documented on the same page.

Eventually I just wrote that part myself. Sometimes it's faster to code than to argue with an AI about what's actually in an API response.

## The Quality Tax Compounds Over Time

If there's one thing working on large [software systems](https://mgks.dev/tags/software-development/) has taught me, it's that internal code quality isn't optional. It's an investment that pays dividends every single day. [Technology](https://mgks.dev/tags/technology/) moves fast, requirements change, bugs appear, and you need to be able to modify your codebase quickly and confidently. Technical debt doesn't just make development slower. It makes it exponentially harder for both humans and agents.

Without careful oversight, AI agents seem to have a strong tendency to introduce that debt. They optimize for "it works" rather than "it's maintainable." They miss context that experienced developers pick up through years of debugging other people's shortcuts. They don't feel the pain of coming back to confusing code six months later.

During my summer experiments with Windsurf and Sonnet 3.5, I was genuinely on the fence about whether the agent saved time. It required careful prompt engineering, constant switching between tools, and vigilant code review. I was trading something I enjoy (writing code) for something that felt tedious (babysitting an AI with sloppy habits).

Claude Code with Sonnet 4.5 changed the equation slightly. It needs less prompting, generates better quality code, and running it in a terminal alongside Xcode felt more natural. The code still isn't high quality, but it's better. Good enough that I find myself using it regularly now.

But "good enough" is doing some heavy lifting in that sentence. I'm not letting it run unsupervised. Every suggestion gets reviewed. Every pattern gets questioned. Every shortcut gets evaluated against what the codebase will look like in a year.

The agents are fast. They'll implement features while you're thinking about how to structure the problem. But speed without quality is just accumulated interest on debt you'll eventually have to pay, and the question isn't whether AI can write code that works, but whether it can write code that lasts.