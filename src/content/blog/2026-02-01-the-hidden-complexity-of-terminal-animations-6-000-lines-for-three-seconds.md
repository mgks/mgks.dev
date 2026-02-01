---
title: "The Hidden Complexity of Terminal Animations: 6,000 Lines for Three Seconds"
description: "Building an ASCII animation for GitHub Copilot CLI revealed that terminal engineering is harder than web development in 2025."
date: 2026-02-01 12:00:56 +0530
tags: rollup, open source, github, developer-tools, accessibility
image: 'https://images.unsplash.com/photo-1534998158219-e4b687b062c4?q=80&w=1674'
featured: false
---

Most people think ASCII art is a solved problem from 1995. I used to think the same thing until I read about GitHub's engineering effort to animate their Copilot mascot in the CLI. Turns out it took over 6,000 lines of TypeScript to make a three-second banner work reliably across different terminals.

That's not because the team was inefficient. It's because terminal engineering in 2025 is genuinely harder than building for the web in many ways, and almost nobody talks about it.

The timing here is interesting. We're seeing a massive resurgence in CLI tools driven by [artificial intelligence](https://mgks.dev/tags/artificial-intelligence/) workflows. Developers are spending more time in terminals as AI agents execute commands, modify files, and orchestrate complex tasks. But unlike the web, which has decades of standardization, terminals are still a fragmented mess of incompatible behaviors inherited from hardware that predates the internet.

## Why Terminals Are Harder Than You Think

When you build a web interface, you have the DOM. You have consistent rendering engines. You have accessibility APIs that actually work. You have standards like WCAG that browsers mostly respect.

Terminals have none of that.

Every frame you render is just a stream of characters sent to stdout. There's no canvas, no compositor, no layering system. If you want to move the cursor, you send ANSI escape codes like `\x1b[H` and hope the terminal interprets them correctly. Some don't. Windows Command Prompt has limited ANSI support even today. Older PowerShell versions are worse.

The real nightmare though? Colors.

You'd think ANSI colors would be simple. There are 256 of them in 8-bit mode. But terminals don't actually respect those colors as fixed values. They remap them based on user themes, accessibility settings, and operating system preferences. A "bright magenta" in one terminal might be a muted purple in another or bright pink in a high-contrast theme.

This means you can't design with specific hues. You have to design with semantic roles that degrade gracefully. The Copilot team mapped conceptual elements like "eyes," "goggles," and "borders" to ANSI color slots, letting terminals reinterpret them safely without breaking the visual hierarchy.

## A Designer Building His Own Tools

What makes this story even better is that it started with Cameron Foxly, a brand designer at GitHub who normally works in After Effects. He wanted to create an animated banner for Copilot CLI but quickly realized manual frame-by-frame ASCII art wasn't feasible.

So he built his own tool.

Cameron used GitHub Copilot itself to scaffold a prototype animation system within an hour. It was monochrome at first, but functional. He could load 3D renders of the Copilot mascot, convert them to ASCII, and preview animations frame by frame.

Then he hit the color problem.

He took a screenshot of the Wikipedia ANSI color table, fed it to Copilot, and asked it to generate a palette UI. This let him paint ASCII art with ANSI color roles like you would in Photoshop. Then he generated an Ink component (React for terminals) to export the animation into the actual CLI codebase.

This was Cameron's first engineering pull request in nine years at GitHub. He said Copilot filled in syntax he didn't know, but he made all the architectural decisions himself.

I find this genuinely inspiring. Not because it's a feel-good story about [AI](https://mgks.dev/tags/artificial-intelligence/) helping designers code, but because it shows how inadequate our terminal tooling still is. Cameron had to invent an entire animation pipeline because nothing suitable existed.

## The Engineering Challenge

When Andy Feller from the GitHub CLI team took over the production implementation, he faced four major problems: rendering performance, color consistency, maintainability, and accessibility.

Terminals repaint the entire viewport when new content arrives. This causes flicker. Some terminals buffer aggressively, others don't. Some throttle redraws. Some override colors mid-stream if the system theme changes. You can't predict any of this reliably.

The team had to treat the animation as a non-blocking, best-effort enhancement. If the terminal couldn't render it smoothly, it would skip frames or disable itself entirely. The CLI had to remain responsive during startup no matter what.

Color consistency required limiting the palette to 4-bit ANSI colors, one of the few modes that terminals let users customize safely. This ensured the banner remained legible under high-contrast themes and low-vision settings without assuming control over the user's environment.

Maintainability meant breaking the animation into discrete elements: Copilot's eyes, goggles, shadow, border, each with its own semantic color role. The system stored frames as plain text and applied themes at runtime, so the team could ship new animations later without rebuilding everything.

## Accessibility as a First-Class Constraint

Here's the part that really matters: the animation is opt-in and gated behind its own flag. It's not something developers see by default. When you run the CLI in screen-reader mode, the banner is automatically skipped so no decorative characters or motion interfere with assistive technologies.

This is the right approach, and it's rare.

CLI accessibility is under-researched compared to web accessibility. There are no established guidelines like WCAG for terminal interfaces. The Copilot team learned from blind users and low-vision users, and those lessons shaped the architecture from the start.

Too many [open source](https://mgks.dev/tags/open-source/) projects treat accessibility as polish you add at the end. The Copilot CLI team treated it as a constraint that guides every decision. That's the difference between accessibility that actually works and accessibility that's performative.

## What This Means for Terminal UIs

Cameron open-sourced his animation tool at ascii-motion.app. Developers are already contributing to it. Someone fixed a typo in his README and he said it made his day.

This is what happens when you build tools that fill real gaps. The web has Figma, Framer, and dozens of animation frameworks. Terminals have almost nothing.

As AI workflows push more developers into CLIs for longer periods, we're going to need better design tools for terminal interfaces. We're going to need consistent accessibility standards. We're going to need shared rendering libraries that handle the chaos of terminal inconsistencies so individual projects don't have to reinvent everything.

Right now, building a good terminal UI requires deep expertise in ANSI escape codes, low-level rendering behavior, and accessibility constraints that barely anyone documents. That's not sustainable as terminals become more central to development workflows.

Maybe the biggest takeaway here is that terminal engineering in 2025 demands the same discipline, tooling investment, and accessibility rigor we've spent decades building for the web, but almost none of that infrastructure exists yet.