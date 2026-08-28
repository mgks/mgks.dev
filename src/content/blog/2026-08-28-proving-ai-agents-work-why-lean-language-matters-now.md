---
title: "Proving AI Agents Work: Why Lean Language Matters Now"
description: "Leo de Moura on using Lean to verify AI agent correctness. How automated reasoning and probabilistic models converge to build trustworthy systems."
date: 2026-08-28 18:00:49 +0530
tags: rollup, software-engineering, ai-agents, formal-verification, lean-language
image: "https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?q=80&w=2070"
featured: false
---

I've been thinking a lot about trust lately. Not the interpersonal kind, but the computational kind: how do we actually know an AI agent will do what we ask it to do?

That question sits at the heart of a conversation between Ryan and Leo de Moura, the creator of Lean and Senior Principal Applied Scientist at AWS. What struck me wasn't just the technical depth, but the pragmatism. Leo isn't arguing we need to prove every machine learning model's decision path. Instead, he's showing how formal verification and probabilistic reasoning can work together to catch the bugs that matter most.

## The Correctness Crisis We're Not Talking About

Here's the uncomfortable truth: we're deploying AI agents into production without guarantees they'll behave correctly. We have unit tests. We have integration tests. We do A/B testing. But when an agent makes a decision that costs your company money or breaks a user's workflow, we're often left shrugging and saying "the model was stochastic."

Lean changes this equation. It's a functional programming language paired with a proof assistant. Write your code, and simultaneously write a proof that it does what you claim it does. Both live in the same system. No impedance mismatch between your specification and your implementation.

For AI systems, this becomes increasingly relevant. You can't prove a neural network's weights are optimal. You can't formally verify that a transformer will always choose the right token. But you *can* verify the orchestration layer. You can prove that your agent's decision loop terminates. You can verify that state transitions follow your intended logic.

## Where Automated Reasoning Meets Machine Learning

What I find most compelling is how Leo frames the relationship between automated reasoning and probabilistic models. They're not competitors. They're complements.

Think about it this way: a probabilistic model gives you a distribution over possible outputs. That's powerful for handling uncertainty, for learning from data, for scaling to complex problems. But it doesn't tell you *whether* the system will crash, whether it respects your invariants, whether it avoids known failure modes.

Automated reasoning handles that. Formal verification checks your assumptions about how the system *should* behave. It catches logical errors before they reach production.

For developers building [AI applications](https://mgks.dev/tags/ai-applications/), this suggests a new architecture: use machine learning for the parts that benefit from probabilistic inference, and use formal methods for the parts where correctness is non-negotiable. Your agent's core logic might be learned from data, but the wrapper around it, the safety guarantees, the resource constraints, those should be formally verified.

## Continuous Optimization Through AI

Leo also touches on something that deserves more attention: using AI for continuous code optimization. This isn't just performance tuning. It's about maintaining correctness *while* you optimize.

Tradition says you optimize first, then verify. That's backwards. If you have formal verification in place, you can let an AI system explore optimizations and immediately know whether each one breaks your guarantees. The machine can try thousands of variations per hour. Humans verify the ones that maintain correctness.

For anyone working on [performance optimization](https://mgks.dev/tags/performance-optimization/), this is a game-changer. You're no longer manually choosing between safety and speed. You define your safety properties once in Lean, then let automation find Pareto improvements along every other dimension.

## What This Means for Developers Right Now

You don't need to rewrite your entire codebase in Lean tomorrow. But you should be thinking about where correctness matters most in your systems. Where would a single bug cause cascading failures? Where do you have the most confidence that your tests catch all the edge cases?

Those are the places where formal verification pays off. Start small. Verify a critical path. Verify an invariant. Prove that a resource constraint always holds. Build intuition for how formal reasoning feels different from testing.

The convergence of AI and formal methods isn't inevitable. It requires tooling, expertise, and cultural shifts in how we think about verification. But the alternative—deploying increasingly autonomous agents without guarantees they'll behave correctly—is becoming untenable.

If AI systems are going to make real decisions in the real world, shouldn't we at least be able to prove they're using correct logic to do it?