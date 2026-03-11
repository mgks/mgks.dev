---
title: "Google's AMIE Takes Its First Steps Into Real Clinical Practice"
description: "Google deployed conversational medical AI in real patient visits. The results reveal both the promise and practical limits of AI in healthcare delivery."
date: 2026-03-12 00:00:33 +0530
tags: rollup, research, healthcare, medical-ai
image: 'https://images.unsplash.com/photo-1675897634504-bf03f1a2a66a?q=80&w=2070'
featured: false
---

I've been following Google's AMIE project since they first demonstrated it could ace medical licensing exams with patient actors. It was impressive in that sterile, academic way that makes you think "cool demo, but will this ever actually help anyone?" Well, Google just published results from their first real-world deployment at Beth Israel Deaconess Medical Center, and the gap between simulation and reality has never been more instructive.

The setup was clever and appropriately cautious. Before seeing their primary care doctor for non-emergency issues, 100 patients had text-based conversations with AMIE to gather their medical history. A human physician supervised every single conversation via live video call, ready to pull the plug if things went sideways. Think of it like a student driver with a nervous instructor hovering over the brake pedal.

Zero safety interventions were needed across all 100 conversations. That's the headline Google wants you to focus on, and it matters. But I'm more interested in what happened when they compared AMIE's diagnostic thinking to what the actual doctors came up with.

## The Diagnosis Game

A panel of clinicians reviewed both AMIE's differential diagnoses and the PCPs' diagnoses in a blinded fashion. They rated them roughly equivalent in overall quality. AMIE included the correct final diagnosis somewhere in its top 7 possibilities 90% of the time, and nailed it as the top diagnosis 56% of the time.

Those numbers sound great until you realize AMIE was playing with a significant handicap. It couldn't access the patient's electronic health record. It couldn't perform a physical exam. It couldn't see if the patient looked genuinely ill or was just worried about nothing. The human doctors had all of that context, and they still only slightly outperformed the AI on diagnosis quality.

Where AMIE fell flat was in management plans. The [artificial intelligence](https://mgks.dev/tags/artificial-intelligence/) system suggested treatments that clinical evaluators rated as less practical and less cost-effective than what human doctors recommended. This makes complete sense when you think about it. A doctor working in that specific clinic knows what tests are readily available, which specialists have availability, what the insurance situation typically looks like. AMIE was reasoning in a vacuum.

## What Patients Actually Thought

Here's where it gets interesting from a product perspective. Patients filled out attitude surveys about AI before talking to AMIE, right after, and then again after seeing their doctor. Their attitudes toward AI improved significantly after the AMIE interaction and stayed elevated. They found it polite and good at explaining medical conditions.

But I'm skeptical about reading too much into this. These were people who volunteered for a research study involving [medical AI](https://mgks.dev/tags/healthcare/). They knew they were guinea pigs. They knew a human doctor was watching. Of course they're going to be more positive than someone who gets surprised by an AI chatbot in their normal clinical workflow.

The doctors found the pre-visit transcripts useful, saying it helped them prepare and shifted the visit from data gathering to data verification. That's genuinely valuable. If AMIE can handle the tedious "so what brings you in today, and when did these symptoms start" dance, doctors get more time for the actual medicine part. But again, this was with careful oversight and selection of appropriate cases.

## The Reality Check

This was a single-center feasibility study with 100 patients. Text-only interface. No comparison group. Patients skewed younger than the typical urgent care population at that clinic. Every conversation was supervised live by a physician, which is completely impractical at scale.

Google is refreshingly honest about these limitations in their writeup. They're not claiming AMIE is ready to replace doctors or even to work independently. This is step one of what will need to be a very long evidence roadmap.

What strikes me most is how this study reveals the enormous gulf between "AI that passes tests" and "AI that fits into actual clinical practice." AMIE can reason about medical problems impressively well, but it can't yet reason about the practical constraints of healthcare delivery. It doesn't know that ordering an MRI for every headache is wasteful. It doesn't understand that some patients will never follow through on complex medication regimens. It can't read the room.

The path from here to actually useful clinical deployment requires solving problems that have nothing to do with making the AI smarter at diagnosis. It needs to understand healthcare systems, not just healthcare. And that's a much harder problem than acing medical exams.