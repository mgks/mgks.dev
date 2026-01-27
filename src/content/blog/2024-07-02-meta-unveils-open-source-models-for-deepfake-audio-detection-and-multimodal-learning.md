---
title: "Meta Unveils Open-Source Models for Deepfake Audio Detection and Multimodal Learning"
description: "Meta's FAIR team has made significant strides in open-source AI with innovative models and a groundbreaking audio watermarking technique."
date: 2024-07-02 17:00:00 +0530
tags: open source, meta, rollup
image: b28
---

Meta's FAIR team has made significant strides in open-source AI with innovative models and a groundbreaking audio watermarking technique. Their dual approach addresses the misuse of AI, such as deepfakes, while fostering creative exploration through advanced AI capabilities.

### AudioSeal

The proliferation of deepfakes poses a growing threat to online trust. AudioSeal tackles this by introducing the first audio watermarking technique for AI-generated speech, embedding undetectable signals as unique identifiers. Similar to image watermarks, these signals help detect and localise AI-generated segments within audio files. As FAIR researchers point out,

> "This technique could fundamentally change how we approach the detection of synthetic media."

However, challenges remain---audio editing or noise cancellation could tamper with these watermarks. Ongoing research into robust watermarking methods and industry standardisation is crucial for long-term effectiveness.

### Meta Chameleon

Building on OpenAI's CLIP, which learned relationships between text and images, Meta Chameleon takes a significant leap forward. It uses a transformer architecture to process and generate both text and images simultaneously, enabling applications like automatic photo captions and creating new scenes from text descriptions. This model has vast potential in content creation and human-computer interaction, making it a true game-changer.

### Multi-Token Prediction

Traditional large language models (LLMs) like Google's LaMDA and AI21 Labs' Jurassic-1 Jumbo predict one word at a time during training. FAIR's multi-token prediction method, however, trains models to predict multiple words at once, significantly accelerating the learning process. This could revolutionise LLM training, leading to faster development of more efficient models. As FAIR notes,

> "By predicting multiple tokens simultaneously, we enhance the model's understanding and efficiency."

### JASCO

In the realm of music generation, JASCO offers a user-centric approach. Unlike existing models like Google's MuseNet, which rely on text prompts alone, JASCO allows users to incorporate additional elements such as chords or beats. This provides greater creative control, opening doors for new possibilities in music composition.

> "JASCO empowers users to shape their musical creations more precisely.", say the developers.

These innovations by FAIR represent a major milestone in open-source AI research, promoting a collaborative and responsible approach to AI development. They not only push the boundaries of what AI can achieve but also address important ethical considerations. The AI community's collaboration will be crucial in leveraging these advancements for societal benefit. As AI continues to evolve, efforts to mitigate biases, ensure security, and refine detection techniques like AudioSeal will be paramount.