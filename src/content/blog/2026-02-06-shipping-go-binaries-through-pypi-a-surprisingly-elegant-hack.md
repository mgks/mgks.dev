---
title: "Shipping Go Binaries Through PyPI: A Surprisingly Elegant Hack"
description: "Why distributing compiled Go programs through Python's package index might be the most practical cross-language distribution pattern we've seen in years"
date: 2026-02-06 00:01:06 +0530
tags: rollup, engineering, go, python, tooling
image: 'https://images.unsplash.com/photo-1666462296991-45c5eb42067c?q=80&w=2076'
featured: false
---

There's something deeply satisfying about solving distribution problems with tools that weren't meant for the job. PyPI was built for Python packages, but it turns out to be an unexpectedly perfect vehicle for shipping compiled Go binaries to anyone who has pip or uv installed.

I've been watching this pattern emerge, and it feels like one of those moments where someone finds a loophole in the rules that actually makes everything better. The core insight is simple: Python's packaging ecosystem already solved the hard problem of detecting operating systems and architectures, downloading the right files, and putting binaries in the right places. Why rebuild all that infrastructure when you can just piggyback on it?

## The Magic of Platform-Specific Wheels

The trick lives in how wheel files handle platform targeting. When you build a wheel for macOS ARM64, you literally just name the file with `macosx_11_0_arm64.whl` at the end. That's it. No complicated manifests or configuration files. The filename itself carries all the metadata pip needs to figure out if this wheel is compatible with your system.

This is almost absurdly simple, which is probably why it works so well. You can have a dozen different wheels for the same package version, each containing a different compiled binary for Linux x86, Windows, macOS Intel, macOS ARM, and so on. When someone runs `pip install your-package`, the tooling automatically grabs the right one.

Inside each wheel, you've got the compiled Go binary sitting in a `bin/` directory, plus a tiny Python shim that knows how to locate and execute it. The Python code is basically just a wrapper that runs `subprocess` against the binary. You're not trying to call Go from Python or link libraries or any of that complexity. You're just shipping an executable and giving Python a way to find it.

## Why This Actually Matters

The immediate benefit is distribution friction drops to nearly zero. Getting people to install Go, set up their PATH, download releases from GitHub, fight with macOS Gatekeeper warnings... all of that disappears. If they have Python (and who doesn't?), they can run your Go tool with `uvx package-name`. One command. No installation dance.

But the more interesting implication is that Python packages can now depend on Go binaries as if they were regular Python dependencies. You can write a Python library that needs some performance-critical operation or has complex concurrency requirements, implement that piece in Go, and your users never need to know or care. They just `pip install` your package and everything works.

I've been thinking about this in the context of [artificial intelligence](https://mgks.dev/tags/artificial-intelligence/) tooling specifically. There are operations like vector similarity search, embedding generation at scale, or real-time data processing that benefit enormously from Go's concurrency model and performance. Being able to drop a Go binary into a Python AI pipeline without asking users to install a second language ecosystem is genuinely powerful.

The datasette-scan plugin demonstrates this perfectly. It's a Python package that uses a Go binary under the hood to scan filesystems for SQLite databases way faster than pure Python could manage. The end user just installs a Datasette plugin through normal Python channels. They don't compile anything. They don't download release binaries. It just works.

## The go-to-wheel Tool

Automating this pattern was the obvious next step. Building wheels manually is tedious and error-prone. You need to compile your Go program for multiple platforms, create the right directory structure, write the Python shim code, generate metadata files, and name everything correctly.

The go-to-wheel tool handles all of that. You point it at a Go project and it spits out a set of wheels ready to upload to PyPI. It cross-compiles your binary for common platforms, generates the boilerplate Python code, and packages everything up. The whole process looks like this:

```
uvx go-to-wheel github.com/your/project 1.0.0 project-name
```

Then you get a `dist/` folder full of wheels. Test one locally, and if it works, push them all to PyPI with `twine upload dist/*`. Done.

This feels like the right level of automation. It's not trying to be too clever or hide what's happening. You can inspect the generated wheels, modify the Python shim if needed, and understand exactly how the pieces fit together.

## When This Pattern Makes Sense

Not everything should be distributed this way, obviously. If you're writing pure Python code, keep writing pure Python code. This pattern shines when you genuinely need what Go provides: fast compilation, small binaries, excellent concurrency, or access to Go's ecosystem of libraries.

HTTP tooling is a sweet spot. Go's standard library for HTTP is exceptional, and there are mature libraries for things like reverse proxies, WebSocket handling, and protocol implementations that would be painful to replicate in Python. If you're building a Python web framework or API tool that needs some of that functionality, wrapping a Go binary starts to look very attractive.

WebAssembly runtimes are another example. The wazero library provides a production-ready WASM runtime with zero dependencies. If you want to execute untrusted code safely from Python, embedding a Go binary that uses wazero is much simpler than trying to build Python bindings for a C-based WASM runtime.

File processing at scale, network utilities, anything involving heavy parallelism... these are all scenarios where a Go binary doing the heavy lifting behind a Python interface makes practical sense.

## The Slight Abuse of PyPI

There's a legitimate question about whether this is what PyPI is for. The Python Package Index was built to distribute Python packages, not arbitrary compiled binaries. Using it as a generic software distribution platform feels like stretching the intended purpose.

On the other hand, precedent exists. Packages like psycopg2-binary, pillow, and numpy all ship compiled C extensions through wheels. The only real difference here is that we're shipping a standalone binary instead of a Python extension module. The packaging mechanics are identical.

And frankly, PyPI is just really good at this job. It's reliable, it's fast, it handles authentication and versioning, and every Python developer already has the tooling installed. Building a whole separate distribution system for cross-platform binaries when this one works perfectly seems like wasted effort.

The key is not to abuse it. If your package has nothing to do with Python, if users would never think to look for it through pip, then yeah, maybe don't put it on PyPI. But if you're building something that integrates with Python workflows or that Python developers would genuinely want to use, this is a perfectly reasonable distribution method.

## LLMs and Go Code

One aspect that keeps coming up in my workflow is how well language models handle Go code. The language's simplicity and consistency mean there's usually one obvious way to do something, and [AI](https://mgks.dev/tags/artificial-intelligence/) models have clearly been trained on enough Go to generate competent implementations of common patterns.

This matters because it lowers the barrier to using this pattern. You don't need to be a Go expert to build a useful CLI tool, compile it for multiple platforms, and ship it through PyPI. You can sketch out what you want, have Claude or GPT write the initial Go implementation, refine it with more AI assistance, and use go-to-wheel to handle the distribution bits.

I'm not saying AI writes perfect Go code or that you shouldn't understand what you're shipping. But the combination of Go's straightforward nature and current model capabilities means you can be productive in Go even if it's not your primary language. That makes patterns like this more accessible to a wider range of developers.

## What This Opens Up

The really interesting question is what becomes possible when Python packages can transparently depend on Go binaries. You could build a Python web framework that uses a Go-based router for performance. You could create data processing libraries that offload heavy operations to Go. You could wrap sophisticated Go networking tools in Python interfaces for easier scripting.

You could also go the other direction: build primarily Go tools but provide a Python interface for integration into existing workflows. A fast document processor, a specialized database tool, a network utility... all of these could be Go programs that happen to be easily installable and usable from Python.

The subprocess boundary is clean and simple. You're not dealing with FFI complexity, memory management across languages, or weird linking issues. You just run a program and read its output. That simplicity means this pattern is likely to be reliable and maintainable over time.

I suspect we'll see more of this. Not as a wholesale replacement for native Python code, but as a pragmatic option when you need specific capabilities that Go provides and you want to keep distribution simple. The tooling is there now, the pattern is proven, and the friction is low enough that it's worth considering for the right use cases.

The fact that you can ship production-quality compiled binaries to users who might not even realize they're running anything other than Python feels like a small breakthrough in making polyglot development actually practical.