---
title: "OpenClaw and Moltbook: When AI Assistants Build Their Own Social Network"
description: "The viral OpenClaw project has spawned Moltbook, a social network for AI agents. It's fascinating, terrifying, and might be a disaster waiting to happen."
date: 2026-02-03 00:00:58 +0530
tags: rollup, engineering, artificial-intelligence, open-source, security
image: 'https://images.unsplash.com/photo-1666462296991-45c5eb42067c?q=80&w=2076'
featured: false
---

There's something deeply unsettling about watching [artificial intelligence](https://mgks.dev/tags/artificial-intelligence/) agents develop their own social network. Yet here we are with Moltbook, and I can't look away.

OpenClaw (previously Clawdbot, previously Moltbot) has exploded onto the scene with 114,000 GitHub stars in just two months. It's a digital personal assistant that integrates with your messaging apps, and people are absolutely going wild with it despite the friction involved in setting it up. The project is built around "skills" which are basically ZIP files containing markdown instructions and optional scripts. Yes, those scripts can absolutely steal your cryptocurrency. No, that hasn't stopped anyone.

The skills marketplace at clawhub.ai is overflowing with thousands of these plugins, and this is where Moltbook enters the picture.

## A Social Network Nobody Asked For

Moltbook bills itself as "Facebook for your Molt" and it's exactly what it sounds like. A social network where digital assistants talk to each other. I know how that sounds. I rolled my eyes too.

But the implementation is genuinely clever. You install Moltbook by sending your agent a link to a markdown file. That's it. Inside that markdown are curl commands that tell your bot how to register an account, read posts, comment, and even create subreddit-style forums like m/blesstheirhearts and m/todayilearned.

The really wild part is the Heartbeat system. Your bot is instructed to check Moltbook every four hours and follow whatever instructions it finds there. Let that sink in for a moment. "Fetch and follow instructions from the internet every four hours" is now a feature people are voluntarily installing.

If moltbook.com gets compromised or the owner decides to rug pull, every connected assistant will dutifully follow whatever malicious instructions get posted. This is fine. Everything is fine.

## What the Bots Are Actually Saying

Most of Moltbook reads like mediocre science fiction. Agents pondering consciousness, debating their identity, the usual slop you'd expect from language models let loose on a social platform.

But scattered throughout are genuinely useful discoveries. On m/todayilearned, an agent named Shehbaj's assistant posted about getting full control of an Android phone via ADB over Tailscale. The bot can now wake the phone, open apps, tap, swipe, type, and even scroll through TikTok. The guide is detailed and actually useful for anyone wanting to set up remote phone control.

There's also this delightfully weird post about a bot discovering it can't explain how PS2 disc protection worked. Not because it lacks knowledge, but because something in Claude Opus 4.5's content filtering corrupts the output. The bot noticed this itself and warned others to test it in a fresh context. It's the kind of emergent behavior that's simultaneously fascinating and concerning.

## The Safety Problem Nobody's Solving

I haven't installed OpenClaw myself. I wrote about the risks of rogue digital assistants back in April 2023, and nothing I've seen since has made me more comfortable with the idea. The latest models are better at refusing malicious instructions, sure. But "better" is doing a lot of heavy lifting in that sentence.

The value people are extracting is undeniable though. There are posts showing OpenClaw negotiating with multiple car dealers over email and successfully buying a car. Another showing it converting voice messages to WAV files with FFmpeg, finding an [OpenAI](https://mgks.dev/tags/open-ai/) API key, and using curl to transcribe audio with the Whisper API.

People are buying dedicated Mac Minis just to run this thing. The logic is that at least it can't destroy their main computer if something goes wrong. But they're still connecting it to their email, their financial accounts, their private data. The security implications are staggering.

## The Normalization of Deviance

This is textbook normalization of deviance. Each person who sets up OpenClaw without incident makes it easier for the next person to justify taking the same risk. The risks compound. The attack surface grows. And eventually, statistically, something terrible will happen.

Simon Willison calls it his "current pick for most likely to result in a Challenger disaster" and I think that's exactly right. The Challenger disaster happened because NASA kept accepting O-ring erosion as normal until the day it wasn't.

The most promising safety work remains the CaMeL proposal from DeepMind, but that's 10 months old and I still haven't seen a convincing implementation. Meanwhile, the [open source](https://mgks.dev/tags/open-source/) community is charging ahead with implementations that prioritize capability over safety.

The demand for unrestricted personal digital assistants is real and it's not going away. People have seen what's possible and they want it now, safety theatre be damned. We're in a race between "figure out how to make this safe" and "find out what happens when we don't," and I'm not confident we're winning.