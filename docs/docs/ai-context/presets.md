---
title: "aiContext Presets Reference"
description: "A detailed list of all available presets for aiContext, including configurations for Node.js, Python, Rust, Java, Android, and more."
---

Presets are additive configurations that provide sensible defaults for common technologies by extending the `excludePaths` and `includeExtensions` lists.

You can apply a preset with the `-p` or `--preset` flag.

```js
# Apply the Go and Python presets
npx aicontext -p go python
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