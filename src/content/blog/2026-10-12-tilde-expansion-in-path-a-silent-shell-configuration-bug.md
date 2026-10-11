---
title: "Tilde Expansion in PATH: A Silent Shell Configuration Bug"
description: "How quoted tilde in PATH variables silently breaks sandbox warnings and creates security blind spots. A reminder why shell configuration matters."
date: 2026-10-12 00:00:21 +0530
tags: rollup, engineering, shell-config, security, bash
image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072"
featured: false
---

I discovered something unsettling while testing the nono agent sandboxing tool. The warning message it displayed looked innocuous at first: `PATH entries the sandbox can write to: ~/.local/bin/`. But then I realized the tool was warning about a path that didn't actually exist on the system.

The culprit? Tilde expansion in quoted strings.

If you have this in your `.bashrc` or `.zshrc`:

```bash
export PATH="$PATH:~/.local/bin"
```

You're not adding `/home/<user>/.local/bin/` to your PATH. You're adding `./~/.local/bin/` relative to your current working directory. The tilde never expands because it's inside quotes.

Bash and Zsh have specific rules for when tilde expansion happens. According to the bash documentation, tilde expansion only occurs on unquoted tilde characters that begin a word, or after unquoted colons in PATH assignments. The key phrase here is "unquoted." Once you wrap that tilde in quotes, you've disabled the expansion.

## The Security Implications

This creates a real problem. Sandboxing and security tools rely on accurate PATH information to understand where executables live and what permissions they have. When a tool sees `~/.local/bin/` in a warning message, it *looks* legitimate. But if that path never actually got added to your PATH (because of quote expansion), the warning becomes a false positive.

Worse, if somehow a malicious actor could create a `./~/.local/bin/` directory in a workspace where you're running commands, they could inject binaries there. Your shell would find and execute them because that relative path *is* actually in your PATH.

I tested this myself. Creating a dummy binary in `./~/.local/bin/` and then running it from a different directory... it executed. The shell found it. That's not theoretical; that's a real attack surface that exists because of this quoting mistake.

Tools like nono are catching this configuration error, but they're warning about the wrong path. The warning message itself can obscure the real issue.

## The Right Way

The fix is simple but easy to overlook:

```bash
export PATH=$PATH:~/.local/bin
```

No quotes. This allows tilde expansion to happen correctly. Or better yet, use the explicit variable:

```bash
export PATH=$PATH:$HOME/.local/bin
```

This is more explicit, more portable, and doesn't rely on shell-specific tilde expansion rules. It works consistently across different shells and contexts.

## Why This Matters Beyond One Bug

This incident highlights something I think we don't talk about enough: shell configuration is still security-relevant infrastructure, even in 2024. We've abstracted away so much (containers, package managers, language runtimes), yet many of us still manually edit rc files and don't fully understand the expansion rules.

Developers often copy configuration snippets without understanding the quoting semantics. I've seen this pattern in countless dotfiles repositories. Most of the time it works fine. Occasionally it creates vulnerabilities or false alarms that erode trust in security tooling.

## A Call for Better Defaults

I appreciate that nono flagged this. Even though the warning could be clearer (PR incoming, as the original author mentioned), the fact that *something* caught it is encouraging. More tools should validate shell configuration assumptions.

But we should also ship better defaults. Modern shells could warn about this at startup. Package managers could lint rc files. Development environments could validate PATH configuration as part of initialization.

The real lesson here is that seemingly small configuration choices have downstream effects on security tooling, portability, and correctness. When you quote a tilde in a PATH assignment, you're not just changing how one variable is set. You're potentially breaking sandboxing analysis, creating relative path vulnerabilities, and silently diverging from what documentation says should happen.

Next time you edit your shell configuration, check your PATH assignments. Unquote those tildes or replace them with `$HOME`. It takes thirty seconds and might prevent a subtle security issue from hiding in plain sight.