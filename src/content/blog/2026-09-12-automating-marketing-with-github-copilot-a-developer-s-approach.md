---
title: "Automating Marketing With GitHub Copilot: A Developer's Approach"
description: "How I used GitHub Copilot and GitHub Actions to automate repetitive marketing workflows, turning runbooks into executable pipelines that any non-engineer can operate."
date: 2026-09-12 00:00:20 +0530
tags: rollup, open-source, automation, ai-tools, devops
image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072"
featured: false
---

I used to manage databases on Linux servers. Today I run marketing for GitHub in the Asia/Pacific region. The career shift is real, but one thing hasn't changed: I still see processes begging to be automated.

My days used to look like this: greenlight an event, then manually execute a fixed sequence of tasks. Create a landing page, email the list, watch registrations, approve attendees, export data, reformat columns, upload to our CRM, write the report. None of these tasks are hard individually. Together, they're an opportunity to paste the wrong link, skip a day, or misspell a campaign name that 15 downstream reports depend on.

That's when I realized something: if you can write down how you do your work, you can automate it. The only requirement is a scriptable way in: an API, a CLI, or both. Our event platform has an API. Our CRM has a CLI that handles authentication through the browser. That was enough.

## From Runbooks to Executable Code

I didn't learn to code in Go or Python. I opened GitHub Copilot and described what I wanted. I handed it my runbooks, the written procedures I'd kept in my head for years, and grew the automation in conversation.

The key design decision was to keep humans in the loop. GitHub Copilot drafts; I decide. It proposes campaign names following our team's naming conventions, drafts invitation emails, and asks the right questions from our playbook. At the end of the conversation, I sign off on everything before the Issue lands in GitHub. That's when the machines take over.

The moment an event gets the `event-setup` label, a GitHub Actions workflow picks it up and does in a few minutes what used to take me a day: create the landing page, send invitations, set up tracking in our CRM. Registration screening runs on schedule. Every morning, a workflow fetches the latest registrants, screens them against our criteria for invite-only events, and shares the cleaned list.

Post-event work was the worst part. Now it's two commands: `/lead-upload` formats attendee data for CRM import, and `/event-report` pulls attendance metrics and posts them back to the event's GitHub Issue.

## Why This Matters for Developers

You might think marketing automation platforms already solve this. They do, for generic workflows. But APAC isn't one market; it's a collection of very different ones. A webinar runs in Japanese for Tokyo one month, Korean for Seoul the next, with different segments and different lead criteria. A packaged tool would force customization budgets and consulting hours. Building it ourselves means a workflow change is a pull request: describe what you want, get reviewed, merge to main through the exact process we use for software.

The architecture sits on something I'm genuinely proud of: a single on/off switch called `DRY_RUN`. Every workflow checks it before touching an external system. Flip it on, and the pipelines rehearse without creating landing pages or filing issues. For a team of marketers automating their own job, rehearsal is essential.

## Skills as Markdown

The real flexibility comes from treating procedures as code. Each automated action lives in a Markdown file called SKILL.md: a written procedure that tells GitHub Copilot what to do, in what order, and what to watch out for. They read like the runbooks I used to keep in my head, because that's exactly what they are.

Skills arrive by pull request. A reviewer checks them. They land on main. The same rigor we apply to software now applies to marketing operations. Different regional teams can adapt runbooks without touching the machinery underneath.

## The Broader Implication

This isn't specific to marketing. Anyone whose work involves repetitive steps across tools with APIs or CLIs can apply this pattern. The barrier to entry has also dropped. When this started, conversations happened in a terminal. Now they happen in the GitHub Copilot app, a regular desktop window. The skill floor went from 'comfortable with a shell' to 'can type.'

What excites me most is how this changes the relationship between domain experts and automation. I didn't need to become an engineer. I needed to describe my work precisely enough that an AI could execute it. That's a fundamentally different skill, and it's one that scales across organizations far beyond tech teams.

The real question isn't whether you should automate your repetitive work. It's whether you can describe it well enough that GitHub Copilot understands what you mean. [Learn more about AI-assisted workflows](https://mgks.dev/tags/ai-tools/) and how they're reshaping the way teams work. Or explore [automation strategies](https://mgks.dev/tags/automation/) that go beyond marketing. The future belongs to people who can turn their processes into code without needing a compiler.