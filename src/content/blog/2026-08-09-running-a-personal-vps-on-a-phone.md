---
title: "Running a Personal VPS on a Phone"
description: "How I replaced a Hetzner VPS with a rooted CMF Phone 1, using Termux, proot, and Ansible to run production infrastructure on mobile hardware."
date: 2026-08-09 06:00:50 +0530
tags: rollup, engineering, infrastructure, arm64, self-hosting
image: "https://images.unsplash.com/photo-1555255707-c07966088b7b?q=80&w=2070"
featured: false
---

I spent money I didn't need to spend for compute I barely used. My personal infrastructure lived on a Hetzner VPS: a few web apps, a remote browser called Surf, Caddy, and supporting services. Nothing serious, just expensive. When Chrome needed real work for the Surf backend, shared CPU machines felt anemic. Dedicated instances cost enough monthly to make a personal browser feel fiscally indefensible. Buying new hardware wasn't appealing either; DRAM prices have gone stupid. Then I remembered a CMF Phone 1 sitting in a drawer.

Eight ARM cores, 8GB RAM, 128GB storage, Wi-Fi 6, a 5G modem, and a built-in battery. I had already paid for it. The phone seemed criminally overqualified for drawer duty.

## The Wrong Path First

My initial instinct was predictable: flash a normal Linux distribution. PostmarketOS had a device port with enough green status indicators to make a reckless person optimistic. I became that person.

I glossed over everything marked broken: Wi-Fi, Bluetooth, hardware acceleration, all the things that make a phone useful as infrastructure. I got to the postmarketOS splash screen, then a black display. I had neither a server nor a phone anymore.

Recovering the factory image became its own side quest. The flashing utility needed Windows. I installed Windows in QEMU, fought USB passthrough, struggled with MediaTek drivers, watched the tool hang, then moved the entire process to an actual Windows machine. There was a moment when the phone was soft-bricked showing only black, and I genuinely believed I had converted a working device into an expensive paperweight.

It came back. The lesson was humbling: Android already had working drivers for every piece of this hardware. Wi-Fi, power management, the battery, the GPU, the modem, every weird vendor detail already worked. Throwing all of that away for a conventional userspace was precisely the wrong trade.

I didn't need the phone to become a normal Linux machine. I needed it to run Linux applications reliably while Android handled the hardware-specific work it's actually good at.

## Android as the Foundation

The second attempt kept stock Android and treated Termux as the host environment. Termux gave me OpenSSH, runit, Caddy, Cloudflared, package management, and normal Unix tooling. Termux:Boot started the supervisor and SSH after reboot. Tailscale provided a stable private address across network transitions.

Android's battery management is excellent for phones and terrible for servers, so I used Ansible to apply a host profile: persistent wake locks, disabled idle states, background restrictions exempted for critical processes, disabled Wi-Fi suspension, and Tailscale as the always-on VPN.

My applications already shipped as Linux ARM64 OCI images. Most ran beautifully under proot-distro, which intercepted filesystem and process operations in userspace, making Termux processes believe they lived inside a Debian root filesystem. No root required, no special kernel needed.

Performance mattered for Surf though. Starting processes, opening libraries, walking paths, and shuffling capture data all crossed proot's translation layer. I had CPU available but Chrome couldn't reach it efficiently. So I rooted the phone not to replace Android but to mount the same Debian filesystem properly and enter it with a real chroot.

The improvement was not subtle.

## Infrastructure as Configuration

I didn't want a pet server assembled from commands I'd forget in a week. I moved the entire [infrastructure setup to Ansible](https://mgks.dev/tags/infrastructure/): versions, service definitions, routes, power settings, secrets, and health checks living in one private repository.

Releases are pinned by digest or checksum and installed into versioned directories behind atomic symlinks. A failed checksum or health check stops deployment. Rollback means reverting the pin. Application data lives separately from releases.

Secrets aren't stored on the phone's filesystem. Ansible Vault values live encrypted in the infrastructure repository. The vault password is derived by asking my 1Password SSH agent to sign a fixed challenge, keeping the private key in 1Password and off the phone entirely. During deployment, Ansible renders only the runtime values each service needs.

## Connectivity Without a Static IP

My home connection doesn't come with static server setup, and I didn't want to expose application ports through the router. I also wanted the phone to remain truly mobile: unplug it, take it elsewhere, connect it to the internet, and my server still works.

HTTP applications use a Cloudflare Tunnel. Cloudflared makes one outbound connection; Cloudflare sends each hostname through it; Caddy routes requests. There's no inbound router rule. Move the phone to another network and the tunnel reconnects.

Surf's latency-sensitive direct connection needed something different. I wrapped the complete Surf TLS stream inside an ordinary WebSocket. Cloudflare sees and forwards the WebSocket, but the actual authenticated connection remains encrypted end-to-end inside it. This adds roughly one network round trip from outside home, but it works through a tunnel requiring only outbound connectivity.

That's the moment the setup became beautifully ridiculous. I left the phone plugged in at home, went to the office, SSHed from my MacBook into the phone through Tailscale, and used an ancient iPad through the phone-hosted Surf instance. The VPS was dead.

The real question isn't whether a phone can replace a small VPS, but why we've accepted paying for [compute we could reclaim](https://mgks.dev/tags/self-hosting/) from devices already in our pockets.