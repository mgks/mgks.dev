---
title: "Google's ERA is Quietly Proving AI Can Actually Do Science"
description: "Google Research's Empirical Research Assistance moves beyond proofs-of-concept into real epidemiology, cosmology, and neuroscience applications"
date: 2026-05-01 00:00:55 +0530
tags: rollup, research, artificial-intelligence, google
image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072'
featured: false
---

I've been tracking [artificial intelligence](https://mgks.dev/tags/artificial-intelligence/) research tools for a while now, and most of them fall into the "impressive demo, questionable utility" bucket. Google's Empirical Research Assistance (ERA) looked like it might join that club when they released their preprint last September. Six months later, I'm eating my words.

The difference? ERA is actually being used to solve real problems right now. Not "we tested it on a benchmark and got good numbers" real. I'm talking about weekly forecasts submitted to the CDC, novel solutions to open problems in cosmology, and extracting CO2 data from satellites that weren't even designed to measure it.

## When AI Beats the CDC at Disease Forecasting

Let me start with the epidemiology work because it's the easiest to verify. Google has been submitting weekly forecasts for flu, COVID-19, and RSV hospitalizations to the CDC since late last year. These aren't backtest results where you already know the answer. These are prospective, real-time predictions that get scored against what actually happens.

According to the public leaderboards run by Nicholas Reich at UMass Amherst, Google's ERA-powered forecasts have been performing at or near the top for both flu and COVID-19. That means they're competing with teams from research institutions and public health agencies who have spent years building domain-specific models for these exact problems.

The broader implication here is democratization, but not in the buzzword sense. If you can generate competitive epidemiological models without a decade of domain expertise, you can suddenly track diseases in places that don't have well-funded research institutions. You can model newer conditions faster. The computational modeling capability gets decoupled from the specialized human expertise bottleneck.

## Cosmic Strings and the Limits of Pure LLMs

The cosmology application is where things get mathematically interesting. Cosmic strings are theoretical defects in spacetime that should emit gravitational radiation. Calculating that radiation spectrum involves integrals with singularities, points where traditional math just breaks down.

Last fall, someone used [OpenAI](https://mgks.dev/tags/open-ai/)'s GPT-5 to find a partial solution, but only for the simplest case where the angle equals 90 degrees. Google's team combined ERA with Gemini Deep Think and found six general solutions plus a formula for the asymptotic limit.

This is notable because it required systematic exploration of mathematical techniques, not just pattern matching from training data. The combination of ERA's empirical approach with an advanced LLM's reasoning capabilities produced something neither could have found alone. That architecture matters more than the specific result.

## Squeezing CO2 Data from Weather Satellites

The atmospheric monitoring project is my favorite because it's so pragmatic. NASA's OCO-2 satellite makes high-precision CO2 measurements, but it only covers a tiny fraction of Earth's surface and revisits each location once every 16 days. Meanwhile, GOES East weather satellites scan an entire hemisphere every 10 minutes but weren't designed to measure CO2 at all.

Google researchers used ERA to build a physics-guided neural network that extracts column-averaged CO2 from GOES East observations by combining data from 16 wavelength bands with meteorology, solar angles, and day of year. After training on the sparse OCO-2 data, it can estimate CO2 everywhere, every 10 minutes.

The validation is solid. They compared against independent OCO-2 observations from different years and ground-based measurements. It works. You can see spatial patterns of urban CO2 emissions in near real-time from a satellite that wasn't meant to do this.

This is the kind of application that gets ignored in favor of flashier demos, but it's arguably more important. We have trillions of dollars invested in existing observational infrastructure. If [AI](https://mgks.dev/tags/artificial-intelligence/) can extract additional value from instruments already in orbit, that's a massive force multiplier for science funding.

## Beyond Black Box Modeling in Neuroscience

The zebrafish neural circuit work addresses a criticism I've had about ML in science: most models are black boxes that predict well but teach you nothing. You can't inspect a neural network and understand the underlying mechanism.

Google's team gave ERA the wiring diagram of simZFish, a simplified zebrafish brain simulator. The diagram shows which neurons connect to which other neurons, but not the mathematical rules governing those connections. ERA had to figure out the functional circuits that connect visual stimulus to neural activity to motor response.

The key result is that ERA's hypothesized circuits weren't just statistical fits. When tested against new visual stimuli, they generalized correctly because they had discovered the actual mechanistic rules. With structural information as a guide, ERA found interpretable solutions that explain how the system works.

That's fundamentally different from fitting a predictive model. One gives you a tool, the other gives you understanding.

## What This Means for Scientific Computing

These four projects span theoretical math, time series forecasting, geospatial analysis, and mechanistic modeling. The common thread is that ERA can navigate different types of scientific problems without being specifically designed for any of them.

I think we're watching the emergence of a new category of research tool. Not a replacement for human scientists, but something that changes what one scientist can accomplish. The bottleneck in science has always been the combination of domain expertise, mathematical sophistication, and programming skill required to build computational models. ERA doesn't eliminate those requirements, but it lowers the barrier significantly.

The epidemiology forecasts are already running in production. The CO2 monitoring could inform climate policy. The cosmology solution advances theoretical physics. The neuroscience work provides a blueprint for analyzing real brain data.

None of these are proofs-of-concept anymore. They're applications, and that distinction matters more than any benchmark score ever could.