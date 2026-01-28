---
title: "The Code Quality Problem AI Agents Won't Tell You About"
description: "AI coding agents generate working code fast, but what about internal quality? A real experiment reveals subtle debt patterns that compound over time."
date: 2026-01-28 12:00:59 +0530
tags: rollup, architecture, ai, code-quality
image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=1720'
featured: false
---

I spent the last few months watching [AI](https://mgks.dev/tags/artificial-intelligence/) agents write code for me. Not toy examples or throwaway scripts, but real features in a production Mac application. The agents were fast. They understood context. They generated code that compiled and ran. And yet, something felt wrong.

Everyone's talking about how many lines of code these tools can generate, how quickly they ship features, how they'll replace developers any day now. What almost nobody discusses is the internal quality of that code. Not whether it works, but whether it's the kind of code you want to maintain for the next five years.

So I ran an experiment. I asked AI agents to add GitLab support to CCMenu, an open-source Mac app that monitors CI/CD builds. The app already supported GitHub Actions, and the task was straightforward: implement the same functionality for GitLab's API. Three files: an API wrapper, a feed reader, and a response parser.

This wasn't a gotcha exercise. I genuinely wanted to see if modern [AI coding assistants](https://mgks.dev/tags/artificial-intelligence/) could handle real development work while maintaining code quality standards.

## The Subtle Semantics Problem

The first issue appeared almost immediately, but I didn't catch it until the second step.

The agent generated the GitLab API wrapper functions correctly at first glance. They compiled. They looked reasonable. The function signatures matched the pattern from the existing GitHub code. But there was a subtle problem with how it handled authentication tokens.

In the original GitHub code, some functions declared tokens as optional (String? in Swift) because authentication isn't always required. Other functions declared tokens as non-optional because they only make sense in an authenticated context. This distinction communicates intent. It's a form of documentation that the type system enforces.

The agent generated all the GitLab wrapper functions with non-optional token parameters, even though the underlying helper function it created correctly used an optional. This compiled fine because you can always pass a definite string to a function expecting an optional one.

The problem surfaced when I asked the agent to implement the UI flow for unauthenticated access. Now I had an optional token variable (correctly set to nil) that I needed to pass to functions expecting non-optional strings. Compiler error.

I copy-pasted the error back to the agent, and it "fixed" the problem by sprinkling `?? ""` throughout the call sites. This substitutes an empty string whenever the token is nil. It compiles. It works. And it's completely wrong.

The whole point of using optionals was to signal that the token is optional. The agent threw away that semantic meaning and introduced new semantics: an empty string now means "no token." This is the kind of subtle inconsistency that causes bugs six months later when someone adds a new feature and doesn't realize empty strings have special meaning.

The correct fix? Add a single question mark to the function parameter type. One character. One location. No semantic drift.

## When Working Code Isn't Good Code

Here's what bothers me about that example. The agent's solution worked. It satisfied the immediate requirement. If I'd been less experienced with the codebase, or if I'd been moving too fast, I might have merged it. And the codebase would have been worse for it.

This happened repeatedly. The agent wanted to add an unnecessary caching layer and couldn't explain why when I questioned it. It implemented complicated logic to handle user/org overlap that exists in GitHub but not in GitLab, insisting the logic was necessary even after I pointed it to the relevant documentation. It duplicated URL construction logic instead of using existing helper functions, missing subtle features like the ability to override base URLs for testing.

None of these issues prevented the code from working. All of them made the codebase harder to understand and maintain.

I've worked on large software systems long enough to know that internal quality matters. Technical debt compounds. A slightly messy codebase becomes a very messy codebase becomes an unmaintainable codebase. Each shortcut makes the next shortcut more tempting. Each inconsistency creates a pattern that gets replicated.

The agents I tested, Windsurf with Sonnet 3.5 in summer and Claude Code with Sonnet 4.5 more recently, both showed this tendency. Without careful oversight, they actively introduce technical debt. They optimize for "works right now" over "maintainable long term."

## The Avatar URL Saga

Sometimes the agents didn't just write lower-quality code. Sometimes they got stuck in ways that felt almost comical.

CCMenu displays avatar images for whoever triggered each build. In GitHub's API, the avatar URL comes back as part of the build status response. GitLab has a more RESTful design and requires a separate API call to a `/user` endpoint to get avatar information.

Both agents struggled with this badly. Claude Code spent an entire conversation trying to convince me the avatar URL was in the build response. I kept pointing to the documentation. It kept insisting. Eventually I gave up and just wrote that part myself.

I think it got confused because GitLab's documentation describes multiple endpoints on the same page. The [AI](https://mgks.dev/tags/artificial-intelligence/) probably saw avatar-related fields in one endpoint and assumed they were available everywhere. But that's the kind of subtle context that matters when you're integrating with real APIs.

## Swift Makes It Harder (And That's Good)

There's a reason I chose this particular experiment. Swift is common enough that the training data should include plenty of examples, but it's not as ubiquitous as JavaScript or Python. More importantly, Swift has a complex type system that requires precision.

Optionals aren't just a convention in Swift. They're enforced by the compiler. You can't casually pass around nullable values and hope for the best. The language forces you to handle edge cases explicitly.

This makes Swift harder for AI agents to work with, but it also makes quality problems more visible. In a dynamically typed language, the semantic drift I described earlier might not surface until runtime. In Swift, it showed up as a compiler error, which at least gave me a chance to catch it.

I suspect AI agents perform better in languages with looser type systems, not because they understand those languages better, but because sloppy code is less immediately obvious.

## The Windsurf vs Claude Code Experience

My summer experiments with Windsurf and Sonnet 3.5 left me on the fence. The agent did speed up certain tasks, but it required careful upfront planning with prompts. I had to constantly switch between Windsurf and Xcode for building, testing, and debugging, which got disorienting fast.

The code quality issues were significant, and the agent would often get stuck trying to fix problems, sometimes making them worse. I found myself trading something I enjoy, writing code, for something I don't, supervising an AI that wanted to write sloppy code.

Claude Code with Sonnet 4.5 felt different. It needed less prompting. The generated code had fewer quality issues, though still not what I'd call high quality. Running it in a terminal alongside Xcode felt more natural than switching between IDEs.

The improvement wasn't dramatic, but it was enough to tilt my personal cost-benefit analysis. I use Claude Code regularly now, but always with the expectation that I'll need to review and often revise what it produces.

## What This Means For Development Teams

Here's my concern. A lot of the hype around AI coding agents focuses on speed and feature output. Executives see demos where agents build entire applications in hours. That's compelling if you're thinking in terms of quarterly goals and immediate deliverables.

But software development isn't just about getting features out the door. It's about building systems that teams can maintain and extend over years. Internal quality is what makes that possible.

AI agents, at least in their current form, don't seem to care about internal quality. They optimize for making the compiler happy and tests pass. They don't think about semantic consistency. They don't worry about whether someone six months from now will understand the code. They don't consider whether they're introducing patterns that will make future changes harder.

This creates a trap. In the short term, using AI agents to generate code looks like a productivity win. You ship features faster. But you're also accumulating technical debt faster, and that debt will eventually slow you down, possibly more than the agents sped you up.

The risk is especially acute for teams that don't have experienced developers doing careful code review. If you're a startup moving fast with junior engineers and you let AI agents write most of your code, you might build a system that becomes unmaintainable faster than you realize.

## The Review Overhead Nobody Talks About

There's another cost that doesn't show up in the productivity metrics: review overhead.

When I work with Claude Code, I'm not just reading the code it generates. I'm thinking about whether it's the right approach. I'm checking for subtle semantic issues. I'm comparing it against patterns elsewhere in the codebase. I'm considering edge cases the agent might have missed.

This is more cognitively demanding than writing the code myself would have been. When I write code, I'm thinking about the problem and the solution simultaneously. When I review agent-generated code, I need to reverse-engineer its thinking process while also evaluating the result.

Sometimes this is faster overall, especially for boilerplate or when the agent nails the implementation. Sometimes it's slower, especially when the agent goes down a wrong path and I need multiple rounds of prompting to steer it back.

The productivity gain is real but not as large as it first appears, and it requires a different skill set. You need to be experienced enough to spot quality issues and confident enough to push back when the agent insists on a suboptimal approach.

## The Code You Want vs The Code That Works

I keep coming back to that token parameter example. The agent's solution worked perfectly from a functional perspective. Users wouldn't have noticed any difference. Tests would have passed. But the code itself was worse.

This is the crux of the problem with AI coding agents right now. They're optimized to satisfy functional requirements, but they don't understand (and maybe can't understand) the deeper goal of creating maintainable software.

Software engineering isn't just applied computer science. It's also a craft with aesthetic and philosophical dimensions. Good code isn't just correct code. It's code that communicates intent clearly, that fits naturally into its context, that makes future changes easy rather than hard.

These qualities are difficult to specify in a prompt. They emerge from experience and taste. They require understanding not just what the code does, but what it means and how it fits into the larger system.

Maybe future AI models will develop this kind of understanding. Maybe they'll learn to value internal quality and long-term maintainability. But the current generation clearly hasn't, and I wonder if the training approach even incentivizes them to.

Perhaps the real question isn't whether AI agents can write code that works, but whether they can write code that we'll want to maintain five years from now.