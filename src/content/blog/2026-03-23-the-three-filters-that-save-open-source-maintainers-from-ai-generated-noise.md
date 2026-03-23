---
title: "The three filters that save open source maintainers from AI-generated noise"
description: "AI makes it easier to contribute code, but harder to mentor. Here's how the 3 Cs framework helps maintainers identify who's worth investing in."
date: 2026-03-23 12:00:32 +0530
tags: rollup, open source, artificial intelligence, github
image: 'https://images.unsplash.com/photo-1534998158219-e4b687b062c4?q=1674&w=1674'
featured: false
---

I've been thinking a lot about what happens when the cost to create something drops to zero while the cost to review it stays exactly the same.

That's where we are with [open source](https://mgks.dev/tags/open-source/) contributions right now. A polished pull request lands in your inbox. The code looks clean. The formatting is perfect. You spend 45 minutes crafting a thoughtful response with clarifying questions. Then nothing. Or worse, the follow-up makes it clear the contributor has no idea what the code actually does because an LLM wrote it for them.

This isn't a story about bad actors. It's about misaligned incentives. [AI](https://mgks.dev/tags/artificial-intelligence/) made it trivial to generate something that looks plausible. The barrier to entry collapsed. But maintainer time didn't scale with it.

GitHub's Octoverse 2025 report shows developers merged nearly 45 million pull requests per month last year, up 23% year over year. More contributions, same number of maintainer hours. The math doesn't work.

Projects are responding by closing the gates. tldraw shut down their pull requests. Fastify killed their HackerOne program because the inbound volume became unmanageable. These aren't isolated incidents. They're canaries in the coal mine.

## When signals stop signaling

The old heuristics for identifying promising contributors don't work anymore. Clean code used to mean someone invested time understanding your codebase. Fast turnaround suggested genuine interest. Handling complexity showed technical depth.

Now [AI tools](https://mgks.dev/tags/artificial-intelligence/) can generate all of that in seconds. The signals got jammed.

This is open source's Eternal September moment. A constant influx of contributions that looks legitimate but strains the social systems we rely on to build trust and transfer knowledge. If you lose the ability to mentor newcomers effectively, you lose the multiplier effect that makes open source work.

Every good open source contributor will tell you they got started because someone took the time to mentor them. That person didn't just add one contributor. They multiplied themselves. The mentee learns to onboard others who do the same. That's how communities grow.

But you can't mentor everyone who sends a pull request. You'll burn out trying. So how do you decide where to invest your limited mentorship energy when the old signals are unreliable?

## The 3 Cs framework

The pattern I'm seeing across healthy projects comes down to three filters: Comprehension, Context, and Continuity.

Comprehension asks whether the contributor understands the problem well enough to propose this change. Not the entire codebase. That's unrealistic. But do they grasp what they're actually modifying?

Some projects test this before any code gets submitted. Codex and Gemini CLI both added guidelines requiring contributors to open an issue and get approval first. The comprehension check happens in that conversation, not after you've already invested review time.

In-person code sprints work well for this too. Real-time conversations let you quickly gauge both interest and understanding.

Context is about whether the contributor gave you what you need to do your job as a reviewer. Did they link the relevant issue? Explain trade-offs? Disclose if they used AI to generate the code?

That last one is getting more common. ROOST has a three-principle policy. The Processing Foundation added a checkbox. Fedora spent months discussing it and landed on a lightweight disclosure requirement.

Disclosing AI use isn't about policing tools. It's about calibrating reviews. When I know a pull request was AI-assisted, I focus on whether the contributor understands the trade-offs, not just whether the code runs. That's a different type of review.

There's also AGENTS.md now, which works like robots.txt for coding agents. Projects like scikit-learn and Processing use it to tell AI tools to follow guidelines, check if issues are assigned, and respect community norms. It shifts the burden of gathering context back to the contributor and their tools.

Continuity is the filter that separates drive-by contributions from potential long-term community members. Do they come back? Do they engage thoughtfully with feedback?

Comprehension and Context get you reviewed. Continuity gets you mentored.

## Protecting the multiplier

Here's the practical part. When that polished pull request lands without following your guidelines, close it. No guilt. You're protecting your time for contributions that matter.

If someone comes back, engages in issues, submits a second pull request and responds thoughtfully to feedback, now you pay attention. That's when you invest mentorship energy.

This isn't about abandoning newcomers. It's about being strategic. You're preserving the multiplier effect by focusing on people who demonstrate all three Cs.

There's another benefit too. Clear criteria reduce bias. When you rely on vibes, you tend to mentor people who look like you or share your cultural context. The 3 Cs give you a rubric instead of gut feelings. That makes your mentorship more equitable.

Start with one filter but look for all three when deciding who gets your deep investment.

## The human relationship problem

None of this is about restricting AI-assisted contributions. These tools aren't going anywhere. The question is whether we adapt our practices fast enough to maintain what actually makes open source work: human relationships, knowledge transfer, and the compounding effect of good mentorship.

Platform changes will help. GitHub's product team just published an RFC asking for community feedback on longer-term solutions. But platform changes take time, and even when they arrive, you'll still need strategies for figuring out who deserves your limited attention.

The cost to create dropped to zero, but the cost to build trust and transfer knowledge stayed exactly where it was: high, personal, and deeply human.