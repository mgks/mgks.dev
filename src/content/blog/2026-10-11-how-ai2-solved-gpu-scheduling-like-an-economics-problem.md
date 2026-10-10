---
title: "How AI2 Solved GPU Scheduling Like an Economics Problem"
description: "AI2 replaced priority-based GPU scheduling with budget allocation and fair-share algorithms. What this teaches us about resource scarcity and incentive design."
date: 2026-10-11 00:00:20 +0530
tags: rollup, artificial-intelligence, resource-allocation, infrastructure, scheduling
image: "https://images.unsplash.com/photo-1680783954745-3249be59e527?q=80&w=1064"
featured: false
---

I've been thinking a lot about resource allocation lately, and AI2's recent overhaul of their GPU scheduler is a masterclass in how to solve what looks like an engineering problem by recognizing it's actually an economics problem.

For years, AI2's infrastructure team managed thousands of GPUs across clusters serving 150+ researchers. Like most labs, they faced the familiar problem: demand for compute far exceeded supply. At any given moment, there were 2-3x more workload requests than available GPUs. Their priority-based scheduler seemed reasonable in theory, but in practice, it created perverse incentives that I find genuinely fascinating.

## The Tragedy of the Commons in Silicon

Researchers started gaming the system in predictable ways. Some would "squat" on GPUs by parking no-op workloads they could resurrect later, simply because launching debugging jobs with low latency was impossible. Others exploited the optional preemptibility flag, hoarding resources that sat idle. Eventually, priority inflation set in: 100% of workloads claimed HIGH priority, rendering the priority system useless.

The infrastructure team spent most of their on-call time negotiating with users to shut down long-running jobs that were blocking maintenance. This wasn't a technical failure. It was a failure of incentives.

AI2 recognized this as a textbook tragedy of the commons. Individuals maximizing their own outcomes were degrading the shared resource for everyone. The instinct was to tighten control over priorities, but that just added bureaucratic overhead without solving the underlying problem.

## From Quotas to Budgets

Their solution? Shift from thinking about GPU quotas to GPU *time budgets*. Instead of assigning teams fixed numbers of GPUs, they allocate a percentage of total cluster capacity over time. This is fundamentally different because it lets them maintain full occupancy while preserving the ownership incentive.

The brilliant part is that this translates strategy into resource allocation automatically. Leadership decides upfront how to allocate GPU time across research programs based on impact potential, like institutional investors allocating funds. Then the scheduler uses that allocation to prioritize arriving workloads.

In this system, every request must be funded by a budget or face preemption. Suddenly, squatting becomes expensive. Gaming the scheduler drains your team's allocation. The cost of dishonesty exceeds the benefit, so users engage honestly with the budgeting process instead.

## Fair-Share Scheduling at Scale

Paired with this budgeting framework, AI2 built a hierarchical fair-share scheduler. The algorithm itself isn't novel, it's based on Hadoop's Fair Scheduler from 2009 and used in SLURM and YARN today. What's novel is applying it to a tree that mirrors organizational structure, with weights set by actual management decisions rather than static quotas.

The scheduler tracks utilization over a 7-day window and prioritizes workloads from under-utilized allocations over those from over-utilized ones. This lets every research group receive their allocated GPU time as long as they're actively submitting work. More importantly, it distinguishes between two types of occupancy:

**Allocated occupancy** charges to a budget and gets preemption protection. **Unallocated occupancy** is free but unprotected. This means teams can burst beyond their allocation during idle periods without penalty, reclaiming compute that would otherwise go unused. One researcher noted this made "it feel like we have an extra 30% compute."

## The Time-Slicing Contract

But there's a problem with distributed training: jobs run for hours, days, or weeks. A single training run could monopolize GPUs for a week, preventing fair-share from rebalancing. This is what enabled squatting and forced maintenance negotiations.

AI2's solution is elegant: introduce a "scheduling contract" where workloads declare their minimum runtime. During this window, they're protected from preemption. After that, they can be preempted and requeued, allowing fair-share to converge and maintenance to proceed. This reduced repairs requiring human intervention by 74%.

What strikes me most is that this entire redesign is really about making the right behavior cheaper than the wrong behavior. By making gaming expensive and honesty automatic, AI2 shifted from managing exceptions to managing allocations.

This matters beyond AI2. As AI research scales and compute becomes more distributed, the need for principled resource allocation only grows. The lesson here applies wherever multiple teams compete for shared infrastructure: whether it's cloud budgets, cluster time, or team bandwidth, treating allocation as an economics problem rather than an engineering one tends to produce better outcomes.

The question for your organization: are you solving your resource scarcity problem, or are you still managing the symptoms of misaligned incentives?