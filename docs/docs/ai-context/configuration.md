---
title: "Configuration File Reference"
description: "A detailed reference for the aicontext.json file, explaining all available keys and settings for customizing your project context."
---

The `aicontext.json` file is the heart of the tool, ensuring reproducible context generation. All CLI flags that modify the configuration will update this file.

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