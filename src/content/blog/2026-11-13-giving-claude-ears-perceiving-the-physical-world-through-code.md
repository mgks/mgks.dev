---
title: "Giving Claude Ears: Perceiving the Physical World Through Code"
description: "How I built an acoustic triangulation system with Claude Code to locate a mysterious beep, revealing how AI agents can perceive and interact with physical environments."
date: 2026-11-13 12:00:20 +0530
tags: rollup, engineering, ai-agents, claude, creative-coding
image: "https://images.unsplash.com/photo-1655720828018-edd2daec9349?q=80&w=2064"
featured: false
---

I had a problem: something in my box room was beeping, and I couldn't find it without unpacking hundreds of boxes. So I asked Claude to help me build software that could locate it. What emerged from that conversation is something that feels genuinely novel: I gave Claude Code ears.

Claude doesn't natively perceive audio, but it can run JavaScript and Python code that does. By building a system that connected microphones on multiple devices to a Python server via WebSockets, then allowing Claude to query audio logs and reconfigure those microphones, I essentially gave it sensory input. More importantly, I demonstrated that coding agents can perceive and reason about the physical world in real time.

## Building the Acoustic Locator

The system works by having multiple devices (I used two iPads, a phone, a MacBook, and a Surface) connect to a Python web server and act as microphone listeners. Each device records a rolling 60-second audio buffer and runs FFT-based beep detection. When a potential beep is detected, the server orchestrates a calibration chirp from the lowest-latency device, then asks all listeners to upload synchronized audio clips. This alignment is crucial for triangulation.

I started this project in Claude Code Cloud on my iPhone using Opus 5.5 in Extra thinking effort mode. I began with a simple prompt: describe the problem we're trying to solve. Claude didn't just write code; it found and analyzed a 2007 paper on acoustic ranging systems (BeepBeep by Peng et al.) and incorporated its techniques into the architecture.

What's particularly interesting is the iterative development process. I'd request features conversationally, and Claude would implement them live. "Can we drag devices around in rough mode?" Done. "Can I test this by clapping?" Added, with different symbols for different sound types. "Can I replay recordings from each device?" Implemented. Each feature built on the previous one, and Claude could see exactly what was working or failing because the code was running in real time.

## The Hot-Swap Module System

The real breakthrough came when I asked Claude to build a mechanism for sending new code to listeners without restarting them. Opus 5.5 built an installModule() method that could be triggered over WebSocket, allowing arbitrary code execution on connected devices. This meant I could leave the devices positioned around the room and let Claude experiment with different detection algorithms, adjust triangulation logic, or refine sound analysis without manually resetting anything.

On most phones and tablets, microphone permission requests trigger on page reload. By eliminating reloads, the hot-swap system meant we could iterate on code without disrupting the user experience or permissions. I could sit by my laptop discussing problems with Claude while it actively modified code running on devices in another room.

## Perception as a Developer Tool

This project taught me something important about [building with AI agents](https://mgks.dev/tags/ai-agents/): the constraints of what agents can perceive often matter more than their computational capabilities. Claude is extremely good at mathematics and signal processing. It's less good at telling me whether a particular audio sample actually sounds like the beep I'm looking for. By building a sensory interface, I created a feedback loop where Claude could iterate on solutions and I could validate them perceptually.

I'm reminded of something Martin Woodward mentioned at GitHub Universe: he debugged Badge computers by pointing a webcam at their screen so his coding agent could see if updates worked. The pattern is emerging: coding agents become more powerful when we give them eyes, ears, or other ways to perceive the world they're supposed to be improving.

The system worked remarkably well. It localized the beep to within 40cm, and when I dug through that specific pile of boxes, I found an ancient carbon monoxide detector desperately needing new batteries. But the technical success feels almost secondary to what this demonstrates: AI coding assistants aren't limited to working with text and code in isolation. When we build the right interfaces, they can perceive, reason about, and solve problems in the physical world.

The implications here extend beyond novelty projects. As [creative coding approaches](https://mgks.dev/tags/creative-coding/) become more common in AI development, we're discovering that constraints aren't always limitations. Sometimes they're just invitations to build better interfaces. The next wave of AI tooling won't just be smarter models, it'll be smarter ways of connecting those models to the world they're trying to understand.