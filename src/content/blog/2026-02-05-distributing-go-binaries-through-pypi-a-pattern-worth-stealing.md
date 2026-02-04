---
title: "Distributing Go Binaries Through PyPI: A Pattern Worth Stealing"
description: "Using Python's packaging ecosystem to distribute Go binaries feels slightly transgressive, but it unlocks something genuinely useful for developers."
date: 2026-02-05 00:00:57 +0530
tags: rollup, engineering, go, python, developer-tools
image: 'https://images.unsplash.com/photo-1680783954745-3249be59e527?q=80&w=1064'
featured: false
---

I've been playing with Go lately for building small, fast CLI tools. The language has this refreshing quality where there's usually one obvious way to do something, and the resulting code is boring in the best possible way. LLMs are surprisingly good at writing it too, which makes prototyping fast.

The distribution problem has always been Go's Achilles heel though. Sure, you get a single self-contained binary, but then what? Users either need to download it from GitHub releases and fight with their OS's security warnings, or they need Go installed to compile it themselves. Neither option is great for casual users who just want to run your tool.

Here's where things get interesting. What if we could abuse PyPI to solve this?

## The SQLite Scanner Experiment

I built sqlite-scanner as a proof of concept. It's a simple Go CLI that walks your filesystem looking for SQLite database files by checking if the first 16 bytes match the SQLite magic number. Nothing groundbreaking, Python could do this fine on its own.

But here's the distribution magic: you can run it immediately with `uvx sqlite-scanner` without installing anything first. No Go required. No manual downloads. Just works.

The trick is packaging the compiled Go binaries as Python wheels. PyPI already has a sophisticated system for matching the right binary to your operating system and architecture. When you visit the PyPI downloads page, you see separate wheel files for macOS ARM64, macOS x86_64, Linux variants, Windows. Python's packaging machinery automatically grabs the right one.

Inside each wheel is just the compiled binary sitting in a `bin/` folder, plus a tiny Python shim that locates and executes it. That's it. The Python package is basically a fancy wrapper around `subprocess.run()`.

## Why This Actually Matters

Using PyPI as a distribution platform for Go binaries feels slightly abusive, I'll admit. But there's precedent, and more importantly, there's genuine utility here.

The real power isn't just making Go binaries easier to install. It's that we can now use Go binaries as dependencies in Python packages. Think about that for a second. Any functionality available in a cross-platform Go binary can now be a normal pip-installable dependency.

I built datasette-scan to demonstrate this. It's a Datasette plugin that depends on sqlite-scanner and uses it to scan folders for databases and attach them automatically. The plugin just lists `sqlite-scanner` in its `pyproject.toml` like any other Python dependency, then calls `sqlite_scanner.get_binary_path()` to locate the binary and run it.

From the user's perspective, they're just installing a Python package. The fact that it's secretly shipping a Go binary is an implementation detail they never need to think about.

## Automating the Pattern

After manually packaging sqlite-scanner this way, I realized this pattern would be useful for other projects. So I built go-to-wheel, a tool that automates the entire process of taking Go projects and turning them into PyPI-ready wheel distributions.

You point it at a GitHub repository with Go binaries in its releases, specify which binaries you want, and it downloads them, packages them into wheels with the proper Python shims, and spits out everything ready for `twine upload`. The whole sqlite-scanner package on PyPI was built with a single go-to-wheel command.

Claude helped build the first version after I confirmed there wasn't an existing tool that did exactly this. Maturin handles Rust-to-Python packaging, and pip-binary-factory bundles various projects, but nothing quite addressed this specific need.

## The Broader Implications

This pattern opens up interesting possibilities. Go has strengths that complement Python nicely. It's fast, has excellent concurrency support, compiles to tiny binaries, and has a rich ecosystem. The standard library is particularly strong for HTTP tooling. I've built several HTTP proxies using Go's `net/http/httputil.ReverseProxy` handler that would be painful in pure Python.

There's also wazero, Go's zero-dependency WebAssembly runtime that I've been experimenting with for sandboxing untrusted code. Being able to package something like that as a pip-installable dependency means Python projects can leverage mature Go libraries without asking users to install anything beyond Python itself.

I've been exploring this pattern with other binaries too. I recently wrote a script that depends on static-ffmpeg to ensure ffmpeg is available, using the same approach. The script declares the dependency, and the packaging system handles getting the right binary for the user's platform.

## The Slight Discomfort

Is this abuse of PyPI? Maybe a little. The platform wasn't designed for distributing arbitrary compiled binaries. But it's solving a real problem, and it's not doing anything that violates the technical constraints of the system. The wheels are properly formatted, the metadata is correct, and the platform-specific matching works exactly as intended.

The pattern also raises questions about dependency management and security. You're shipping compiled binaries that users might not scrutinize the same way they would Python source code. That's worth being thoughtful about, though it's not fundamentally different from the many Python packages that already include C extensions or other compiled components.

What makes this feel legitimate to me is that it enables genuine composition. Python is really good at orchestrating subprocesses and gluing things together. If we can seamlessly integrate fast, specialized Go tools into Python workflows without friction, that's a net win for both ecosystems. The fact that LLMs are competent at writing both Python and Go code means this pattern fits well with modern [AI](https://mgks.dev/tags/artificial-intelligence/)-assisted development workflows too.

The real test will be whether other developers find this useful enough to adopt it for their own projects, or whether it remains a clever hack that solves a problem most people don't actually have.