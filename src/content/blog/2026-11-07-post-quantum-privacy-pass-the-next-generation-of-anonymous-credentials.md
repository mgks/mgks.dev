---
title: "Post-Quantum Privacy Pass: The Next Generation of Anonymous Credentials"
description: "How Cloudflare and partners are designing MOLE to bring post-quantum cryptography to Privacy Pass, solving the size and adaptability challenges ahead."
date: 2026-11-07 06:00:20 +0530
tags: rollup, cloud, post-quantum, cryptography, privacy
image: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?q=80&w=2070"
featured: false
---

I've been following the cryptography community's work on post-quantum transitions closely, and there's a narrative that often gets overlooked: most discussions focus on TLS and digital signatures, but the real complexity lies in anonymous credentials. Privacy Pass, the protocol that powers rate limiting without sacrificing user privacy, is about to face its biggest challenge yet.

Cloudflare and collaborators just published research on MOLE (Moderation Of unLinkable Endorsements), a breakthrough in post-quantum anonymous credentials. This isn't just another incremental improvement. It represents a fundamental shift in how we think about building privacy-preserving systems for an era when quantum computers will break RSA and elliptic curve cryptography.

## Why Privacy Pass Matters More Than You Think

Privacy Pass seems like a narrow use case, but it's become critical infrastructure. It powers everything from iCloud Private Relay to Cloudflare's own services. The protocol lets users prove they're legitimate without revealing their identity. Crucially, tokens are unlinkable to their issuance, meaning neither the server nor any observer can correlate when a token was issued to when it was redeemed.

Today, Privacy Pass relies on classical cryptography. Post-Q-day, an attacker with a quantum computer could forge tokens at will. The unconditional privacy guarantee would survive (no attacker, quantum or classical, can link token redemption to issuance), but the authentication mechanism collapses. That's a massive problem for site operators trying to manage traffic and prevent abuse.

What's interesting about this situation is the breathing room it creates. We have time to research alternatives, but not unlimited time. NIST's post-quantum cryptography standards are already finalized. ML-DSA signatures are now official guidance. Yet these drop-in replacements create massive overhead: ML-DSA-44 signatures are 2,420 bytes versus 64 bytes for ECDSA-P256. For large-scale systems, that's not just a minor inconvenience.

## The Adaptability Problem Nobody's Talking About

Here's where things get genuinely difficult. Post-quantum schemes like ML-DSA are heavily optimized for their specific purpose. The underlying mathematical framework could theoretically support many applications, but the parameters are tuned for digital signatures. Trying to use those same parameters for other primitives often breaks security or efficiency.

MOLE sidesteps this by introducing a new abstraction layer. Instead of trying to squeeze different credential types into one scheme, MOLE separates concerns through endorsements and credentials. An endorsement proves you were issued a token by one of several trusted anchors without revealing which one. Then a moderator issues you a credential based on that endorsement.

This might sound like indirection for indirection's sake, but it's actually elegant. The endorsement layer can be built with post-quantum blind signatures. The credential layer can use whatever mechanism makes sense for the specific use case, whether that's anonymous rate-limiting tokens or something more sophisticated. You get compositional flexibility without forcing all credential types into a single mathematical framework.

## The VOLEitH Breakthrough Changes the Game

The real breakthrough here comes from VOLEitH (Vector Oblivious Linear Evaluation in the Head), a zero-knowledge proof system that's surprisingly efficient for statements involving small fields. The proofs are linear in witness size, not succinct, but they're concretely small for certain classes of problems.

Why does this matter? Because you can build post-quantum signatures on top of this. KuMQuat signatures based on multivariate quadratics produce 2.6KB signatures. FAEST signatures using AES achieve around 4KB. These aren't revolutionary by single-metric standards, but they're genuinely usable for many applications. More importantly, the underlying proof system is flexible enough to support different credential types without requiring completely different cryptographic designs.

This connects directly to my earlier piece on [cryptographic agility](https://mgks.dev/tags/cryptography/). We need systems that can evolve as threats evolve and new research emerges. MOLE's architecture provides that flexibility where earlier approaches would have required ground-up redesigns.

## What Developers Need to Know

If you're building privacy-sensitive applications or operating large-scale infrastructure, pay attention to this research trajectory. The transition to post-quantum cryptography isn't just about swapping algorithms. It's about rethinking how we compose cryptographic primitives and manage the tradeoffs between efficiency and flexibility.

The work on MOLE suggests that the post-quantum web won't simply be a larger version of today's web. It'll require architectural changes. Those changes might involve more round-trips, larger messages, or different trust models. Systems designed with rigid assumptions about cryptographic overhead are going to feel that pain most acutely.

I'm also struck by how this research reveals the difference between cryptographic theory and engineering. Theoretically sound doesn't mean practically deployable at scale. The Cloudflare team is grappling with this directly: how do you make post-quantum systems that don't just work, but work everywhere the classical versions do, for essentially unlimited combinations of use cases?

The answer isn't a silver bullet algorithm. It's careful system design and architectural flexibility, which is far more interesting (and far harder) than most people realize.