---
title: "The Bold Problem: How Typography Lost Its Power"
description: "Why excessive bold text in technical writing defeats its own purpose, and what LLMs have to do with spreading this self-defeating practice."
date: 2026-01-29 12:00:57 +0530
tags: rollup, architecture, writing, llm
image: 'https://images.unsplash.com/photo-1676825446819-284aad06dfdd?q=80&w=2070'
featured: false
---

I've been noticing something annoying in technical documentation lately. Everything is bold. Every other sentence screams at you with heavy font weights, as if the author doesn't trust you to figure out what matters. The irony? When everything is emphasized, nothing is.

This isn't just a pet peeve. It's actually getting worse, and I think [artificial intelligence](https://mgks.dev/tags/artificial-intelligence/) has a lot to do with it. [LLMs](https://mgks.dev/tags/llm/) have picked up this habit from their training data and now they're spreading it everywhere. Ask an AI to write something technical and watch it bold half the paragraph like it's handing out participation trophies.

The basic principle here is simple: emphasis works through contrast. The more you use it, the less power it has. It's like crying wolf, except with typography. Eventually your reader's eye just glazes over and treats your carefully bolded phrases as visual noise.

## The Typography Toolkit

We have several tools for emphasis: bold, italic, capitals, and underlines. Each has its own personality and use case. Capitals have rightfully earned a reputation for looking cheap and shouty. When someone writes an entire sentence in ALL CAPS, you immediately question their judgment. It feels like being yelled at by someone who doesn't understand volume control.

Underlines have mostly disappeared from emphasis duty because the web claimed them for hyperlinks. That's actually fine because underlining was always a bit crude. It's what you did on a typewriter when you couldn't do better. Same with capitals. These were the tools of the typewriter age, the best we could manage before word processors gave us proper typesetting.

Bold and italics came later, and they're more sophisticated. But people treat them very differently, and that difference matters.

## Why Italics Work Better

Italics are subtle. They don't jump off the page at you. When I use them in a paragraph like this, you probably don't notice them until you're actually reading that word. They add a slight stress, like I'm putting a bit more weight on that word when speaking it aloud.

That's exactly how I use them. When I write, I try to write like I talk. If I'd naturally stress a word while explaining something to you in person, that's when italics make sense. But even then, I use them sparingly. Most sentences don't need any emphasis at all.

The key advantage of italics is that they work at reading speed, not scanning speed. They're for people who are actually engaged with your text, following your argument. They reward attention rather than demanding it.

## The Power and Peril of Bold

Bold is different. Bold is for skimming. It catches the eye even when you're not really reading, just glancing down the page looking for something. This makes it incredibly valuable, but only if you don't abuse it.

Headings are the obvious use case. When I'm looking through a long document trying to find the section about database migrations, I'm not reading every word. I'm scanning for headings. Bold helps tremendously here because that's exactly the behavior we want to support.

But within regular prose paragraphs? I almost never use bold for emphasis. The cost is too high. Every time I bold something for emphasis, I'm training my readers to expect that bold means "this is important." If I do it too often, that signal becomes meaningless.

There's one exception I really like: bolding unfamiliar terms at their point of explanation, not just their first use. This is a trick I picked up from Giarratano and Riley's expert systems book. When you encounter a new technical term, you might not fully absorb its definition on first reading. Later, when it reappears and you've forgotten what it means, you can quickly scan backward and find the bold term. Your eye goes right to it.

The clever part is bolding at the point of explanation rather than first mention. Sometimes terms get introduced in a list before you explain them. Like "We use three techniques: frobning, gibbling, and eorchisting." You don't bold them there. You bold them later when you actually explain what frobning means. That's where the reader needs to return to.

## The Callout Alternative

Sometimes people bold an entire sentence to make it stand out while skimming. I get the impulse, but there's almost always a better solution: callouts. Those offset boxes or highlighted sections that pull out key points.

Callouts are superior for several reasons. They're even more visible than bold text. They don't break up the flow of your prose. And crucially, they don't have to use the exact same wording as your paragraph. You can phrase the callout version differently, optimizing it for scanning while keeping your prose optimized for reading.

I see a lot of bullet lists where every item starts with a bold phrase, like a mini-heading for each point. Sometimes this makes sense, but usually it's overkill. The bullets themselves already provide visual structure. Your eye can find list items just fine without bold weights everywhere. And honestly, bullet lists are overused in general. Most of them would work better as regular prose paragraphs. Prose flows. Bullets are choppy. Reading should be a pleasant experience, not a constant series of visual interruptions.

## What LLMs Get Wrong

The [AI writing](https://mgks.dev/tags/artificial-intelligence/) problem here is interesting. Language models learned that bold text appears frequently in their training data, especially in marketing copy and certain styles of technical [documentation](https://mgks.dev/tags/documentation/). But they don't understand the *why* of typography. They don't grasp that emphasis only works through scarcity.

So when an LLM writes technical content, it tends to bold anything it thinks is important. Since it thinks everything is somewhat important, you get these documents where a third of the text is bold. The result is visual chaos that helps nobody.

I was tempted to include a paragraph here that demonstrates this problem by using way too much bold, showing how it defeats itself. But that would make this section harder to read, and clarity matters more than demonstration. So I'll just tell you: if you see a technical document where every other phrase is bold, where your eye doesn't know where to land because everything screams for attention, you're probably reading something written or heavily influenced by an LLM.

The real skill in typography isn't knowing how to add emphasis. It's knowing when not to. Every bold word you add makes every other bold word slightly less effective. The power of emphasis lives in its restraint.