---
title: "I Built an AI-Powered Issue Triage App and Learned Why Server-Side Architecture Still Matters"
description: "Building IssueCrush with GitHub's Copilot SDK taught me hard lessons about session management, graceful degradation, and why mobile AI needs a backend."
date: 2026-03-25 00:00:32 +0530
tags: rollup, open source, artificial intelligence, github, react native
image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072'
featured: false
---

I've been maintaining [open source](https://mgks.dev/tags/open-source/) projects for years now, and the notification badge on GitHub has become a source of genuine anxiety. You know the one. That little number that starts at 12 and somehow becomes 47 by the end of the week. Each notification represents context I need to rebuild in my head, a decision I need to make, and mental energy I probably don't have.

So I built IssueCrush, a mobile app that turns issue triage into a swipeable card game. Swipe left to close, swipe right to keep, tap a button to get an [AI](https://mgks.dev/tags/artificial-intelligence/) summary that tells you what actually matters. The technical implementation taught me more about the realities of integrating AI into mobile apps than any documentation ever could.

## The Architecture Decision That Wasn't Really a Decision

When I first looked at the GitHub Copilot SDK, I had this naive hope that I could just import it into React Native and call it a day. That lasted about fifteen minutes.

The SDK needs Node.js. Not "technically uses Node.js but could be shimmed." It genuinely requires a Node runtime because it spawns and manages a local Copilot CLI process, communicating over JSON-RPC. React Native apps run JavaScript, but they don't run Node. The CLI binary expects to live on a system PATH somewhere, not bundled into an iOS or Android app.

This forced me server-side, which felt like a step backward at first. I wanted everything self-contained in the mobile app. But hindsight makes it obvious why this is the right call. Credentials never leave the backend. The [artificial intelligence](https://mgks.dev/tags/artificial-intelligence/) logic stays in one maintainable place. The mobile client stays simple and fast.

The server setup isn't complicated, but it's particular. You need the Copilot CLI installed and available in your PATH. The SDK manages its lifecycle internally, but you're responsible for making sure the environment is sane. I used dynamic imports with `await import('@github/copilot-sdk')` instead of top-level requires, which meant the server could at least start even if something was misconfigured with the SDK.

## Session Management Will Humble You

The SDK follows a strict lifecycle: start the client, create a session, send messages, disconnect the session, stop the client. Miss one of those steps and you're leaking resources. I know this because I did exactly that.

Two hours. That's how long I spent debugging memory issues before I realized I'd forgotten a single `disconnect()` call. The session just sat there, holding onto whatever resources it needed, while I spun up new sessions with every API request. By the time I noticed, my local dev server was consuming an absurd amount of memory.

Now I wrap every session interaction in try/finally blocks. The cleanup happens no matter what. I even add `.catch(() => {})` on the cleanup calls themselves, because I learned that cleanup errors can mask the original error if you're not careful. The code looks defensive because it needs to be.

```javascript
try {
  const session = await client.createSession();
  try {
    const response = await session.sendAndWait(prompt, 30000);
    return response;
  } finally {
    await session.disconnect().catch(() => {});
  }
} finally {
  await client.stop().catch(() => {});
}
```

The `sendAndWait()` timeout is another thing you have to tune. Set it too low and complex issues time out before the model finishes thinking. Set it too high and users stare at a spinner long enough to give up. I landed on 30 seconds, which feels like forever in app time but handles most issues fine.

## Prompt Engineering Is Just Good Data Modeling

I spent way too much time trying to craft the perfect prompt before I realized the obvious: prompt structure matters more than prompt cleverness.

Instead of dumping the entire issue body as raw text, I give the model organized metadata. Title, labels, author, timestamps, body. Structured like you'd structure any API request. The model knows what to do with labeled data. It's way better at parsing "Author: first-time contributor" than trying to infer contribution history from prose.

The author context turned out to be more valuable than I expected. An issue from a core maintainer reads differently than one from someone filing their first bug report. The AI picks up on that and adjusts its summary accordingly. Same with labels. If an issue is tagged "security" or "breaking change," that signals priority without me having to explain it in the prompt.

## Graceful Degradation Isn't Optional

AI services fail. Rate limits hit. Network connections drop. Subscriptions expire. If your app's core functionality depends on an AI call succeeding every single time, you've built a fragile app.

I handle two failure modes explicitly. If the Copilot service returns a subscription error, the server sends back a 403 and the client shows a clear message: "AI summaries require an active Copilot subscription." Everything else falls back to a metadata-based summary built from what we already have.

The fallback summary isn't magical, but it's useful. It tells you the issue title, who opened it, how many comments it has, what labels are attached. That's often enough to make a triage decision. The AI summary is better, but the fallback means the app still works when the AI doesn't.

I also added a `/health` endpoint that the client checks on startup. If the backend can't support AI summaries right now, the button just doesn't appear. No broken functionality, no confusing error states. The app works, just without that one feature.

## Caching Is Free Money

Once you have a summary, store it. This seems obvious but I've seen plenty of implementations that regenerate summaries every time the UI re-renders. That's wasted API calls, wasted money, and wasted time.

In IssueCrush, the summary gets attached to the issue object as soon as it's generated. If you swipe away and come back, the cached version renders instantly. No second API call. No spinner. The summary is already there.

This also means you can prefetch summaries for issues you're pretty sure the user will see. I don't do that yet because I wanted to keep costs predictable, but the architecture supports it. Generate summaries on-demand for now, optimize with smart prefetching later if usage justifies it.

## Why This Actually Matters for Maintainers

Triage is invisible work. Nobody thanks you for closing duplicate issues or labeling feature requests. It just piles up in the background while you're trying to write code, review PRs, or mentor contributors. The mental overhead is real and it compounds.

If I can cut the time it takes to process 50 issues in half, that's not just efficiency. That's sustainability. That's the difference between dreading your notification badge and feeling like you can actually keep up.

The Copilot SDK is one tool, but the pattern matters more. Look at the parts of maintaining that drain you and ask whether AI can take a useful first pass. Not replace you, but give you a head start. Summaries for issues. Suggestions for similar past discussions. Context about why a particular bug report might be urgent.

The code for IssueCrush is on GitHub if you want to see the full implementation. The server-side pattern I outlined here is the simplest path to a working integration, and it scales better than trying to cram everything into the mobile app.

Building tools that make maintainership less exhausting isn't just a technical challenge, it's an investment in keeping the people who hold [open source](https://mgks.dev/tags/open-source/) together from burning out entirely.