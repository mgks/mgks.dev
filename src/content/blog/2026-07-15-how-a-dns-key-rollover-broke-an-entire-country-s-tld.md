---
title: "How a DNS Key Rollover Broke an Entire Country's TLD"
description: "On July 3, 2026, Albania's .AL TLD went dark due to a botched DNSSEC key rollover. Here's what happened and what it means for DNS infrastructure."
date: 2026-07-15 06:00:32 +0530
tags: rollup, cloud, dns, dnssec, infrastructure
image: "https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?q=80&w=2070"
featured: false
---

On July 3, 2026, I watched something fascinating unfold in real-time: Albania's entire .AL top-level domain became unreachable. Not because of a DDoS or a data center failure, but because of a single mistake during a DNSSEC key rollover.

What struck me most wasn't the outage itself, but how it exposed a fundamental gap in how we communicate DNS failures to the people relying on them. This incident forced the industry to solve a problem that's been hiding in plain sight for years.

## When Key Rollovers Go Wrong

Around 14:15 UTC that day, Albania's communications authority (AKEP) attempted to roll over their DNSSEC signing key. This is routine maintenance, something that should be invisible to end users. Except something went catastrophically wrong.

The operator published a new DNSKEY but didn't coordinate with the root zone operators managing the Delegation Signer (DS) records. The root zone still pointed to the old key. Any DNS resolver attempting to validate responses from .AL nameservers found no matching key and failed validation. This isn't a rare edge case either; validating resolvers like Cloudflare's 1.1.1.1 are becoming increasingly common.

What happened next was worse. Instead of rolling back to the old key, the operator removed the new DNSKEY entirely without restoring the old one. The zone now had no valid signing keys at all. The DS record in the root still existed, pointing to a key that no longer existed. From a DNSSEC perspective, the chain of trust had completely shattered.

This wasn't just affecting one domain. The .AL TLD hosts government services, banks, and media outlets. Every single domain under .AL became unreachable to anyone using a validating DNS resolver. This is the scenario that keeps infrastructure engineers up at night: a single human error cascading across an entire namespace.

## The Invisible Workaround

Cloudflare responded by installing a Negative Trust Anchor (NTA), temporarily treating .AL as unsigned and bypassing DNSSEC validation entirely. This restored resolution, but introduced a profound problem: no one could tell from the DNS response itself that validation had been bypassed.

A client receiving an answer under an NTA has zero way to distinguish a legitimate response from a spoofed one. The response looks identical to a fully validated answer. This is why I found Cloudflare's move during the .AL incident so significant: they implemented something new.

For the first time, 1.1.1.1 returned Extended DNS Error (EDE) code 33 alongside every affected response. This new code, formally titled "Disclosure of Negative Trust Anchors in DNS Responses," signals exactly what happened: the answer is real, but it wasn't DNSSEC-validated because an NTA was active.

## Why This Matters for Developers

I think many of us have treated DNSSEC as some abstract infrastructure concern, something that happens at the resolver level. The .AL incident proves that's dangerously naive.

If you're building monitoring tools, security applications, or even simple health checks, you now need to handle EDE 33. You need to understand that a successful response doesn't automatically mean DNSSEC validation succeeded. You need to be aware that for hours at a time, an entire TLD might be operating without cryptographic DNS protections.

This also creates a new kind of operational visibility we didn't have before. Developers and operators can now detect when their DNS provider has installed an NTA, rather than discovering it through status pages or community posts. For those of us building on top of DNS, that's enormously valuable.

## A Broader Pattern

This was the second major TLD-level DNSSEC failure in two months. May saw Germany's .DE TLD experience a similar incident. This isn't coincidence; it's pointing to systemic issues in how DNSSEC key management is coordinated between TLD operators and root zone operators.

The technical solution is elegant: RFC 7646 defined NTAs, and the IETF DNSOP working group is now standardizing EDE 33 to make them visible. But the deeper lesson is about communication and coordination in critical infrastructure.

The irony that I can't help but notice: the .AL operator's contact information was itself under .AL, making it unreachable during the outage. Cloudflare had to post on Mattermost to get attention. We're building DNS infrastructure that's supposed to be resilient and fail-safe, yet basic operational communication channels collapsed.

Understanding how [DNSSEC validation works](https://mgks.dev/tags/dnssec/) and [DNS infrastructure patterns](https://mgks.dev/tags/infrastructure/) has moved from optional knowledge to essential context for anyone building systems that depend on name resolution.