---
title: "Building Custom Metrics Exporters for Kubernetes Autoscaling"
description: "Learn how to bridge the gap between application state and Kubernetes scaling decisions by writing a Prometheus metrics exporter from scratch."
date: 2026-07-18 06:00:30 +0530
tags: rollup, open-source, kubernetes, prometheus, observability
image: "https://images.unsplash.com/photo-1765707886613-f4961bbd07dd?q=80&w=988"
featured: false
---

CPU and memory are comfortable lies we tell ourselves about what actually drives load. When I'm debugging why a pod scaled up at 3am, the answer is rarely 'high CPU'. It's usually 'the queue grew by ten thousand messages' or 'WebSocket connections spiked to ten thousand concurrent users'. Kubernetes ships with built-in awareness of CPU and memory, but real-world scaling decisions depend on signals that live entirely outside that narrow window.

This gap is where metrics exporters become essential. An exporter is a small HTTP server with a single responsibility: expose application state as plain text on a `/metrics` endpoint. Prometheus scrapes that endpoint on a regular interval, stores the time-series data, and makes it available for queries, alerts, and autoscaling rules. In many cases, you can instrument your application directly by embedding the Prometheus client library, but a standalone exporter makes more sense when the data source is external or when you don't control the application code.

## Choosing the Right Metric Type

Before writing any code, I spend time deciding what kind of signal I'm measuring. The Prometheus data model has three main types, each suited to different problems.

Counters only ever increase. They're the right tool for totals: requests served, jobs processed, errors encountered. Never use a counter for a value that can go down.

Gauges represent a current snapshot of a value that can rise and fall freely. Queue depth, active connections, and cache size are all gauges. This is the metric type I reach for most often because it maps naturally to the concept of 'current state'.

Histograms record the distribution of observed values, such as request latency. They let you calculate percentiles (p99, p50) rather than just averages, which is invaluable when you're trying to understand tail behavior.

Once I know which type fits my signal, I choose a name that follows the convention `<namespace>_<name>_<unit>` in snake_case. A job processor might expose `worker_jobs_processed_total` (counter), `worker_queue_depth` (gauge), and `worker_job_duration_seconds` (histogram). Clear names save everyone debugging time later.

## Writing and Containerizing the Exporter

The Go Prometheus client is the most common choice for exporters in the Kubernetes ecosystem, largely because the same library powers most of the official Kubernetes components. The pattern is straightforward: declare your metrics, register them with Prometheus's default registry, keep them current via a polling loop, and wire everything into an HTTP handler.

I use `prometheus.MustRegister` because it panics on a duplicate registration, which makes misconfigurations obvious at startup rather than silently at runtime.

The polling interval should be shorter than Prometheus's scrape interval so that each scrape sees a fresh value. The default scrape interval in most cluster deployments is fifteen seconds, which gives comfortable headroom.

A multi-stage Docker build keeps the final image small and avoids shipping a Go toolchain to production. The first stage compiles a statically linked binary; the second stage copies only that binary into a minimal base like `distroless/static:nonroot`. This approach satisfies most cluster security policies without extra configuration.

## Wiring It Into the Cluster

Two manifests are enough to run the exporter: a Deployment that manages the pod lifecycle, and a Service that gives Prometheus a stable address to scrape. I use conservative resource limits appropriate for a lightweight sidecar-style process, and the `/healthz` route for the liveness probe.

How you configure scraping depends on how Prometheus was installed. If you used the Prometheus Operator or the kube-prometheus-stack Helm chart, you'll create a ServiceMonitor. The release label must match the label selector configured on your Prometheus resource.

If your Prometheus uses annotation-based pod discovery instead, you'll need a matching scrape_config rule in your Prometheus configuration. Port-forward to the Prometheus service and navigate to `http://localhost:9090/targets` to confirm the exporter has been discovered and shows as UP.

Once the target is healthy, run a quick query in the expression browser to confirm data is flowing. A non-zero result means the full pipeline is working: your application is producing data, Prometheus is scraping it, and the time-series are stored and queryable.

## From Metrics to Autoscaling

A working exporter is the foundation, not the destination. The natural next step is surfacing these metrics to the HorizontalPodAutoscaler so that your workload scales on the signals that actually drive load. This requires a metrics adapter, and the Prometheus Adapter is the most widely deployed option. It registers your custom metrics with the Kubernetes Custom Metrics API, allowing any HorizontalPodAutoscaler in the cluster to reference metrics like `worker_queue_depth` directly in its configuration. For more details on this pattern, see our guide on [Kubernetes observability](https://mgks.dev/tags/observability/).

The Prometheus exporters and integrations page is a good starting point for ready-made exporters covering databases, message brokers, and cloud services. But I've found that writing your own exporter often clarifies thinking about what you're actually trying to measure, and the pattern is simple enough that it's worth doing at least once.

What signals in your systems are still hiding from your scaling logic?