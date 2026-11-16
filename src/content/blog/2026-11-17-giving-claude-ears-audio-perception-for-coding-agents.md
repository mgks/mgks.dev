---
title: "Giving Claude Ears: Audio Perception for Coding Agents"
description: "How I built a beep-locating system that gave an AI coding agent real sensory input via microphone arrays and live code deployment."
date: 2026-11-17 00:00:21 +0530
tags: rollup, engineering, ai-perception, audio-processing, agent-architecture
image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2070"
featured: false
---

I recently solved a frustrating real-world problem by essentially giving Claude a set of ears. Not metaphorically—I built a system where an AI coding agent could capture, analyze, and process live audio from multiple microphones across a room to triangulate the source of a mysterious beeping sound.

The context: our house had a box room still packed from a move, and something in there was beeping intermittently. Finding it manually meant digging through dozens of boxes, which sounded miserable. So I decided to build Beep Locator, a software system for acoustic triangulation, and let Claude Code build most of it.

## The Architecture of Perception

Here's what makes this interesting from an agent perspective: Claude doesn't have native audio input, but I could run JavaScript and Python code that could capture and analyze microphone feeds. The system works through a Python web server that coordinates multiple listening devices (I used two iPads, a phone, a MacBook Pro, and a Surface Ultra) connected via WebSockets.

Each device runs a simple beep detection algorithm using Fast Fourier Transform and high-pass filters to identify potential beeps. When a beep is detected, the server orchestrates a chirp from the device with the lowest latency to the server, then asks all listeners to upload audio clips synchronized around that chirp. The timing data across multiple devices enables triangulation.

But here's the clever part: I built in an `installModule()` method that lets the Python server send new JavaScript code to the listeners over WebSocket, which they execute immediately without page reloads. This meant I could leave my laptop in the room running Claude Code with Fable 5.2, iterate on the algorithm live, and watch it work in real-time.

## Iterating With Sensory Feedback

The most powerful aspect of this setup was that Claude could now see what was actually happening. I'd request features conversationally, Claude would deploy code to the listeners, and we'd both observe the results.

Want to test accuracy? "Can we listen for claps and display them differently on the map?" Done. Want better debugging? "Add timestamps to every symbol and a play button that replays each listener's recording in sequence." Implemented within minutes, hot-deployed to five devices without manual interaction.

The system also included a "Rough mode" where I could manually position listener icons on the map, providing rough calibration that the system would then refine through acoustic analysis. This hybrid approach worked remarkably well, eventually narrowing down the beep's location to within about 40cm. (It turned out to be an ancient carbon monoxide detector that needed new batteries.)

## What This Means for Agent Architecture

Most conversations about AI agents focus on tool-use and APIs, but there's something fundamentally different about giving agents direct sensory input from the physical world. When Claude could see WebSocket logs, listen to FFT analysis results, and watch a map update with detected sound locations, it became capable of debugging problems I'd never have known how to articulate precisely.

I noticed parallels to a story Martin Woodward shared at GitHub Universe about debugging conference badge computers by pointing a webcam at their screens so his coding agent could verify if updates worked. The insight is the same: agents become dramatically more capable when they can perceive outcomes, not just execute instructions.

This opens interesting questions about how we'll design agent systems in production environments. Should your infrastructure agents have access to [monitoring dashboards](https://mgks.dev/tags/observability/) as perceptual input? Should code review agents be able to see test execution output in real-time? What does it mean to give an agent "eyes" on your system?

## The Practical Implication

For developers building with Claude Code or similar systems, this suggests a pattern: if your problem involves real-world perception or debugging, consider how you might give your agent direct sensory access rather than just summary reports. The hot-code-deployment pattern was crucial here—I needed to avoid microphone permission dialogs on five different devices, which would have killed the developer experience entirely.

The Claude Code implementation basically baked in the ability to iterate without friction. That architectural choice transformed this from a neat idea into something genuinely enjoyable to build.

What if the constraint isn't that coding agents lack the ability to perceive, but that we haven't yet built the infrastructure to give them meaningful sensory channels into the systems we're asking them to control?