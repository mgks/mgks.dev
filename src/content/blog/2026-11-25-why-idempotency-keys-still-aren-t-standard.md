---
title: "Why Idempotency Keys Still Aren't Standard"
description: "Most APIs skip idempotency entirely. When you're the caller staring down a timeout with no way to know what happened, that becomes your problem to solve."
date: 2026-11-25 12:00:20 +0530
tags: rollup, software-engineering, api-design, reliability, systems-integration
image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2065"
featured: false
---

Idempotency looks like a solved problem. Stripe published their approach years ago, and most of us have copied it: accept an idempotency key, store it with the response, return the cached response on retry. Simple. Elegant. Standard.

Except it isn't standard at all. I work at maesn, where we build a unified API that talks to 30+ accounting and ERP systems. On our own API, we implement idempotency properly. But when we call those downstream systems, most of them don't offer it. And when a request times out, I face the fundamental problem every integration engineer fears: I cannot know what happened.

Did the request never arrive? Did it arrive and the response vanish on the way back? From the outside, those two cases look identical. Retry and you might book the same journal entry twice. Hold back and you might skip it entirely. This isn't theoretical. I've watched this break systems, blow past month-end closures, and confuse accountants trying to explain duplicate entries to tax authorities.

## The Three Broken Workarounds

When providers don't offer idempotency keys, callers resort to three patterns, and I've seen each one fail.

The first is lookup-based deduplication. Journal entries usually have a document number, often the supplier's invoice ID. After a timeout, you query whether an entry with that number exists. If yes, assume your first request landed. If no, retry.

The problem: a match doesn't prove your request arrived. It only proves *some* entry with that number exists. Two suppliers can both send invoice 1001. Last year's invoice 17 is still in the books when this year's invoice 17 arrives. Your lookup finds the wrong one and skips the new entry entirely. Make the search stricter by matching account, amount, and date too, and you catch more duplicates. But you can't tell whether two identical postings are truly duplicates or legitimately separate transactions. The platform I tested against only raises a yellow warning because it knows its own match can be wrong. For the caller, a false positive (skipping a real entry) is worse than a false negative (booking a duplicate).

There's also a timing problem nobody talks about. The check only works if the first write completes before the second search runs. But retries often fire while the original request is still being processed. Both searches come back empty. Some systems make this worse: records you just created don't appear in search immediately because the search index updates asynchronously. So you check, get empty, check again, still empty, then both writes land.

And you're paying twice. Each entry now costs two API calls instead of one. If a provider rate-limits to 60 requests per minute, you've just halved your throughput and increased timeout likelihood. The workaround feeds the problem it was meant to solve.

## Why Providers Haven't Adopted It

I don't think they skip idempotency carelessly. Most accounting APIs were built for data retrieval or to mirror what someone does in the UI. A person rarely submits a form twice. When they do, they notice. An integration retrying at 3 a.m. does it constantly, and nobody notices until an accountant sees two identical postings in their ledger.

When providers do offer keys, they implement them differently. One uses a header, another a URL parameter. Some forget keys after 24 hours, so a delayed retry becomes a new request. Some only support keys on certain endpoints, not the ones you need. Testing "idempotency support" now means actually sending duplicate requests and checking the database, then doing it again after their next release.

Implementing idempotency properly requires real design work. You have to decide: does a failed request free the key or block it? Do concurrent requests with the same key get a 409 or processed separately? What happens if the same key arrives with a different body? These details determine whether callers can actually trust the system.

## The Minimal Fix

If full idempotency feels like too much work, there's a simpler approach that handles the highest-risk case: creating entries. Add a field where the caller puts their own reference ID, then reject any second entry with the same reference for the same company. When a duplicate arrives, return a 409 with the existing entry.

For the provider: one database rule, one status code. For the caller: all three workarounds disappear and get replaced with a retry that's always safe.

I've built APIs. I know this isn't free. But neither is supporting the ecosystem of [https://mgks.dev/tags/reliability/](broken retry logic) that emerges when you don't. And neither is explaining to customers why their [https://mgks.dev/tags/systems-integration/](integration) needs three separate deduplication strategies to stay safe.

If you're building an API that writes into someone's books, give your callers an idempotency key or at minimum that reference field. Otherwise they will build the three workarounds themselves, test them against whatever your system actually does, and maintain those solutions forever.