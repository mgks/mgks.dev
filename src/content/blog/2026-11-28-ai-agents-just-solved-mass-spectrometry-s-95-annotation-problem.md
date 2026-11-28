---
title: "AI agents just solved mass spectrometry's 95% annotation problem"
description: "Google's Antigravity and Mass Spec Skills pair LLM reasoning with chemical databases to identify molecular structures from spectra. What this means for drug discovery and beyond."
date: 2026-11-28 06:00:22 +0530
tags: rollup, research, ai-agents, chemistry, drug-discovery
image: "https://images.unsplash.com/photo-1535378917042-10a22c95931a?q=80&w=2070"
featured: false
---

I've been watching AI agents quietly solve domain-specific problems that looked impossible five years ago. Mass Spec Skills might be the most elegant example yet: a system that takes a tangled mass spectrometry reading and outputs a probable chemical structure with auditable reasoning. For chemists and biotech teams, this is transformative. For the rest of us building AI systems, it's a masterclass in constraint-guided reasoning.

Here's the problem Mass Spec Skills attacks: when you run a sample through a modern mass spectrometer, you get tens of thousands of molecular signals in a single drop. The machine tells you the mass and fragmentation pattern of each molecule, but not its actual structure. For 95% of signals, chemists have no reference library to match against, so they can't identify what they're looking at. This gap has been called the 'dark matter' of mass spectrometry, and it's been a stubborn bottleneck in drug discovery, environmental monitoring, and metabolomics research.

Traditionally, a chemist would spend days or weeks narrowing down possibilities manually: consult reference libraries, predict the molecular formula using mass alone, retrieve candidate structures from databases like PubChem, test each candidate against the observed fragmentation pattern, and check whether the chemistry actually makes sense. It's methodical, rigorous, and painfully slow.

Mass Spec Skills automates this workflow by pairing Gemini's reasoning with established open-source chemistry tools. The system chains together processes like SIRIUS (for formula prediction), GNPS and MoNA (spectral libraries), MAGMa and MetFrag (fragment assignment), and RDKit (structural validation). Instead of a human orchestrating each tool and interpreting intermediate results, an LLM agent does it, synthesizing the evidence and explaining its logic in a way a chemist can audit.

## The architecture that makes this work

What impressed me most wasn't the individual components (they all exist) but how the system uses constraint-based reasoning to navigate a massive search space. With a molecular formula like C20H21ClN6O, PubChem contains 845 possible isomers. A naive approach would rank them by spectral matching alone. But the system gets surgical: it uses diagnostic neutral losses (sequential loss of HCl and isocyanic acid, for example) to infer functional groups. When multiple isomers match the same percentage of peaks, it doesn't just pick the top scorer. It tests whether the bond connectivity and chemistry actually support the observed fragmentation pattern. That's not machine learning doing anything fancy. That's constraint satisfaction: using chemical rules to prune the search space.

In the worked example from the source material, two isomers both matched 97.7% of the spectrum. One had a central urea linkage (which would cleave cleanly). The other had the piperidine ring inverted, turning the urea into an amide. The system tested both against the observed neutral losses and ruled out the amide because the chemistry didn't work. That's the kind of reasoning I want in every domain-specific AI system I build.

## What this means for real workflows

The system doesn't just output a structure. It outputs an auditable report: which peaks matched, which neutral losses were observed, why some candidates were rejected. That's crucial for scientific work, where you need to defend your answer to collaborators and reviewers. It also means the tool can run individual steps in isolation. A researcher can use it just to denoise a spectrum, or to annotate peaks, or to compare two candidate structures without committing to a full analysis.

This matters because it lowers the barrier for teams that don't have computational chemistry expertise. You describe your task in plain language, specify your instrument tolerances, and the agent figures out which tools to call and how to chain them. That's the experience I want from [AI assistants in specialized domains](https://mgks.dev/tags/ai-agents/), and it's the right model for how these systems should scale.

## The broader implications

This work shows something important about where LLMs add real value in technical domains. Gemini isn't predicting chemistry from first principles (which it's not very good at). It's orchestrating, reasoning about priorities, and translating between domain-specific tools. It's handling the cognitive overhead of a multi-step workflow. That's not flashy, but it's exactly where augmentation beats replacement.

The natural products drug discovery space is already responding. The team notes that for complex plant extracts, this workflow cuts structure identification from months of work down to hours. That's not incremental improvement. That's a phase shift in how bioactive compound discovery happens.

I'm curious where else this model applies. Protein structure prediction, genomic variant interpretation, circuit design. Any domain where you've got constraint-based reasoning, established open tools, and massive search spaces where human experts currently do the orchestration. The pattern seems to be: give the agent access to the right tools, teach it the domain's rules, and let it reason about which paths to explore and which to prune.

If your domain has 95% of signals going unannotated because human expertise can't scale, you should be thinking about whether [this architecture](https://mgks.dev/tags/llm/) applies to your problem.