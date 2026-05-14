---
title: "Using LLMs as Interrogators: A Better Way to Extract Complex Knowledge"
description: "How to use AI to interview humans and build better context documents, turning conversation into structured knowledge that scales."
date: 2026-05-15 00:00:51 +0530
tags: rollup, architecture, ai, knowledge-extraction
image: 'https://images.unsplash.com/photo-1534998158219-e4b687b062c4?q=80&w=1674'
featured: false
---

I've been thinking a lot about how we get knowledge out of people's heads. Not in a creepy way, but genuinely: when you need someone to explain something complex, the traditional approach is painful for everyone involved. You schedule a meeting, sit across from each other (or worse, on a video call), and try to extract information through conversation. Or you ask them to write it down, which many people find excruciating.

But there's a different way. An approach that's been quietly working for some teams: using <a href="https://mgks.dev/tags/artificial-intelligence/">AI</a> to do the interviewing instead.

## The Interview Pattern

Here's how it works. You have an <a href="https://mgks.dev/tags/artificial-intelligence/">LLM</a> whose job is interrogation. You give it a specific domain or problem space, and it asks you questions. One question at a time. It doesn't dump ten things at you hoping something sticks. It listens to your answer, builds on it, asks follow-ups.

When you need that LLM to build a design document for a new feature, for instance, it needs a lot of context. User-facing behavior, implementation guidelines, how it integrates with external systems, edge cases you've thought about. That's easily several pages of documentation. Normally someone sits down and writes all that. But most people hate writing. So instead, the LLM asks them about it.

The magic part? The human often ends up giving better, more detailed information through conversation than they would have written. There's less friction. Less staring at a blank page wondering where to start.

Harper Reed wrote about this approach, and what struck me most was his insistence on the one-question-at-a-time rule. When I tried implementing it myself, I found the LLM constantly wants to batch questions together for efficiency. You have to keep reminding it: one. Just one. That constraint actually matters for the quality of answers you get back.

## Expanding Beyond Building

The interrogation pattern doesn't stop at creation. You can use it in reverse for validation. Got a software specification that's been sitting in your docs? Hand it to an LLM and have it interview a subject matter expert about whether the spec is accurate. The expert doesn't have to sit down and read through everything (which most people avoid). They just have a conversation where the LLM asks about specific claims from the document.

This is particularly useful when the original document isn't well-written, which let's be honest, many aren't. A human has to power through unclear prose. But an LLM can pick out potential ambiguities and ask about them directly. It's like having a really persistent technical writer asking clarifying questions.

You can chain these together too. One LLM interviews you to build a context document. Another LLM uses that document to interview different experts for review. Layer it. Iterate on it. Each pass refines the knowledge.

## The Broader Implication

This matters beyond just feature design documents. I'm someone who thinks through writing. For me, the act of writing clarifies thought. But not everyone works that way, and that's been a real blocker in organizations. Knowledge gets stuck because it's hard for people to externalize it in written form.

If an LLM can make knowledge extraction feel more like having a conversation than a writing assignment, you've solved a real problem. The output will have that distinctive AI-written flavor that makes me personally cringe a bit. But honestly, that's less important than actually having the information at all. A slightly AI-flavored context document beats no document because someone dreaded writing it.

The constraint for all this is that someone still has to be in the loop. The LLM needs the right prompting. It needs to know what domain it's operating in. You can't just throw it at people and expect magic. But if you set it up right, you're trading off some writing burden for better information extraction.

What's interesting is how this inverts the traditional bottleneck. Usually the blocker is the writer's capability or motivation. Now the blocker is the interviewer's prompting. That's a much more manageable problem to optimize for.