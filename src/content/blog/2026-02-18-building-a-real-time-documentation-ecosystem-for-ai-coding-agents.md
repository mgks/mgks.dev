---
title: "Building a Real-Time Documentation Ecosystem for AI Coding Agents"
description: "How Showboat's streaming updates, browser automation, and charting tools are changing the way we monitor and interact with AI coding agents in real time"
date: 2026-02-18 00:00:58 +0530
tags: rollup, engineering, ai-agents, developer-tools
image: 'https://images.unsplash.com/photo-1534998158219-e4b687b062c4?q=1674&w=1674'
featured: false
---

The most frustrating part of working with [AI](https://mgks.dev/tags/artificial-intelligence/) coding agents has always been the waiting. You give Claude or another agent a complex task, then sit there wondering what it's actually doing until it finally pushes a commit and you can inspect the results. It's like deploying code without logs.

I've been using Showboat for about a week now. It's a CLI tool I built to help coding agents create Markdown documents that demonstrate their work as they build things. The basic pattern is simple: tell the agent to run `uvx showboat --help`, and it learns how to document its progress with notes, code execution results, and embedded screenshots. The help text basically serves as documentation that agents can read and immediately act on.

But there was still that visibility problem. Even with Showboat generating nice documentation, I couldn't see anything until the agent finished and pushed to GitHub. For quick iterations this was fine. For longer sessions where I wanted to provide feedback mid-stream, it was maddening.

## Streaming Documentation to Your Own Server

The obvious solution was to have agents stream their Showboat updates somewhere I could watch in real time. This morning I realized the implementation could be dead simple: just POST each document fragment to a remote endpoint as it's created.

Showboat v0.6.0 adds exactly this through a single environment variable: `SHOWBOAT_REMOTE_URL`. Set it to any HTTP endpoint and every `showboat init`, `showboat note`, `showboat exec`, and `showboat image` command sends its data there. The local Markdown file still gets updated, but now you also get a remote copy building incrementally.

The API format is intentionally boring. Regular POST form variables for text content, multipart forms for images. Nothing fancy, nothing that requires complex client libraries. Any web framework can handle it in about twenty lines of code.

I needed something I could deploy easily though, something that fit into my existing tooling. So I built datasette-showboat, a Datasette plugin that adds a `/-/showboat` viewing interface and a `/-/showboat/receive` endpoint for accepting updates.

You can spin it up locally with `datasette install datasette-showboat` and `datasette --root`, sign in as root, then point your `SHOWBOAT_REMOTE_URL` at `http://127.0.0.1:8001/-/showboat/receive`. Now when you tell Claude Code to use Showboat, you can watch the document build in real time in your browser.

The real power comes when you run this on a server somewhere. Set the environment variable in Claude Code for web (the browser-based version), and suddenly every Showboat session streams live to your server. I've been running mine on Fly.io and it's been working great.

## Browser Automation That Actually Makes Sense

Once you have real-time visibility into what your [AI agents](https://mgks.dev/tags/ai-agents/) are doing, you start wanting them to do more interesting things. Like interact with actual web browsers and show you what they're seeing.

I built Rodney specifically for this. It's a CLI browser automation tool that loads web pages, clicks things, runs JavaScript, and captures screenshots that Showboat can embed. The combination is surprisingly powerful.

This morning I had Claude Code working on a web interface, and because it was using Rodney with Showboat's remote publishing, I could see screenshots of its work in progress. I gave feedback directly in the chat while it was still working, and it adjusted course immediately. This is a completely different workflow than waiting for a branch push to see results.

The key insight is that these tools don't need tight coupling. Rodney just outputs image paths. Showboat just needs image paths. Any tool that can produce a path to a PNG can participate in this ecosystem.

## Data Visualization Without the Ceremony

The other tool I shipped alongside datasette-showboat is Chartroom, which is basically matplotlib wrapped in a CLI that agents can actually use. You can pipe CSV, TSV, or JSON into it, or point it at a SQLite database with a SQL query, and it spits out a chart as a PNG.

```bash
chartroom pie data.json --x category --y value -o chart.png
```

It supports line charts, bar charts, scatter plots, and histograms. More importantly, it can generate alt text for its charts with `-f alt`, or output complete HTML or Markdown image tags with `-f html` or `-f markdown`. This means agents can create accessible documentation automatically.

I started the project with my click-app cookiecutter template and gave Claude Code a detailed prompt about building a matplotlib wrapper with multiple subcommands. The key instruction was maintaining a demo document using Showboat as each chart type got implemented. Red/green TDD, commit after each feature, update the demo with actual inline images each time.

This is where the tooling ecosystem really shines. Claude Code would implement a chart type, generate a test chart, use `showboat image` to embed it in the demo document, then commit everything together. The resulting demo document shows every chart type with real examples.

## The Webhook Pattern Nobody Asked For

The environment variable mechanism for Showboat's remote streaming is technically just a webhook system. Right now I'm only using it to stream documents to Datasette, but it's open-ended enough that you could do almost anything with it.

You could log every Showboat command to a monitoring system. You could trigger notifications when certain images appear. You could feed the documentation into another AI system for quality checks. You could build a collaborative editing system where multiple agents contribute to the same document.

I haven't explored any of these ideas yet because I'm still getting value from the basic "watch my agent work" use case. But the extension point is there, invisible to the CLI user, just waiting for someone to do something weird with it.

The broader pattern here is building [developer tools](https://mgks.dev/tags/developer-tools/) that are loose enough to combine in unexpected ways but opinionated enough to actually solve problems. Showboat doesn't care what creates images, Rodney doesn't care what consumes its screenshots, Chartroom doesn't care what embeds its charts. They just follow simple conventions about file paths and standard output.

I built these tools quickly, mostly by describing what I wanted to Claude and letting it implement the details. The irony of using AI coding agents to build better tools for AI coding agents is not lost on me. But the real test is whether they're actually useful day to day, and so far they've changed how I work with these agents enough that I keep finding new ways to use them.

The fact that I can watch an agent document its own work in real time, complete with charts and browser screenshots, while it's still running, feels like crossing some threshold of visibility into what these systems are actually doing.