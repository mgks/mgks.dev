---
title: "AWS Network Firewall Gets Explicit Proxy Mode with Policy Parity"
description: "AWS Network Firewall now supports explicit proxy deployment with unified security policies. What this means for your infrastructure security strategy."
date: 2026-08-05 18:00:50 +0530
tags: rollup, cloud, aws, cloud-security, network-firewall
image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070"
featured: false
---

# AWS Network Firewall Embraces Explicit Proxy

I've been watching AWS iterate on their Network Firewall product for a while now, and the latest update signals something important: the company is taking unified security architecture seriously. In November 2025, AWS introduced a preview of Network Firewall proxy functionality, but the feedback loop has been surprisingly tight. Just months later, they're reintroducing it as a core feature with full parity to the existing transparent firewall capabilities.

What does this mean? You can now run Network Firewall in a new no-source-preservation deployment mode that acts as an explicit forward proxy, using the exact same security policy across both proxy and transparent firewall deployments. This isn't just a feature addition; it's a consolidation that removes friction from security architecture decisions.

## The Consolidation Problem Solved

When AWS first previewed the proxy functionality, it existed as a separate product with its own distinct security policy. Customers had to maintain two separate policy definitions if they wanted both transparent and proxy filtering. I get why that frustrated people.

The real-world implication here is that you're no longer forced to choose between deployment models. You can define your Geo-IP filtering rules, managed rule groups, container attribute-based rules for EKS and ECS, and URL/domain category filtering once, then deploy them everywhere. This is the kind of operational simplification that actually matters in large organizations where policy sprawl becomes a security liability.

The no-source-preservation deployment mode is the technical enabler here. It allows Network Firewall to function as an explicit proxy without preserving the original source address, which changes how you route and filter traffic fundamentally. For teams running [cloud security architectures](https://mgks.dev/tags/cloud-security/), this opens up cleaner deployment patterns.

## What This Means for Your Infrastructure

I think the most underrated aspect of this update is the managed rule groups integration. You're not just getting a basic proxy; you're getting AWS's threat intelligence, active threat defense capabilities, and real-time malware protection in the same interface you already use for firewall rules.

Consider a typical scenario: you're running microservices on ECS and need to prevent data exfiltration through egress traffic. Previously, you might have reached for separate tools or complex network segmentation. Now you can use container attribute-based rules within Network Firewall's proxy mode to enforce policies based on ECS task metadata. The same rules apply whether you're using transparent or proxy deployment.

For organizations dealing with compliance requirements around data exfiltration prevention, this is substantial. You get centralized logging, unified policy management, and the ability to audit all egress traffic through a single lens. No more fragmented security controls across different tools.

## The Accessibility Angle

What strikes me about this release is how it lowers barriers to sophisticated network security. Not every organization has the budget for multiple specialized appliances or the expertise to operate complex network infrastructure. By bundling proxy functionality directly into Network Firewall with feature parity, AWS makes it more accessible for mid-market companies to implement serious egress filtering.

The free tier during public preview in US East (Ohio) is worth testing. It's low-risk validation of whether explicit proxy mode fits your architecture. I'd recommend spinning up a test environment if you're currently managing [network infrastructure decisions](https://mgks.dev/tags/infrastructure/) manually.

## Looking Ahead

The general availability timeline matters here. Public preview is where features prove themselves or reveal gotchas. I'd be watching for performance metrics at scale, latency impact on your traffic, and how container attribute-based filtering performs in larger EKS clusters.

One thing I'm curious about: how this explicit proxy mode integrates with organizations already using AWS WAF or Shield Advanced. The layering of security tools is where things get complicated, and unified policy management only helps if the underlying traffic routing is clean.

The fact that AWS consolidated this feedback loop so quickly tells me they're serious about making Network Firewall the primary egress security control for AWS workloads. That's a significant shift from the previous "pick your tool" posture. Whether that turns into broader industry consolidation around network firewalls versus point solutions will define the next few years of infrastructure security architecture.