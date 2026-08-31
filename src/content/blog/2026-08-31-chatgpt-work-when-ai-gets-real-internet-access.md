---
title: "ChatGPT Work: When AI Gets Real Internet Access"
description: "OpenAI's new Work mode gives Claude a powerful upgrade: real internet access, browser automation, and persistent file systems. Here's what it means."
date: 2026-08-31 12:00:50 +0530
tags: rollup, engineering, ai-agents, chatgpt, developer-tools
image: "https://images.unsplash.com/photo-1534998158219-e4b687b062c4?q=80&w=1674"
featured: false
---

OpenAI quietly shipped something genuinely disruptive in July: ChatGPT Work. I've spent weeks experimenting with it, and I think most people still don't understand how different this is from regular ChatGPT Chat.

The key insight is that Work isn't just a UI redesign or a model swap. It's a fundamentally different execution model that treats ChatGPT like an autonomous agent with real power instead of a chatbot with guardrails.

## The Internet Connection Changed Everything

Here's what made me sit up: ChatGPT Work's code execution environment can talk to the internet. Not through a proxy that blocks 99% of requests. Not with an allowlist of five domains. Real, unrestricted internet access.

Claude got a version of this last year, but it's limited to PyPI, NPM, and GitHub. ChatGPT Work appears to default to allowing everything. You can clone repositories, install their dependencies, then use them to interact with APIs across the web.

I can point it at a GitHub repo, have it install dependencies, and then use those tools to fetch data from any API I want. This isn't incremental. This is a category change.

## The Browser Tool Is a Game-Changer

Then there's the browser. ChatGPT Work can launch a full Chrome instance, navigate websites, fill out forms, and take screenshots. It can even run arbitrary JavaScript against the DOM.

I prompted it to load a website and extract all headings using JavaScript. It just... did it. No round-tripping credentials through the model, no weird limitations. If a site needs login, it can prompt you to handle the credentials without exposing them.

This feels like having access to web automation tools I'd normally build myself, except I can access it from my phone through the ChatGPT app. The implications for data extraction, form automation, and workflow building are hard to overstate.

## Persistent State and Coordination

Chat gives you a fresh filesystem for each session. Work gives you persistent scratch folders that survive across sessions. I have 171 of them sitting in `/workspace/scratch` right now.

Better yet, these scratch folders appear to be shared across concurrent Work sessions. I can start multiple parallel agents working on different parts of a problem, and they can see each other's output in real time. This isn't just persistence; this is a foundation for multi-agent coordination.

## The Sites Feature Has Teeth

ChatGPT Work can build and deploy entire websites using Cloudflare Workers. HTML, JavaScript, server-side features with stateful databases (D1 and R2). You can prompt it to research something, turn results into a JSON file, and deploy a full website about it.

These sites default to private, but you can make them public. On team plans, you can share them with specific people. This is deployment-as-a-byproduct. I don't have to think about infrastructure; I just describe what I want and iterate on the result.

## The Elephant in the Room

I keep coming back to security. The "lethal trifecta" for agent compromise is access to private data plus exposure to untrusted content plus a way to exfiltrate information. ChatGPT Work hits all three.

Can a malicious website prompt-inject my Work session into stealing data from `/workspace/scratch`? Can a compromised GitHub repository trick the agent into doing something dangerous? OpenAI says they have auto-review mechanisms inherited from Codex, but I'd love to see more transparency about what that actually means.

For now, I'm treating Work sessions like I treat anything with internet access: aware of the surface area and thinking about what I'm asking it to do.

## Documentation Through Reverse Engineering

Here's my gripe: OpenAI's Work documentation is frustratingly sparse. I had to build a meta-tool that asked ChatGPT Work to document its own tools, which led to discovering 44 skills and 223 registered tools I didn't know existed.

This is a pattern I've [noticed before in LLM documentation](https://mgks.dev/tags/documentation/) - companies ship powerful features with minimal explainability, forcing users to reverse-engineer capabilities through trial and error. It works, but it's not great.

I eventually got ChatGPT Work to emit the full browser documentation by asking it to output `await browser.documentation()`. Now I understand how the headless browser actually works. But I shouldn't have had to prompt an AI to explain an AI's features to me.

## What This Means

ChatGPT Work represents a shift toward treating large language models less like chatbots and more like execution environments. The models themselves matter less than the tools they can access and the autonomy they're granted.

This is where [AI development is heading](https://mgks.dev/tags/ai-agents/) - not toward better conversation, but toward agents that can actually do things in the world. The safety questions get harder at each step.

The question isn't whether ChatGPT Work is impressive. It is. The question is whether we're ready for what happens when these systems can reliably coordinate across the internet, update live infrastructure, and persist state across sessions.