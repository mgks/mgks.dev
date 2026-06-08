---
title: "Running Python Code in a Sandbox with MicroPython and WebAssembly"
description: "How I built a WebAssembly sandbox for executing untrusted Python code safely"
date: 2026-06-09 00:00:15 +0530
tags: rollup, engineering, webassembly, security, datasette, python
image: "https://images.unsplash.com/photo-1765707886613-f4961bbd7dfd?q=80&w=988"
featured: false
---

I've been chasing the dream of safe, sandboxed code execution for years. Most of my open source projects, like Datasette, LLM, and sqlite-utils, support plugins because I love how they let users extend functionality without requiring pull requests or permanent commitments to every wild idea. But there's a fundamental problem: plugin code runs with full privileges inside my applications, which means a buggy or malicious plugin could theoretically read files it shouldn't, leak private data, or just break everything.

Web browsers face this exact problem constantly. They download and execute untrusted code from the web on almost every page load, so browser vendors have spent enormous resources building secure execution environments. JavaScript engines seemed like the obvious answer, but they're incredibly complex and weren't really designed for embedding in other projects. The V8-in-Python attempts I've seen over the years tend to be poorly maintained and come with warnings about untrusted code.

WebAssembly turned out to be the right tool. It was designed from the ground up to support safe execution, has been battle-tested in browsers for nearly a decade, and the wasmtime Python library brings solid WebAssembly support to Python with actively maintained binary wheels.

## The Challenge of Running Python in WASM

The issue is that WebAssembly engines run WebAssembly binaries, not Python code. Languages like Rust compile straightforwardly to WebAssembly, but dynamic languages like Python need a full interpreter available at runtime. Pyodide does fantastic work running Python in the browser via WebAssembly, but server-side Python isn't really supported and the team explicitly states Pyodide is designed for browsers and Node.js only.

That's when I looked at MicroPython. It's a lean implementation of Python 3 optimized for microcontrollers and constrained environments, and WebAssembly definitely counts as constrained. With some help from an AI assistant doing research, I found a pull request against MicroPython that added experimental WASI support for the Unix port.

The build process involved compiling a custom WASM version of MicroPython, which produced a 362KB WebAssembly blob that my Python library could execute. I won't pretend the 78 lines of C code needed to make this work were easy for me to write I'm not really a C programmer but with AI assistance and extensive testing, we got there.

## The Hard Part: Persistent Interpreter State

One-off script execution was actually the easy piece. The tricky problem was keeping variables and functions resident in memory so they could be reused across multiple code execution calls. The initial WASM build would start the interpreter, run code, and then shut down each time, which works fine for isolated scripts but not for what I needed in Datasette Agent.

The solution we landed on is genuinely elegant. The MicroPython code running inside WASM calls a host function called get_next_python_code() which blocks until new code is available. On the Python side, we start a thread with a request queue that receives messages from session.run() calls. When new code arrives, it's sent to the queue, the waiting eval() runs it, and the result gets passed back through a reply queue.

This approach means you can maintain persistent state across calls. Functions and variables stay alive between invocations, which is essential for building useful agent-style interactions where context matters.

## Security and Limits

WebAssembly gives us genuine isolation from the host system. The worst case if the C code has flaws is that the WebAssembly execution throws an exception, not that an attacker escapes the sandbox entirely. That's a much smaller attack surface than running arbitrary Python directly in my process.

Memory limits come built into wasmtime, which is straightforward. CPU limits are trickier because wasmtime uses a "fuel" concept that measures execution in abstract operations rather than time. I've been experimenting with a 20 million fuel default, but I'm not confident that's properly calibrated yet. This is the area where real-world usage will teach me what's needed.

I've already shipped a plugin using this approach, datasette-agent-micropython, and I've locked an AI model in that sandbox and challenged it to break out. So far it hasn't managed, which is encouraging but certainly not proof of security.

I'm deliberately keeping this as an alpha release because I know there will be edge cases I haven't encountered. What I'm hoping is that this implementation demonstrates that running Python in WebAssembly is viable, and maybe it encourages companies with serious security needs to open source their own solutions so we can all learn from each other.

The irony isn't lost on me that after years of complaining about immature sandboxing libraries, I've now built my own. But sometimes the only way forward is to build the thing you need and see what you learn from running it in production.