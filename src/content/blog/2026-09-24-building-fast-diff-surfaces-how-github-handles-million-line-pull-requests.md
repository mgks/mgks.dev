---
title: "Building Fast Diff Surfaces: How GitHub Handles Million-Line Pull Requests"
description: "Inside the architecture behind rendering massive pull requests with hundreds of comments performantly. A deep dive into virtualization, geometry, and engineering trade-offs."
date: 2026-09-24 18:00:20 +0530
tags: rollup, open-source, performance, architecture, developer-tools
image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072"
featured: false
---

I've been thinking a lot about what separates good developer tools from great ones, and it often comes down to performance in places you'd never expect. The GitHub team recently shared how they rebuilt the diff surface in the Copilot app to handle enormous pull requests without breaking a sweat. They tested it against a real open-source PR with 2,200 files, over a million changed lines, and 400+ inline comments. The results tell us something important about how to think about scale.

Most developers assume that rendering a massive diff is just a matter of virtualization: only keep visible rows in the DOM, scroll through them, and let the browser handle the rest. That works fine when every row is the same height and nothing changes. But add comments, and suddenly you're dealing with content whose height you can't predict until render time.

## The Geometry Problem

Here's where it gets interesting. A code-only diff is simple because every line is a line of code at a known font size. You can compute all heights upfront. The scrollbar is the right size. Jumping to line 500,000 takes microseconds because it's just arithmetic.

But review threads? They're containers with markdown, images that might not have loaded, expandable sections, reply composers. Their height depends on things that only exist at render time, and those things keep changing. You can't know the height until you paint.

The naive approach is to guess. Reserve a fixed-height slot for each comment based on an estimate. On a big PR, this falls apart fast. An estimate that's right on average is wrong at the extremes. You either waste whitespace on most comments or clip the expensive ones. When you measure the real height after paint and update the layout, everything below shifts while the user is scrolling. That's a scroll jump, and on a million-line PR it's a massive one.

The insight that solves this is elegant: stop forcing one geometry to serve both kinds of content. Split the document into two independent domains.

Code geometry stays deterministic. It's prefix-summed, exact, rebuilt when needed but not when comments resize. Dynamic block geometry covers everything unpredictable: review threads, drafts, reply composers. Each block has a stable key tied to what it is (a comment on file X, line Y) rather than where it sits in pixels. You record a fingerprint of everything that could change its height: the content, whether a details element is open, whether a composer is active. A block's effective height is the measured height if valid, a cached height if nothing changed, or an estimate as fallback.

## The Measurement Loop

The tricky part is measuring these blocks without creating a feedback loop that tanks performance. The obvious wrong answer is one ResizeObserver per block, watching for changes and writing back into the layout. On a large PR, observers can retrigger themselves and costs compound.

What actually shipped is a single measurement pass, gated by idle time and scroll activity. When a measured height differs from the estimate, the scrollbar arithmetic changes. The viewport could jump. The fix is to correct by identity, not by pixel: anchor corrections to whatever the user is looking at so they follow your focus.

There's a sharp edge here that bit the team during hardening. The guard against correcting during scrolls was based on the last observed scroll timestamp. But toggling the file tree sidebar changes the diff pane width. With line wrapping enabled, every wrapped line above you reflows. The surface emits a scroll of its own to settle, and the guard misreads that as user interaction, skipping the very correction it should apply. The fix: tell user scrolls apart from the surface's own corrections. This matters because any 'is the user interacting?' check has to be one your own side effects can't satisfy.

## What This Means

I find this work important not just for extreme cases like million-line PRs. The patterns here matter because they show how to think about performance when complexity is unavoidable. You can't make comments disappear. You can't predict their height. But you can architect around those constraints by separating concerns, by being explicit about what's knowable upfront versus what emerges at runtime.

This is the kind of thinking that applies to features at https://mgks.dev/tags/architecture/ and product design broadly. When you hit a scaling wall, sometimes the answer isn't a faster algorithm but a rethink of the problem itself.

The work also highlights something about how modern tools are built. The diff surface feeds on data streamed from the backend. Metadata arrives before content. Syntax highlighting runs off-thread. Large markdown bodies load lazily. This separation between structure and content, between what's critical for first paint and what improves progressively, is how you stay fast even when the total volume is enormous.

Most pull requests won't ever be a million lines. But the engineering that handles that extreme case makes every PR review smoother. The discipline of thinking in geometry and bounds, of measuring only what you need and correcting only when necessary, of building systems that scale without proportional overhead - that's the real lesson here.

As developers increasingly work with AI-generated code and larger codebases, how many of our tools are actually built to handle the velocity and scale we're moving toward?