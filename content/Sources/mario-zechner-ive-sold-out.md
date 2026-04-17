---
title: "I've sold out"
source: "https://mariozechner.at/posts/2026-04-08-ive-sold-out/"
author: "[[Mario Zechner]]"
published: 2026-04-08
created: 2026-04-09
tags: [source, AI, agents, OSS, earendil]
type: summary
---

# I've Sold Out

*By [[Mario Zechner]], mariozechner.at, 2026-04-08*

Mario announces that he has joined [[Earendil]] and is bringing [[Pi (Coding Agent)]] with him. A frank personal essay covering the history that led here, what he wanted, what he didn't want, and what changes for pi.

## The OSS History

- **libGDX** (2009–): cross-platform game dev framework, handed to contributors in 2016; never commercialized directly
- **RoboVM**: ahead-of-time JVM compiler for iOS; sold to Xamarin, then Microsoft shut it down; Mario had to write the "sorry, no more OSS" post despite having no control; scarring experience that made him sour on VC startups and some forms of commercialization
- RoboVM was forked by the community into **MobiVM** within days — libGDX still runs on it

## What He Wanted (and Didn't)

After OpenClaw went viral, he received term sheets and "dream job" offers. He ruled out:
- Building his own VC-funded startup around pi (CEO treadmill, away from family, risk of repeating RoboVM mistakes)
- Ignoring the opportunity entirely

He wanted:
- Family-first schedule; "never have our boy cry again because of work"
- Make pi OSS-sustainable with a small team and commercial tier that doesn't betray the community
- Not repeat the RoboVM errors

## Why Earendil

- Armin Ronacher: decade of friendship; deep shared values on OSS and commercialization; proven track record
- Colin: product sense, handles the startup parts Mario doesn't want; "he and his agents won't ever get write access to the pi repository"
- Team: small, generalist, with kids (Earendil is family-minded by design)
- Investors: dev-tools experienced, on the "let them do their thing" end of the spectrum
- Earendil products are built on pi — gives signal on what works; Mario gets to contribute to consumer-facing products (new for him)

## What Changes for Pi

**Mechanical:**
- Repo: `badlogic/pi-mono` → `earendil-works/pi` (redirects TBD)
- Package: `@mariozechner/pi-coding-agent` → `@earendil/pi`
- [pi.dev](https://pi.dev) remains home; gets Earendil logo

**Governance:**
- Pi owned by Earendil; Mario is a shareholder with full technical direction alongside Armin and Colin
- External contributions unchanged: no CLA, no DCO
- Pi name and logo trademarked by Earendil (Mozilla/Linux model)

**Licensing (3 tiers):**
1. **MIT (core):** pi as you know it — MIT, forever, non-negotiable
2. **Fair Source (value-add):** future commercial features under Fair Source — free to use, source available, converts to full OSS after a delay (DOSP)
3. **Proprietary (enterprise):** cloud infrastructure, enterprise features — pays the bills for tiers 1 & 2

See [Armin's licensing post](https://rfc.earendil.com/0015/) for philosophy.

## The Vienna School Context

The [[Vienna School of Agentic Coding]] — a name given by spectators to the loose technical friendship of Mario, Armin, and Peter Steinberger — is what led here. Peter's OpenClaw exploded, Armin wrote the blog post, the calls followed, and Earendil made their move.
