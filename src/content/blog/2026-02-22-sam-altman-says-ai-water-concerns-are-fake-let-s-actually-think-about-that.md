---
title: "Sam Altman Says AI Water Concerns Are Fake. Let's Actually Think About That."
description: "Sam Altman dismissed AI water usage fears as 'totally fake' while defending energy costs. Here's what developers should actually take from this."
date: 2026-02-22 12:00:27 +0530
tags: rollup, artificial intelligence, open-ai, data centers, energy
image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072'
featured: false
---

Sam Altman was in India this week for a major AI summit, and he said something that immediately started making rounds on tech forums and socials. Speaking at an event hosted by The Indian Express, he flatly called concerns about [AI](https://mgks.dev/tags/artificial-intelligence/)'s water usage "completely untrue, totally insane, no connection to reality." His words, not mine.

That's a pretty bold claim. And honestly, the truth sits somewhere in the middle, which is exactly why it's worth digging into rather than just retweeting the headline.

## The Water Thing Is More Nuanced Than Either Side Admits

Altman's argument is that the old "17 gallons of water per ChatGPT query" stat was based on evaporative cooling in data centers, which [OpenAI](https://mgks.dev/tags/open-ai/) and other major players have largely moved away from. That's a fair technical point. Evaporative cooling is a legitimate water consumer, and if modern data centers are using closed-loop or air-based cooling systems instead, those numbers do become outdated fast.

But here's the thing. The reason those scary numbers keep circulating is that tech companies have zero legal obligation to disclose their actual energy or water consumption. So when researchers try to study it independently, they're working with incomplete information. Altman calling the public discourse "totally fake" is a bit convenient when the industry isn't exactly handing out audited sustainability reports.

Scientists are doing their best with publicly available data. The lack of transparency isn't the scientists' fault.

## The Energy Conversation Is More Honest, and Also More Interesting

Credit where it's due, Altman did acknowledge that total energy consumption from AI is a real and legitimate concern. Not per query, but in aggregate. The sheer scale at which people are using AI tools now means even a tiny per-query footprint multiplies into something significant at a global level.

He said the world needs to "move towards nuclear or wind and solar very quickly." Which, sure, most people already agree with that directionally. But it also conveniently frames [AI](https://mgks.dev/tags/artificial-intelligence/) companies as passive participants in an energy problem rather than active drivers of demand. Data centers are already being linked to rising electricity prices in several regions. That's not a hypothetical.

The Bill Gates comparison that came up in the interview is interesting too. The interviewer referenced a claim that a single ChatGPT query uses the equivalent of 1.5 iPhone battery charges. Altman dismissed it, saying there's "no way it's anything close to that." He's probably right that the specific number is off. But again, without actual disclosure, we're all just guessing, including him when speaking publicly.

## The "Training a Human" Analogy Is Clever But a Little Slippery

This is the part that got the most attention, and I have mixed feelings about it.

Altman argued that comparing the energy cost of training an AI model to a single inference query is unfair, which is technically correct. It's like saying a book is expensive because of printing costs while ignoring that you can read it a million times. That part makes sense.

Then he went further. He said training a human takes "20 years of life and all the food you eat during that time," plus the accumulated learning of 100 billion humans through evolution. Therefore, once you compare inference-to-inference, AI probably matches or beats humans on energy efficiency.

It's a fun analogy and it's not without merit as a thought experiment. But it's also doing a lot of rhetorical work. We don't have a choice about training humans. We do have a choice about how many AI models we train, how often we retrain them, and whether we optimize for efficiency or just throw compute at problems. The human evolution comparison kind of sidesteps the fact that these are deliberate engineering decisions being made right now, not biological inevitabilities.

## What This Actually Means If You're Building With AI

If you're a developer integrating AI APIs into your products, this debate matters more than it might seem. Not because you need to feel guilty about API calls, but because the infrastructure cost conversation is going to shape pricing, regulation, and public perception of the tools you use.

Energy costs are already baked into API pricing. As governments start paying more attention to data center power consumption, especially in regions with stressed electrical grids, you may start seeing that reflected in how [AI](https://mgks.dev/tags/artificial-intelligence/) services are priced or throttled. Some cloud providers are already exploring carbon-aware compute scheduling, where workloads are shifted to run when renewable energy is more available on the grid.

For those of us building on top of these platforms, understanding the underlying infrastructure reality, even roughly, helps you make better architectural decisions. Batching requests, caching responses where appropriate, not running inference on data you don't actually need processed, these aren't just good engineering practices. They're also how you stay ahead of cost structures that might shift under you.

The bigger question Altman's comments leave unanswered is who gets to define what counts as a "fair" comparison, and whether the companies benefiting most from AI adoption should be the ones making that call.