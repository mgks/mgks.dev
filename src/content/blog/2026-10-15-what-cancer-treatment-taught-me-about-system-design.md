---
title: "What Cancer Treatment Taught Me About System Design"
description: "A developer's perspective on information silos, specialization, and why centralized expertise matters when stakes are highest."
date: 2026-10-15 12:00:21 +0530
tags: rollup, engineering, systems-design, healthcare, decision-making
image: "https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?q=80&w=2070"
featured: false
---

In May 2026, I was diagnosed with squamous cell carcinoma in my mouth. I'm sharing this not for sympathy, but because the experience exposed something fundamental about how systems fail - and what we as engineers can learn from it.

The diagnosis itself wasn't shocking; the response to it was. I started treatment at my local community hospital, which seemed reasonable. Accessible, convenient, covered by insurance. But within weeks, I realized I was experiencing something like severe technical debt, except the cost was measured in weeks of my life rather than sprint velocity.

## Speed as a First-Class Metric

A critical question came up during my first treatment cycle. I asked my local oncologist about a specific pathology concern. He shrugged. "I'm not sure. We could look into it." That should have been my first warning sign.

When I transferred to MD Anderson Cancer Center, the same question was answered within 20 minutes. The doctor walked to the pathology lab, spoke directly with the pathologist he knew by first name, got an answer, and came back. No email chains, no inter-departmental handoff delays, no information loss in translation.

This is what happens when you centralize expertise and remove communication latency from critical paths. In engineering terms, we'd call it reducing round-trip time for blocking operations. Except in healthcare, blocking on information doesn't just hurt performance metrics - it costs time you can't get back.

HN commenter exhilaration's suggestion was specific: if you're within 2-3 hours of a major cancer center (check US News rankings), go there instead of your local hospital. Take vacation days. Book a hotel. The calculus is simple: the delta in outcomes is larger than the cost of travel.

## Why Distributed Knowledge Fails Under Pressure

I've built distributed systems. I understand the appeal: local autonomy, reduced single points of failure, scalability. But there's a category of problem where distribution introduces unacceptable latency and information loss. Cancer treatment is one.

Community hospitals are generalists. They handle 80% of cases well. But when you're in that 20% tail of complexity, you need access to specialists who've seen your specific problem hundreds of times. More importantly, you need those specialists to have existing relationships, shared language, and institutional knowledge.

This maps directly to how we should think about [system architecture decisions](https://mgks.dev/tags/systems-design/). Some domains benefit from decentralization. Others have natural monopolies on expertise that shouldn't be distributed.

## Information Velocity as a Competitive Advantage

What struck me most was how differently the two institutions operated:

At the community hospital: questions get documented, passed to someone who might know, who might get back to you in a few days. Or they don't, because the question wasn't formally tracked.

At the cancer center: questions get answered in real time because the infrastructure for rapid expert consultation is built into the daily workflow. The pathologist isn't in another building or on another email thread - they're an immediate peer.

This is organizational design, but it's also technical design. You can build all the systems and databases you want, but if the human communication layer is broken, information velocity collapses.

I keep thinking about how this applies to [decision-making in engineering teams](https://mgks.dev/tags/decision-making/). When we have distributed decision-making authority, we optimize for consensus and documentation. But we sacrifice something critical: the ability to get an expert answer immediately when it matters.

## The Cost of Being Right But Slow

Here's what nobody talks about: my local hospital probably would have gotten me the right treatment eventually. They're not incompetent. But "eventually" in cancer is its own diagnosis.

Every day of delayed treatment, every question that takes a week to answer instead of 20 minutes, every decision that requires three committee meetings instead of one conversation - these add up. Not just in medical outcomes, but in psychological burden, planning certainty, and the ability to optimize your own life around what's happening.

This is why speed matters as a metric, not just in startups but in any domain where the stakes are high and the problem space is complex.

I got lucky. I was able to transfer. I was able to take time off. I had insurance that covered both locations. Most people don't have all three. But that's another systems design problem - one where the system isn't optimized for outcomes, it's optimized for something else entirely.

The question I'm sitting with: how many of the systems we build are optimized for the wrong thing?