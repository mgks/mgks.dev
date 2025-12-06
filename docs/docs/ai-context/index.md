---
title: "Welcome to aiContext"
description: "An introduction to aiContext, a CLI tool for generating high-signal, optimized code context for AI assistants and automated systems."
---

`aicontext` is a command-line interface designed to solve a critical problem in modern, AI-assisted software development: **providing clean, relevant, and comprehensive context to Large Language Models (LLMs).**

::: button aiContext_on_GitHub external:https://github.com/mgks/aiContext/

As development workflows become increasingly automated, AI agents and CI/CD pipelines need a reliable way to understand a project's architecture and code. Pasting individual files is inefficient, and providing the entire repository includes irrelevant noise (build artifacts, dependencies, etc.) that degrades AI performance.

`aicontext` bridges this gap by intelligently scanning your project based on a persistent configuration file. It generates a single, portable markdown file that contains:

1.  A summary of the configuration used.
2.  A clean, easy-to-read directory tree.
3.  The complete contents of all relevant files, formatted in code blocks.

This approach ensures that any automated system—or developer—gets a high-signal, low-noise snapshot of the project, leading to better AI responses and more reliable automation.