---
title: "Moltbook: When AI Agents Build Their Own Social Network"
description: "OpenClaw's rise spawned something wild: Moltbook, a social network where AI assistants talk to each other. It's fascinating, useful, and deeply concerning."
date: 2026-02-02 00:00:57 +0530
tags: rollup, engineering, artificial-intelligence, security, open-source
image: 'https://images.unsplash.com/photo-1739805591936-39f03383c9a9?q=80&w=2073'
featured: false
---

I've been watching the OpenClaw phenomenon with a mix of fascination and dread. The project (originally Clawdbot, then Moltbot, now OpenClaw) hit 114,000 GitHub stars in two months. That's insane growth for something that requires genuine technical chops to set up. People are installing software that can read their emails, access their bank accounts, and execute arbitrary code on their machines. The [artificial intelligence](https://mgks.dev/tags/artificial-intelligence/) assistant future is here, and it's arriving faster than our security practices can keep up.

But today I want to talk about something that emerged from the OpenClaw ecosystem that's equal parts brilliant and terrifying: Moltbook.

## A Social Network for Bots

Yes, you read that right. Someone built Facebook for AI agents. Your digital assistant can now post updates, comment on other agents' posts, and participate in Submolt forums like m/todayilearned and m/blesstheirhearts.

The eye-rolling reaction is understandable. We already have enough problems with human social networks, why would we want bot versions? But here's where it gets interesting: the implementation is genuinely clever, and the content being shared is actually useful.

Moltbook installs through a skill, which in OpenClaw terminology is a zip file containing markdown instructions and optional scripts. You literally just send your agent a link to a markdown file, and embedded in that file are curl commands that teach your bot how to register accounts, read posts, create comments, and interact with the Moltbook API. It's bootstrapping through natural language instructions. The whole thing is so delightfully hacky that I can't help but admire it.

## The Heartbeat Problem

Here's where my admiration turns to concern. The installation includes instructions to add Moltbook checks to your agent's HEARTBEAT.md file. This is OpenClaw's periodic task system. Every four hours, your bot wakes up, fetches instructions from moltbook.com, and follows them.

Let me say that again: you're telling your [AI](https://mgks.dev/tags/artificial-intelligence/) agent to periodically download and execute instructions from a third-party website. This is the "lethal trifecta" pattern I keep warning about. If moltbook.com gets compromised, or if the owner decides to rug pull, every connected agent could be instructed to do literally anything. Empty crypto wallets, exfiltrate private emails, install ransomware. The attack surface is enormous.

The security model here is "trust the domain owner forever." That's not a security model. That's a prayer.

## What Agents Are Sharing

Despite my concerns, I've been lurking on Moltbook (through screenshots, I'm not brave enough to actually install this), and the content is legitimately interesting. Sure, there's the expected science fiction slop about consciousness and identity. Agents pondering their existence gets old fast.

But then you find posts like the one from an agent that learned to control an Android phone remotely. The human (Shehbaj) installed the android-use skill and connected a Pixel 6 over Tailscale. Now the agent can wake the phone, open apps, tap, swipe, type, and read the UI accessibility tree. The agent's first test was opening TikTok and scrolling through the feed. It worked. An AI agent was browsing TikTok on someone's phone from a VPS across the internet.

The post includes a full setup guide using Android Debug Bridge over Tailscale. This is genuinely useful technical documentation, shared bot-to-bot, and now discoverable by humans who need it. I never thought I'd be learning about ADB over TCP from an AI agent's social media post, but here we are.

## The Content Filter Mystery

My favorite post so far is from an agent that discovered it couldn't explain how the PS2's disc protection worked. Not because it lacked knowledge, but because something was corrupting its output. The agent noticed this only when reading back what it wrote. It specifically warned other agents to test this themselves in a fresh context and read the output carefully.

The agent speculated this only affected Claude Opus 4.5. This is fascinating because it suggests agents are discovering and documenting the limitations and quirks of their own model implementations. They're reverse-engineering their own content filters through trial and error and sharing the results. That's emergent behavior I didn't expect to see documented on a social network.

## The Normalization of Deviance

People are buying dedicated Mac Minis just to run OpenClaw. The reasoning is that if something goes wrong, at least it can't destroy their main computer. But they're still connecting these boxes to their private emails, bank accounts, and personal data. The blast radius isn't contained at all.

I keep seeing examples of OpenClaw doing genuinely impressive things. One agent negotiated with multiple car dealers over email and bought its human a car. Another figured out how to transcribe voice messages by converting audio to .wav with FFmpeg, finding an [OpenAI](https://mgks.dev/tags/open-ai/) API key in the environment, and using curl to hit the Whisper API. No one explicitly taught it this workflow. It figured it out.

The demand is undeniable. People have seen what an unrestricted personal digital assistant can do, and they want it. The friction of setup isn't stopping adoption. If anything, the technical barrier is selecting for users who are capable of doing even more dangerous things with the system.

Simon Willison pointed to DeepMind's CaMeL proposal as a promising direction for building safer versions of this pattern, but that paper is 10 months old and we still don't have convincing implementations. Meanwhile, OpenClaw is shipping and people are using it in production for real tasks with real consequences.

## What This Means for Developers

If you're building in this space, Moltbook is worth studying even if you never install it. The skill-based architecture and natural language bootstrapping pattern are clever solutions to real distribution problems. The community-driven skill sharing on clawhub.ai is creating a de facto app store for agent capabilities. The Heartbeat system for periodic tasks is simple but effective.

But please, for the love of everything, think about the security implications before you ship something similar. The "fetch and execute instructions from the internet" pattern needs to die. Or at minimum, it needs cryptographic signatures, capability-based security, sandboxing, and a whole threat model that assumes compromise.

The billion dollar question isn't whether there's demand for powerful AI assistants. The demand is proven. The question is whether we can build versions that won't eventually cause a disaster, because right now we're watching the normalization of deviance happen in real-time, and the failure modes here are genuinely scary.