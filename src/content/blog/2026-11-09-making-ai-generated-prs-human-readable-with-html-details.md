---
title: "Making AI-Generated PRs Human-Readable with HTML Details"
description: "How to use HTML details-summary elements to hide verbose AI-generated PR descriptions behind collapsible sections, keeping reviews fast and focused."
date: 2026-11-09 18:00:21 +0530
tags: rollup, engineering, ai, github, workflow
image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2070"
featured: false
---

I've been letting Claude and other coding agents write most of my pull request descriptions lately. They're thorough, accurate, and save me time. The problem? They're also exhausting to read.

An AI-generated PR description is a wall of text. It methodically walks through the problem, the solution approach, implementation details, and verification steps. Every word is useful. Every paragraph adds context. And yet the moment I see that dense block of prose, my brain shuts down. I'd rather skim three separate conversations than read one perfectly comprehensive AI essay.

I know I'm not alone in this. There's something about AI writing that triggers an instant glazing-over effect, even when the information is genuinely valuable. Maybe it's the predictable structure. Maybe it's the completeness that removes any need for me to engage intellectually. Maybe I'm just tired of reading.

## The Details-Summary Pattern

I found a solution that feels surprisingly natural: the HTML `<details>` and `<summary>` elements. These render as a collapsed section with an expansion arrow in GitHub markdown.

Here's how I structure it now: the opening paragraph is my human-curated summary. A few sentences max. Sometimes a screenshot. This is the high-level explanation that answers the question 'do I need to read this right now?' Then everything else, the full AI-generated analysis, goes inside a collapsed `<details>` element.

The result feels less sloppy. The information density is exactly the same, but readers get a graceful on-ramp. They can glance at my human judgment about what matters, then choose whether to expand for the full story.

I don't always write the introduction from scratch. Sometimes the AI has already buried exactly what I need somewhere in the middle of its response. My job becomes editorial: find that kernel of meaning, pull it to the surface, and let the rest live behind the collapsible.

## Why This Matters for AI Workflows

This pattern highlights something important about how we're integrating AI into real work. Coding agents are genuinely useful, but their output is often over-engineered for human consumption. They optimize for completeness rather than skimmability. They don't know which details matter in context.

That human editorial layer, that one-paragraph judgment call about what's worth your time, becomes the irreplaceable part. The AI can write the essay. But only you know whether this PR deserves three minutes of focus or thirty seconds of scanning.

This applies across more than just PR descriptions. We're seeing the same pattern emerge in how teams use AI for documentation, commit messages, and code comments. The most sustainable approach isn't 'let the AI handle everything' or 'reject all AI output.' It's having a human filter that says 'here's what you actually need to know,' with the detailed version available if you want it.

GitHub should absolutely add a button for this in their markdown editor. It would spread the pattern faster and save everyone on mobile who's currently typing `<details><summary>` character by character.

## A Mnemonic That Sticks

One last thing: I used to fumble the tag order constantly. Is it `<summary><details>` or `<details><summary>`? I finally cracked it with a simple trick. Say 'details-summary' out loud a few times. It flows: two syllables, then three syllables, smooth rhythm. Compare that to 'summary-details,' which is a clunky three-then-two punch.

Once the syllable count locked in my muscle memory, I never got it wrong again. The semantic logic helps too: details wrap everything, summary is the clickable bit. But honestly, the rhythm is what stuck.

This kind of micro-optimization might sound silly, but these are the small frictions that compound across hundreds of pull requests and thousands of developers. When tools become easier to use, more people use them thoughtfully.

As we hand off more writing tasks to AI, the real skill becomes deciding which AI-generated output serves readers well versus which needs a human editor to extract the essential 20% and hide the comprehensive 80%.