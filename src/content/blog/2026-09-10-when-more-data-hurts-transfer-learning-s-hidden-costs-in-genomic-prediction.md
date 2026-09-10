---
title: "When More Data Hurts: Transfer Learning's Hidden Costs in Genomic Prediction"
description: "Larger datasets aren't always better. Google Research reveals how transfer learning from European biobanks can actually degrade predictions for underrepresented populations."
date: 2026-09-10 18:00:21 +0530
tags: rollup, research, machine-learning, genomics, transfer-learning
image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2070"
featured: false
---

# When More Data Hurts: Transfer Learning's Hidden Costs in Genomic Prediction

I've spent enough time around machine learning to know that "more data is better" feels like gospel. So when I read Google Research's latest study on polygenic risk scores across populations, one finding stopped me cold: adding more training data from one population actively *degraded* prediction accuracy in another.

Let me unpack why this matters for anyone building systems that cross population boundaries.

## The Setup: A Real Problem in Healthcare

Polygenic risk scores (PRSs) predict disease susceptibility by analyzing hundreds of thousands of genetic variants. They should be transformative for personalized medicine. But here's the catch: most genome-wide association studies (GWASs) that train these models come from European populations. When you apply a European-trained PRS to someone of Japanese ancestry, accuracy tanks.

The traditional fix sounds obvious: grab more data. Combine your small target population dataset with a massive European biobank like UK Biobank. Pool everything together and retrain. That's transfer learning 101, right?

Turns out, it's not that simple.

## The Surprising Finding

Researchers evaluated eight clinical traits across 200,000 Japanese individuals from Biobank Japan paired with hundreds of thousands of UK Biobank European samples. The results challenge conventional wisdom:

- **Below 15,000 target samples**: European data helps. You're statistically boosted by the larger dataset.
- **Above 15,000 target samples**: European data becomes a liability. Performance actually drops when you keep adding European training data.

This crossover point isn't just a marginal effect. For traits like HDL cholesterol, once you hit 15k Japanese samples, adding more than 5k European samples reduces accuracy compared to using Japanese data alone.

I find this genuinely unsettling because it inverts assumptions embedded in most modern ML pipelines.

## The Genetics Behind the Algorithm

Why does this happen? Population-specific genetic architectures. Different populations have different variants associated with the same trait. They have different allele frequencies. They have different linkage disequilibrium patterns.

When you pool populations during training, you're asking the model to find signals that work across both distributions. But if the true causal variants differ between populations, you're forcing the model to make compromises. It learns a weaker, more averaged signal that underperforms both populations individually.

The researchers quantified this using genetic correlation. Traits they called "conserved" (like BMI, with higher genetic correlation between populations) retained benefits from European data up to 25-40k samples. Traits with population-specific architectures (lipids, blood glucose) showed early crossing points as low as 5-10k samples.

This connects to broader work on [domain adaptation and distribution shift](https://mgks.dev/tags/machine-learning/) that I've written about before. You can't just pretend populations are the same distribution.

## What Gets Lost in Translation

Here's what concerns me most: the study restricted initial experiments to variants discovered *only* in the European population. That means they were deliberately leaving population-specific variants on the table.

They tested fixes with meta-analysis (combining GWAS results from both populations) and PRS-CSx (a method that dynamically weights population-specific models). Both helped, especially for population-specific traits. But they came with tradeoffs:

- **Meta-analysis**: Gained substantially for lipids and blood glucose, but required enough target population sample size to generate statistical power.
- **PRS-CSx**: Theoretically elegant but practically demanding. It underperformed simpler elastic net models until you hit roughly 25k target samples. Only at 100k samples did it match or exceed other methods across most traits.

This is a humbling reminder that sophisticated methods aren't automatically better. Method choice depends on your actual sample size and trait architecture.

## The Real-World Implication

We're in an era where ML systems increasingly need to work across populations. Climate models, medical diagnostics, financial systems, content ranking. The naive approach of "throw all the data together" breaks down whenever populations have meaningfully different distributions.

The research points toward a framework that feels more honest: **carefully scope your transfer learning**. When target population samples are scarce, external data helps. When they become sufficient (trait-dependent, but in the 15-40k range for these traits), build locally. Use advanced multi-ancestry methods only when you have the sample size to support them.

For developers and researchers building genomic prediction systems, the message is clear: audit whether your external data is actually improving performance for your target population. [Test transfer learning assumptions explicitly](https://mgks.dev/tags/bias/). The crossover point where more data becomes harmful depends on population-specific genetics, and you need to measure it empirically.

The question isn't just whether you can combine datasets. It's whether you should, and for your specific use case, when you should stop.