---
title: "RFC 9234 Route Leak Prevention Hits a Real-World Wall"
description: "BGP route leak prevention is finally baked into the protocol, but early adoption reveals critical gaps where Tier-1 networks strip safety attributes."
date: 2026-08-19 12:00:49 +0530
tags: rollup, cloud, bgp, routing, infrastructure
image: "https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?q=80&w=2070"
featured: false
---

I've been watching BGP route leaks for years now, and honestly, they've always felt like a problem that *should* be solved by the protocol itself rather than through endless manual policy configuration. RFC 9234 finally delivers on that promise by embedding route leak prevention directly into BGP negotiations. But here's what surprised me during our measurement work: two major Tier-1 networks are actively stripping the OTC (Only to Customer) attribute from routes they forward, which basically undermines the entire mechanism for early adopters.

## Why This Matters More Than You'd Think

Route leaks aren't obscure edge cases. They're the propagation of routing announcements beyond their intended scope, and they happen constantly. A route gets announced to a provider or peer when it should stay local, then travels down the hierarchy and back up, creating a "valley" in paths that violate fundamental BGP economics. The classic example is a customer announcing a route between two of its providers, then suddenly absorbing traffic it was never paid to carry. That's not just inefficient, it's a cascading failure waiting to happen.

Historically, we've patched this with complex prefix filters and IRR-derived policies that every operator had to implement by hand on every session. It's error-prone, it's tedious, and it clearly doesn't work at scale. RFC 9234 changes the game by moving the intent into the protocol itself through two mechanisms: BGP Roles and the OTC attribute.

## How RFC 9234 Actually Works

A BGP Role is a simple declaration of your relationship with a neighbor on a given eBGP session. You tell your transit provider you're a customer, they tell you they're a provider. Roles come in five flavors: Provider, Customer, Peer, RS (route server), and RS-Client. The beauty is that roles create a handshake moment where misunderstandings surface immediately. If one side says customer and the other says peer, the session rejects with a Role Mismatch. That's a feature, not a bug, because it catches latent relationship disagreements that would otherwise leak routes months later.

The OTC attribute is the enforcement mechanism. When a route stops traveling strictly upward (when it's announced sideways or downward), that route gets stamped with the AS number of where it peaked. From that moment forward, it can only travel downward. A compliant router receiving a route with OTC will reject it if it's trying to send it upward to a provider. Even a router that doesn't understand RFC 9234 is expected to pass OTC along because it's optional transitive.

## The Discovery That Changed Things

When we started measuring adoption, I expected to find a gradual, distributed rollout. What I found instead was a bottleneck: two large Tier-1 networks are stripping the OTC attribute from routes they forward. That's a massive problem because even if you configure RFC 9234 correctly on your sessions, the moment your routes traverse one of these networks, the protection disappears downstream. Early adopters are left with route leak prevention that only works within their local sphere of control, which defeats much of the purpose.

We've been working directly with these Tier-1s to enable OTC propagation. It's not a technical blocker, just a matter of configuration awareness and priority. But it reveals something important: deployment of security mechanisms isn't just about specification elegance, it's about coordination among the most critical infrastructure providers.

Our analysis using RIB dumps from RouteViews and RIPE RIS identified only 36 ASes potentially RFC 9234-compliant, though that number likely understates true adoption because the dual OTC attachment (on egress and ingress) makes attribution tricky. An AS could be setting OTC correctly but it looks like ingress stamping when you inspect the path. We're improving our methodology, but the point stands: adoption is still in the single digits as a percentage of the Internet.

## What This Means for You

If you operate a network of any meaningful size, RFC 9234 should be on your roadmap. Configuring BGP Roles on your eBGP sessions costs you nothing operationally and gives you automatic route leak detection without hand-written policies. You get the added benefit of catching relationship disagreements at session setup rather than in production routing decisions.

But don't expect it to be a silver bullet yet. The OTC stripping at Tier-1 networks means your leak prevention only extends as far as networks that cooperate. This is a coordination problem disguised as a technical one, and it'll take industry momentum to push the holdouts into compliance. The question isn't whether RFC 9234 works, it's whether we have the organizational will to deploy it consistently across the Internet's critical path.