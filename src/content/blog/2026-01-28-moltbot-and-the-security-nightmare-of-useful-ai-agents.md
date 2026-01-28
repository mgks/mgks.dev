---
title: "Moltbot and the Security Nightmare of Useful AI Agents"
description: "An AI assistant that actually does things sounds great until you realize it can execute arbitrary commands on your computer. Here's why that matters."
date: 2026-01-28 05:59:39 +0530
tags: rollup, artificial intelligence, open source, security
image: 'https://images.unsplash.com/photo-1739805591936-39f03383c9a9?q=80&w=2073'
featured: false
---

I've been watching the Moltbot saga unfold with a mix of excitement and dread. Here's a tool that finally delivers on the promise of AI agents that actually *do* things rather than just chat with you. It manages calendars, sends messages, checks you in for flights. The kind of stuff we've been promised for years but never quite got in a usable form.

And yet, every time I see another developer hyping it up on social media, I wonder how many of them understand what they're actually running.

## The Peter Steinberger Story

Peter Steinberger, known as @steipete online, built this thing for himself. After stepping away from PSPDFKit, he barely touched his computer for three years. When he finally found his spark again, he channeled it into building Clawd (later Molty, now Moltbot after Anthropic forced a rebrand). The tool started as his "crusted assistant" to manage his digital life and explore human-AI collaboration.

The name change is interesting in itself. He's a self-described "Claudoholic" who named his project after Anthropic's flagship product. They weren't having it. The lobster theme stayed, but the branding had to go. It's a reminder that even in the [open source](https://mgks.dev/tags/open%20source/) world, trademark lawyers are watching.

What caught my attention wasn't just another developer scratching their own itch. It's how quickly this thing exploded. Over 44,200 stars on GitHub in weeks. Cloudflare's stock jumped 14% in premarket trading because developers were using their infrastructure to run it locally. Social media buzz around an AI agent literally moved markets.

## The Problem With Things That Actually Do Things

Here's where my enthusiasm crashes into reality. Rahul Sood put it perfectly: "'actually doing things' means 'can execute arbitrary commands on your computer.'"

That sentence should make you pause.

Moltbot runs locally, which is good for privacy. It's open source, so you can inspect the code. These are the right choices from a [Technology](https://mgks.dev/tags/technology/) architecture standpoint. But the fundamental security model is terrifying once you think about it for more than five seconds.

Prompt injection through content is the nightmare scenario. Imagine someone sends you a WhatsApp message crafted to manipulate Moltbot into executing commands without your knowledge. Maybe it deletes files. Maybe it exfiltrates data. Maybe it installs something nasty. The attack surface is enormous because the whole point is that Moltbot has permissions to do useful things on your behalf.

You can mitigate some of this with careful setup. Different AI models have different resistance to prompt injection attacks. But Sood's advice is clear: run it on a VPS with throwaway accounts, not on your laptop with your SSH keys, API credentials, and password manager.

Which, let's be honest, defeats the entire purpose of having a useful [AI assistant](https://mgks.dev/tags/ai/).

## The Early Adopter Tax

If you don't know what a VPS is, you should probably sit this one out for now. I don't mean that as gatekeeping. I mean it as a genuine safety warning.

The developers tinkering with Moltbot right now understand what they're signing up for. They know about sandboxing, they understand the risks, they're comfortable running experimental software in isolated environments. That's fine. That's how we figure out what works and what doesn't.

But the hype cycle doesn't discriminate. When something goes viral, people who have no business running it will try to install it anyway. They'll see the promises of automation and productivity and won't read the security warnings carefully enough. Some of them will get burned.

Steinberger himself got a taste of this when he "messed up" the renaming. Crypto scammers immediately snatched his old GitHub username and created fake projects in his name. He had to warn people that any cryptocurrency project listing him as coin owner was a scam. Twenty fake X accounts popped up trying to impersonate the official @moltbot handle.

If the creator is getting scammed during a simple rebrand, what chance do casual users have?

## What This Means For AI Agents

The security-versus-utility tradeoff is the core problem facing AI agents right now. We want them to be useful, which means giving them permissions. But permissions are dangerous when the agent can be manipulated.

Running Moltbot safely today means running it in a way that makes it mostly useless. That's not a criticism of Steinberger or the project. It's just the state of the technology. We haven't solved the fundamental security problems yet, and some of those solutions might be beyond any single developer's control.

What Steinberger has done, though, is prove that AI agents can actually accomplish real tasks. He's shown the developer community what autonomous AI might look like when it's genuinely useful rather than just impressive in demos. That matters more than whether Moltbot itself becomes mainstream.

I keep thinking about those three years when Steinberger barely touched his computer after stepping away from PSPDFkit. Then he found his spark again by building something genuinely novel in the AI space. There's something poetic about a burned-out developer finding excitement in making AI agents do real work, even if the rest of us aren't quite ready for the security implications of that work.

The question isn't whether AI agents like Moltbot will eventually be safe enough for normal people to use without thinking twice. The question is whether we'll figure out the security model before someone gets seriously hurt trying to run one on their primary machine with all their actual accounts connected.