---
title: "Distributing Go Binaries Through PyPI: A Pattern Worth Stealing"
description: "Publishing Go binaries to PyPI via wheels opens up a fascinating way to distribute cross-platform tools. Here's why this matters for Python developers."
date: 2026-02-06 12:00:58 +0530
tags: rollup, engineering, go, python, open-source
image: 'https://images.unsplash.com/photo-1676825446819-284aad06dfdd?q=80&w=2070'
featured: false
---

I've been playing with Go lately for building small, focused CLI tools. The language has this refreshing quality where there's usually one obvious way to accomplish something. The code ends up boring and readable, which is exactly what you want. And honestly, [AI](https://mgks.dev/tags/artificial-intelligence/) models are surprisingly good at writing idiomatic Go.

But distribution is always the pain point. Nobody wants to download binaries from GitHub releases and wrestle with macOS security dialogs. Nobody wants to install Go just to compile your tool. And while package managers like Homebrew are great, maintaining formulas across platforms is tedious work.

What if you could just run `uvx sqlite-scanner` and have it work everywhere?

Turns out you can publish Go binaries to PyPI. And it's surprisingly straightforward.

## The Magic of Platform-Specific Wheels

The secret is that Python's packaging ecosystem already solved cross-platform binary distribution. When you upload multiple wheel files with platform-specific names, pip and uv automatically download the right one for your system.

Visit any project on PyPI that ships compiled extensions and you'll see dozens of wheel files. Each one targets a specific OS and architecture: `macosx_11_0_arm64`, `manylinux_2_17_x86_64`, `win_amd64`. The tooling handles all the complexity.

For Go binaries, we just need to compile for each target platform and package them into wheels with the correct naming scheme. Inside each wheel lives the compiled binary and a tiny Python wrapper that knows how to find and execute it.

The wrapper is dead simple. It locates the binary using Python's `__file__` variable and calls `subprocess.run()`. That's it. The entire Python package exists just to be a delivery mechanism.

## Why This Actually Matters

This isn't just a clever hack. It unlocks something genuinely useful.

You can now depend on Go binaries from Python packages. Not as an optional dependency that users might have installed. As a real, declared dependency that pip will automatically fetch.

Think about what that means. Any functionality available in a cross-platform Go binary can now be a building block for Python tools. Go excels at things Python struggles with: raw performance, easy concurrency, self-contained deployment. Python excels at glue code, rapid prototyping, and a massive ecosystem of libraries.

The `datasette-scan` plugin demonstrates this pattern. It's a Datasette plugin that depends on `sqlite-scanner`, a Go binary that recursively searches directories for SQLite databases. The plugin just declares the dependency in its `pyproject.toml` and calls `sqlite_scanner.get_binary_path()` to locate the binary at runtime.

Users install the plugin with pip. They never think about Go. They never compile anything. It just works.

## Automating the Wheel Building

After manually packaging a couple of Go projects this way, I built `go-to-wheel` to automate the process. Because of course I did.

You point it at a Go project and it handles cross-compilation for common platforms, generates the Python wrapper code, and builds all the wheels. It's not doing anything magical, just codifying the manual steps into a repeatable tool.

Run `uvx go-to-wheel github.com/simonw/sqlite-scanner` and you get a `dist/` folder full of platform-specific wheels ready to upload to PyPI. No Go toolchain required on your machine. The tool uses Docker containers to ensure clean build environments.

Is this slightly abusive of PyPI's intended purpose? Maybe. But there's precedent. Plenty of projects distribute non-Python binaries through PyPI already. And the infrastructure handles it fine.

## Where Go Complements Python

Go's standard library is legitimately good for certain tasks. The HTTP reverse proxy implementation in `net/http/httputil` is production-ready out of the box. Building a simple HTTP proxy in Go takes maybe 20 lines of code.

I've been experimenting with `wazero`, Go's WebAssembly runtime, for sandboxing untrusted code. It's pure Go with zero dependencies and provides solid isolation guarantees. Wrapping that in a Python package means I can use it from Python tools without asking users to install anything extra.

The concurrency story in Go is also refreshingly simple. Spinning up goroutines is cheap. The `sqlite-scanner` tool uses this to parallelize filesystem traversal, scanning multiple directories concurrently without complicated thread management.

Python can do all of these things, but Go does them with less friction and better performance characteristics. And now we can use both languages together without making users deal with multiple package managers.

## The Real Win

The pattern here isn't really about Go specifically. It's about recognizing that Python's packaging infrastructure is actually really good at distributing platform-specific binaries. 

We should use it more. Any tool that compiles to static binaries across platforms (Rust, Zig, even C++ with static linking) could follow this pattern. The Python package becomes a universal installation mechanism that works everywhere pip works.

Which is basically everywhere at this point.