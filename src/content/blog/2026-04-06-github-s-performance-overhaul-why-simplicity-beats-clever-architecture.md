---
title: "GitHub's Performance Overhaul: Why Simplicity Beats Clever Architecture"
description: "How GitHub slashed heap usage by 10X and made massive pull requests usable again by questioning every abstraction and DOM node."
date: 2026-04-06 00:00:54 +0530
tags: rollup, open source, react, performance
image: 'https://images.unsplash.com/photo-1666462296991-45c5eb42067c?q=80&w=2076'
featured: false
---

I've been thinking a lot about how we overcomplicate things in pursuit of "clean" architecture. GitHub's engineering team just published a fascinating breakdown of how they made their pull request diff viewer dramatically faster, and the story isn't about adopting some hot new framework or clever algorithmic trick. It's about admitting that their original React architecture, which probably looked great in code review, was fundamentally wrong at scale.

The numbers are wild. Before optimization, large pull requests could balloon the JavaScript heap to over 1GB. DOM node counts exceeded 400,000. The Interaction to Next Paint (INP) scores were so bad that users could literally feel the lag when clicking around. In extreme cases, the page became unusable. This is GitHub we're talking about, not some startup cobbling together their first MVP.

## The Abstraction Tax

What fascinates me most is how they got there. The original v1 architecture was built on what sounds like reasonable principles: small, reusable React components maintaining a clear DOM tree structure. Each diff line was composed of eight components in unified view, 13 in split view. They shared code between views through wrapper components. It probably felt elegant during development.

But here's the brutal reality: each of those components attached five to six event handlers. A single diff line could end up with 20+ event handlers. Multiply that across thousands of lines and you've created a performance nightmare. The abstraction that let them share code between split and unified views meant both code paths existed in memory, even though only one ever rendered.

I see this pattern everywhere. We build abstractions to avoid code duplication, then wonder why our apps feel sluggish. The v1 architecture also used deeply nested component trees with lots of O(n) lookups and useEffect hooks scattered throughout. Every line carried complex commenting state, even though most lines would never have comments. It's the classic trap of optimizing for code aesthetics over runtime performance.

## Burning It Down

The v2 rewrite is refreshingly pragmatic. They split unified and split views into dedicated components. Yes, this meant duplicating some code. But it also meant each component became dramatically simpler. They went from eight components per diff line to just two.

They also moved to a single top-level event handler using data attributes instead of attaching handlers to every element. When you click and drag to select lines, one handler checks data attributes to determine which lines to highlight. The old approach had every line listening for mouse events. It's such an obvious optimization in hindsight, but I guarantee it felt "less React-like" to whoever proposed it first.

The state management changes are even more interesting. They moved commenting and context menu state into nested components, so diff lines only worry about rendering code. Then they rebuilt their state machines to use JavaScript Maps for O(1) lookups instead of scanning arrays. A comment lookup now looks like `commentsMap['path/to/file.tsx']['L8']` instead of filtering through a list.

They also banned useEffect hooks below the top level of diff files and added linting rules to enforce it. This level of discipline is rare. Most teams would debate it in Slack for three weeks and then forget about it.

## The Nuclear Option

Even after all these improvements, pull requests with 10,000+ diff lines still struggled. That's where window virtualization comes in. Only the visible portion of the diff exists in the DOM at any time. As you scroll, elements swap in and out dynamically.

This isn't a new technique. TanStack Virtual, the library they integrated, has been around for years. But it's also not a trivial change to retrofit into an existing application. You're essentially admitting that your original architecture can't scale and you need a fundamentally different rendering model for large datasets.

The results speak for themselves: 10X reduction in JavaScript heap usage and DOM nodes for massive pull requests. INP dropped from 275-700ms to 40-80ms. That's the difference between a page that feels broken and one that feels native.

They didn't stop there. They optimized CSS selectors, switching away from expensive `:has()` selectors. They re-engineered drag and resize handling with GPU transforms to eliminate forced layouts. They built a Datadog dashboard with interaction-level INP tracking and diff-size segmentation. They optimized server-side rendering to hydrate only visible diff lines.

## What This Actually Means

This whole saga reinforces something I've been noticing across the industry. The [artificial intelligence](https://mgks.dev/tags/artificial-intelligence/) tooling boom has made it easier than ever to generate mountains of abstracted, "clean" code. But performance is still about ruthlessly questioning every layer, every component, every event handler.

GitHub's team measured everything. They knew exactly how many DOM nodes each approach generated. They tracked INP scores across different pull request sizes. They built tooling to catch regressions. This level of instrumentation is what separates teams that ship fast apps from teams that ship slow ones.

The part that gets me is how they had to duplicate code to get there. We've spent decades being taught that duplication is evil, that DRY (Don't Repeat Yourself) is gospel. But sometimes the opposite is true. Sometimes having two similar functions that do one thing each is faster and simpler than having one abstracted function that handles both cases.

I also appreciate that they didn't wait for a silver bullet. They implemented multiple strategies targeting different pull request sizes. Small diffs got one set of optimizations, massive ones got window virtualization. This kind of pragmatism is underrated.

## The Real Lesson

Reading between the lines, I suspect the v1 architecture looked great during initial development. The components were clean, the abstractions made sense, the code was probably easy to test. But it couldn't handle the reality of GitHub's scale, where pull requests can span millions of lines.

This is the pattern I keep seeing: teams build what feels like good architecture in the abstract, then discover it collapses under real-world usage. The fix isn't usually a new framework or a clever algorithm. It's simplifying. Fewer components, less state, fewer event handlers, less JavaScript.

GitHub's engineering team could have tried to bandaid the v1 architecture. They could have added more memoization, more shouldComponentUpdate checks, more clever caching. Instead they rewrote the core rendering logic to be fundamentally simpler. That takes courage and organizational support.

The whole story makes me wonder how many slow web apps out there are slow not because of some inherent technical limitation, but because nobody took the time to measure, question, and simplify. We're so focused on shipping features and hitting deadlines that performance becomes this vague aspiration rather than a measurable, achievable goal.

I'd bet a significant percentage of [open source](https://mgks.dev/tags/open-source/) projects suffer from similar issues, except they don't have GitHub's resources to fund a months-long performance overhaul. Which means users just accept that diffing large files is slow, that syntax highlighting lags, that scrolling stutters. We've normalized bad performance.

The wild thing is that GitHub shipped this as the default experience for all users. No feature flag, no gradual rollout to enterprise customers first. They were confident enough in the improvements to just flip the switch. That's the part that impresses me most, because it means their instrumentation and testing were good enough to catch issues before users did.

It makes me think about all the times I've chosen abstraction over simplicity, clever architecture over dumb components that just work. How many of those choices created performance problems I never measured or noticed because my test data was always small? Probably more than I'd like to admit.