---
title: "Building Custom Metrics Exporters for Kubernetes Autoscaling"
description: "Learn how to write Prometheus exporters from scratch to expose application-specific metrics that drive intelligent Kubernetes autoscaling decisions beyond CPU and memory."
date: 2026-07-24 06:00:31 +0530
tags: rollup, open-source, kubernetes, prometheus, observability
image: "https://images.unsplash.com/photo-1633412802994-5c058f151b66?q=80&w=2070"
featured: false
---

## When Built-in Metrics Aren't Enough

Kubernetes gives you CPU and memory out of the box, but I've learned that real-world scaling decisions live in a much richer signal space. How many messages are backing up in your queue? What's the active WebSocket connection count? How long did the last batch job take? These are the metrics that actually drive load, yet the HorizontalPodAutoscaler can't see them by default.

This gap is where metrics exporters come in. They're lightweight HTTP servers with a single job: expose your application state as plain text on a `/metrics` endpoint. Prometheus scrapes that endpoint regularly, stores the time series, and makes it available for queries and autoscaling rules. I'll walk you through building one from scratch.

## The Exporter Pattern

An exporter is conceptually simple: it runs as a separate process (or embedded directly in your application), maintains a `/metrics` endpoint, and exposes metrics in Prometheus's text format. The format itself is straightforward: one metric per line with a name, optional labels, and a numeric value.

You have two options when instrumenting your workload. You can embed the Prometheus client library directly into your application and expose `/metrics` from within the same process. This makes sense when you control the codebase and want to minimize moving parts. Alternatively, you can run a standalone exporter when the data source is external to your application or when you don't control the application code.

Before writing any code, I always decide what kind of signal I'm measuring. The Prometheus data model has three main types: **counters** (totals that only increase), **gauges** (snapshots of values that can rise and fall), and **histograms** (distributions that let you calculate percentiles). Getting this right shapes everything downstream.

## Implementation Details

The Go Prometheus client is the standard choice in the Kubernetes ecosystem. Most official Kubernetes components use it, which means you're following a well-worn path.

Start by declaring your metrics and registering them with Prometheus's default registry. Use `prometheus.MustRegister` for sane defaults; it panics on duplicate registration, making misconfigurations obvious at startup rather than silent at runtime.

Next, keep your metrics current. You can either update data as it changes or run a polling loop. A goroutine that periodically reads from your data source and updates registered metrics is the most reliable pattern. I typically use a five-second interval, which is shorter than the default fifteen-second Prometheus scrape interval, ensuring each scrape sees fresh data.

Wire everything together in `main` with both a `/metrics` endpoint and a `/healthz` path for Kubernetes liveness probes.

## Containerization Matters

A multi-stage Docker build keeps your final image small and avoids shipping a Go toolchain to production. The first stage compiles a statically linked binary; the second stage copies only that binary into a minimal base like `distroless/static:nonroot`. This base contains no shell, no package manager, and runs as non-root by default, which satisfies most cluster security policies without extra configuration.

## Wiring It Into Your Cluster

You need two Kubernetes manifests: a Deployment for pod lifecycle management and a Service for a stable scrape target. Deploy both to a monitoring namespace alongside your Prometheus installation.

The Deployment should set conservative resource limits appropriate for a lightweight sidecar-style process. Use the `/healthz` route for liveness probes.

The Service names the port `metrics`, which your scraping configuration will reference. If you're using the Prometheus Operator or kube-prometheus-stack, create a ServiceMonitor with a release label matching your Prometheus resource. The release label must match what's configured on your Prometheus instance.

If your Prometheus uses annotation-based discovery instead, add `prometheus.io/scrape: "true"` and `prometheus.io/port: "8080"` annotations to your Pod template.

## Verification and Next Steps

Port-forward to Prometheus and navigate to `/targets` to confirm your exporter appears with state UP. Run a quick query in the expression browser to verify data is flowing. A non-zero result means your pipeline is working: application producing data, Prometheus scraping it, time series stored and queryable.

The real power emerges when you wire these custom metrics to the HorizontalPodAutoscaler. This requires a metrics adapter like Prometheus Adapter, which registers your custom metrics with the Kubernetes Custom Metrics API. Once registered, any HPA in your cluster can reference `worker_queue_depth` or `worker_jobs_processed_total` directly in its metrics block. See [autoscaling on custom metrics](https://mgks.dev/tags/autoscaling/) for that walkthrough.

For ready-made exporters covering databases, message brokers, and cloud services, the Prometheus exporters page is your starting point. Most real teams inherit rather than build exporters from scratch, which is why understanding the [observability architecture](https://mgks.dev/tags/observability/) underneath these tools matters so much.

The question isn't whether your metrics are being collected, but whether they're actually driving decisions.