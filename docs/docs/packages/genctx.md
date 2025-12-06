---
title: "genctx | npm package"
description: "An introduction to genctx, a CLI tool for generating high-signal, optimized code context for AI assistants and automated systems."
---

`genctx` is a command-line interface designed to solve a critical problem in modern, AI-assisted software development: **providing clean, relevant, and comprehensive context to Large Language Models (LLMs).**

::: button genctx_on_GitHub external:https://github.com/mgks/genctx/

As development workflows become increasingly automated, AI agents and CI/CD pipelines need a reliable way to understand a project's architecture and code. Pasting individual files is inefficient, and providing the entire repository includes irrelevant noise (build artifacts, dependencies, etc.) that degrades AI performance.

`genctx` bridges this gap by intelligently scanning your project based on a persistent configuration file. It generates a single, portable markdown file that contains:

1.  A summary of the configuration used.
2.  A clean, easy-to-read directory tree.
3.  The complete contents of all relevant files, formatted in code blocks.

This approach ensures that any automated system—or developer—gets a high-signal, low-noise snapshot of the project, leading to better AI responses and more reliable automation.

## Installation

::: callout tip Recommended Method: NPX
Using `npx` is the easiest way to run `genctx` as it ensures you are always using the latest version without needing a global installation.
:::

```bash
npx genctx [options]
```

If you prefer to have the command available system-wide, you can install it globally via npm:

```bash
npm install -g genctx
```

### Your First Context File

```bash
npx genctx -p nodejs
```

```bash
npx genctx
```

## Configuration

The `genctx.json` file is the heart of the tool, ensuring reproducible context generation. All CLI flags that modify the configuration will update this file.

```json
{
  "excludePaths": [
    ".DS_Store",
    ".git/",
    "node_modules"
  ],
  "includeExtensions": [
    ".js",
    ".json",
    ".md"
  ],
  "includePaths": [
    ".github/"
  ],
  "maxFileSizeKB": 500,
  "outputFile": "context.md",
  "useGitignore": true,
  "presets": [
    "nodejs"
  ]
}
```

::: callout info Configuration Management
This file is designed to be checked into version control. This allows your entire team (and your CI/CD pipelines) to generate the exact same context for the project at any given commit.
:::

**Configuration Keys:**

-   `excludePaths`: An array of file names, directory names, or glob patterns to exclude.
-   `includeExtensions`: An array of file extensions to include in the context.
-   `includePaths`: An array of specific files or directories to **forcefully include**, even if they would normally be ignored (e.g., hidden directories like `.github/`).
-   `maxFileSizeKB`: The maximum size (in kilobytes) for any single file to be included.
-   `outputFile`: The name of the markdown file to be generated.
-   `useGitignore`: A boolean (`true` or `false`) that determines whether to read your project's `.gitignore` file.
-   `presets`: An array of strings listing the presets that have been applied.

## Presents

Presets are additive configurations that provide sensible defaults for common technologies by extending the `excludePaths` and `includeExtensions` lists.

You can apply a preset with the `-p` or `--preset` flag.

```js
# Apply the Go and Python presets
npx genctx -p go python
```

Below is a list of all available presets and the settings they add.

### Web & General
-   **`nodejs`**: Excludes `coverage/`, `.env`. Includes `.mjs`, `.cjs`.
-   **`python`**: Excludes `__pycache__/`, `.venv/`, `venv/`, `*.pyc`, `.env`, `requirements.txt`. Includes `.py`.

### Mobile
-   **`android`**: Excludes `captures/`, `*.apk`, `*.aab`, `*.iml`, `gradle/`, `gradlew`, `gradlew.bat`, `local.properties`. Includes `.java`, `.kt`, `.kts`, `.xml`, `.gradle`, `.pro`.
-   **`swift`**: Excludes `.swiftpm/`, `Packages/`, `DerivedData/`, `*.xcodeproj`, `*.xcworkspace`. Includes `.swift`.

### Backend & Systems
-   **`java`**: Excludes `target/`, `.mvn/`, `*.jar`, `*.war`, `logs/`. Includes `.java`, `.xml`, `.properties`, `.pom`.
-   **`go`**: Excludes `*.exe`, `*.bin`, `go.sum`. Includes `.go`.
-   **`rust`**: Excludes `target/`, `Cargo.lock`. Includes `.rs`.
-   **`ruby`**: Excludes `tmp/`, `log/`, `Gemfile.lock`. Includes `.rb`.
-   **`php`**: Excludes `composer.lock`. Includes `.php`.
-   **`dotnet`**: Excludes `bin/`, `obj/`, `*.sln`, `*.csproj`. Includes `.cs`.
-   **`c_cpp`**: Excludes `*.o`, `*.out`, `*.a`, `*.so`, `Makefile`, `CMakeLists.txt`. Includes `.c`, `.h`, `.cpp`, `.hpp`.

### Data Science
-   **`r`**: Excludes `.Rhistory`, `.RData`. Includes `.r`, `.R`.

## CLI References

All command-line flags are designed to modify the `genctx.json` configuration file.

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
| `--debug` | | Enables debug mode to show the underlying `find` command. | `genctx --debug` |
| `--help` | `-h` | Displays the help menu. | `genctx --help` |