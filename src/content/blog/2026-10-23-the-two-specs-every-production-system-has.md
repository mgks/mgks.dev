---
title: "The Two Specs Every Production System Has"
description: "Why your tests might miss what your system actually does, and how characterization testing catches regressions that intent-based tests never will."
date: 2026-10-23 18:00:20 +0530
tags: rollup, software-engineering, testing, legacy-code, production-systems
image: "https://images.unsplash.com/photo-1666462296991-45c5eb42067c?q=80&w=2076"
featured: false
---

I've watched this play out enough times to recognize the pattern. A team ships a feature, writes tests that pin their intentions, and the feature works fine. Years pass. The system picks up undocumented behavior. Someone fixes what looks like an obvious bug and gets a furious message three hours later from a team whose entire integration was built on that "bug."

The problem isn't that the team was careless. The problem is that every long-lived system has two specs, and we only test one of them.

The first spec lives in your test files. It's what somebody intended when they wrote the code. The second spec lives in production behavior. It's what the system actually does, including all the quirks, weird edge cases, and default values that nobody bothered to document. Hyrum Wright at Google named the phenomenon: once your API gets enough users, every observable behavior becomes someone's dependency. Not just the documented contract. The ordering of results. The exact error message. Whether a field shows up as null or just doesn't appear. All of it.

Regular regression tests can't help much here. They only check what someone thought to check. Everything accidental slips right through.

## Characterization Tests as a Safety Net

Michael Feathers put a name on the solution in *Working Effectively with Legacy Code*. He called them characterization tests, and the approach is almost provocative: before you touch code you don't fully understand, write tests that capture what it does right now. Not what it should do. What it actually does.

Run the code. See what comes out. Pin that in a test. If it looks like a bug? Pin it anyway. Leave yourself a note if you want. Correctness isn't the goal. The goal is a safety net that yells the moment behavior shifts.

It feels wrong at first. Writing a test that asserts behavior you're pretty sure is broken goes against every instinct developers have. It takes a real mental flip to see that pinning the bug is the whole point. You're not saying it's fine. You're making sure that if it changes, someone consciously decided to change it.

But that flip matters. When characterization tests turn red, they're not reporting bugs. They're reporting behavior changes. And the next question is always: did we mean that? Sometimes yes. You fixed the quirk on purpose, you warned the teams relying on it, and the new behavior becomes the baseline. Sometimes no, and you just caught a regression that no intent-based test was ever going to notice.

## Where This Gets Real

The real power emerges when you stop trying to write characterization tests by hand. Golden master testing, or approval testing as some call it, captures a big chunk of output all at once and checks every future run against it. But for services, it gets better still.

Your production traffic is basically a characterization test that hasn't been written yet. Every real request and response pins how your system behaves on actual inputs, including the strange ones nobody would dream up in a test file. Capture what goes into your service and what comes back out. Better yet, capture what your service sends to its dependencies. Record at the network level and you catch database queries, queue messages, HTTP calls, everything.

Replay those recordings later with dependencies answered from the same capture, and you've got a characterization suite that's identical every run. Same inputs in, same downstream behavior. If a response changes or the service suddenly makes an extra database call, it shows up in the diff.

This catches some of the most expensive regressions. The ones that keep the response identical while quietly changing what happens underneath. A new database query that's harmless in testing and brutal at scale. A suite built on real traffic spots those too.

## When This Matters Most

Refactoring legacy code is the classic case. Pin the behavior, then move things around without the cold sweat. Framework and library upgrades are another huge one. A new major version of your web framework can nudge behavior in tiny ways intent-based tests never examine.

Rewrites might be best of all. When you port a service to a new language, the old service's recorded traffic becomes the spec for the new one. Fire the same requests at both. Any difference is either a deliberate improvement or a regression.

And then there's AI-assisted changes. When an LLM drafts a big refactor and updates the tests in the same sweep, a baseline captured beforehand is one of the few checks that doesn't share the same assumptions as the change itself.

I think about this differently now. Every service with real users has two specs. Most regression testing only protects the first. The second one is often the one that bites hardest.