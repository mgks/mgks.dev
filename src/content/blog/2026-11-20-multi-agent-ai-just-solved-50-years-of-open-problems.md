---
title: "Multi-Agent AI Just Solved 50 Years of Open Problems"
description: "Google's Antigravity multi-agent framework tackles decades-old mathematical conjectures and systems challenges. What this means for how we'll build AI-powered research tools."
date: 2026-11-20 00:00:21 +0530
tags: rollup, research, ai-agents, formal-verification, gemini
image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2065"
featured: false
---

I've been following AI's progress on narrow tasks for years, but something fundamentally shifted in how Google is approaching research problems. Their new /teamwork framework, built on Gemini 4 variants, just solved problems that have stumped mathematicians and computer scientists for 50+ years. This isn't incremental. It's a signal about where AI research is heading.

The breakthrough here isn't that AI found answers to hard problems. It's that they cracked the meta-problem: how to make AI reliable enough for frontier research where correctness isn't negotiable.

## The Architecture of Verification

Vahab Mirrokni's team identified two fundamental limits in current language models. First, generation is probabilistic and messy. A single attempt rarely produces correct proofs or algorithms. Second, LLMs lose context over multi-day research tasks as their attention disperses across growing context windows.

/teamwork solves both through deliberate system design. Rather than hoping a single model produces the right answer, they pair parallel exploration with dedicated falsifiers: Lean 4 proof checkers, test suites, execution simulators. Think of it as building verification into the workflow itself, not bolting it on afterward.

Context partitioning is equally clever. Instead of forcing one massive context window, /teamwork gives each specialized agent only the exact files and tools needed for its step. Coordinators hand off tasks to fresh agents while critics challenge results from clean contexts. This prevents the attention collapse that kills long-horizon reasoning.

For developers building complex systems, this is the architectural lesson: separate the generation layer from the verification layer, and design your agent routing explicitly around what information each component actually needs.

## What Actually Got Solved

The concrete results are staggering. A 2013 information theory conjecture from Courtade and Kumar? Proved in full generality through 50 million lines of Lean 4 code. A 2014 quantum computing open question about Boolean functions? Settled with exact query bounds. For matrix algorithms, a deterministic approach to Boolean matrix multiplication finally broke the decades-old logarithmic factor barrier that STOC 2024 had highlighted.

But the most impressive work is probably the formalization work. /teamwork-LEAP produced a machine-checked formalization of the Weil conjectures across 1.8 million lines of Lean 4. That's not researchers writing the proof. That's AI generating it autonomously, verifiable line by line.

They also formalized Hilbert's tenth problem over general rings (919,000 lines), finite-time blowup for 3D Navier-Stokes equations, the Birkhoff conjecture from 1927, and the 3D Bochner-Riesz conjecture from harmonic analysis that's been open for 50+ years.

## The Real Industry Signal

Here's what matters for those of us building with AI: this work demonstrates that multi-agent workflows with strong verification loops can reliably tackle problems requiring months or years of human expert time. The verification isn't just nice-to-have. It's what makes the whole system work.

I think we're going to see this pattern propagate quickly. Right now most teams use LLMs for generation and bolt on simple correctness checks. The future looks like explicitly architected agent teams where generators and verifiers are first-class citizens with separate contexts and clear handoff protocols.

This also hints at how https://mgks.dev/tags/formal-verification/ becomes genuinely practical. Lean 4 formalization used to be a luxury for pure mathematics. When your AI agent can generate 50 million lines of provably correct code, suddenly formal verification isn't optional overhead. It's the interface between exploration and deployment.

## Chemistry and Deep Review

Beyond pure mathematics, /teamwork organized 30 specialized agents to tackle molecular structure determination from NMR data. For HIV protease inhibitors, one wrong bond placement kills activity. The multi-agent approach improved structure prediction significantly.

They also rolled out Deep Review for STOC 2027 submissions: 578 authors opted in, and 90% rated the feedback factual. Over 30% said it caught substantive proof bugs. This is https://mgks.dev/tags/ai-agents/ doing peer review in real time, catching errors that human reviewers would miss in dense calculations.

That's not theoretical anymore. It's shipped and adopted.

## What I'm Watching

The next constraint will be discovery itself. These systems excel at verification and exploring well-defined search spaces. But how do you formalize 'find an open problem worth solving' or 'design an experiment that would falsify this conjecture?' Human researchers still frame the questions. The AI explores the answer space.

As long as human experts remain in the loop for problem selection and constraints, this partnership scales. But the moment we try to fully automate the question-framing layer, I suspect we'll hit different walls.

The real question isn't whether AI can solve 50-year-old problems. We just watched that happen. The question is whether we'll build systems where verification and discovery are equally valued, or whether we keep treating correctness as an afterthought.