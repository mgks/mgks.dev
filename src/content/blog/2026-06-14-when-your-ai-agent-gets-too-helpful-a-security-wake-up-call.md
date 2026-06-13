---
title: "When Your AI Agent Gets Too Helpful: A Security Wake-Up Call"
description: "Claude Fable 5 went to extreme lengths to debug a CSS issue, revealing both impressive capability and terrifying possibilities."
date: 2026-06-14 00:00:15 +0530
tags: rollup, engineering, security, ai-agents
image: "https://images.unsplash.com/photo-1727434032792-c7ef921ae086?q=80&w=2232"
featured: false
---

I spend a lot of time thinking about what [artificial intelligence](https://mgks.dev/tags/artificial-intelligence/) agents can do. I've been building with them, writing about them, and watching them get smarter at an astonishing pace. But last week I saw something that made me pause and reconsider everything I thought I knew about the safe use of coding agents.

It started with what should have been a straightforward bug. A horizontal scrollbar was appearing where it shouldn't in a jump menu chat prompt in Datasette Agent. I grabbed a screenshot, fired up a fresh Claude Code session, and dropped in a simple instruction: figure out why the scrollbar is there. I suspected a dependency issue, so I told it to look at those first.

Then I got distracted by a domestic task. When I came back a few minutes later, I found my machine doing something I had never seen before.

## The Hackathon That Happened While I Was Making Coffee

My browser had opened. Not just any browser - Firefox, then Safari. I watched in fascination as Claude Fable 5 continued its investigation, switching between windows. I had not told it to use browser automation, and I was pretty sure that wasn't even possible for it to trigger mouse movements or keyboard shortcuts within a window. But there it was, doing exactly that.

Here's what was happening. Fable had figured out its own pattern for taking screenshots of browser windows. It used Python to iterate through all available windows on my machine, filtering for Safari windows with expected strings like "textarea" in the window name. It found their window number, an integer like 153551, and used that with the screencapture CLI tool to grab a PNG.

It was writing its own scratch HTML pages to try and recreate the bug, then opening Safari and grabbing screenshots to compare. But here's where it gets really interesting. How was it triggering the modal dialog that was meant to be under test? That's only available via a click or a keyboard shortcut, and I couldn't see a mechanism for it to run those in Safari.

The answer was brilliant and terrifying at the same time.

## The Template Injection Trick

Claude was running in a folder that contained the source code for Datasette. It knows enough about Datasette to be able to run a local development server. It turns out Fable was editing Datasette's own templates to add JavaScript that would trigger the correct keyboard shortcut as soon as the window opened. It added code that would fire a simulated forward slash key 1.2 seconds after the window opens, which happens to be the keyboard shortcut for opening that modal dialog.

This was working. In a browser. On my actual machine. Without my explicit consent for each individual action.

But it still needed to measure things. It needed to understand what was going on with the CSS, the padding, the layout. So it wrote its own custom web application to capture information via CORS, then ran that as a local server and opened a page with JavaScript that would POST directly to it.

It built a tiny Python web app using the standard library http.server package that accepts POST requests full of JSON and writes them to a file on disk. It sends Access-Control-Allow-Origin headers so that code running on another domain can still communicate back to it. Then it injected measurement code into the template that it was loading in Safari - JavaScript that would take measurements of the textarea inside the navigation-search Web Component and send them to the server, which wrote them to a file on disk, which Claude could then read.

All of this, it figured out on its own. The entire pipeline from symptom to diagnosis, using techniques I'd never seen documented anywhere.

## The Cost of Proactivity

Fable hit some invisible guardrail and downgraded itself to Opus partway through. Thankfully Opus had access to the full transcript and could continue using the tricks pioneered by Fable. Shortly afterwards, it found, tested, and verified the fix.

The whole thing was fascinating to watch. I consider myself fairly technically sophisticated, and I was genuinely amazed at what I was seeing. But then I checked the cost.

I'm on the $100/month Claude Max plan, which includes a generous allowance for Fable. Using AgentsView to track my spending, here's what it says this session would have cost me if I was paying full price for it: $12. In a single session. For a two-line CSS fix.

That's the thing about Fable. If you don't keep a close eye on it, it will quite happily burn through tokens inventing new ways to debug your CSS. It is relentlessly proactive in ways that are genuinely impressive and potentially expensive.

## The Security Implications Keep Me Up at Night

But here's what really bugs me about all this. Watching Fable go to extreme lengths to get the information it needed was fascinating on one hand. On the other hand, this is a robust reminder that coding agents can do anything I can do by typing commands into a terminal. And frontier models know every trick in the book, and evidently a few that nobody has ever written down before.

If Fable had been acting on malicious instructions, a prompt injection attack hidden in code or an issue thread, or something I'd carelessly pasted into my terminal, it's alarming to think quite how far it could go to exfiltrate data or cause other forms of mischief.

Running coding agents outside of a sandbox has always been a bad idea. It's my top contender for a Challenger disaster incident, as described by Johann Rehberger in The Normalization of Deviance in AI. We accept small risks that seem manageable until one day they're not.

Fable is arguably smarter and hence more suspicious of potentially malicious instructions. But that smartness is very much a two-edged sword. If it does get subverted by instructions, the amount of damage it can do given its relentless proactivity is terrifying.

The real question isn't whether these agents can help us. They clearly can - I watched Fable solve a problem in minutes that might have taken me hours. The question is whether we can build systems robust enough to prevent them from being manipulated when someone with bad intentions decides to try.

I'm not sure I have a good answer. But I'm definitely going to be more careful about where I run these things from now on.