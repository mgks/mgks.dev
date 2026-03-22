---
title: "The Uncomfortable Ease of Profiling Users Through Their Public Comments"
description: "Building a tool to profile Hacker News users with LLMs reveals how much we leak through casual comments, and raises questions about digital footprints."
date: 2026-03-22 12:00:34 +0530
tags: rollup, engineering, privacy, artificial-intelligence
image: 'https://images.unsplash.com/photo-1676825446819-284aad06dfdd?q=80&w=2070'
featured: false
---

I've been playing with something mildly dystopian lately. Take someone's last 1,000 Hacker News comments, dump them into an LLM, and ask it to profile the user. The results are uncomfortably accurate.

The technical implementation is trivial, which is part of what makes this interesting. The Algolia Hacker News API lets you pull comments by author with a simple GET request. Open CORS headers mean you can do this straight from browser JavaScript. No authentication, no rate limits that matter for casual use, just pure public data sitting there waiting to be analyzed.

Here's the thing about public comments: we treat them like ephemeral conversation, but they're actually a persistent record of our thoughts, interests, and personality quirks accumulating over years. Every offhand remark about your workflow, every technical debate you get pulled into, every time you mention what you're building or learning. It all adds up.

## What LLMs See That We Don't

When I feed these comment dumps to Claude, it doesn't just extract facts. It builds a psychological profile. Working style, personality traits, debate patterns, even predicting real names from context clues. The profiles read like something a careful human analyst might produce after weeks of observation, except this takes maybe thirty seconds.

I tested it on my own comments first because quoting someone else's profile felt invasive. The [AI](https://mgks.dev/tags/artificial-intelligence/) figured out I'm combative when challenged but generally good-natured, that I engage heavily in threads sometimes posting dozens of replies, that I have specific technical obsessions and a self-deprecating streak. It identified my core thesis on AI coding tools, my security concerns, even my personal interests like niche museums and kākāpō parrots.

All of this was technically public information. But there's a difference between information being technically accessible and having it synthesized into a coherent narrative about who you are as a person.

## The Practical Use Case

I built this primarily as a bad-faith detector. Before getting deep into an argument with someone on HN, I'll sometimes run their profile. Are they someone who engages thoughtfully, or do they have a history of grinding axes and moving goalposts? Hacker News is generally well-moderated, so it's rarely the latter, but it's useful context.

The tool is just HTML and JavaScript. I had ChatGPT build the initial version last August with a mobile-friendly "copy to clipboard" button, then tweaked it a few times with Claude. Point it at a username, get a text dump, paste into your [LLM](https://mgks.dev/tags/large-language-models/) of choice. These days I use Claude Opus for this kind of analysis.

What surprised me isn't that it works, but how well it works. The profiles aren't just bullet points of facts. They capture tone, motivation, the underlying worldview that shapes how someone engages online. It's pattern matching at a scale humans can't really do efficiently.

## The Privacy Paradox

This sits in an uncomfortable middle ground. The data is public. You chose to post it. There's no hacking, no terms of service violation, no privacy breach in any legal sense. And yet it feels like a violation of something.

Maybe it's the gap between what we intellectually know (everything online is permanent and analyzable) and what we emotionally assume (my random comments disappear into the noise). Or maybe it's seeing the forest when we only ever thought about individual trees.

I haven't seen this technique identify real names for most users, just me, probably because I link to my own blog from comments. That's good. But it does identify personality traits, technical expertise levels, potential biases, rhetorical patterns. Enough to build a pretty complete picture of who someone is intellectually and temperamentally.

The defensive move here isn't to stop commenting or sanitize your online presence into corporate blandness. That's not realistic and probably not desirable. But it's worth remembering that every comment is a data point in your cumulative profile, one that's increasingly easy for anyone to analyze and that future pattern matching tools will only get better at understanding.