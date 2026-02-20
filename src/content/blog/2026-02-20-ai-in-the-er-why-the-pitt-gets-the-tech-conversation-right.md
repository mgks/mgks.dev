---
title: "AI in the ER: Why The Pitt Gets the Tech Conversation Right"
description: "HBO's The Pitt quietly nails the core tension of deploying AI in high-stakes workplaces. Here's what developers should take away from it."
date: 2026-02-20 16:37:26 +0530
tags: rollup, artificial intelligence, machine learning, healthcare, generative ai
image: 'https://images.unsplash.com/photo-1765707886613-f4961bbd07dd?q=80&w=988'
featured: false
---

I don't usually expect a hospital drama to teach me anything about deploying [AI](https://mgks.dev/tags/artificial-intelligence/) in production. But here we are.

HBO's *The Pitt* has been running a subplot this season that honestly captures the real-world friction around generative AI better than most think-pieces I've read this year. It's not a "technology bad" story. It's not a utopian pitch either. It's just... accurate. And that accuracy is what makes it worth talking about.

The setup is simple. A senior attending physician is going on sabbatical. A replacement doctor comes in, and she's a quiet advocate for AI-powered transcription software. A second-year resident is drowning in charting work because the ER is understaffed and slammed. The AI tool gets introduced as a productivity booster. And then a surgeon storms into the ER furious because the charts have clear, dangerous errors in them.

Sound familiar?

## The "Just Check the Output" Problem Nobody Talks About Enough

Here's the thing that the show gets exactly right, and that a lot of teams shipping [AI](https://mgks.dev/tags/artificial-intelligence/) tooling internally completely ignore: adding a verification step on top of AI output doesn't actually reduce workload. It often adds to it.

Dr. Al-Hashimi's position throughout the show is reasonable. She's not naive. She tells her residents and medical students to double-check everything the software produces. She knows it makes mistakes. But she still believes the net value is positive.

That is the exact argument every AI product manager makes before their team ships something.

The reality the show depicts is that you now have a doctor who has to dictate to the software AND then review what the software produced AND then correct the errors. If the error rate is low, maybe that's still faster than typing notes manually. But the moment volume spikes, the moment the waiting room is overflowing, the moment the doctor has four patients to see in the next thirty minutes, that review step is the first thing that gets skipped. That's not a character flaw. That's how humans behave under pressure. Every developer who has ever said "we'll just manually review the model outputs" and then watched that process collapse under real usage conditions knows exactly what I'm talking about.

The charting errors that trigger the surgeon's rage didn't happen because the AI was unusually bad that day. They happened because the conditions under which the AI was being used made careful review nearly impossible.

## Understaffing Is Not an Engineering Problem

This is the part of the show's argument I find most interesting, and also most uncomfortable for people in tech to sit with.

The fictional Pittsburgh Trauma Medical Center is underfunded. It's short on nurses. It has more patients than it has capacity to properly handle. These are structural problems. Systemic problems. The kind of problems that don't have a clever technical solution.

Throwing an [AI](https://mgks.dev/tags/artificial-intelligence/) transcription tool at an understaffed emergency room doesn't give the doctors more time. It gives them a slightly faster way to do one specific task while everything else that's eating their time remains completely unchanged. The show uses this gap between what the technology can do and what the actual problem requires as its central tension, and it's a tension that plays out in real organizations constantly.

I've seen this pattern in software teams too. A team is overwhelmed, shipping is slow, developers are burning out. Someone proposes an AI coding assistant as the fix. Maybe it does help individual developers write boilerplate faster. But the team is still understaffed. The sprint planning is still chaotic. The requirements are still changing every week. The AI assistant made one small slice of the work slightly faster and left everything else exactly as broken as it was before.

That's not a failure of the technology. It's a failure of diagnosis. Treating a staffing and process problem like it's a productivity tooling problem is always going to produce disappointing results.

## Why This Matters for Developers Actually Building These Tools

If you're building anything in the [generative AI](https://mgks.dev/tags/artificial-intelligence/) space, especially anything being deployed in high-stakes domains like healthcare, legal, or finance, *The Pitt* is quietly modeling the critique your product will eventually face.

The lawsuit angle the show hints at is real. There are already documented cases of hospitals facing legal exposure over AI-assisted decisions that went wrong. Studies on large language models being unreliable predictors of patient health outcomes aren't fringe research, they're getting published in serious medical journals. The gap between "the model performs well on benchmarks" and "the model performs well when a stressed-out resident is dictating symptoms in a noisy ER at 11pm" is enormous.

It's worth thinking hard about the conditions under which your tool will actually be used, not the ideal conditions, but the real ones. Real users are tired. They're context-switching. They're under pressure. They will skip the verification step. They will trust the output more than they should when they're overwhelmed. Designing for that reality is harder than designing for the demo, but it's the only design that actually matters.

The show is smart enough not to make the AI villain of this story. The villain, if there is one, is the gap between what organizations hope technology can do for them and what it actually can. That gap is where most of the genuinely interesting and genuinely dangerous things happen, and the fact that a primetime drama is taking the time to dramatize it carefully suggests that this conversation is finally moving out of the tech industry bubble and into the broader public consciousness.

Which means we probably don't have as much time as we think to get the deployment practices right before the scrutiny gets a lot louder.