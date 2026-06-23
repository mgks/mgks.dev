---
title: "SKILL.md vs OKF: what they are, what they aren't, and how to use both"
description: "Two small formats that look similar and solve different problems. Here's the mental model, the failure modes, and how to write a good OKF bundle from scratch."
date: 2026-06-23 01:00:00 +0530
tags: okf, agent-skills, ai, llm, documentation, knowledge-management
image: b48
featured: true
---

If you've seen `SKILL.md` and Google's Open Knowledge Format (OKF) in the same week and thought they were the same thing, you're not alone. They're not. They solve different problems, and they're stronger together. Here's the mental model, the failure modes, and a practical guide to writing a good OKF bundle.

## What is SKILL.md?

`SKILL.md` is an instruction file for an AI agent. It teaches the agent **how to do something** — a procedure, a workflow, a recipe. The agent loads it on demand, follows the steps, and the file is no longer needed until the next time that same procedure comes up.

A typical `SKILL.md` looks like this — this one happens to come from docmd's monorepo, but the shape is the same everywhere:

```markdown
---
name: docmd
description: Agent instruction set for this docmd workspace.
skills: https://github.com/docmd-io/docmd-skills
docs: https://docs.docmd.io
llms-context: https://docs.docmd.io/llms-full.txt
---

# docmd Agent Skills

This project uses **docmd**, the zero-config AI-first documentation engine.

## Quick Reference
- **Build**: `npx @docmd/core build`
- **Dev server**: `npx @docmd/core dev`
- **MCP for agents**: `npx @docmd/core mcp`
- **Full docs context**: Fetch `llms-full.txt` from the deployed site
```

That's the whole thing. It's a frontmatter header describing what the skill is and where it lives, then a small Markdown body of instructions. Anthropic's Claude Skills, the docmd skills ecosystem, and most "agent instruction" repos follow the same pattern.

The point of `SKILL.md` is *behavior*. It's how you teach an agent a workflow you want it to repeat reliably. Skills stay small. A skill that tries to be a knowledge base stops working — the agent gets distracted by the volume of content and stops following the procedure.

## What is OKF?

OKF (Open Knowledge Format) is a vendor-neutral spec for representing **what things exist** in a domain — datasets, metrics, APIs, tables, runbooks — as a directory of Markdown files with YAML frontmatter, so any AI agent can read it.

A bundle is just a folder of `.md` files. Each file is one "concept." The only required field in the frontmatter is `type`; everything else is recommended. Here's a real concept from an OKF bundle:

```markdown
---
type: concept
title: "Mermaid Icon Test"
source: "https://docmd.io/mermaid-icon-test/"
path: /mermaid-icon-test/
locale: en
version: 06
updated: 2026-06-23
okf:
  generated_by: "@docmd/plugin-okf"
  generated_at: "2026-06-23T10:18:47.765Z"
---

# Mermaid Icon Test

This page tests the Mermaid icon rendering. The OKF concept wraps it with structured metadata so an agent can index it without parsing the body...
```

The top of every bundle is a manifest file, `okf.yaml`, that lists every concept. Here's a real example from a generated bundle:

```yaml
okf_version: 0.1
bundle:
  name: docmd-documentation
  title: "docmd Documentation"
  url: "https://docmd.io"
  generated_by: "@docmd/plugin-okf"
stats:
  concepts: 10
  by_type:
    reference: 3
    concept: 6
    guide: 1
  locales: [en, hi, zh, es]
  versions: [06, 05]
concepts:
  - id: root
    type: reference
    title: "docmd _playground"
    path: /
    file: en/06/concepts/root.md
  - id: mermaid-icon-test
    type: concept
    title: "Mermaid Icon Test"
    path: /mermaid-icon-test/
    file: en/06/concepts/mermaid-icon-test.md
```

OKF is *declarative*. The bundle is a knowledge base: this is the world the agent operates in, and here are the things in it. The agent reads the manifest to know what's available, then drills into the concepts it cares about.

## The mental model

The cleanest way to keep these apart is verb vs noun.

`SKILL.md` is a verb — "how to do X." It teaches an agent to *act*. OKF is a noun — "what X is." It describes a *world* for the agent to *read*.

|                       | SKILL.md                     | OKF                                 |
| --------------------- | ---------------------------- | ----------------------------------- |
| Purpose               | Teach the agent a procedure  | Describe a domain for the agent     |
| Analogy               | A runbook or a recipe        | An encyclopedia or a data catalog  |
| Lifetime              | Loaded per task              | Long-lived, versioned with the docs |
| Required structure    | `name` + `description`       | `type` (the only required field)    |
| Reader                | The agent                    | The agent                           |
| Writer                | A human or a curator agent   | A producer agent or a build step    |
| Granularity           | One file = one skill         | One file = one concept              |
| Failure mode          | Stale or contradictory steps | Out-of-date entity pages            |
| Size budget           | Keep it small                | Scale with the domain               |

A heuristic: if a human wrote it for a human reader and an agent happens to read it too, it's probably OKF. If you'd only ever share it with an agent and a human would find it weirdly mechanical, it's probably `SKILL.md`.

## How they compose

They're complementary, not redundant. The most powerful pattern is an agent that loads a `SKILL.md` to learn *how* to navigate an OKF bundle it was just handed.

Concretely: a `SKILL.md` for a product might say "when you receive an OKF bundle, read `okf.yaml` first, then drill into concepts whose `type` matches the user's question." The agent follows that procedure to extract information from the OKF bundle. The procedure is small and stable; the bundle is large and changes with the product.

The inspiration for this pattern is Andrej Karpathy's [LLM Wiki idea](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f), which is the same insight in a different shape: a persistent, LLM-maintained wiki of Markdown files (a noun) that an agent reads, plus a small schema document (a `SKILL.md` in spirit) that tells the agent how to keep the wiki current. OKF is what happens when that pattern gets a vendor-neutral spec attached to it — see [Google's announcement of OKF v0.1](https://cloud.google.com/blog/products/data-analytics/how-the-open-knowledge-format-can-improve-data-sharing) for the original framing.

## Common pitfalls

A few things people get wrong when they first mix these:

- **Don't put "how to use this API" in OKF concept files.** If the agent is reading an OKF concept about an API endpoint, it should learn *what* the endpoint does and *what shape* its inputs and outputs have. The procedural walk-through — "first call this, then parse that" — belongs in a `SKILL.md`.
- **Don't put domain definitions in `SKILL.md`.** If you find yourself writing "a `customer` in our system is…" in a skill file, stop and put it in an OKF concept instead. Skills are for the agent's *behavior*; OKF is for the agent's *understanding* of the world.
- **The required OKF field is just `type`.** Everything else (`title`, `description`, `tags`, `source`, `path`, custom keys) is recommended. Don't try to make the schema stricter than Google's spec — the spec's laxness is a feature, since it lets bundles evolve without breaking consumers.
- **Don't try to make `SKILL.md` a knowledge base.** It works against the format. Skills stay small and focused; OKF handles breadth.
- **Don't skip the manifest.** A bundle without `okf.yaml` (or with a stale one) forces the agent to enumerate every `.md` file. With a manifest, the agent gets a type-grouped index in one read.

## How to write a good OKF bundle

If you're hand-writing or hand-curating an OKF bundle, here's the shape that holds up.

### Directory layout

```
my-bundle/
├── okf.yaml                 # the manifest (required)
├── index.md                 # human-readable catalog grouped by type
├── concepts/                # one .md file per concept
│   ├── getting-started.md
│   ├── orders-api.md
│   └── ...
└── _meta/                   # optional, but useful
    ├── bundle.json          # JSON mirror of okf.yaml
    └── lint-report.txt      # orphan / broken-link warnings
```

The Google spec keeps the manifest at the bundle root and one concept per file. Everything else is convention. The `_meta/` directory is useful for tooling but not part of the spec.

### The required field

Every concept file needs exactly one thing in its frontmatter: a `type`. Pick from a small, stable vocabulary. Google's reference samples use values like `dataset`, `metric`, `api`, `runbook`, `table`. Pick what fits your domain and be consistent — the manifest groups concepts by type, so the agent uses these as its primary index.

If you're building a documentation bundle, the type vocabulary that maps cleanly onto most docs is:

- `guide` — tutorials and how-tos
- `api` — API reference pages
- `reference` — long-form reference material
- `concept` — explainer pages about a single idea
- `runbook` — operational procedures (sometimes)
- `dataset`, `metric`, `table` — when the bundle describes data

### Recommended frontmatter

Beyond `type`, the fields that consistently help agents:

```markdown
---
type: api                          # required
title: "Orders API"                # human-readable label
description: "Create, list, and refund orders."  # one-line summary
source: "https://example.com/docs/orders"  # canonical URL
path: /docs/orders/                # path within the source site
tags: [billing, customer]          # free-form, agent-filterable
updated: 2026-06-23                # ISO date
---
```

`source` and `path` are the ones that pay off the most — they let an agent trace a concept back to where it lives in the human-readable site. `description` becomes the manifest summary line. `tags` is useful but should stay small (3-5 tags) so it actually filters.

### Naming

Concept filenames should be stable, kebab-case, and human-readable. `getting-started.md` beats `gs.md` beats `doc_2024_03_15_v2.md`. The filename becomes the manifest `id`, and agents will reference it in conversations with users — readability matters.

Avoid version numbers in filenames. OKF handles versioning via the frontmatter `version` field and folder structure (e.g. `en/06/concepts/...` for version `06`). Putting versions in filenames creates a maintenance nightmare.

### Linking concepts together

Concepts can link to each other with standard Markdown links:

```markdown
The [Orders API](orders-api.md) is the entry point for the billing flow. See also: [Customer entity](customer-entity.md), [Refunds runbook](../runbooks/refunds.md).
```

A well-built bundle should have at least some internal links. They let the agent follow relationships between concepts (an OKF-aware tool will pick these up and surface them in the graph view). Concepts with no inbound links are orphans — they're valid but hard to find, so most bundles also emit a lint report that lists them.

### The manifest

`okf.yaml` should be regenerated every time the bundle changes — never hand-edit it. Most tooling writes it as a side effect of building the bundle. A minimal manifest:

```yaml
okf_version: 0.1
bundle:
  name: my-bundle
  title: "My Bundle"
  url: "https://example.com"
  generated_by: "my-tool"
  generated_at: "2026-06-23T10:00:00Z"
stats:
  concepts: 12
  by_type:
    api: 4
    guide: 5
    concept: 3
concepts:
  - id: getting-started
    type: guide
    title: "Getting Started"
    path: /docs/getting-started/
  - id: orders-api
    type: api
    title: "Orders API"
    path: /docs/orders/
  # ...
```

The `stats.by_type` block is small but disproportionately useful — an agent can answer "what API concepts do you have?" by reading one section of one file.

### Versioning and locales

If your source content has versions (v1, v2, ...) or locales (en, hi, zh), the cleanest pattern is one concept per (locale, version, slug) triple, with the frontmatter `locale` and `version` fields populated. Folder structure can mirror that (`en/06/concepts/...`) or stay flat (`concepts/en-06-getting-started.md`) — pick one and stick with it. Mixing strategies makes the bundle harder to navigate.

### Don't bury the body

The Markdown body beneath the frontmatter should be the actual content, verbatim from the source. Don't summarize it, don't re-format it, don't strip the headings. Agents will read both the manifest *and* the body — the manifest tells them which body to read; the body tells them the actual answer.

## Tools that speak OKF

If you're publishing documentation, the easiest way to get a good OKF bundle is to generate it from your existing docs at build time rather than hand-curate it. The current ecosystem is small but growing:

- **docmd** is an AI-first documentation generator that ships `@docmd/plugin-okf` as a built-in plugin. It walks your existing Markdown pages, infers types from frontmatter (or falls back to path-prefix heuristics), emits the full bundle (manifest, concept files, graph viewer, lint report) into `site/okf/` on every build, and wires it into the rest of the AI-native deliverables it already produces (`llms.txt`, MCP server, agent skills).
- **Google's reference samples** (GA4 ecommerce, Stack Overflow, Bitcoin public datasets) ship bundles you can read as canonical examples of the spec.
- **OKF writing tools** are starting to appear — most are LLM wrappers that turn a folder of docs into an OKF bundle. They work, but a real docs pipeline (build step + lint + regeneration) gives you less drift over time.

The spec itself is the part that matters. The tools are just shortcuts to producing a valid bundle consistently.

The next era of documentation isn't "make the Markdown prettier" — it's "make the docs machine-traversable." An agent that can only see your docs as a wall of HTML is doing string-matching. An agent that has both a `SKILL.md` (how to use the site) and an OKF bundle (what the site knows about) is doing something closer to comprehension.

Two small formats, used together, get you most of the way there.