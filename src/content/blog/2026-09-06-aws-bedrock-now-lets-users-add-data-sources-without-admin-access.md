---
title: "AWS Bedrock Now Lets Users Add Data Sources Without Admin Access"
description: "Amazon Bedrock's new user-managed setup for SharePoint, OneDrive, and Confluence eliminates the need for IT admin credentials, making RAG implementations faster for development teams."
date: 2026-09-06 12:00:20 +0530
tags: rollup, cloud, aws, rag, ai-infrastructure
image: "https://images.unsplash.com/photo-1535378917042-10a22c95931a?q=80&w=2070"
featured: false
---

AWS just shipped something that sounds minor but actually solves a real friction point I've encountered in enterprise AI projects: user-managed setup (3LO authentication) for data sources in Amazon Bedrock Managed Knowledge Base.

Let me explain why this matters. Previously, if you wanted to connect SharePoint, OneDrive, or Confluence to Bedrock for retrieval-augmented generation (RAG), you had to go through your IT department and ask them to generate service account credentials. This wasn't just inconvenient, it was a blocker. Some teams would wait weeks. Others would just abandon the idea and build RAG solutions elsewhere.

## The Authentication Friction That Slowed Teams Down

The old two-legged OAuth (2LO) approach required service accounts with admin-level permissions. Here's the problem: most developers don't have access to create those credentials. Your IT security team does. So you'd file a ticket, explain what you need, wait for approval, get the credentials, then finally configure your knowledge base. By then, your weekend prototype deadline has passed.

I've seen this pattern kill momentum on AI projects. The technology wasn't hard, but the process was bureaucratic. It turned a 30-minute setup into a multi-week coordination nightmare.

Now with three-legged OAuth (3LO), you just sign in with your own credentials. Your personal OneDrive. Your Confluence account that you already use daily. Bedrock handles the authentication behind the scenes. Setup goes from weeks to minutes.

## What This Enables

The practical impact is significant. Developers can now prototype AI assistants grounded in enterprise data without waiting for IT approvals. A team lead can spin up a proof-of-concept on Friday afternoon and demo it Monday morning. This is the velocity that actually matters for AI experimentation.

I think we're going to see faster adoption of [rag-architecture](https://mgks.dev/tags/rag-architecture/) patterns in enterprises because of this. When the friction drops, teams try more things. More experiments means better implementations faster.

The other thing worth noting: AWS kept the service account path for production. This is smart. Your enterprise AI assistant running in production should probably authenticate programmatically with proper audit trails. But for development, for prototyping, for getting to "does this even work," user-managed setup is the right approach.

## The Broader Industry Signal

This change reflects something important happening across AI infrastructure right now. The barrier to entry keeps dropping. Six months ago, connecting enterprise data to LLMs required deep infrastructure knowledge. Now it's a few clicks and a sign-in prompt.

That democratization is real, and it worries some people in the traditional infrastructure space. But I think it's healthy. The companies that win with AI won't be the ones who built the fanciest infrastructure. They'll be the ones who experimented fastest and learned what actually works for their business.

Bedrock's user-managed setup helps that happen. It removes the excuse "we need IT to do this." Now you just need five minutes and your own credentials.

## What's Still Missing

I should be honest about the limitations. User-managed setup works for these three data sources. If you need to connect Salesforce, ServiceNow, or your custom internal systems, you're still probably going to need service accounts or more complex authentication. And that's fine, those are harder problems.

Also, this approach scales better for teams of 5-10 than teams of 100. When you're managing 100 different AI assistants, all authenticating with individual user credentials, your security and audit posture gets messy fast. That's when the programmatic approach wins again.

But for the common case, for the majority of teams getting started with [bedrock-rag](https://mgks.dev/tags/bedrock-rag/), this removes a real obstacle.

## What This Means for Your Next Project

If you've been thinking about building an AI assistant grounded in your team's documentation or wiki, the barrier just got way lower. You don't need to wait for anything. You don't need to convince anyone. Sign in, connect your data, start building.

That's the kind of friction reduction that actually accelerates innovation. Not the flashy kind. The kind that makes teams say "actually, let's just try it." How many good AI projects never happen because the setup felt too hard?