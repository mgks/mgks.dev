---
title: "Docker OIDC for GitHub Actions: No More Stored Secrets"
description: "Docker now supports OpenID Connect for GitHub Actions, eliminating long-lived PATs and OATs. Short-lived tokens, zero credential rotation, better security."
date: 2026-08-01 18:00:30 +0530
tags: rollup, open-source, docker, github-actions, oidc
image: "https://images.unsplash.com/photo-1675897634504-bf03f1a2a66a?q=80&w=2070"
featured: false
---

I've watched the same credential rotation problem plague CI/CD pipelines for years. Teams store personal access tokens (PATs) or organization access tokens (OATs) as GitHub secrets to authenticate with Docker Hub. These tokens are long-lived, manually rotated (when anyone remembers), and represent a persistent attack surface. A leaked token is a leaked registry. Docker just changed that game.

Docker now supports OpenID Connect (OIDC) for GitHub Actions, letting your workflows authenticate with short-lived, per-run tokens instead of stored credentials. The token expires in minutes and cannot be reused. No secrets to rotate. No credentials to leak. This is the pattern AWS and GCP already use for cloud resource access, and it's exactly what container registries needed.

## The Credential Problem We've All Lived With

Every time a GitHub Actions workflow pushes or pulls from Docker Hub, it uses a stored credential. Someone had to create that token. Someone had to store it securely. Someone had to remember to rotate it before it became a liability. As teams scale and pipelines multiply, the number of credentials explodes. Stale tokens are a common audit finding because rotation doesn't scale. A leaked token persists until discovery and manual revocation, meaning attackers get a window to pull private images or inject malicious ones.

I've seen organizations run through three credential rotations in six months because they couldn't track which token belonged to which pipeline. OIDC eliminates this entirely by issuing tokens scoped to a single workflow run.

## How OIDC Token Exchange Works

The setup is refreshingly simple. You create an OIDC connection in Docker Home, define rulesets that control which repositories, branches, and workflows can access which registry resources, then update your workflow YAML to request an OIDC token.

When your workflow runs, it requests a GitHub OIDC token using the `id-token: write` permission. The `docker/login-action` handles the token exchange with Docker, verifying the token against your rulesets, and logs in. If the token satisfies your ruleset conditions (specific repo, branch, workflow), Docker issues a short-lived access token. From there, `docker pull`, `docker push`, and `docker build` work as usual.

Docker checks the incoming token's subject claims against every ruleset you defined. You can pin to specific repositories and branches as a security best practice. The entire exchange happens without any stored secrets or API keys passing through your repository.

One note: GitHub repositories created after July 15, 2026 use immutable identifiers in default subject claims, like `repo:octocat@123456/my-repo@456789:ref:refs/heads/main`. This further hardens token specificity.

## What This Means for Your Pipeline

I see three immediate wins here. First, you eliminate credential rotation as a recurring task. No PAT sits in your GitHub secrets waiting to get stale or leaked. Second, you gain auditability. Every token is tied to a specific workflow run, repo, and branch. If something goes wrong, you know exactly which run issued the token and when it expired. Third, you constrain blast radius. A compromised token is useless outside its single workflow run and can't be replayed.

This aligns with zero-trust principles. Instead of trusting a long-lived credential to do the right thing, you trust the identity assertion (GitHub OIDC token) and verify it against narrowly defined rulesets before granting access.

Availability matters though. OIDC connections are available to organizations with Docker Team, Docker Business, or Docker Hardened Images subscriptions, as well as organizations in the Docker Sponsored Open Source Program. If you're on a free plan, you'll stay on PATs for now, though I'd expect this to expand.

## Setup is One-Time Work

Navigate to OIDC connections in Docker Home, create a connection, define your rulesets, grab the connection ID, update your workflow YAML with that ID and your Docker org name, and run a test. If it fails, the Failures tab shows you the incoming claim details so you can diagnose the ruleset mismatch. Once it passes, delete the old PAT from your GitHub secrets.

This is the kind of security improvement that actually reduces operational burden. Most security changes add friction. OIDC removes it.

The broader implication is that stored credentials in CI/CD pipelines are becoming a legacy pattern. If AWS OIDC, GCP Workload Identity, and now Docker OIDC all support this flow, the industry is signaling that token exchange on identity assertions is the standard. Teams still hoarding PATs in secrets managers are choosing technical debt.

The question isn't whether your pipeline will move to OIDC, it's whether you'll move first or wait until every registry requires it.