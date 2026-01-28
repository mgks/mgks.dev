---
title: "ChatGPT's Secret Container Upgrade: Bash, Package Installs, and Network Downloads"
description: "ChatGPT's code execution got a massive upgrade nobody documented. It now runs Bash, installs npm/pip packages, and downloads files. Here's what changed."
date: 2026-01-28 05:26:27 +0530
tags: rollup, engineering, ai, open ai, containers
image: 'https://images.unsplash.com/photo-1765707886613-f4961bbd07dd?q=80&w=988'
featured: false
---

I've been using ChatGPT's code execution feature since it launched nearly three years ago as "Code Interpreter". At some point [OpenAI](https://mgks.dev/tags/open-ai/) half-heartedly renamed it to "Advanced Data Analysis", which is about as uninspiring as corporate naming gets. The feature has always been useful, letting ChatGPT write and run Python in a sandboxed container to analyze data or generate visualizations.

Except somewhere in the last few months, OpenAI silently shipped what amounts to a complete overhaul of this system. And of course, they didn't document it anywhere.

I stumbled onto this by accident when I asked ChatGPT about Los Angeles air quality trends over the past 20 years. In the thinking trace, I caught a reference to something called `container.download` that was fetching an Excel file from a URL. That's not something the old Code Interpreter could do. The container was supposed to be completely isolated from the internet.

## What Actually Changed

The upgrade is substantial. ChatGPT can now execute code in 11 languages including Bash, which is the real game changer here. It can download files from public URLs directly into the container. And perhaps most interesting, it can install packages via pip and npm on the fly to solve problems.

When I asked ChatGPT to explain its `container.download` tool, it confirmed what I suspected. It's a built-in function that fetches files from URLs and saves them to the sandboxed filesystem for that chat session. I tested this by having it download a file from one of my servers and captured the request headers. The user agent was `Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; ChatGPT-User/1.0; +https://openai.com/bot)` and the IP resolved to Microsoft Azure in Des Moines, Iowa.

This immediately made me think about security. Could a prompt injection attack trick ChatGPT into exfiltrating private data by encoding it in a URL query string and calling `container.download`? I tried to construct such an attack and couldn't get it to work. ChatGPT returned an error: `download failed because url not viewed in conversation before. open the file or url using web.run first.`

This appears to be the same safety mechanism that Claude's Web Fetch tool uses. Only allow URL access if that URL was either directly provided by the user or came from search results that couldn't have been influenced by injection. I managed to get a simple constructed query string through `web.run`, but when I tried composing a longer one with prompt history, a filter blocked it. I'm not a security researcher, but this seems like a reasonably solid defense.

## Bash Changes Everything

There's a reason why coding agents like Claude Code and Anthropic's code interpreter are built around Bash. If an agent can run Bash commands, it can do essentially anything you could do by typing commands into a terminal. When Anthropic added their code execution feature last September, they built it around Bash from day one. OpenAI has now followed suit.

I tested this by asking ChatGPT to show me the current date and time using a Bash command. The thinking trace showed it running `date` and returning the output. The logs are black and white text that can't be faked in the main conversation window, which helps verify that it's actually executing these commands and not just hallucinating responses.

I had it run Hello World in several different languages in the same session. Python, JavaScript, Rust, C++. All worked. This is a fundamentally different capability than what Code Interpreter offered before.

## The Package Installation Mystery

Here's where things get interesting from an infrastructure perspective. The container supposedly can't make outbound network requests, so how is it installing packages from npm and PyPI? I asked ChatGPT to explore its own environment and figure this out.

It found a proxy at `applied-caas-gateway1.internal.api.openai.org` that's configured as the package registry for both pip and npm. Environment variables like `PIP_INDEX_URL` and `NPM_CONFIG_REGISTRY` point to this internal proxy instead of the public registries. There were also references to `CARGO_REGISTRIES_OPENAI_ARTIFACTORY_INDEX` and `DOCKER_CONFIG`, even though neither Rust nor Docker are actually installed in the container. Maybe that's a hint of features still being tested.

The practical result is that you can ask ChatGPT to use basically any Python or Node.js package as part of solving a problem, and it will install and apply it. That opens up a massive range of [possibilities](https://mgks.dev/tags/technology/) for data analysis, file processing, and automation tasks.

## The Documentation Problem

This is a significant upgrade to one of ChatGPT's most useful features, and OpenAI hasn't published a single release note about it. I initially thought maybe I'd accidentally enabled some preview feature, but I tested in a free ChatGPT account and confirmed everything works there too. This is live for everyone, it's just completely undocumented.

I asked ChatGPT to list all its available tools with their exact names, descriptions, and signatures. The response was illuminating. There are 30 tools in total, including `container.exec` for running commands, `container.download` for fetching files, and `container.open_image` for displaying images from the container filesystem. There are also tools for Gmail search, Google Calendar access, creating canvas documents, and even scheduling future tasks via iCal.

Most of these tools have no public documentation. Developers who want to understand what ChatGPT can and can't do are left reverse engineering the system through experimentation. That's frustrating for something that's supposed to be a developer tool.

OpenAI also needs to come up with better naming for this feature. "Advanced Data Analysis" doesn't describe what this actually is anymore. It's not just analyzing data, it's a full container environment with [bash](https://mgks.dev/tags/bash/) access, package management, and network capabilities. I'm calling it ChatGPT Containers until they come up with something better.

The lack of clear documentation and naming isn't just annoying, it actively limits how useful this feature can be. Developers need to know the boundaries of what's possible, what security guarantees exist, and how the underlying system works. Right now we're all just poking at it and hoping we understand the constraints correctly, which seems like exactly the wrong approach for a tool that's executing arbitrary code.