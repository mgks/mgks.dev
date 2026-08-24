---
title: "seL4 Reaches Full Arm Support: What This Means for Verified Systems"
description: "Proofcraft completes formal verification of seL4 across all Arm platforms, including confidentiality proofs on AArch64. Here's why this matters for security-critical systems."
date: 2026-08-24 18:00:50 +0530
tags: rollup, engineering, formal-verification, kernel-security, systems-engineering
image: "https://images.unsplash.com/photo-1765707886613-f4961bbd07dd?q=80&w=988"
featured: false
---

Five years in, Proofcraft has quietly accomplished something remarkable: they've formally verified that seL4 enforces complete security isolation on AArch64, and extended verified support across 100% of Arm platforms the kernel runs on. This isn't just another incremental security improvement. It's a fundamental shift in how we can reason about the trustworthiness of systems that matter.

I think most of us working in systems engineering have accepted a uncomfortable truth: we can't really know if our kernels are secure. We can test them. We can audit them. We can throw fuzzing and static analysis at them. But formal mathematical proof of security properties? That's been the domain of academia and defense contractors, not the practical world most of us inhabit.

until now.

## What Changed

The significance here goes beyond having integrity and confidentiality proofs for AArch64. The fact that seL4 proofs now cover 100% of supported Arm platforms means developers can actually choose their hardware without sacrificing verification. Need ARMv7? Supported. ARMv8? Supported. You're not forced into a specific processor just to get formally verified code.

This matters because it removes a barrier to adoption. Previously, using seL4 meant committing to specific hardware. Now it means you can pick the Arm platform that makes sense for your use case, whether that's embedded systems, mobile infrastructure, or automotive applications, and you know the kernel code running underneath is provably secure.

The confidentiality proof is equally important. Information flow control is hard. Really hard. Before this work, systems using seL4 for information flow enforcement required fully static schedules compiled into the kernel. That means you had to pre-allocate time slices for each security domain at compile time for the entire lifetime of your system. It's inflexible and impractical.

Proofcraft solved this with semi-static domain schedules, allowing systems to shift between phases with different timing requirements. Your boot phase might need longer time slices to spin up virtual machines. Your operational phase needs responsiveness. Now you can support both while maintaining formal guarantees about information flow.

## The Practical Implications

Here's what I find most interesting: this isn't just about higher assurance for military or government systems. Mixed-criticality real-time systems are the future. Automotive is the obvious example, but think about industrial control systems, medical devices, and infrastructure components that need to run both safety-critical and non-critical applications on the same hardware.

The MCS (Mixed-Criticality Scheduling) configuration of seL4 now has formal correctness proofs for RISC-V, with Arm64 coming next. For automotive developers especially, this is significant. You can run your safety-critical AUTOSAR stack and your convenience features on the same hardware with formal proof that they can't interfere with each other.

The work on iteration algebra by Klein and colleagues illustrates something important about how modern verification works. They're not just checking existing designs. They're developing better mathematical frameworks that make verification itself more efficient. Better algebra in Isabelle/HOL means faster proofs and more complex systems can be verified in reasonable timeframes.

For developers, this translates to something concrete: the tools and techniques for formal verification are improving. Systems that would have taken years to verify five years ago might take months now. That curve will continue.

## Where This Leaves Us

Three large projects are now running in parallel, funded by DARPA, Germany's Cyberagentur, and the UK's NCSC. That level of institutional support signals something: formal verification of kernels has moved from research curiosity to strategic infrastructure concern. Every major power is investing in this.

The seL4 work on static multikernel configurations represents another frontier. Applications can leverage multiple CPU cores for performance while maintaining formal isolation guarantees at the kernel level. That's where practical performance meets proven correctness.

What strikes me most is how this challenges conventional thinking about the security maturity curve. Typically we've assumed that perfect security knowledge is incompatible with practical software. seL4's journey proves that assumption wrong. You can have formal proof and real-world performance if you're willing to invest in the right foundations.

The question isn't whether formal verification matters anymore. The question is why we're not using it everywhere it actually matters.