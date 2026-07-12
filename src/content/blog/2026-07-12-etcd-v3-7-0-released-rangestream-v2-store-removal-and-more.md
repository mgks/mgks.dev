---
title: "etcd v3.7.0 Released: RangeStream, v2 Store Removal and More"
description: "etcd v3.7.0 ships RangeStream RPCs, drops the legacy v2 store bootstrap, overhauls protobuf deps, and brings real CPU savings for Kubernetes clusters."
date: 2026-07-12 12:01:00 +0530
tags: rollup, open-source, etcd, kubernetes, distributed-systems
image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=1720"
featured: false
---

etcd v3.7.0 is out, and if you run Kubernetes at any meaningful scale, this release deserves more than a passing glance. SIG etcd has packed in a lot: a brand-new streaming API, a long-overdue protobuf cleanup, the final steps toward burying the legacy v2 store, and concrete CPU improvements. I have been watching this project evolve for a while, and v3.7 feels like one of those releases that quietly shifts what is considered normal for a distributed key-value store.

## RangeStream Is the Feature I Did Not Know I Needed

The headline addition is RangeStream, and it solves a genuinely annoying problem. Before this, any Range request that returned a large result set forced etcd to buffer the entire response in memory before sending a single byte to the client. For clusters with thousands of keys, that meant unpredictable latency spikes and memory pressure on both sides of the connection. RangeStream lets the server send results in chunks, so clients can start processing immediately without waiting for the full payload.

For most small deployments this will not be a daily concern, but for anyone building controllers, operators, or tooling that lists large key spaces, this is a real quality-of-life improvement. The feature is already wired into the upcoming Kubernetes v1.37 behind the `EtcdRangeStream` feature gate, which shows how closely etcd and Kubernetes development are now aligned after the 2023 merger of their development processes. If you work in the [kubernetes](https://mgks.dev/tags/kubernetes/) ecosystem, it is worth enabling this gate in staging environments early.

## The v2 Store Is (Almost) Gone

This one has been a long time coming. Since v3.4, the etcd team has been chipping away at the legacy v2 store, and v3.7 completes the most significant step: the server now bootstraps entirely from the v3 store. No more v2 dependency at startup. This resolves years of technical debt and simplifies the bootstrap workflow considerably.

The one remaining tie to v2 is snapshot generation. etcd v3.7 still produces v2-format snapshots for backward compatibility, and the `--snapshot-count` flag is kept for the same reason. Both will be removed in v3.8. If you are planning migrations or writing tooling around snapshots, keep that deprecation timeline in mind.

Also notable: all experimental flags prefixed with `--experimental-*` have been removed. etcd now follows a Kubernetes-style feature gate lifecycle (Alpha, Beta, GA). If your configuration scripts still use those old flags, you need to migrate before upgrading. The [open-source](https://mgks.dev/tags/open-source/) community has had several releases to prepare for this, but I still expect it to catch some teams off guard.

## Performance Improvements Worth Knowing

Beyond RangeStream, v3.7 ships a handful of targeted performance wins.

The keys-only Range optimization is one I find particularly elegant. When a client requests only key names (not values), etcd previously still loaded serialized values from bbolt. Now it reads solely from the in-memory index unless sorting by value is required. For workloads doing frequent key enumeration, this cuts both backend reads and memory allocation meaningfully.

The watch path also got faster. Concurrent watches on keys benefit from a split interval tree optimization that makes `find()` operations more efficient. Watches are one of the most heavily used primitives in Kubernetes controllers, so this should translate into noticeable latency improvements for controller-heavy clusters.

Then there is the protobuf overhaul. Replacing `github.com/golang/protobuf` and `github.com/gogo/protobuf` with `google.golang.org/protobuf` is not glamorous work, but the benchmark data shows real CPU reductions across etcd components. Combine that with the CPU savings from bootstrap simplification and you have a release that measurably reduces the operational cost of running etcd at scale.

A word of caution though: if your application imports etcd Go modules directly, particularly the client SDK or anything under `api/` or `pkg/`, the protobuf changes are breaking. You will need to audit your dependency tree and update accordingly. The API change tracking issue linked in the release notes is worth reading before you upgrade.

## Smaller Changes That Add Up

A few other additions round out the release in ways I appreciate:

- Unix socket endpoint support opens up single-member local deployments without needing a TCP port, which is genuinely useful for edge devices and local testing environments.
- JWT can now be set directly on the client, giving more flexibility in authentication setups without requiring a full token negotiation flow.
- `AuthStatus` checks no longer require an authentication attempt first, removing a small but real overhead in auth-heavy workloads.
- New metrics including `etcd_server_request_duration_seconds` and optional watch send-loop instrumentation give operators better visibility into behavior that was previously opaque.
- All `etcdutl` commands now support a timeout argument, which sounds minor until you have watched an offline utility block indefinitely while holding a lock.

bbolt v1.5.1 and raft v3.7.0 ship alongside this release, both carrying their own performance and correctness improvements, and the whole thing compiles with Go 1.26.4 which includes a CVE fix in `golang.org/x/crypto`.

v3.7 is a release that pays down debt, improves performance in measurable ways, and lays track for v3.8 to make a cleaner break from the past. The question now is how quickly the broader Kubernetes ecosystem adopts RangeStream in production, and whether that changes expectations around how key-value stores should handle large result sets going forward.