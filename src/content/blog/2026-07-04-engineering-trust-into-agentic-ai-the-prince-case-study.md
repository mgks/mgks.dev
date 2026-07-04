---
title: "Engineering Trust Into Agentic AI: The PRINCE Case Study"
description: "How Bayer built production-ready agentic AI for drug discovery by separating context engineering from harness engineering. Lessons in orchestration, reflection, and reliability."
date: 2026-07-04 18:53:25 +0530
tags: rollup, architecture, retrieval-augmented-generation, multi-agent-systems
image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=1720'
featured: false
---

When I first heard about PRINCE, Bayer's preclinical research assistant, I wasn't immediately impressed. Another RAG system? Another wrapper around an LLM? But the more I dug into the technical architecture and the engineering decisions behind it, the more I realized this wasn't just another AI chatbot. This was a masterclass in building <a href="https://mgks.dev/tags/artificial-intelligence/">AI</a> systems that actually work in production, especially in regulated environments where people's health depends on the answers.

The real insight here isn't about the models themselves. It's about two distinct engineering disciplines that the team didn't even have names for until they built the system: context engineering and harness engineering. These concepts fundamentally changed how I think about building reliable AI systems at scale.

## The Problem: Decades of Inaccessible Data

Bayer sits on a goldmine of preclinical research accumulated over decades. Thousands of study reports, buried in PDFs, filled with regulatory tables, scientific findings, and experimental data scattered across unstructured documents. The structured metadata? Incomplete, inconsistent, sometimes just wrong due to years of system migrations and varied annotation practices across different labs.

Researchers were stuck. Boolean search doesn't cut it when you're trying to answer nuanced questions like "Were any clinical findings X, Y, Z observed in study T123456-2?" You need something smarter.

The initial instinct was to build better search. Then RAG emerged. Then the team realized they needed something more complex: multiple agents working together, each with specific responsibilities, each needing different information at different times.

## Context Engineering: Routing the Right Information to the Right Agent

Here's where most teams go wrong with large language models. They throw everything into the prompt and hope the model figures it out. Bayer did the opposite.

Instead of treating the prompt as one massive container for all available information, they engineered the system so that different agents at different stages receive only the information they need. Nothing more, nothing less.

Think about what happens in the workflow. When the "Think and Plan" step is reasoning about strategy, it doesn't need the raw retrieval results. When the Researcher Agent is gathering evidence, it doesn't need the full workflow history. When the Writer Agent is synthesizing the answer, it doesn't need to see the database schema. Each agent gets what it needs, when it needs it.

This isn't just about efficiency. It's about controllability. I've debugged enough <a href="https://mgks.dev/tags/retrieval-augmented-generation/">RAG</a> systems to know that context pollution is real. Too much noise in the prompt makes the system harder to steer, harder to evaluate, and harder to improve iteratively. Bayer's architecture forces you to be intentional about what each component sees.

The metadata filtering that happens before retrieval is a perfect example. The LLM generates specific constraints based on the query. Instead of dumping all retrieved chunks into the context, the system validates them against those constraints. It's doing the same job a human researcher would do: checking if what you found actually answers the question you asked.

## Harness Engineering: The Scaffolding That Keeps Agents Honest

Context engineering handles what information flows where. Harness engineering handles everything else: orchestration, failure recovery, state persistence, validation, reflection loops, observability, and the possibility of human review.

The orchestration layer here is built on LangGraph, which acts as a control plane around the agents. This is important. LangGraph doesn't let agents wander off doing whatever they want. It defines clear state transitions, tool boundaries, and recovery paths. It's the difference between "let the model do its thing" and "let the model do its thing within these constraints."

Consider what happens when a query requires multiple steps. The system might need to query structured metadata first, then use those results to retrieve detailed information from unstructured reports, then synthesize findings. Without a harness layer, the LLM would just chain these together and hope. With LangGraph orchestrating the flow, the system can pause at each step, evaluate whether it's making progress, and decide what to do next.

This is where the two types of reflection become crucial. Process reflection asks: "Am I doing this right? Am I taking the right steps in the right order?" Data reflection asks: "Did I find enough? Is my evidence sufficient?" These are different concerns. You can have good process (executing steps correctly) but thin evidence. Or you can have decent evidence but waste steps getting there.

The error handling is equally thoughtful. When a component fails, the system doesn't restart from scratch. It recovers at the appropriate layer, retries the specific step that failed, and persists the state so nothing gets recomputed unnecessarily. In a system making dozens of LLM calls, this isn't a nice-to-have. It's essential for cost, latency, and user experience.

## The Researcher Agent Paradox

Bayer started with one researcher agent. Then as they onboarded more scientific domains, the agent had to juggle an exploding list of tools. Multiple ways to query "studies". Multiple ways to retrieve "findings". Each domain has its own schema, its own authoritative sources, its own terminology.

One monolithic agent with overlapping tools becomes a nightmare. Tool selection failures cascade through the workflow. Ambiguity in domain boundaries leaks into results. Debugging becomes impossible because you can't isolate whether the problem is retrieval, tool selection, or the agent's reasoning.

Their solution is elegant: a hierarchy of domain-specific sub-agents. Toxicology gets its own agent with its own toolset. Pharmacology gets its own agent. Each one knows its domain, its data model, which sources are authoritative, how to interpret the key concepts. The top-level Researcher acts as a coordinator, routing to the right domain agent based on intent.

This is scaling agentic systems the right way. Not by making one agent smarter, but by dividing responsibility so each agent can be expert in its domain without interference.

## Hybrid Retrieval: RAG Meets Text-to-SQL

The system doesn't pick between RAG or Text-to-SQL. It uses both.

Unstructured reports? RAG with a sophisticated multi-stage pipeline. You're doing semantic search, then generating query expansions, computing metadata filters, reranking results, and finally feeding them to the LLM. That's not naive vector similarity. That's retrieval that understands the domain.

Structured data? Text-to-SQL. Give me 50 studies on rats. Give me dosage groups and numerical results. Queries where precision and aggregation matter. The Researcher Agent decides which tool fits the query, and the system executes accordingly.

The example in the source material is telling: "Were any of the following clinical findings observed in study T123456-2: piloerection, ataxia, eyes partially closed, and loose faeces?" The system has to understand what "clinical findings" means in the toxicology context, search for those specific terms, filter to a specific study, and validate results. A simple vector search would drown in noise. But RAG with proper metadata filtering, expansion, and reranking gets it right.

## Trust Through Transparency

In regulated environments, accuracy isn't enough. You need explainability. Users need to verify that the system's answer is actually grounded in the data, not hallucinated.

Bayer built this into the system from the ground up. Every claim has to be traceable back to specific chunks and study IDs. The citations aren't afterthoughts. They're part of the generation process. The Writer Agent is literally constrained to ground everything.

This changes how you build the system. You can't afford to be sloppy about chunking because the chunk is what gets cited. You can't afford to be sloppy about metadata because it enables users to verify context. You can't afford to lose track of which retrieval step produced which result.

The monitoring infrastructure is equally serious. They're using tools like Langfuse to continuously watch the system's behavior. Not just accuracy metrics, but bias detection, error patterns, gaps in coverage. The kind of ongoing observability that catches problems before users do.

## The Iterative Reality

What really struck me about this case study is the honesty about iteration. They didn't wait for the perfect system before shipping. They launched PRINCE with core functionality and gathered real feedback. They focused on accuracy first, cost optimization later. They built evaluations against both dataset baselines and live traffic patterns.

This is the opposite of how a lot of <a href="https://mgks.dev/tags/artificial-intelligence/">AI</a> projects work. We get stuck trying to optimize everything at once, or we ship incomplete systems that frustrate users. Bayer took a more measured approach: deliver value early, iterate continuously, accept that building this stuff takes time.

The metadata enrichment pipeline they're developing is a good example. They're using Named Entity Recognition to extract missing or incorrect annotations directly from PDFs. But instead of blindly writing to the database, they're scoring confidence for each extracted field. High confidence gets auto-updated. Lower confidence gets quarantined for human review. Automation where it's safe, human judgment where it matters.

## What This Means for the Industry

The broader lesson here is that production-ready agentic AI isn't just about model quality. It's about engineering discipline. Context engineering ensures information flows intelligently through the system. Harness engineering ensures the system remains bounded, observable, and recoverable.

Most importantly, it works. PRINCE has been in production since early 2024. Real researchers are using it. It's accelerating preclinical research. It's doing the thing it was built to do.

That's not revolutionary. That's just solid engineering.

But here's what keeps me thinking: as models get more capable, do we need less of this harness? Do we need fewer reflection loops, fewer constraints, less orchestration? Or do we need it even more, precisely because the stakes get higher and the systems get more complex?