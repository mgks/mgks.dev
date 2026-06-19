---
title: "Datasette Apps: The Future of Building Database-Powered Interfaces"
description: "Datasette Apps let you embed sandboxed HTML/JavaScript in Datasette with SQL access. Here's why this matters for developers."
date: 2026-06-20 00:00:26 +0530
tags: rollup, engineering, datasette, sqlite, artificial-intelligence
image: "https://images.unsplash.com/photo-1747920523600-bd6a3d064f4d?q=80&w=2070"
featured: false
---

Datasette has always been about exposing data through a clean JSON API, but there's a fundamental limitation when your frontend needs to be more than just a basic table viewer. I've been thinking about this for years. The moment you want something interactive, you're either hacking together custom routes or you need a whole separate application. That's a gap I've wanted to fill for a while now.

The new Datasette Apps plugin changes the calculus entirely. It lets you host self-contained HTML and JavaScript applications right inside your Datasette instance, running in a tightly constrained iframe sandbox. These apps can execute SQL queries against your data directly from client-side JavaScript. Want read-only queries against a database? That's built in. Want write capabilities? You can configure stored write queries and whitelist them for specific apps.

The security architecture here is genuinely clever. The iframe uses the sandbox attribute to prevent the app from reading cookies, accessing localStorage, or touching the parent DOM. But it can still use fetch() to make requests, which initially worried me. A malicious app could exfiltrate data to external servers. The solution involves injecting a Content-Security-Policy header that locks down which domains the app can communicate with. What's nice is that once set, the CSP is immutable from within the iframe. The app can't modify or remove it.

This wasn't a straight path though. The first version used postMessage() for communication between the iframe and parent window, creating a simple protocol where the app requests SQL execution against allow-listed databases. Then one of the language models (I think it was GPT-5.5) pointed out potential vulnerabilities if somehow additional code loaded from an untrusted domain. So I ported everything to use MessageChannel() instead, which has the useful property of automatically closing if the frame navigates away.

I've been building toward this concept for a while. One of my earliest Datasette projects was an internal search engine for documentation at Eventbrite. It imported documents from different systems into SQLite on a cron job and served them through Datasette with a custom HTML+JavaScript interface that directly queried the API. The JavaScript was constructing SQL queries, which started as an engineering joke but turned out to be shockingly productive. That project planted the seed.

Combine that with my work on HTML tools and experiments around Claude Artifacts, and you get Datasette Apps. The breakthrough realization was that adding a Datasette-style backend to self-contained HTML frontends creates an absurdly powerful combination. Think about how much more useful AI-generated artifacts could be if they had access to a persistent relational database. That's exactly what this enables.

There's an interesting LLM angle here too, though the plugin itself has no AI dependencies. The shape of these apps makes them perfect for generation by modern language models. The create app form includes a copyable prompt containing everything a model needs to build a new app, including database schemas. You can copy that prompt, paste it into ChatGPT or Claude, describe what you need, and there's a reasonable chance it spits out working code. If you have Datasette Agent installed, your AI assistant gets tools to create and edit apps directly, giving that Claude Artifacts experience but with real database backends.

One thing that still blows my mind: during development, Claude Fable 5 ran a security evaluation and found a genuine vulnerability. I was allowing users to add arbitrary domains to the CSP allow-list, but Fable pointed out an attack vector I had missed. I immediately restricted that capability to a new permission scope and added administrative controls for configuring allowed CSP origins. That's defense in depth working exactly as intended.

What excites me most is where this heads. Datasette started as a tool for exploring and publishing data, then Datasette Agent added AI-assisted interrogation. Datasette Apps pushes it further into building custom interfaces and visualizations. We can now support full read-write applications as Datasette Apps, running safely with granular permissions over what each app can do.

The implications for developers are significant. You can prototype data-driven applications in minutes using natural language, deploy them alongside your existing Datasette instance, and have confidence they're sandboxed appropriately. This lowers the barrier to building custom tools around your data while maintaining security boundaries that would be impossibly difficult to enforce in a traditional setup.