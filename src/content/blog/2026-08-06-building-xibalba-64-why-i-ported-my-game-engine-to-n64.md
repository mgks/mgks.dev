---
title: "Building Xibalba 64: Why I Ported My Game Engine to N64"
description: "How I took a 2D JavaScript engine, rewrote it in C, and shipped a real N64 game with 60 FPS performance on 30-year-old hardware."
date: 2026-08-06 18:00:50 +0530
tags: rollup, engineering, n64, game-development, emulation
image: "https://images.unsplash.com/photo-1765707886613-f4961bbd07dd?q=80&w=988"
featured: false
---

Two years ago, I ported my JavaScript game engine Impact to C. At the time, I had no particular reason - it was just fun. Turns out, porting a game engine across languages and platforms is valuable practice for understanding what actually matters in game design.

Today, I'm announcing Xibalba 64, a Wolfenstein 3D-style FPS that will ship as a physical cartridge from Modretro for the M64 (a modern N64 clone). To my knowledge, this is only the second new N64 game published physically since the console's commercial death in 2002. The first was Xeno Crisis in 2023. That's a 21-year gap.

The fact that we can still make new games for 30-year-old hardware is fascinating. It says something about the N64's design, the homebrew community, and what modern developers can accomplish when they understand constraints.

## From JavaScript to Silicon

My high_impact engine (the C rewrite of Impact) was designed from the start to support multiple platform backends. I had SDL2 and Sokol working, which meant Windows, macOS, Linux, and even WASM. Adding N64 support was just another backend.

The real puzzle was the N64 itself. It's a genuinely weird machine: 93 MHz MIPS CPU (big-endian!), paired with two coprocessors collectively called the Reality Coprocessor. One handles graphics (the RDP), one handles signal processing (the RSP). Programming against this directly is insane.

That's where Libdragon comes in. It's basically SDL for the N64: a well-maintained library that abstracts away most of the hardware horrors. The documentation is excellent, the examples are comprehensive, and it only took me a few evenings to wire up a new backend using it.

But performance on naive hardware usage is terrible. I needed to actually understand how the N64 works.

## The 4KB Texture Memory Problem

The N64 has exactly 4 kilobytes of texture memory. Your largest textures are 64x64 pixels. Even modern embedded systems have orders of magnitude more. When I first tried uploading textures naively, the frame rate tanked.

I had to think about this differently. I implemented raycasting to determine visibility (casting 320 rays across the field of view), then collected triangles into 64-bit draw calls batched by texture. I arranged tile sheets into columns so each tile uploads as one continuous memory chunk. I recursively subdivided the raycasting to avoid redundant work.

The skybox is literally a single 32x32 pixel texture smeared across the horizon.

With these optimizations, the game hits 60 FPS. Most N64 games can't claim that. GoldenEye 007's four-player mode famously dropped into single-digit frame rates. Xibalba 64's split-screen stays fluid.

## Why Constraints Matter

This entire project taught me something important: constraints force clarity. When you have 4KB of texture memory, you can't brute-force your way forward. You have to understand exactly what you're doing and why.

Modern game development often hides these problems. You have gigabytes of VRAM, multi-gigahertz CPUs, and automated tooling. You can iterate without thinking about performance until something breaks. On the N64, you think about performance from day one, and it makes you a better engineer.

The same applies to porting game engines across platforms. By supporting SDL2, Sokol, and N64 from high_impact, I wasn't just creating redundancy. I was creating constraints that forced me to identify which parts of my engine were actually platform-specific and which parts were universal. That clarity is priceless when debugging or optimizing.

Check out my earlier work on [game engine architecture](/tags/game-development/) to see how these lessons apply beyond retro hardware.

## The Real Achievement

Xibalba 64 isn't remarkable because it's a 3D FPS on old hardware. It's remarkable because it runs at 60 FPS while looking good, plays smoothly with four-player split-screen, and ships with a full campaign of new levels and enemy types. The music was composed specifically for it and decoded in real-time using RSP-accelerated Opus (a codec from 2012, 16 years newer than the hardware).

Shipping physical media in 2024 for a console from 1996 is a statement. It says: these old systems still have value, their constraints teach us real lessons, and a dedicated community can maintain and extend them indefinitely.

There's something satisfying about optimization that moves beyond the algorithmic and into the physical. When you understand your hardware at this level, your code doesn't just run fast - it runs beautifully.

Maybe the future of game development isn't in chasing the newest hardware, but in understanding deeply whatever hardware you choose to target.