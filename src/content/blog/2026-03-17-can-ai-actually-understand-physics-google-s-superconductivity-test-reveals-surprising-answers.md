---
title: "Can AI Actually Understand Physics? Google's Superconductivity Test Reveals Surprising Answers"
description: "Google tested six LLMs on expert-level physics questions. The results show which AI systems can handle real scientific research and which ones hallucinate."
date: 2026-03-17 00:00:33 +0530
tags: rollup, research, artificial-intelligence, large-language-models
image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=1720'
featured: false
---

I've been skeptical about [AI](https://mgks.dev/tags/artificial-intelligence/) becoming a real research tool. Sure, it can write emails and summarize Wikipedia articles, but can it handle the messy, contradictory world of actual scientific research? Google Research just published a fascinating paper that puts six major LLMs through their paces on one of physics' hardest unsolved problems: high-temperature superconductivity.

The setup is clever. They took a field where there's genuine scientific debate, thousands of competing papers, and no clear consensus. High-temperature superconductors have puzzled physicists since 1987. We know these copper-containing materials can conduct electricity with zero resistance at relatively high temperatures (still cold at -140°C, but warmer than conventional superconductors). We just don't fully understand why.

This is exactly the kind of problem where you'd want an AI research assistant. A grad student walking into this field faces decades of literature, competing theories, and research groups with strong opinions about whose hypothesis is correct. An ideal AI tool would give you a balanced overview, point you to the right papers, and help you understand the open questions without pushing any particular agenda.

## The Experiment Design Actually Matters

Here's where it gets interesting. They didn't just throw questions at [ChatGPT](https://mgks.dev/tags/open-ai/) and call it a day. They set up a proper comparison between two approaches: four models with full web access versus two "closed" systems fed only curated sources.

For the closed systems, they had twelve top experts select 15 review articles in the field. Then they extracted all 3,300 references from those reviews and filtered them down to 1,726 high-quality experimental papers and reviews. The web-based models could access everything online, including over 2,000 open-access papers in the field.

The expert panel wrote 67 questions designed to probe deep knowledge. Not "what is superconductivity?" but things like "At what level of doping does the Lifshitz transition occur in LSCO?" These are questions where you need to synthesize information from multiple sources and understand the current state of debate.

Then they graded the responses on six criteria: factuality, evidence, balance, relevance, comprehensiveness, and how well the models handled images. The grading was masked so experts didn't know which model produced which answer.

## NotebookLM Won By Being Boring

The winner was NotebookLM, Google's product that answers questions based only on documents you feed it. The runner-up was a custom RAG system built for the study. Both used the same curated database of 1,726 sources.

This tells you something important. The models with access to the entire web performed worse. They mixed solid theories with speculative ideas. They cited papers that turned out to be irrelevant. They failed to recognize when old hypotheses had been disproven.

NotebookLM succeeded by being conservative and grounded. It stuck to what was in its curated sources. It provided good evidence for its claims. It was comprehensive and balanced. The downside? It was the least succinct, often giving longer answers than necessary.

I find this result both encouraging and frustrating. It's encouraging because it means we can build reliable AI research tools right now if we're willing to curate the source material. It's frustrating because it means the dream of an AI that can navigate the open web and synthesize knowledge like an expert is still out of reach.

## Where All The Models Failed

The paper identifies some consistent weaknesses across all six systems. Temporal understanding is a big one. LLMs struggle to track when ideas were proposed, tested, and potentially disproven. They'll cite a 2010 paper proposing a hypothesis without mentioning the 2015 paper that found contradictory evidence.

Context matching is another problem. If you ask about a specific experimental technique, the models often miss relevant papers that don't use your exact terminology. Human experts know that "angle-resolved photoemission spectroscopy" and "ARPES" refer to the same thing, and they know related techniques that might be relevant. The [LLMs](https://mgks.dev/tags/large-language-models/) are much more literal.

Visual reasoning is particularly weak. Only two models even attempted to reference images, and when they did, they mostly just read the captions rather than actually analyzing the plots and diagrams. This is a huge limitation because scientific papers communicate primarily through figures and tables.

Think about what that means for practical use. A physicist looking at superconductor data lives in graphs showing temperature versus resistance, phase diagrams, and electron momentum distributions. An AI that can't properly interpret these visualizations is missing most of the actual science.

## What This Means For Building Research Tools

The implications here go way beyond physics. If you're building AI tools for any specialized domain with expert-level knowledge, this study suggests some clear principles.

Curated sources beat open web access. Yes, it requires work upfront to build a quality knowledge base. But the alternative is an AI that confidently mixes good research with garbage speculation.

You need domain experts in the loop. The evaluation process here required real physicists spending significant time grading responses. There's no shortcut around this. Automated metrics don't capture whether an answer is actually useful to a working scientist.

Multimodal understanding isn't just a nice-to-have. It's essential for scientific domains. An AI research assistant that can't interpret a phase diagram or understand a data plot is fundamentally limited.

The RAG approach works, but it's not magic. Even with curated sources, the custom system they built came in second place to NotebookLM. Implementation details matter a lot when you're trying to retrieve and synthesize technical information.

## The Bigger Question Nobody's Asking

Here's what bothers me about this whole space. We're testing whether AI can be a good research assistant, but we're not asking whether making research assistants is the right goal.

Graduate students struggle with the literature in fields like superconductivity. That's true. But part of the struggle is the learning process. You develop judgment about sources, you learn which research groups do careful work, you understand the history of ideas and why certain approaches were tried and abandoned.

If we give students an AI that summarizes everything cleanly, do they develop that judgment? Or do we create a generation of researchers who can query a database but can't navigate the actual messy landscape of scientific debate?

I'm not saying we shouldn't build these tools. The NotebookLM results show they can be genuinely useful. But we should think carefully about how they change the research process itself, not just whether they can pass our current tests of accuracy and comprehensiveness.

The experts who evaluated these systems had to know enough physics to judge whether the answers were good. The AI didn't replace their expertise, it potentially augmented it. That's probably the right framing, but it's a lot less exciting than the "AI scientist" narrative that gets thrown around.