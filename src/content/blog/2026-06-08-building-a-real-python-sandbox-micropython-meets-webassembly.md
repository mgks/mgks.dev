---
title: "Building a Real Python Sandbox: MicroPython Meets WebAssembly"
description: "How I compiled MicroPython to WebAssembly to safely run untrusted code in my Python applications"
date: 2026-06-08 00:00:14 +0530
tags: rollup, engineering, security, python, webassembly
image: "https://images.unsplash.com/photo-1765707886613-f4961bbd07dd?q=80&w=988"
featured: false
---

I've been chasing the dream of safe code execution for years now. Every plugin system I've built for Datasette, LLM, or sqlite-utils has the same fundamental problem: plugin code runs with full privileges inside my applications. A buggy or malicious plugin could wipe files, leak data, or wreck everything. It's a risk I've been willing to accept because the alternative, not having plugins at all, felt worse. But it never sat right with me.

The browser sandbox is the most hostile environment for untrusted code that exists. Every time you load a webpage, your browser downloads and executes code from strangers. If that's not a proof of concept for sandboxing, I don't know what is. JavaScript engines should be excellent candidates for this problem, but in practice they're sprawling, complicated, and not designed for embedding in server-side Python projects. The few V8-in-Python bindings I've seen are poorly maintained and come with warnings about untrusted code.

WebAssembly is different. It was designed from day one to be safe and sandboxed, and it's been battle-tested in browsers for nearly a decade. The wasmtime Python library brings that capability to my code, with active maintenance and binary wheels. That's the foundation I needed.

## Why MicroPython and Not Pyodide

To run Python in WebAssembly, I needed a full interpreter compiled to WASM. Pyodide is the obvious choice for browsers and it's fantastic at what it does, but it specifically doesn't support server-side Python. The maintainers are clear about this: Pyodide is built with Emscripten and only runs in browser or Node.js environments.

That's when I started looking at MicroPython. It's a lean implementation of Python 3 optimized for microcontrollers and constrained environments. WebAssembly definitely counts as constrained. I found an experimental PR adding WASI support to MicroPython's Unix port, which looked promising.

I asked an AI to research this and build out a working prototype. What emerged was a script that compiles a custom WebAssembly version of MicroPython. The trickiest part wasn't the compilation itself, but making the interpreter useful for real work.

## The Hard Problems

The first blocker was persistent interpreter state. A basic WASM build starts the interpreter, runs one piece of code, and stops. That's fine for one-off scripts but useless for something like Datasette Agent, where I want variables and functions to persist across multiple code execution calls within a session.

The solution we landed on is elegance itself. Inside the WebAssembly module, MicroPython runs code that calls a host function, let's call it `get_next_python_code()`, which blocks until new code arrives. This host function runs in a separate thread with a queue. When you call `session.run()` with some Python code, it pushes the code to that queue and waits on a reply queue for the result. The WebAssembly interpreter evals the received code and calls back with `__session_result__()` when done. Variables persist because the interpreter never shuts down between calls.

The second hurdle was exposing host functions to the sandboxed code. My Python library needed to selectively expose functions that code running inside MicroPython could call. This required writing 78 lines of C that get compiled into the final WebAssembly blob. I'm not a C programmer, but I read through the code and had AI models explain it to me. The beautiful thing about WebAssembly is that if the C has fatal flaws, the execution just throws an exception. I can live with that failure mode.

Memory limits come for free with wasmtime. CPU limits are trickier because wasmtime's "fuel" concept measures operations in units that are hard to map to human-readable time limits. I'm experimenting with a 20 million fuel default for now, but I'm not convinced that's the right number yet.

## What This Enables

I've been using this in production with datasette-agent-micropython, my plugin for Datasette Agent that lets you run MicroPython code in a sandbox. I've locked an AI model in there and challenged it to break out of the sandbox. So far it hasn't managed it, which is encouraging but obviously not proof of security.

The use cases I'm most excited about go beyond plugins. Datasette Enrichments can transform table values with custom code, but imagineScheduled tasks that fetch JSON from approved sources, run a transformation, and insert rows into SQLite. That's a game-changer for data pipelines.

## The Reality Check

I need to be direct here. This is alpha software. I deliberately slapped an alpha release on it because I'm not ready to recommend it to anyone who isn't willing to take significant risk. I've tested it enough that I'm comfortable using it myself, but I'm not a security engineer and I don't have a professional security team reviewing this.

What I hope happens next is that companies with serious security expertise and high-stakes problems try this approach and open source their solutions. WebAssembly as a sandboxing mechanism has real potential, but it needs more eyeballs and real-world security testing before anyone should trust it with sensitive workloads.

The irony isn't lost on me. I spent years complaining about immature, poorly-maintained sandboxing libraries, and now I've built my own. Sometimes you just have to try it yourself to understand the problem space.