---
title: "Omarchy 4.0 and the Security Theater We Keep Accepting"
description: "A critical look at Omarchy's documented security failures and why marketing alone cannot substitute for fundamental development practices."
date: 2026-08-26 18:00:50 +0530
tags: rollup, engineering, security, linux, development-practices
image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2070"
featured: false
---

I need to be direct about this: I cannot recommend Omarchy to anyone who values the security of their machine, and I'm frustrated that I even have to write this post.

Omarchy 4.0 shipped with security issues that feel less like oversights and more like a masterclass in how not to handle untrusted input. Video title bash injection. Notifications running arbitrary bash commands. These aren't edge cases or advanced attack vectors. These are the kinds of vulnerabilities we've understood how to prevent for decades.

## The Pattern Matters More Than Individual Fixes

Every project has security issues. That's a fact of software development. What distinguishes a mature project from a careless one is *how* those issues arise and get addressed. When I see bash injection vulnerabilities in 2026, I'm not just seeing a bug. I'm seeing a development culture that either doesn't understand input validation or doesn't prioritize it enough to enforce it.

What concerns me most is the apparent use of AI-generated bash scripts to process untrusted input without meaningful review. This isn't a security issue in isolation, it's a symptom of a deeper problem: the team is optimizing for speed and features rather than correctness and safety. You cannot build a secure system on top of [unsafe development practices](https://mgks.dev/tags/development-practices/). You can patch individual vulnerabilities, sure. But you're always one step behind, always hoping the next person catches what the last person missed.

The math doesn't work in our favor with this approach. Attackers only need to find one exploit. Defenders need to find them all.

## Marketing Cannot Replace Security Architecture

What bothers me most isn't the vulnerabilities themselves, it's the messaging around them. DHH has been incredibly effective at positioning Omarchy as the polished, desktop-ready Linux distribution. The year of Linux on desktop has finally arrived, he tells us. The security team has fixed dozens of issues in the latest release, he announces.

This is technically true but deeply misleading.

Yes, the security team fixed issues. Yes, Omarchy is polished in many ways. But starting from a foundation full of preventable vulnerabilities and then patching them doesn't mean you have a secure system. It means you have a system with a long list of fixed vulnerabilities, which is not the same thing at all.

I don't think DHH is being deliberately dishonest, but I think he's optimized so hard for positive messaging that honesty has been squeezed out. The honest message would be something like: "We're prioritizing the user experience and feature velocity. Security is a consideration but not our primary constraint. If you work in an environment where security is critical, Omarchy may not be the right choice."

That would be refreshing. That would be trustworthy.

## What This Means for Your Company

I'm mentioning this because I've already seen discussions in some tech communities about whether companies should restrict Omarchy usage. I wouldn't be shocked to see formal bans within a year, particularly at organizations handling sensitive data or operating under regulatory requirements.

The [risk assessment](https://mgks.dev/tags/risk-assessment/) here is straightforward: if your machine runs Omarchy and connects to your company network, you're introducing known attack vectors into that environment. A compromised notification system or a maliciously crafted video title becomes an entry point.

This isn't hypothetical. This is documented in public security advisories.

I'm not here to tell you what to do. I'm genuinely not. But I am here to make sure that when you make a choice about what system to run, you're doing it with accurate information about the actual risk involved, not the sanitized version you get from marketing announcements.

The team behind Omarchy has made their priorities clear through their actions, not their words. And their actions tell me they care far more about iterating on the user experience than about building secure foundations. You can do both, but you have to actually try. You have to enforce standards. You have to say no to AI-generated bash scripts processing untrusted input.

They haven't done that, and we shouldn't pretend they have just because the messaging is slick.

If we keep accepting this gap between stated values and actual practices, we're just training the industry to optimize marketing instead of security.