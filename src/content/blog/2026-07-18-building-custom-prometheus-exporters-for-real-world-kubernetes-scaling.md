---
title: "Building Custom Prometheus Exporters for Real-World Kubernetes Scaling"
description: "CPU and memory metrics aren't enough. Learn how to build custom Prometheus exporters that expose queue depth, connections, and application signals to drive intelligent autoscaling."
date: 2026-07-18 12:00:30 +0530
tags: rollup, open-source, kubernetes, prometheus, observability
image: "https://images.unsplash.com/photo-1534998158219-e4b687b062c4?q=80&w=1674"
featured: false
---

Kubernetes ships with CPU and memory awareness out of the box, but if you've spent any time operating production clusters, you know those metrics tell only half the story. The signals that actually drive load live elsewhere: how many messages pile up in a queue, how many WebSocket connections a pod holds, how long the last batch job took. When the built-in metrics fall short, a custom Prometheus exporter bridges that gap.

I've found that teams often overlook this until they hit a wall. Their autoscaler thrashes on CPU spikes that don't reflect real demand, or they watch queues grow while pods sit idle because nobody told Kubernetes what to actually measure. Writing an exporter from scratch isn't complicated, but it requires intentionality about what you're measuring and why.

## Deciding What to Measure

Before touching code, I spend time thinking about metric types. Prometheus has three main categories, and picking the wrong one creates confusion later.

Counters only increase. Use them for totals: requests served, errors encountered, jobs processed. Never use a counter for a value that can go down, or you'll confuse anyone reading your dashboards.

Gauges represent snapshots of values that fluctuate freely. Queue depth, active connections, cache size. Most application signals are gauges.

Histograms record distributions of observed values like request latency. They let you calculate percentiles (p99, p50) instead of just averages, which is crucial when you care about tail behavior.

Once I know the type, I name it using the convention `<namespace>_<name>_<unit>` in snake_case. A worker might expose `worker_jobs_processed_total` (counter), `worker_queue_depth` (gauge), and `worker_job_duration_seconds` (histogram). Clear names save debugging time.

## Building the Exporter

The Go Prometheus client is the standard choice in the Kubernetes ecosystem, largely because Kubernetes components themselves use it. An exporter is just a small HTTP server that exposes application state as text on a `/metrics` endpoint.

I start by registering metrics with Prometheus's default registry. This tells the library these metrics exist so they appear in output even before the first observation:

```go
var queueDepth = prometheus.NewGauge(prometheus.GaugeOpts{
  Name: "worker_queue_depth",
  Help: "Current number of items in the work queue",
})

prometheus.MustRegister(queueDepth)
```

Using `MustRegister` is intentional. It panics on duplicate registration, making misconfigurations obvious at startup rather than silent failures in production.

Next, I need to keep metrics current. I usually run a polling loop in a goroutine that periodically reads from my data source and updates registered metrics:

```go
go func() {
  ticker := time.NewTicker(5 * time.Second)
  for range ticker.C {
    depth, _ := getQueueDepth() // Your actual data source
    queueDepth.Set(float64(depth))
  }
}()
```

The five-second interval matters. It should be shorter than Prometheus's scrape interval (usually 15 seconds by default) so each scrape sees fresh data.

Then I wire everything together in main with both a `/metrics` endpoint and a `/healthz` path for Kubernetes liveness probes:

```go
http.Handle("/metrics", promhttp.Handler())
http.HandleFunc("/healthz", func(w http.ResponseWriter, r *http.Request) {
  w.WriteHeader(http.StatusOK)
})
http.ListenAndServe(":8080", nil)
```

## Containerizing and Deploying

A multi-stage Docker build keeps the final image small. First stage compiles a statically linked binary, second stage copies only that binary into a minimal base like `distroless/static:nonroot`. No shell, no package manager, runs as non-root by default. It satisfies most security policies without extra configuration.

Deploying requires two manifests: a Deployment managing pod lifecycle and a Service giving Prometheus a stable scrape target. If your cluster runs the Prometheus Operator (common with kube-prometheus-stack), add a ServiceMonitor to enable discovery:

```yaml
apiVersion: monitoring.coreos.com/v1
kind: ServiceMonitor
metadata:
  name: my-exporter
spec:
  selector:
    matchLabels:
      app: my-exporter
  endpoints:
  - port: metrics
```

Once deployed, port-forward to Prometheus and check the targets page. If your exporter appears as UP, query a metric to confirm data flows end-to-end.

## The Bigger Picture

A working exporter is the foundation, not the destination. I often pair exporters with a metrics adapter (Prometheus Adapter is standard) to register custom metrics with Kubernetes's Custom Metrics API. This lets any HorizontalPodAutoscaler reference `worker_queue_depth` directly in its scaling rules, turning application-level signals into infrastructure decisions.

The industry is slowly moving away from CPU-based autoscaling toward intent-driven metrics. Teams that invest in observability infrastructure now find themselves with better scaling behavior, fewer surprises, and more predictable costs. Building your first exporter is that investment, and it compounds quickly once you start thinking about what your actual workload demands rather than what your infrastructure prefers to measure.