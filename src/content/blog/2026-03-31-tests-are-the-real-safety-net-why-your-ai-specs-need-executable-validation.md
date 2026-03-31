---
title: "Tests Are the Real Safety Net: Why Your AI Specs Need Executable Validation"
description: "Writing specs for LLMs is trendy. But without automated tests, you're flying blind. Here's why the spec document isn't your safety net."
date: 2026-03-31 12:00:56 +0530
tags: rollup, architecture, ai, testing, software-development
image: 'https://images.unsplash.com/photo-1765707886613-f4961bbd07dd?q=80&w=988'
featured: false
---

The specification-driven development movement has exploded alongside [AI](https://mgks.dev/tags/artificial-intelligence/) tooling. Everyone's writing specs now. You open Twitter or Reddit and it's all "write a spec first," "define your constraints," "give your agent guardrails." Good advice, genuinely. I follow it myself most of the time.

But here's the uncomfortable truth that Julias Shaw nailed: almost nobody takes the next step. They write the spec, they prompt the LLM, they get some code back, and then they... what? Just trust it? Hope the model remembered everything from paragraph three of your specification?

The spec document is not your safety net. It's your blueprint. The safety net is the test suite that catches the exact moment your implementation drifts from what you actually wanted.

## The Illusion of Safety

I see this pattern constantly. A developer spends an hour crafting a beautiful specification document. They outline the behavior, define edge cases, list constraints. They feed it to [Claude or GPT](https://mgks.dev/tags/gpt/), get back some code that looks reasonable, maybe test it manually once or twice, and ship it.

Then three weeks later, someone makes a small change. Or the model's behavior shifts slightly with an update. Or a new edge case appears that wasn't in the original spec. And suddenly the code is doing something subtly different from what you specified.

You wouldn't catch it with a spec document. You'd catch it with tests.

The extreme programming crowd has known this forever. The rest of us are somehow still learning it. Writing down what you want is great. Encoding what you want into executable assertions that scream when violated is what actually keeps your system behaving correctly over time.

## From Blueprint to Safety Net

Shaw provides a practical five-step approach to turn those spec documents into real automated tests. The key insight is that every "should" statement in your spec maps to a test case. Every constraint becomes an assertion. Every example becomes test data.

This isn't just good practice for [artificial intelligence](https://mgks.dev/tags/artificial-intelligence/) generated code, by the way. It's good practice for all code. But it's especially critical when you're working with LLMs because the gap between specification and implementation is mediated by a black box that occasionally hallucinates or misinterprets or just gets creative in ways you didn't ask for.

The test suite becomes your contract enforcer. It doesn't care how the code was generated. It only cares whether the code does what you said it should do.

## Hope and Fear in Equal Measure

There's a broader context here that Anthropic's recent study illuminates beautifully. They interviewed 80,000 people about [AI](https://mgks.dev/tags/artificial-intelligence/), and what they found wasn't neat camps of optimists versus pessimists. Instead, people organized around what they valued (financial security, learning, human connection) and held both hope and fear simultaneously.

That resonates deeply. When someone asks if I'm an AI booster or an AI doomer, I answer "yes." I'm fascinated by its impact on software development. I'm expectant of the productivity gains and new possibilities. And I'm worried about the harms, the displacement, the ways powerful technologies rarely yield simple consequences.

Testing AI-generated code sits right at this intersection. The hope is that we can move faster, build more, explore ideas that would have been too tedious to prototype manually. The fear is that we lose rigor, ship bugs we don't understand, create systems we can't maintain.

Automated tests don't resolve this tension, but they give us a tool to manage it. They let us move fast while maintaining some degree of confidence that we haven't completely lost the plot.

## The Geography of Optimism

One detail from the Anthropic study stuck with me: less developed countries show more optimism about AI. There's something profound in that pattern. Maybe it's because they have less to lose from disruption. Maybe it's because the current systems work less well for them anyway. Maybe it's just that proximity to existing power structures correlates with awareness of how they can be abused.

I think about this when I see the testing gap in AI development workflows. The people most excited about moving fast and breaking things are often the ones least worried about what breaks. The people most careful about test coverage and reliability are sometimes the ones most skeptical of the whole enterprise.

We need both instincts. We need the optimism that lets us explore new possibilities and the pessimism that makes us build safety nets before we jump.

The specification tells you where you're trying to go, but the test suite is what catches you when the implementation inevitably drifts from the specification, which it will, because that's what implementations do when nobody's watching.