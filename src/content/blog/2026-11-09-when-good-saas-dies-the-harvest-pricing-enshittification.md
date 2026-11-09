---
title: "When Good SaaS Dies: The Harvest Pricing Enshittification"
description: "Bending Spoons acquired Harvest and 10xed prices overnight. What this tells us about SaaS consolidation and why developers should be wary."
date: 2026-11-09 12:00:22 +0530
tags: rollup, engineering, saas, business, enshittification
image: "https://images.unsplash.com/photo-1727434032792-c7ef921ae086?q=80&w=2232"
featured: false
---

I've been a self-employed contractor for about a decade now, and I'm genuinely bummed about Harvest.

Harvest was a time-tracking and invoicing service that did exactly one thing well: it let you track hours, generate invoices, send them to clients, and close them out when payment arrived. There was a Stripe integration for accepting cards and ACH transfers. A simple chart showing billed and paid amounts over time. A table of invoices. That's it. It solved a well-defined problem with a reliable, simple interface at a reasonable price.

Harvest was the textbook example of what good SaaS should be: focused scope, no feature bloat, no blockchain integration, no AI upcharging. I genuinely raved about it to every freelancer I met.

Then Bending Spoons acquired it in 2025, the same company that gutted Vimeo. I was nervous but busy, so I didn't immediately jump ship.

## The Price Explosion

This month my invoice arrived. Harvest raised my price from $13.32 to $133.98 per month. Not a typo. That's roughly 10x the cost overnight.

Their justification? I'm now on an "enterprise" plan with "unlimited" usage. Except I haven't changed my usage at all. I send maybe 50 invoices a year. The feature set is identical to what I had before. The infrastructure costs them haven't shifted.

Bending Spoons offers a cheaper "flex" plan at $12.65 per month that gets you close to the original price. But there's a catch: they now skim an additional 2% on top of Stripe's standard 2.9% + $0.30 per transaction.

Let me be crystal clear about what that means. Stripe's 2.9% covers the actual infrastructure: the payment networks, Mastercard and Visa's operations, fraud detection, chargeback handling, the entire financial apparatus. Harvest isn't doing any of that work. They're just wrapping a Stripe form in their UI and charging you 2% of your gross revenue for the privilege. If you're a contractor with $100k in annual revenue, that's an extra $2,000 per year to send PDFs and redirect to someone else's payment processor.

## When Support Becomes AI Spam

I emailed Harvest's support to ask about this pricing change. Their response? An LLM repeatedly vomiting thousands of words at me, none of it addressing my actual question. No human read my email. No human considered my specific situation. I got hallucinated support articles and generic troubleshooting steps.

This is the second enshittification layer. The first layer is the price gouging. The second is the complete abandonment of customer service in favor of automated responses that create the illusion of support without any actual help.

## What This Means for Developers

If you're a developer who builds or relies on SaaS tools, this should worry you. Consolidation in the SaaS space is moving faster than ever. A small, focused product that's beloved by its users is an acquisition target, not a moat. Once acquired, the calculus changes completely.

The acquirer isn't buying your love for the product. They're buying your existing customer base and the revenue stream attached to it. They're not optimizing for your satisfaction anymore. They're optimizing for short-term revenue extraction. The playbook is mechanical: raise prices until some percentage of customers churn, capture the remaining revenue increase as profit, rinse and repeat.

This has [implications for how we evaluate business models](https://mgks.dev/tags/business/) in tech. The companies we should trust aren't necessarily the most funded or the fastest-growing. They're the ones that seem structurally aligned with their users' incentives. That means being skeptical of acquisitions. It means preferring indie developers and small teams. It means, when possible, using open-source tools or [self-hosted alternatives](https://mgks.dev/tags/indie-software/) that don't have acquisition exit events baked into their DNA.

Several people in the comments suggested Cushion (a freelancer-focused invoicing app by a solo developer), Odoo, and Billy as alternatives. I'm also eyeing open-source options now. The pattern is clear: when your SaaS vendor gets acquired by a financial engineering firm, it's time to leave.

The real question isn't whether Bending Spoons will continue extracting value from Harvest until it's a zombie product. It's whether we'll keep trusting our core business workflows to companies whose incentives are fundamentally misaligned with ours.