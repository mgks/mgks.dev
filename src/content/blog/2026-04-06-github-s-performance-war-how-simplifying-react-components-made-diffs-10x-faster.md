---
title: "GitHub's Performance War: How Simplifying React Components Made Diffs 10x Faster"
description: "GitHub gutted their diff viewer's React tree and won big on performance. Here's what happens when you stop overengineering your components."
date: 2026-04-06 12:00:54 +0530
tags: rollup, open source, react, performance
image: 'https://images.unsplash.com/photo-1727434032792-c7ef921ae086?q=80&w=2232'
featured: false
---

I've been digging into GitHub's recent overhaul of their pull request diff viewer, and honestly, it's one of the most satisfying performance war stories I've read in a while. Not because they threw some fancy [artificial intelligence](https://mgks.dev/tags/artificial-intelligence/) at it or adopted the latest framework du jour, but because they did the opposite. They stripped things down, simplified aggressively, and actually made their code *less* clever.

The numbers tell the story pretty bluntly. Before the rewrite, large pull requests could balloon the JavaScript heap to over 1GB. The DOM would hit 400,000 nodes. Users could literally feel the lag when clicking around. Interaction to Next Paint scores were in the toilet. This wasn't some edge case either. At GitHub's scale, plenty of pull requests span thousands of files and millions of lines.

## The Original Sin: Too Many Components

Here's where it gets interesting. The v1 architecture wasn't built by idiots. It followed what most of us would consider React best practices. Small, reusable components. Clean separation of concerns. DRY principles everywhere. A single unified diff line needed at least 8 React components. Split view? 13 components minimum. That's before you add syntax highlighting, which explodes the DOM with span tags.

Each of those tiny components carried 5-6 event handlers. Do the math on that. Twenty-plus event handlers per line, multiplied across thousands of lines. The React reconciliation alone was doing more work than actually rendering the diff.

And here's the kicker: they built it this way on purpose. When they first ported from Rails views to React, the component-heavy approach made total sense. It was maintainable, it was elegant, it followed the patterns everyone recommends. But elegance doesn't scale linearly. Sometimes it breaks exponentially.

## Burning It Down and Starting Over

The v2 rewrite is almost embarrassingly simple. They collapsed 8 components per line down to 2. They duplicated code between split and unified views instead of sharing abstractions. They ripped out nested component trees and replaced them with flat, dedicated components.

This goes against everything we're taught about code reuse. But you know what? It worked. They dropped from 10 DOM elements per line in unified view to just 5. In split view, 15 elements became 7. That's before even getting to the fancy stuff.

The event handling change alone is worth studying. Instead of attaching handlers to every component, they moved to a single top-level handler that reads data attributes. When you drag to select multiple lines, one handler checks which lines you've touched. No more dozens of mouseenter functions firing.

They also did something that should be obvious but often isn't: they moved commenting state into the actual comment components. In v1, every single diff line carried commenting state, even though most lines never get comments. That's pure waste. In v2, the diff line component just renders code. If you need to comment, that state lives in a child component that only mounts when needed.

## The Data Structure Revolution

The backend changes are equally brutal in their simplicity. They replaced O(n) lookups scattered everywhere with O(1) constant time access using JavaScript Maps. Now checking if a line has comments is just `commentsMap['path/to/file.tsx']['L8']`. One operation, no iteration, done.

They also banned useEffect hooks except at the top level. That's a spicy take. useEffect is React's bread and butter for side effects, but it's also where performance dies. Every useEffect is a potential re-render bomb. By restricting it to top-level components and enforcing that with linting rules, they made memoization actually work.

The results speak for themselves. On a 10,000-line pull request, JavaScript heap dropped from 1GB to 100MB. DOM nodes fell from 400,000 to 40,000. INP went from 700ms to under 100ms. That's not optimization, that's a complete transformation.

## Virtualization: The Nuclear Option

For truly massive pull requests, even the v2 architecture hits limits. That's where window virtualization comes in. They integrated TanStack Virtual to only render what's visible on screen. Everything else gets swapped in and out as you scroll.

This is table stakes for any app dealing with large lists, but implementing it correctly is tricky. You need to handle scroll position, measure element heights accurately, and keep the experience smooth. GitHub nailed it. For their p95+ pull requests (the really big ones), this alone cut heap usage and DOM nodes by 10x. INP dropped from 275-700ms down to 40-80ms.

The wild part is they also optimized server-side rendering to only hydrate visible lines. So you're not just virtualizing on the client, you're shipping less HTML in the first place. That cuts time-to-interactive and keeps memory pressure low even on initial load.

## What This Means for the Rest of Us

I think the real lesson here isn't about React or GitHub specifically. It's about what happens when you take performance seriously enough to question your assumptions. The [open source](https://mgks.dev/tags/open-source/) community loves to cargo cult best practices, myself included. We read that small composable components are good, so we make everything small and composable. We hear that abstractions prevent duplication, so we abstract everything.

But sometimes the best code is the dumbest code. Sometimes duplication is fine if it means you can delete three layers of abstraction. Sometimes one big component beats five small ones. The trick is knowing when to break the rules, and that only comes from measuring.

GitHub's engineering team could have thrown hardware at this problem. They could have added loading states and skeletons to hide the slowness. Instead they did the hard work of actually making it fast. And they shared their approach publicly, which means we all get to learn from it.

The next time you're building a feature that needs to handle unbounded data, maybe start by asking how simple you can make it instead of how elegant.