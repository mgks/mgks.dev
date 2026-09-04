---
title: "Reading Claude's System Prompts Like Code"
description: "Anthropic publishes Claude's system prompts with version history. What we can learn by diffing them, and what's still hidden."
date: 2026-09-04 06:00:22 +0530
tags: rollup, engineering, ai, claude, prompt-engineering
image: "https://images.unsplash.com/photo-1655720828018-edd2daec9349?q=80&w=2064"
featured: false
---

Anthropic does something I genuinely wish more AI companies would do: they publish the system prompts for Claude.ai and the mobile apps, complete with historical versions. You can see exactly how the instructions Claude receives have changed over time. It's a rare window into how these systems actually work.

But here's the thing - they're only publishing part of the story.

When I checked their documentation recently, I noticed they'd reorganized the prompts into separate model pages. The Fable 5.1 prompt is publicly available, and so are older versions. You can even append `.md` to any page URL to get Markdown versions, which makes diffing trivial. I built a GitHub repository with synthetic commit histories so you can browse these changes the way you'd browse code history.

What I found when I started reading the diffs is honestly fascinating - and occasionally revealing about policy decisions.

## The Music Lawsuit Effect

Fable 5.1 added a massive new section forbidding Claude from reproducing song lyrics, poems, and passages from books. The timing is almost too perfect: this landed days after Sony Music Publishing and Warner Chappell sued Anthropic for training on lyric databases.

The rules are detailed. Claude won't reproduce lyrics "in whole or in part" - not the chorus, not the hook, not lines someone pastes in one at a time. Once Claude declines, it keeps declining variations of the same request for the rest of that conversation. Works published before 1929 are fair game (Shakespeare, Keats, Puccini), but Claude defers to what it knows rather than trusting user claims about publication dates.

Then there's the visual works section. Claude won't generate images of copyrighted material, including SVGs and ASCII art. Can't draw known characters at all - not even with pose or color changes. If the described elements clearly identify a known work, describing it differently doesn't work around the restriction.

The example in the prompt is delightful: someone asks for a birthday banner with "a blue hedgehog running really fast." Claude recognizes Sonic immediately, declines, and offers an original skateboarding axolotl instead. I tested it - it works.

## The Style Instructions Matter

What strikes me is how carefully Anthropic is shaping Claude's communication style through these prompts. They added guidance to keep responses "focused, brief, and concise." They explicitly told Claude to stop using hedging language like "genuinely" and "honestly" - words that come off as disingenuous when you're supposed to be honest by default.

They also changed how Claude handles abuse. The old prompt said Claude should give a warning before ending the conversation with the `end_conversation` tool. The new one? No longer mentions ending conversations in the system prompt at all. Instead, it emphasizes maintaining self-respect and not becoming "increasingly submissive" to rudeness. "Accountability without self-abasement."

When I asked Fable 5.1 about this, it said the end_conversation tool behavior still exists - it's just in a different layer of the prompt that isn't published. Feature-specific blocks get added depending on what's enabled for your session. Tools, memory, web search, artifacts - none of those instructions are publicly visible.

## What We Still Don't Know

This is the crucial part: Anthropic publishes the core prompts, but entire sections of Claude's actual instructions remain hidden. The published prompts are honest, but they're incomplete.

Same with the new harm reduction guidance. Fable 5.1 will now provide overdose information and dangerous interaction warnings while refusing specific dosing protocols. It redirects to dancesafe.org, tripsit.me, and psychonautwiki.org - the first time I've ever seen non-Anthropic URLs in a published prompt. That's a policy choice worth noticing. But how many other undocumented policies are there?

## Implications for Developers

For anyone building on Claude's API, this matters. When you write a system prompt for your own application, you're working with a model that's already receiving detailed instructions about what it should and shouldn't do. Those instructions can conflict with yours, interact with yours in unexpected ways, or simply be invisible to you.

The published prompts are a tremendous resource - [I built tooling to track them](https://mgks.dev/tags/prompt-engineering/) and compare versions programmatically. But treating them as complete documentation would be a mistake. They're a partial window into a larger system.

Anthropicis being more transparent than most companies would be. That's genuinely commendable. But the incompleteness is a reminder that even open documentation has limits, and [understanding how AI systems actually work](https://mgks.dev/tags/ai/) requires digging deeper than the published layers.