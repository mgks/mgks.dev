---
title: "Building Real ML Apps Beyond Language Models"
description: "AnySpeechRecognizer and AnyDecisionModel bring specialized ML to Swift. Why general-purpose models aren't the answer for every problem."
date: 2026-10-29 18:00:20 +0530
tags: rollup, artificial-intelligence, machine-learning, swift, ai-infrastructure
image: "https://images.unsplash.com/photo-1675897634504-bf03f1a2a66a?q=80&w=2070"
featured: false
---

Language models get all the attention. They write, they summarize, they translate. But I've been thinking about what happens when you actually try to ship a real application that needs to do more than generate text.

Let me walk you through a concrete example. A customer calls your support line. First, you transcribe what they said. Then you decide where to route them. You *could* hand both problems to a language model, but that's like using a sledgehammer to hang a picture.

Speech recognition has been solved by specialized models for years. Apple built SpeechAnalyzer into macOS and iOS. But it only works with Apple's engine. Translation? Same problem. Everyone reaches for OpenAI or Claude when what they actually need is something faster, cheaper, and running on their own hardware.

This is why I'm excited about AnySpeechRecognizer and AnyDecisionModel. They're not revolutionary. They're pragmatic. They take the patterns we've learned from [building language model abstractions](https://mgks.dev/tags/ai-infrastructure/) and extend them to the models that actually make sense for each job.

## Choose Your Engine, Keep Your API

AnySpeechRecognizer mirrors Apple's Speech framework API while letting you swap engines. You get Parakeet from NVIDIA, Qwen3-ASR from Alibaba, or stick with Apple. Same code. Different import.

Paragkeet v3 handles 25 European languages and detects automatically. Parakeet Ultra is Moondream's improved version. Qwen3-ASR covers 30 languages plus 22 Chinese dialects. That's not a marginal improvement, that's the difference between a tool that works globally and one that works for half the world.

The benchmarks matter. On LibriSpeech, Parakeet achieves 4.3% word error rate. Qwen3-ASR does 4.8%. Meeting recordings, where people overlap, push everyone above 23%. These models download on-demand and run on device. An hour of audio transcribes in 20-40 seconds on an M4 Max.

But here's what really interests me: speaker diarization. AnySpeechRecognizer adds NVIDIA's Streaming Sortformer to track up to four speakers, even when they interrupt each other. Apple's framework doesn't do this. So the package goes beyond the platform. That's the right move.

## Decisions Without Text Generation

AnyDecisionModel tackles a different problem. Apps constantly ask language models to make decisions. Is this message urgent? Which team handles it? How frustrated is the customer?

The usual approach: prompt a language model, parse the generated text, hope you got a clear answer. You get one result, but no probabilities for the alternatives.

AnyDecisionModel returns structured results. An urgent flag as a Double. A team as a Choice<Department> with probability for each option. Anger as a Score with confidence values.

For Emoji Magnet, the demo app included in the repository, this works beautifully. Type a phrase like "things you wear in winter." The model evaluates 343 emoji in parallel by asking the same question about each one: Does this match the phrase? Yes or no? With prefix caching, it answers 16 at a time. Results stream in as they complete.

## The Broader Shift

Cloudflare's Clef models represent where this is heading. They're trained with a decision head, not just general tokens. Feed a state and a schema of typed questions, get back probabilities for all options in one pass. That's fundamentally different from extracting probabilities from a language model that was never trained to be confident about decisions.

I think this matters because it signals a maturation of [how we build AI systems](https://mgks.dev/tags/machine-learning/). The hype cycle of "just use an LLM for everything" is giving way to something more honest: use the right model for the job. Specialized models. Smaller models. Models that run on device.

Both packages require Swift 6.2+ and macOS 26+. The local backends need Apple silicon. They're open source. The models convert from their original checkpoints and include checksums for verification.

## What This Means for Developers

The implication is clear: you don't need cloud APIs for these problems anymore. Download the models once. Run them locally. Get results fast enough for real-time experiences. No rate limits. No vendor lock-in.

Yes, there are tradeoffs. Qwen3-ASR is slower than Parakeet and needs more memory. Decision heads have better accuracy but require GPU memory. But the flexibility matters.

I'd measure these with your own hardware and data before committing. The hear command-line tool lets you evaluate on local files. The natural-speech-eval.py script reproduces the published benchmarks.

The question isn't whether language models are useful anymore. The question is whether they're the only tool you should reach for, or whether you're ready to choose the right specialized model for the job at hand.