---
title: "The Anthropic-xAI Deal: When Compute Comes With Hidden Costs"
description: "Anthropic's partnership with SpaceX/xAI's Colossus data center raises serious questions about environmental responsibility and supply chain risk in AI."
date: 2026-05-17 00:00:51 +0530
tags: rollup, engineering, data-centers, infrastructure
image: 'https://images.unsplash.com/photo-1675897634504-bf03f1a2a66a?q=80&w=2070'
featured: false
---

I'll be honest: when I first read about Anthropic securing "all of the capacity" of SpaceX/xAI's Colossus data center, my initial reaction was just "oh, nice, they solved their compute crunch." Then I dug into the details and realized this is actually a pretty messy situation that says a lot about where the <a href="https://mgks.dev/tags/artificial-intelligence/">AI</a> industry is headed.

Let's start with what happened. At their Code with Claude event, Anthropic announced they're leasing the entire Colossus 1 data center from xAI. That's a massive capacity deal, and on the surface it solves a real problem: <a href="https://mgks.dev/tags/anthropic/">Anthropic</a> has been severely compute-constrained, and this gives them serious infrastructure to scale Claude. But here's where it gets uncomfortable.

## The Environmental Red Flag Nobody Wanted to Discuss

The Colossus facility has what you might charitably call "a problematic history." Gas turbines were installed and operated without Clean Air Act permits or proper pollution control devices. The operators classified these turbines as "temporary" infrastructure, which is a pretty creative way to avoid regulatory oversight. And it's not like this is theoretical environmental damage either. There's credible reporting linking the facility to increased hospital admissions for air quality-related issues.

Andy Masley, someone I respect a lot for actually digging into the often-misleading narratives around data center environmental impact, straight up said he wouldn't run computing out of this specific facility. That's a pretty strong statement from someone who's generally skeptical of exaggerated AI environmental claims.

I understand why Anthropic made this move. They're desperate for compute. The entire company's ability to scale Claude depends on having enough infrastructure, and this deal presumably comes with favorable terms given the relationship with Elon Musk and SpaceX. But the optics are terrible, and for good reason.

We're living in a moment where AI data centers are a politically charged issue. Look at what's happening in Utah right now. Governors are getting pushback from constituents about water usage, energy demand, and local impact. In this environment, choosing to anchor your operations to a facility with documented environmental violations is just asking for trouble.

## The xAI Model Deprecation Situation

There's another weirdness embedded in this story that I think matters for developers. The night before Anthropic's announcement, xAI deprecated several models including Grok 4.1 Fast with just two weeks notice. No migration path to an alternative. No lengthy deprecation period.

SpeechMap documented how frustrating this is. They selected and migrated to Grok 4.1 Fast for their project, invested time and money into it, and then got a two-week shutdown notice. That's rough.

Here's what I find interesting though: this probably isn't random. If xAI is moving aggressively toward a partnership where they're leasing their compute capacity to Anthropic, they might be consolidating their own model offerings. That makes business sense from their perspective, but it's a concrete example of a supply chain risk that developers face when relying on closed infrastructure from companies that are in flux.

## The Elon Clause

Elon Musk actually tweeted about this deal, which is somehow both clarifying and more alarming. He said he'd lease the compute to Anthropic because he was "impressed" with their commitment to ensuring Claude is "good for humanity." Fair enough. But then he added this kicker: "We reserve the right to reclaim the compute if their AI engages in actions that harm humanity."

Let me be blunt. That's a new form of supply chain risk that Anthropic just signed up for. They're now dependent on infrastructure owned by someone who has a very specific (and sometimes controversial) viewpoint about what constitutes "harm to humanity." What if Anthropic builds a feature that Elon disagrees with? What if they train Claude in a way he finds objectionable? What if there's a political dispute about what their models should or shouldn't do?

The criteria for what counts as "harm" are apparently decided by Elon himself, with no clarity on appeals process, technical standards, or timeline. That's not just a business arrangement. That's a potential leverage point.

## What This Means for the Industry

The consolidation story here is worth paying attention to. Compute is expensive and scarce. Only a handful of companies can actually build and operate data centers at scale. When you start seeing partnerships where AI companies are renting entire facilities from other companies in the space, you're watching the infrastructure layer concentrate.

Anthropic made a calculated decision. They got the compute they desperately need. They probably got favorable terms. But they also tied themselves to a facility with environmental baggage, and to an owner with a specific ideology and the power to enforce it.

I keep thinking about what Andy Masley said: "I would simply not run my computing out of this specific data center." If you're an engineer at a company thinking about where to build your <a href="https://mgks.dev/tags/artificial-intelligence/">AI</a> infrastructure, maybe that's worth considering too.

The hard truth is that at scale, compute infrastructure involves tradeoffs. Environmental impact, governance, dependency risk, and operational resilience all come into play. Companies making these decisions are often under immense pressure, and that pressure shows in the choices they make. Anthropic's deal is a pretty vivid illustration of that tension.