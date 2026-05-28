---
title: "Why Google's AI Still Can't Spell 'Strawberry' Right"
description: "The search giant's latest AI errors expose a fundamental flaw in how LLMs process text"
date: 2026-05-28 12:00:13 +0530
tags: rollup, artificial intelligence, google, llm, machine learning
image: "https://images.unsplash.com/photo-1765707886613-f4961bbd7?q=80&w=988"
featured: false
---

So Google told someone there are two Ps in Google. That alone would be funny enough, but then it got worse. The AI Overview told people there was exactly one 'r' in the word "poop" and two 'd's in "journalism" while spelling it as "journadism". This is the same company that wants us to trust its [artificial intelligence](https://mgks.dev/tags/artificial-intelligence/) to run our searches, and it's out here mangling basic spelling like a confused autocomplete on a bad day.

I have to admit, I laughed when I saw these examples. But then I dig a little deeper and realized this isn't just a quirky bug. It's a fundamental architectural limitation that researchers have been warning about for years. And it has serious implications for anyone building products that depend on language models.

## The Token Problem Runs Deep

Here's what's actually happening under the hood. Large language models don't read text the way we do. They don't see letters and words and understand their relationship to each other. Instead, they work with something called tokens, which are essentially numerical representations of text chunks.

When you type "strawberry" into an LLM, it doesn't see eight letters. It might see something like "straw", "berry" or even stranger divisions depending on how the tokenizer was trained. The model sees these tokens as mathematical vectors in high-dimensional space, not as language.

"LLMs are based on this transformer architecture, which notably is not actually reading text," Matthew Guzdial, an AI researcher and assistant professor at the University of Alberta, explained to TechCrunch. "When it sees the word 'the,' it has this one encoding of what 'the' means, but it does not know about 'T,' 'H,' 'E.'"

This is why asking an LLM how many letters are in a word is genuinely difficult for it. The model doesn't have direct access to letter-level information. It's like asking a chess engine to explain the artistic merit of a-board position. It's using a completely different representation than what the question assumes exists.

## Why This Keeps Happening

This isn't Google's first rodeo with AI Overview failures. Last time they added AI Overviews to Search, the feature started citing satirical posts from The Onion and Reddit, advising people to eat rocks and put glue on their pizza. The company patched that, but these spelling errors have proven stubborn.

The issue is that spelling tasks sit right at the boundary of what transformers can and cannot do. Language models can code an app, solve complex mathematical proofs, and write poetry, but they genuinely struggle with counting letters within words. It's almost paradoxical.

Sheridan Feucht, a PhD student studying large language model interpretability at Northeastern University, pointed out that the problem might not even have a clean solution. "It's kind of hard to get around the question of what exactly a 'word' should be for a language model," they told TechCrunch. "Even if we got human experts to agree on a perfect token vocabulary, models would probably still find it useful to 'chunk' things even further."

So maybe there's no perfect tokenizer possible because language itself is fuzzy at the edges.

## What This Means For Developers

If you're building products that rely on LLMs, here's what you need to Internal Links from this: you cannot assume the model has direct access to surface-level text features. If your application needs precise spelling, character counting, or any kind of letter-level manipulation, you either need to prompt the model very carefully or implement separate processing that handles these tasks outside the LLM itself.

This is why I always say: treat LLMs as reasoning engines, not as text processing utilities. They're incredible at understanding context and generating human-like responses, but they can be surprisingly bad at tasks that require precise structural manipulation of text.

I've seen developers build entire features around an LLM's ability to count tokens, check for specific letters, or validate spelling, only to watch those features fail in production. The model might work perfectly in testing with simple examples, then stumble on edge cases that would be trivial for a regular expression.

The bigger lesson here is about trust. We keep seeing these "AI is imperfect" reminders, and honestly, we need them. It's easy to get swept up in the hype and start treating these models as all-knowing oracles. But they have genuine blind spots, and building robust systems means understanding where those blind spots are.

Google told TechCrunch they're "working to fix this particular issue," and maybe they will improve things. But the underlying architecture limitation means this will likely remain a class of errors that occasionally surfaces in unexpected ways. Language models are amazing tools, but they're not reading text like humans do, and that difference matters more than we sometimes want to admit.