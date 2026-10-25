---
title: "Forest Typology: How AI is Mapping the Planet's Trees"
description: "Google DeepMind releases ForTy, a 10-meter resolution global forest map using AI to distinguish natural forests from plantations. What this means for conservation tech."
date: 2026-10-26 00:00:20 +0530
tags: rollup, research, ai, geospatial, remote-sensing
image: "https://images.unsplash.com/photo-1534998158219-e4b687b062c4?q=80&w=1674"
featured: false
---

I've been following Google's environmental AI efforts for a while now, and their latest release caught my attention: Forest Typology (ForTy) 2020, a global map that categorizes every 10-by-10-meter patch of Earth's land into six distinct forest and land-use types. On the surface, this sounds like another satellite imagery project. But dig deeper, and you'll see it's actually a significant leap in how machine learning can tackle real-world conservation problems.

The problem ForTy solves is deceptively simple but historically hard: from space, an old-growth rainforest, a eucalyptus plantation, and an oil palm estate all look like green. A standard tree-cover map can't tell you what matters for conservation: which forests actually store carbon and biodiversity, and which are essentially farms that happen to grow trees.

## The Machine Learning Challenge

What makes ForTy technically interesting is that it had to solve something beyond typical image classification. The team trained on 1.7 million labeled locations, but here's the catch: forest types depend partly on *how land is used*, not just how it looks. A timber plantation and a primary forest might have identical spectral signatures at any given moment. The difference reveals itself in patterns over time: planting rhythms, harvest cycles, growth rates.

The solution leverages AlphaEarth Foundations embeddings, which compress years of satellite observations into compact summaries for each pixel. Think of it as teaching the model to recognize seasonal signatures rather than just static features. This is where the real AI innovation lives, not in the classification itself but in the temporal reasoning layer.

The accuracy numbers are solid: 90% correct classification for forest type, 95% for forest vs. non-forest. More importantly, instead of binary yes-no labels, ForTy outputs probability scores for each class. This is crucial for real-world adoption. A company worried about regulatory compliance under the EU's deforestation regulation can set a strict threshold. A researcher estimating forest extent can use the full probability spectrum. One system, multiple use cases.

## Why This Matters for Tech and Policy

I find the regulatory angle particularly compelling. The EU's deforestation regulation requires that products like coffee and cocoa don't originate from land converted from forest after 2020. Companies implementing this need to know not just "was there forest here" but "what *kind* of forest, and what replaced it." ForTy answers that question at scale.

This is how AI should work with policy: not replacing human judgment but making compliance scalable and auditable. The validation with 9,000 ground-truth sites shows the team understood that trust matters. A map is only useful if stakeholders believe it.

For developers working on https://mgks.dev/tags/geospatial/ problems, ForTy is available on Google Earth Engine with an open license. That's significant. It means startups and NGOs can build verification tools, supply-chain transparency platforms, and monitoring systems without massive annotation efforts. The barrier to entry for geospatial analysis just dropped considerably.

## The Time Series Dimension

Perhaps most interesting is the annual time series from 2017 to 2025. Most deforestation tracking focuses on tree loss. ForTy shows what *replaces* the trees. A natural forest logged and replanted as a plantation looks green on standard maps. ForTy makes that conversion visible. This distinction matters enormously for enforcement and compensation mechanisms.

This is where the project hints at a broader trend: combining remote sensing with temporal reasoning for environmental monitoring. We're seeing similar approaches in https://mgks.dev/tags/remote-sensing/ across wildfire prediction, agricultural yield forecasting, and biodiversity tracking. The pattern is the same: train on temporal patterns, validate rigorously, and output probabilities rather than hard classifications.

## What's Missing

I should note what this doesn't solve: ground validation at scale remains labor-intensive. The 9,000 validation sites are robust but sparse across a global dataset. For regions with less satellite coverage or in areas of active conflict, accuracy likely drops. The team transparently states regional variation exists, but exact uncertainty maps by region aren't clear from the release.

There's also the question of model drift. A time series from 2017-2025 assumes consistent model performance across years and satellite sources. Seasonal variations, atmospheric conditions, and evolving agricultural practices could introduce drift that's hard to detect without continuous validation.

Still, this is solid work that moves the needle on a critical problem: making environmental accountability technical possible, not just theoretically desirable. If companies can now audit their supply chains against a globally consistent, AI-generated baseline with open access, the incentives for deforestation actually change. What happens when transparency becomes the default rather than the exception?