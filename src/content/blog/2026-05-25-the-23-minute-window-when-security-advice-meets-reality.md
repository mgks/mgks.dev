---
title: "The 23-Minute Window: When Security Advice Meets Reality"
description: "Google says security can’t be bolted on later. Then why are developers getting five-figure bills from API keys that slipped through the cracks?"
date: 2026-05-25 13:20:09 +0530
tags: rollup, artificial intelligence, security, cloud, google
image: "https://images.unsplash.com/photo-1765707886613-f4961bbd07dd?q=80&w=988"
featured: false
---

There's something ironical about the timing. Just as Google Cloud's COO Francis de Souza takes the stage telling companies that security can't be an afterthought, The Register drops a report about Google Cloud developers waking up to five-figure bills because their API keys got silently expanded, compromised, and used to rack up Gemini charges they never authorized. We're living in a world where the platform providers tell us one thing and ship another, and it's getting harder to ignore the gap.

De Souza isn't wrong on the substance. His advice about taking a platform approach to security, about not treating it as something you bolt on later, about the dangers of shadow AI, all of that is solid. I've been in rooms where security folks have been screaming these messages for years. The difference now is that AI has compressed the timelines so radically that the old ways of thinking are genuinely dangerous. When the average time between an initial breach and the handoff to the next stage of an attack drops from eight hours to 22 seconds, you can't afford to have humans in the loop for every decision. You need machines defending machines. That's the world de Souza described, and it makes sense.

But here's the part that keeps me up at night. While the COO stands onstage talking about the importance of security from the start, Google itself is shipping API key infrastructure that silently expands capabilities without clear disclosure. Developers who originally grabbed a Google Maps API key for a simple project suddenly find that key can now access Gemini too. No warning, no opt-in, just a quiet expansion of what the key can do. That's not a security-first approach. That's the opposite.

The stories that The Register documented are genuinely unsettling. Rod Danan, CEO of interview-prep platform Prentus, saw a $10,138 bill in roughly 30 minutes after attackers exploited his compromised API key. Isuru Fonseka in Sydney woke up to roughly AUD $17,000 in charges despite believing he had a $250 spending cap. What's wild is that neither of them intentionally enabled the higher-usage capabilities. Google's automated systems upgraded their billing tiers based on account history, raising their effective ceilings to as high as $100,000 without explicit consent. The company refunded them after the story went public, but told The Register it has no plans to change its automatic tier-upgrade policy, citing a priority on preventing service outages over enforcing users' stated budget preferences.

Let that sink in for a moment. The platform is making engineering decisions that prioritize uptime over user control, and then telling security-conscious developers that they need to take a platform approach and build security in from the start. The message is essentially "trust us, but also double-check everything, but also we won't tell you when things change."

## The Revocation Gap

What really got my attention was the follow-up report from Aikido security firm. They found that even when developers catch a compromised key and delete it immediately, they're not actually safe. There's a window of up to 23 minutes where the attacker can still use that key. During that window, success rates are unpredictably high. In some minutes, over 90% of malicious requests still authenticate. That's more than enough time for an attacker to exfiltrate files and cached conversation data from Gemini.

The kicker? Aikido's researcher Joseph Leon noted that Google's newer credential formats don't have this problem. Service account API credentials revoke in about five seconds, and Gemini's newer AQ-prefixed key format takes about a minute. Both run at Google scale. Both suggest this is technically solvable for Google API keys too. The 23-minute window isn't an engineering constraint. It's a matter of priorities.

This is the part that frustrates me the most. We keep being told that AI security is a board-level issue, that executives need to take it seriously, that it requires a fundamental shift in how we think about defense. All of that is true. But when a major cloud provider can't be bothered to prioritize a 23-minute revocation window for API keys, it's hard to take the broader security narrative seriously. The platforms are prescribing habits they themselves won't adopt.

## What This Means for Developers

Here's my honest take as someone who writes code and deploys to the cloud. The situation puts developers in an impossible position. We're told to trust platform providers, to build on their services, to take advantage of the economies of scale. But we're also told to assume those platforms might change things without notice, that our security settings might be silently overridden, and that even when we catch a problem and try to fix it, there's a 20-plus minute window where the damage can continue.

The practical implications are significant. If you're using Google Cloud services, you need to assume that any API key you create today might have capabilities you didn't authorize tomorrow. Audit your keys regularly. Set up billing alerts that actually work. Consider whether you need separate projects for different services to limit blast radius. And understand that the "delete key" button might not mean what you think it means.

More broadly, this highlights the trust gap that's forming in the cloud infrastructure space. When platform providers can't align their own operational practices with the security advice they give others, it erodes confidence. We end up in a situation where the CEO is right on stage but the engineering team is shipping something that contradicts the core message.

De Souza said there's no such thing as an AI strategy without a data strategy and a security strategy. He said they need to go hand in hand. I agree completely. I just wish the platforms holding our data and security would lead by example instead of making us build around their gaps.