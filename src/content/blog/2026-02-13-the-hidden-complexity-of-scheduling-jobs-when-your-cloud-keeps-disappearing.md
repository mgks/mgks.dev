---
title: "The Hidden Complexity of Scheduling Jobs When Your Cloud Keeps Disappearing"
description: "Google Research tackles the messy reality of cloud scheduling where capacity constantly fluctuates and one wrong decision can cascade into complete failure."
date: 2026-02-13 00:00:57 +0530
tags: rollup, research, cloud-computing, algorithms
image: 'https://images.unsplash.com/photo-1676825446819-284aad06dfdd?q=80&w=2070'
featured: false
---

I've been thinking a lot about how we lie to ourselves in computer science. We build these elegant algorithms based on assumptions that sound reasonable in a textbook but completely fall apart when they meet production systems. The most persistent lie? That computing resources are static.

You open any algorithms textbook and the scheduling problems are always defined with fixed capacity. A server has 8 CPUs. A cluster has 100 machines. Done. Except that's not how [cloud computing](https://mgks.dev/tags/cloud-computing/) works at all, and it never has been. Machines fail. Maintenance happens. Power limits kick in. And if you're running in a tiered scheduling system where high-priority jobs can swoop in and claim resources whenever they want, the amount of leftover capacity for your batch jobs looks less like a constant and more like a seismograph during an earthquake.

Google Research just published a paper at SPAA 2025 that finally addresses this gap between theory and reality. "Non-preemptive Throughput Maximization under Time-varying Capacity" is one of those rare papers that makes you wonder why no one formalized this problem sooner, because once you see it, you realize it's everywhere.

## When You Can't Hit Pause

The non-preemptive constraint is what makes this problem genuinely nasty. If you could pause a job and resume it later, scheduling would still be hard but at least you'd have an escape hatch. Start something, realize you made a mistake, pause it, do something else. But in many real-world scenarios, you can't do that. Once you start a job, it either completes or all the work is lost.

Think about what that means for a scheduler facing fluctuating capacity. You have a long job that will take three hours. Right now you have enough capacity to run it. But will you still have that capacity in two hours? If a high-priority task shows up and steals your resources at the 2.5 hour mark, those 2.5 hours of computation vanish. You get nothing.

The scheduler is playing a game against an adversarial future. Do you gamble on the long job? Or do you play it safe with shorter jobs that can finish before capacity potentially drops? Miss the deadline either way and you've failed.

## The Restaurant Analogy Actually Works

The paper uses a restaurant metaphor that I initially rolled my eyes at, but it's actually perfect. You're managing a restaurant where VIP customers can show up anytime and claim tables. You're trying to seat regular customers in the remaining space, but here's the catch: once you seat a group, they have to finish their entire meal without interruption. If a VIP shows up and you need their table, that group's meal doesn't count and they leave hungry.

Now imagine the VIPs arrive in unpredictable patterns throughout the night. Some intervals you have lots of free tables. Other times you're down to one or two. You're taking reservations (jobs with release times and deadlines), each group has a different meal duration, and you're trying to maximize the total value of successfully completed meals. You can see how one bad seating decision early in the evening can cascade into a disaster.

## Greedy Gets You Surprisingly Far

What I find fascinating about this research is that dead-simple algorithms actually work reasonably well if you know all the jobs upfront. The offline setting, where you can plan ahead, admits a greedy strategy that just schedules whatever job finishes earliest at each step. This gets you a 1/2-approximation for unit-profit jobs, meaning in the absolute worst case, you're scheduling at least half the optimal number of jobs.

That's remarkable because the problem itself is NP-hard. There's no efficient algorithm that can find the perfect answer. But greedy gets you halfway there with almost no computational overhead. When jobs have different profits, a primal-dual approach gets you a 1/4-approximation. Not perfect, but solid.

The real nightmare is the online setting.

## Online Scheduling Is Where Everything Breaks

When jobs arrive dynamically and you have to make immediate decisions without knowing what's coming next, traditional non-preemptive algorithms completely collapse. Their competitive ratio approaches zero. That's a technical way of saying they fail catastrophically.

The failure mode is intuitive once you see it. Imagine you schedule a long job, then a bunch of short jobs arrive right after. You're stuck executing the long job while the short jobs pile up and miss their deadlines. If each job has equal value regardless of length, you just traded the opportunity to complete many jobs for the completion of one. The optimal scheduler, knowing the future, would have skipped the long job entirely.

The paper explores two relaxations that allow interrupting jobs in the online setting. The restart model lets you interrupt a job but retry it later. Turns out this flexibility is huge. The same greedy strategy achieves a 1/2-competitive ratio, matching the offline result. Just being able to say "oops, wrong decision, let me interrupt this and restart it later" eliminates most of the pathological cases.

## The Discard Model Is Brutal

The discard model is stricter and more realistic for certain workloads. If you interrupt a job, it's gone forever. All progress lost, and you can't retry it. Under this model, any online algorithm can be forced into bad decisions by an adversarial job sequence. Competitive ratio goes to zero again.

But here's where the research gets practical. The team identified that if all jobs share a common deadline, which is extremely common in real batch processing systems, you can design algorithms with constant competitive ratios. The algorithm they describe for unit capacity is beautifully intuitive.

You maintain a tentative schedule for jobs that have already arrived. When a new job shows up, you try four things in order: add it to an empty slot, replace a future job if the new one is significantly smaller, interrupt the currently executing job if the new job is smaller than the remaining time, or reject it. That's it. And this generalizes to a 1/11-competitive algorithm for arbitrary capacity profiles.

Guaranteeing 9% of optimal in the worst case sounds weak until you remember this is the worst case. In practice, job arrivals aren't maximally adversarial. Real workloads have structure. An algorithm with a 1/11 worst-case guarantee probably performs much better on typical inputs.

## The Gap Between Theory and Practice

There's still a significant gap here. The offline setting achieves 1/2-approximation. The online setting with common deadlines gets 1/11-competitive. That's a big spread, and it suggests there's room for better algorithms. Maybe randomization helps. Maybe you can exploit partial information about future capacity or job arrivals.

What strikes me most about this paper is that it's establishing a foundation. This is the first formal study of throughput maximization under time-varying capacity, and it's providing the baseline results that future work will improve upon. It's the kind of research that makes me optimistic about the intersection of [algorithms](https://mgks.dev/tags/algorithms/) and systems work, because it's tackling a real problem that every cloud provider faces but formalizing it in a way that lets us reason about guarantees.

The assumption of static capacity is dead, and it's been dead for a while. We just kept pretending otherwise because it made the math easier. Now we're finally catching up to reality, one provable approximation algorithm at a time.