---
title: "The Attention Bottleneck: What Nobody Tells You About AI in Engineering"
description: "Exploding bugs, hallucinated citations, and why your best developers are losing the ability to think"
date: 2026-06-15 00:00:20 +0530
tags: rollup, architecture, artificial intelligence, software-development
image: "https://images.unsplash.com/photo-1666462296991-45c5eb42067c?q=80&w=2076"
featured: false
---

I've been thinking about this for a while now, ever since I read a post from Jamie Hurst at booking.com. He's a Principal Engineer working on developer experience, and he said something that stuck with me: the cost of building has collapsed, but the cost of aligning organizationally has not. When three different teams can each produce a working solution to the same problem in the time it used to take to write a proposal, the bottleneck moves from engineering to coordination.

That sentence contains multitudes. It captures everything I've been trying to articulate about where we are with [artificial intelligence](https://mgks.dev/tags/artificial-intelligence/) in software development right now. We can build faster. We can ship more. But something else is quietly breaking, and it's harder to measure than lines of code or tickets closed.

Speaking of which, Greg Wilson wrote a piece recently pointing out that every metric we use to evaluate AI tools is fundamentally broken. Lines of code generated? That tells us nothing about quality. Tickets closed? That's a vanity metric that gets gamed instantly. Developer surveys about feeling productive? That's just vibes. And yet, as Wilson acknowledges, we're stuck using some of these broken measures because the alternatives are worse. It's like navigating by the stars when your instruments are faulty. You do the best you can, but you know you're not seeing clearly.

I use one of those broken measures myself. I ask my team how they feel about their productivity with AI assistance. I know it's flawed. I know people conflate busyness with effectiveness and confuse automation with accomplishment. But here's the thing: when decent measures are hard to find, a dim light still beats walking in darkness. These qualitative signals aren't conclusive, but they're not useless either. The danger is when we mistake them for the real thing.

This brings me to Benedict Evans' observation about automation in accounting. We spent a century automating accounting. Calculating machines, punch cards, mainframes, databases, spreadsheets, ERPs, cloud. We literally built half of the tech industry around making accounting more efficient. And you know what happened? The number of accountants kept going up. Not down. Up.

The nature of the work changed completely. An accountant in 1970 and an accountant in 2025 might share a job title, but they're doing wildly different things. The automation didn't eliminate the profession; it transformed it into something no onepredicted. Evans uses this to argue that forecasting AI's impact on jobs is nearly impossible. We see Jevons Paradox everywhere: once something becomes cheaper, people do more of it. The demand doesn't shrink; it shifts.

I think about this when I hear people confidently declare that AI will replace developers. Maybe it will. But accounting tells us the more likely outcome is that the job transforms into something we don't recognize, something that still gets called "software engineer" but involves activities we haven't imagined yet.

There's another angle to this that's been bothering me. Stephen O'Grady did an analysis of how closed and open models perform on benchmarks over time. The findings are stark. Closed models set the pace of innovation, constantly breaking new ground. Open models chase them, and the catch-up cycle is getting shorter. It took 13 to 18 months for open models to match GPT-4, but only 2 to 7 months to match GPT-4o.

What does this mean for developers? The moats are evaporating. What's frontier today is table stakes tomorrow. If you're building your business on some unique AI capability, good luck. You're on a treadmill that's speeding up, and the destination keeps moving. The practical implication is that investing heavily in proprietary AI Differentiators is probably a losing bet. The commodity baseline keeps rising.

Now here's where things get genuinely concerning. There's a company called GPTZero that makes tools to detect AI writing. I don't know if their detection actually works, but they publish investigations that are worth reading. One of their posts looked at a report from Ernst & Young Canada on cyber threats to loyalty systems. More than half the references were hallucinations. Made up citations. Fake sources.

The worst part isn't that some consultants shipped a bad report. It's that publishing this kind of content online essentially injects poisoned data into the internet's knowledge pool. Future researchers might cite these fake references. Other AI systems might train on this content. The well gets poisoned, and it's hard to trace back to the source. A reputable firm's brand becomes a vector for misinformation.

This is happening way more than people realize. The incentives are misaligned: it's cheap to prompt an LLM to produce a report, but verifying every claim takes real expertise that organizations often don't have.

On a more positive note, here's something that genuinely excites me. Mozilla recently posted about using AI to find and fix security bugs in Firefox. A few months ago, AI-generated security bug reports were mostly unwanted noise. Projects were getting flooded with plausible-sounding but wrong reports, and the cost of investigating them fell entirely on maintainers. Cheap to generate, expensive to dismiss. That's an asymmetric attack on open source.

But then things changed. The models got better, and Mozilla improved their techniques for steering and stacking them. During 2025, they fixed 17 to 31 security bugs per month. In April 2026, they fixed 423. In a single month. That's not incremental improvement; that's a fundamental shift in what a small team can accomplish on defense.

This is what AI looks like when it's used for defense rather than attack. Finding bugs before attackers do. The same capability that makes it easy to generate slop also makes it easy to generate signal, if you know how to filter.

And here's the thing about filtering: Pavel Voronin wrote recently about what happens when LLMs ingest degraded codebases. In a degraded codebase, the model doesn't see technical debt as debt. It sees examples. It sees precedent. It sees a style to continue. Bad code gets multiplied.

He coins two terms that I think are going to matter. Cognitive debt is when a team uses abstractions it no longer understands. Generative debt is when a codebase contains confused concepts that models are likely to reproduce. The first is about human understanding decaying. The second is about the model internalizing that decay and perpetuating it.

The implication is terrifying: if you have a messy codebase and you start using AI to work on it, you're not just accumulating debt. You're automating the reproduction of that debt at scale. The model will faithfully continue what you've been doing, with or without understanding. Multiply is the wrong word. It's not multiplication; it's replication. The code gets cloned in ways you didn't authorize.

This connects to something Andy Osmani pointed out about spawning AI agents. He says it's like launching a bunch of parallel processes that all rely on a single orchestrating thread. You. The human. Python has a Global Interpreter Lock. You can spawn threads, but only one executes at a time because they must acquire the lock. Spawn as many agents as you want; when their work needs genuine understanding of the architecture or merge conflict resolution, that work has to acquire your attention. There's one lock, and you hold it.

The skill isn't launching agents. Anyone can run twenty. The skill is designing the workflow around that one serial resource that cannot be cloned or parallelized. That's your attention. Precious, finite, the real bottleneck.

This is what Jamie Hurst was getting at with his observation about coordination costs. When three teams can all ship a solution in the time it used to take to write a proposal, the bottleneck isn't writing the code. It's deciding which code to ship, integrating it, maintaining it, understanding it. The slack that used to exist between tasks, the unstructured time where strategic thinking actually happens, gets eaten first because it's invisible on a dashboard.

 Hurst said he's at a point in his career where thinking is supposed to be most of the job, and most of it now happens on holiday because the working week doesn't accommodate it. That hit hard. I've felt that. We ship more, verify less, and somewhere in there, we've traded our ability to actually think about what we're doing.

Jason Koebler from 404 Media wrote about this in a different way. He talked about AI-generated slop filling the web, and how it's making us humans react to slop and the threat of slop. We review our own writing and notice things. We think: it's not just reading AI slop that hurts us, it's the risk that we write something that looks like AI slop. If AI copied phrasing from me, does it seem like I'm copying AI?

This has spawned what's being called "humanizers," AI tools specifically designed to make writing look less like AI. They add typos, randomly replace words, remove AI tells, insert random characters. It's an arms race to appear human. The irony is exquisite: we invented machines to help us write, and now we're inventing machines to help us hide the fact that we might have used machines to write.

Koebler called it the Zombie Internet. Large parts of it aren't just bots talking to bots or bots talking to people. It's people talking to bots, people talking to people, people creating AI agents and then instructing them to interact with other people. He describes his email inbox, where he used to occasionally get poorly formatted, poorly written, extremely long emails from delusional people who were positive the CIA had imprisoned them in a virtual torture chamber. Now he gets well formatted, passably written, extremely long emails from delusional people who are positive they have proven AI sentience and have the AI transcripts to prove it.

I don't know if that's funnier or sadder. Probably both.

Here's where I land on all of this. The productivity gains from AI are real, in the narrow sense. We can do more. We can ship faster. But those gains are being captured by output volume rather than output quality. Organizational expectations rise to absorb the speed-up, and the slack disappears. The unstructured time where you actually think about whether you're building the right thing gets consumed first because there's no metric for it. You can't put "taking time to understand the problem" on a dashboard.

We are living through a genuine technological shift. The question isn't whether AI changes things; it's whether we can changed along with it without losing something essential. The accountants figured it out, eventually. Their job became something different, but still valuable. But it took a century, and it involved a lot of disruption that nobody planned for.

We probably don't have a century. What we have is our attention, our ability to think critically about what we're building, and the awareness that faster isn't always better. The rest is just execution. And execution without thought is just motion. I'm trying to remember which one matters.