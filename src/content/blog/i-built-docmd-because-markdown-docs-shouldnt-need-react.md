---
title: "I Built Docmd Because Markdown Docs Shouldn't Need React"
description: "All I wanted was to render a bunch of `.md` files into a clean-looking docs site. No dark magic. No Webpack. No theming rabbit hole. Just Markdown in, HTML out."
date: 2025-07-31 17:00:00 +0530
tags: open source, nodejs, docmd
image: b40
featured: true
---

I’ve been writing a lot of documentation lately for almost a dozen projects in span of a year, which in itself is extremely exhausting. And somewhere between my third `mkdocs.yml` and another bloated Docusaurus config file, I realised: *this is ridiculous.*

All I wanted was to render a bunch of `.md` files into a clean-looking docs site. No dark magic. No Webpack. No theming rabbit hole. Just Markdown in, HTML out.

So I did what any reasonable person on the brink of documentation-induced burnout would do - I built my own tool.

Enter **[Docmd](https://docmd.mgks.dev)** - a minimal, Node.js-based static site generator for Markdown documentation.

### What makes Docmd different?

It’s not trying to beat MkDocs, Mintlify or Docusaurus at their own game. They’re great — if you need their full weight. But Docmd is for when you don’t. It’s:

* **Instant**: Give it a folder of `.md` files, and it’ll generate a docs site.
* **Pretty**: Comes with multiple themes, syntax highlighting, and responsive layout.
* **Smart**: Handles nested folders, breadcrumbs, favicons, metadata, sitemap.
* **Extendable**: Plugin support is built-in (early stage), and you can use containers like `::: card` and `::: tab` right inside markdown.
* **Zero React**: No hydration, no client-side JS bloating your docs. Just HTML, CSS, and a tiny bit of JS for interactivity.

You can customise the sidebar, toggle themes, include Google Analytics, even generate a sitemap. And it just... works. Locally or on GitHub Pages.

### But why build this?

Because existing tools were overkill for my use case. I didn’t want a doc *framework*. I wanted a doc *renderer*. Something between `cat file.md` and “here’s a React app that compiles into a doc site”.

Also, I refuse to pay monthly for a static site generator. Especially when it’s just spitting out HTML from Markdown I already wrote.

### Quick Start

```bash
npm i -g @mgks/docmd
docmd build
```

That’s it. A full website is now sitting in your output folder. Add it to GitHub Pages, Netlify, S3, or wherever you host static sites.

**Demo: [docmd.mgks.dev](https://docmd.mgks.dev)**
**Source: [github.com/mgks/docmd](https://github.com/mgks/docmd)**

### Is this for you?

* You write documentation in markdown.
* You don’t want to learn a new templating language.
* You like fast tools that get out of your way.
* You want docs that load quickly and work offline.

If that’s you, give Docmd a spin. And if it isn’t, well... carry on with your 600-dependency static site. No judgement here.

Docmd was built out of frustration, but shaped with a bit of care. If you're building open-source projects, internal tools, or just want your markdown to look nice — it might save you some time.

And if not, no worries. At least now I don’t have to fight Docusaurus every time I add a new `.md` file.


**Fun fact**: MkDocs' default material theme includes over 500 CSS variables. Docmd has... 12.