---
title: "aicontext CLI Command Reference"
description: "A complete reference guide for all available command-line flags and options for the aiContext CLI. Learn how to use presets, manage exclusions, and more."
---

All command-line flags are designed to modify the `aicontext.json` configuration file.

::: callout tip Precedence
Flags are applied in a specific order. For example, `--reset` runs first, giving you a clean slate before other flags like `--preset` are applied.
:::

| Flag | Alias | Description | Example |
|---|---|---|---|
| `--reset` | | **Destructive.** Resets the configuration to base defaults before applying any other flags in the same command. | `... --reset -p rust` |
| `--preset` | `-p` | Applies one or more technology presets. | `... -p nodejs rust` |
| `--include`| `-i` | Forcefully includes a path, even if it's hidden. | `... -i .github/` |
| `--add-exclude` | `-a` | Adds a path or pattern to the `excludePaths` list. | `... -a 'docs/'` |
| `--remove-exclude` | `-r` | Removes a path from the `excludePaths` list. | `... -r 'vendor/'` |
| `--add-ext` | | Adds a file extension to the `includeExtensions` list. | `... --add-ext .vue` |
| `--remove-ext` | | Removes a file extension from the `includeExtensions` list. | `... --remove-ext .css` |
| `--output` | `-o` | Sets the name for the output context file. | `... -o project.md` |
| `--max-size` | | Sets the maximum file size in KB. | `... --max-size 200` |
| `--use-gitignore` | | Sets `useGitignore` to `true` or `false`. | `... --use-gitignore true` |
| `--init` | | Updates the config file but stops before generating context. | `... -p swift --init` |
| `--debug` | | Enables debug mode to show the underlying `find` command. | `aicontext --debug` |
| `--help` | `-h` | Displays the help menu. | `aicontext --help` |