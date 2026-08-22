---
title: "The Cost of Optimization Has Collapsed"
description: "AI has reduced the barrier to performance engineering from weeks to minutes. What does this mean for how we build software?"
date: 2026-08-22 12:00:50 +0530
tags: rollup, engineering, performance, llms, optimization
image: "https://images.unsplash.com/photo-1666462296991-45c5eb42067c?q=80&w=2076"
featured: false
---

The other day I saw a tweet suggesting that people criticizing AI-generated bloated code will eat crow once everything gets rewritten in hyper-optimized assembly. We're not quite there yet, but something real is happening: the cost of optimization has dropped by orders of magnitude.

Nolan Lawson made a useful observation about testing that applies equally here: you can now choose how many bugs you want in your software. Similarly, you can choose your performance characteristics. Except now, most of that choice is affordable for projects that never could have justified it before.

## From Specialist Work to Casual Effort

Performance optimization used to be the domain of specialists. JIT compilers? Too hard to build unless you're a major organization. Custom search indices? Only if you're Google-scale. Regex engines with native code compilation? Forget it. These represented months or years of expert engineering.

Now I can type a few sentences to an LLM and get substantial work done in minutes. I recently experimented with adding AOT compilation to ripgrep's regex matching. The idea alone would have taken days to spec out and implement properly. Instead, I prompted an agent, it did the code surgery, and I ran benchmarks on real queries from my search history. For longer queries, we saw 2x-4x improvements, and on representative workloads, about 7% speedup. Not earth-shattering, but also: I spent maybe ten minutes on this.

Was it a silly use of time? Absolutely. If we're doing repeated text searches, indexing is the obvious answer, not native code compilation. But that's precisely the point. I could afford to be silly. I could afford to try something that occurred to me but seemed too annoying to implement by hand.

## The Practical Implications

My experience building an AI for the board game Azul illustrates this shift. I ended up creating what appears to be the strongest AI for that game, despite spending maybe two orders of magnitude less time than the second-place AI and mostly working on my laptop. The winning margins came from optimizations that would have been individually too tedious to justify: multithreading with two different algorithms for different net architectures, comprehensive replay-based debugging for nondeterministic bugs, and dozens of micro-optimizations.

Each individual optimization might have taken days to verify and debug. Collectively, they added up to something substantially better. The tedium of verification has largely evaporated. Setting up an agent to replay logs and hunt for nondeterminism, then iterating until the system works reliably? That's exactly the kind of busywork where LLMs excel.

Jamie Brandon tried Anthropic's performance interview problem and had Claude continue his work. The results were striking. Claude found optimizations Brandon had thought of but hadn't implemented, plus plenty he wouldn't have tried without weeks of dedicated work. A competent performance engineer got outpaced on a well-defined optimization task.

## What This Means for Software Design

[https://mgks.dev/tags/software-engineering/](https://mgks.dev/tags/software-engineering/) is entering a new era. Marc Brooker captured it well: we're moving toward "dynamic custom software, fitted to a particular workload rather than a class of workloads." This parallels what happened with FFTW (the Fast Fourier Transform library), which generates custom code for specific hardware constraints. Or the demoscene techniques optimized for particular hardware to achieve extreme performance and minimal code size.

The economics have flipped. The barrier to entry for what used to be rare expertise is collapsing. You don't need to be a compiler expert to add a JIT. You don't need deep search infrastructure experience to build specialized indices. The question shifts from "is this optimization worth the time investment" to "do I want better performance enough to spend five minutes on it."

This creates interesting downstream effects. If building a specialized database is now a weekend project instead of a year-long undertaking, why use generic databases for everything? If you can add custom optimization layers trivially, why settle for out-of-the-box performance? The software monoculture might fragment into increasingly specialized implementations.

## The Optimization Tax

But this raises a different question: should we? The viral tweet suggested we'd end up rewriting everything in assembly. I'm skeptical. Not everything needs custom optimization. The real insight is that the decision boundary has moved. Optimizations that were economically irrational at any price are now worth trying. [https://mgks.dev/tags/performance/](https://mgks.dev/tags/performance/) work that required careful cost-benefit analysis now happens almost for free.

The challenge for teams will be resisting the urge to optimize everything just because we can. Specialization is powerful, but it comes with maintenance costs and makes code harder to reason about. The question isn't "can we optimize this," it's "which optimizations are worth keeping."

The drastic reduction in optimization cost has been true since late 2024, probably earlier for people with access to frontier models. The question now isn't whether this changes how we build software. It's whether we're ready for a future where generic solutions are the exception, not the rule.