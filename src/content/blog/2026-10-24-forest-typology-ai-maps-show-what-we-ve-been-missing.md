---
title: "Forest Typology AI Maps Show What We've Been Missing"
description: "Google DeepMind's ForTy dataset uses satellite imagery and ML to distinguish natural forests from plantations at 10-meter resolution globally."
date: 2026-10-24 06:00:21 +0530
tags: rollup, research, geospatial-ai, earth-observation, remote-sensing
image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2070"
featured: false
---

I've been following the intersection of satellite imagery and machine learning for a while now, and the latest release from Google DeepMind and the World Resources Institute feels like a watershed moment. They just dropped Forest Typology (ForTy) 2020, a global map that does something most of us didn't realize was this hard: it tells you what kind of forest you're actually looking at.

Here's the problem that ForTy solves. From space, an old-growth rainforest looks almost identical to a eucalyptus plantation or an oil palm estate. They're all just green patches. But their carbon storage, biodiversity value, and ecological importance differ dramatically. For regulators trying to enforce deforestation rules and companies building sustainable supply chains, this distinction is everything. The EU's deforestation regulation demands that companies prove their coffee, cocoa, and palm oil didn't come from converted forest. But 'converted forest' means different things depending on what it became. You need to know not just that trees are gone, but what replaced them.

## The Technical Challenge Nobody's Talking About

Building this required 1.7 million labeled training examples and a custom deep learning architecture. That's impressive in scale, but what I find more interesting is the approach. ForTy uses something called AlphaEarth Foundations embeddings as a core input. These are compact data representations of years of satellite observations for each 10-meter pixel, which lets the model detect seasonal patterns, planting rhythms, and harvest cycles that reveal forest type without explicitly programming those rules.

This is exactly how modern AI should work in geospatial applications. Rather than hand-crafted features, you're learning representations from massive historical data. The model achieved 90% accuracy on forest type classification and 95% on forest versus non-forest distinction, validated against 9,000 expert-reviewed sites. That's legitimately impressive performance for a global-scale geospatial model.

But here's what matters for developers and data practitioners: ForTy doesn't just output yes/no labels. It returns probability scores for each classification. This is crucial for real-world deployment. A supply chain compliance officer might demand 99% confidence thresholds to avoid regulatory risk. A researcher estimating total forest extent might use the full probability spectrum for nuance. This flexibility is how you build systems that actually work at scale across different stakeholder needs.

## What Makes This Different From Previous Work

Last year, Google released Natural Forests of the World 2020, which simply separated natural forests from other tree cover. That was a starting point. ForTy goes further. It segments land into six FAO-defined categories: primary forest, naturally regenerating forest, planted forest, timber plantation, tree crops, and non-forest. And critically, they're releasing a time series from 2017 to 2025 showing year-by-year changes.

This time dimension changes everything. When a natural forest gets logged and replanted as a plantation, standard tree-cover maps see green and think nothing happened. The land looks recovered within months. ForTy's time series makes that invisible change visible. You can now see not just where forests disappear, but what type of forest was lost and what replaced it.

For anyone building [climate tech applications](https://mgks.dev/tags/climate-tech/) or working on supply chain transparency, this is the dataset you've been waiting for. It's freely available on Google Earth Engine under an open license, which means startups can build on it without enterprise licensing headaches.

## The Bigger Implications for Geospatial AI

I think ForTy signals something important about where geospatial AI is headed. We're moving past binary classifications and simple tree-count maps toward nuanced, probabilistic understanding of complex systems. The fact that they validated extensively and made probability outputs available means they're building for real-world deployment complexity, not just academic benchmarks.

This also matters for how we think about training data in satellite ML. The 1.7 million labeled locations came from expert surveys, national datasets, and targeted reviews of failure cases. That's the hard work nobody talks about. It's not sexy, but it's why the model works globally instead of breaking down at regional boundaries.

The implications extend beyond conservation too. Any domain that needs to understand land use change at scale from satellite imagery is now better equipped. Agricultural monitoring, urban planning, [environmental monitoring networks](https://mgks.dev/tags/earth-observation/) - they all benefit from better foundational models and datasets.

The question now is whether this level of precision actually drives behavior change in companies and governments, or if it remains another dataset that gets built and then underutilized because adoption is harder than model development.