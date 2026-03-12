---
title: "LLMs Don't Actually Push You Toward Boring Technology"
description: "Coding agents work surprisingly well with new, undocumented tools. The 'training data bias' concern might be overstated in 2026."
date: 2026-03-13 00:00:34 +0530
tags: rollup, engineering, artificial-intelligence, developer-tools
image: 'https://images.unsplash.com/photo-1534998158219-e4b687b062c4?q=80&w=1674'
featured: false
---

There's been this persistent worry floating around that [AI](https://mgks.dev/tags/artificial-intelligence/) coding assistants would trap us in a feedback loop of popular technology choices. The logic seemed sound: if an LLM learned primarily from Python and JavaScript repos, it would naturally be better at those languages, which would push developers to stick with them, which would create more training data, and so on.

I believed this for a while. It made intuitive sense that asking GPT-4 about Rust or Elixir would produce shakier results than asking about React. The training data distribution would obviously matter, right?

But something shifted with the latest models, and I'm not seeing this play out the way I expected.

## The Context Window Changed Everything

I've been building some new CLI tools recently: uvx showboat, rodney, chartroom. These didn't exist when any model was trained. There's zero Stack Overflow questions about them, no blog posts, no nothing in the training corpus.

My workflow now starts with something like "use uvx showboat --help to learn about this tool" and then I paste in the help output. The model just reads it and starts using the tool correctly. Sometimes I'll include a couple of example commands or point it at a README.

This shouldn't work as well as it does. But with 200K+ token context windows, you can dump entire API references, multiple example files, architectural documents, and still have room to work. The model doesn't need to have seen your specific library during training when it can just read the manual right there in the conversation.

## Agents Fill In Their Own Gaps

Drop a coding agent into a private codebase that uses some internal framework nobody outside your company has heard of. It'll poke around, read existing code, identify patterns, and start writing code that matches your conventions. When it gets something wrong, it runs the tests, sees the failure, and iterates.

This is very different from the completion-based assistance we had two years ago. Those systems needed strong priors from training data because they only got one shot at generating code. Modern agents operating through tools like [Aider](https://mgks.dev/tags/developer-tools/) or Cursor's agent mode can explore, experiment, and self-correct.

The "boring technology" concern assumed that LLMs would be helpless outside their comfort zone. But that's not what an agent with tool use looks like. It's more like a developer who's new to your stack but knows how to read docs and run tests. Not perfect, but surprisingly competent.

## What This Actually Means

I'm not saying training data doesn't matter at all. A model with deep knowledge of a framework will probably generate better first attempts than one learning on the fly. But the gap is much smaller than I expected, and it keeps shrinking as context windows expand and agent architectures improve.

This changes the calculus for technology choices. I'm less worried about picking a newer framework or a less mainstream language now. If I can point an [AI agent](https://mgks.dev/tags/artificial-intelligence/) at good documentation and a few examples, it'll figure it out.

The irony is that coding agents initially seemed like they'd be the ultimate expression of "Choose Boring Technology." Use what everyone else uses because that's what the AI knows best. But in practice, they're better described as "Choose Technology With Good Documentation." Which is advice that was always sound, AI or not.

## The Documentation Quality Filter

There's a secondary effect here that's worth noting. If coding assistants work best with well-documented tools, that creates pressure for maintainers to write better docs. Not because humans need them (though we do), but because AI-assisted developers need them.

I've noticed myself gravitating toward libraries with comprehensive help text, clear examples, and good error messages. Not just for my own sake, but because I know I'll be working with AI tools that will leverage those same resources.

Maybe we've just traded one bias for another. Instead of "most popular in training data" we're moving toward "best documented." But honestly, I'll take it. Good documentation benefits everyone, human or machine, and it's a forcing function that pushes library authors toward better API design.

The future where new tools struggle to break through because LLMs don't know them well enough? I'm starting to think that future isn't coming after all, at least not in the way we feared.