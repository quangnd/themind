---
title: "Thoughts on Slowing the F*** Down"
aliases: [mario-zechner-slowing-the-fuck-down]
tags: [source, ai-agents, coding-agents, software-quality, discipline]
created: 2026-04-06
updated: 2026-04-06
author: "Mario Zechner"
url: "https://mariozechner.at/posts/2026-03-25-thoughts-on-slowing-the-fuck-down/"
published: 2026-03-25
type: summary
---

# Thoughts on Slowing the F*** Down

**Author:** Mario Zechner
**Published:** 2026-03-25
**Source:** https://mariozechner.at/posts/2026-03-25-thoughts-on-slowing-the-fuck-down/

---

## Summary

A critical essay on the state of agentic coding after ~12 months of production use. Argues that the industry is accelerating into a mess by delegating too much to coding agents without discipline, and proposes a principled alternative: slow down, keep humans in the loop, write architecture by hand.

---

## Everything is broken

Software quality has been degrading — 98% uptime becoming the norm, weird UI bugs, things slipping through QA. Anecdotal evidence: an alleged AI-caused AWS outage followed by a 90-day internal reset; Satya Nadella's claims that 30% of Microsoft's code is AI-written alongside apparent Windows quality decline; companies claiming 100% AI codebases consistently shipping memory leaks, UI glitches, crashes.

Companies are "agentically coding themselves into a corner": no code review, design decisions delegated to agents, gazillions of unwanted features.

---

## How we should NOT work with agents

### Booboo compounding

Agents make errors. Humans do too — but humans *learn*. An agent has no built-in learning ability; it will repeat the same errors indefinitely unless you explicitly patch its AGENTS.md.

More importantly: **a human is a bottleneck**. A human can only introduce so many booboos per day. The pain accumulates slowly enough that humans are motivated to fix it. With an army of agents, the bottleneck is gone. Tiny booboos compound at unsustainable rates. You don't feel the pain until the codebase is already a monster. By then your users are screaming about broken features or deleted data, and you can no longer trust the codebase *or* the tests (because the agents wrote those too).

### Merchants of learned complexity

Agents have seen bad architectural decisions in their training data. When you delegate architecture to them, you get an amalgam of terrible cargo cult "industry best practices." Worse: each agent only has a local view of the codebase. No agent sees all the decisions made before it. This leads to:
- Massive code duplication
- Abstractions for abstraction's sake
- Cascading inconsistencies

Human-made enterprise codebases reach the same mess — but it takes years, and the organization slowly co-evolves to cope. With agents and 2 humans, you can reach that complexity in weeks.

### Agentic search has low recall

Before an agent can fix a mess, it must find all the relevant code. But the bigger the codebase, the lower the recall — regardless of the search tool (ripgrep, LSP, vector DB). The agent misses existing code, duplicates it, introduces inconsistencies. This is the root cause of most code smell booboos.

---

## How we SHOULD work with agents

Good agent tasks share these properties:
1. **Scopeable** — the agent doesn't need to understand the full system
2. **Self-evaluatable** — the agent has a way to measure its own work (e.g. an eval function, a metric)
3. **Non-mission-critical** — ad hoc tools, internal pieces, nothing user-data-critical

Example: Karpathy's auto-research applied to startup time benchmarking. The eval function (startup time metric) closes the loop. But note: the eval function only captures one metric — the agent will happily ignore code quality, complexity, or correctness if those aren't measured.

**The principle:** Let the agent do the boring, repetitive stuff. You evaluate the output. Take the good ideas and finalize the implementation yourself (or with the agent for the grunt work, but *you* decide what gets finalized).

### Slow the f*** down

- Give yourself time to think about what you're building and why
- Set limits on how much code the agent generates per day — in line with your ability to review it
- **Write architecture, APIs, and system gestalt by hand.** Maybe use tab completion. The friction of writing forces you to understand what you're building and how it "feels." This is where your experience and taste come in — things current SOTA models cannot replace.
- Friction = learning = growth

**The payoff:** Codebases remain maintainable. Products work. Fewer features, but the right ones. You understand the codebase well enough to fix problems and refactor. Your deep understanding compensates for agents' low recall, producing better outputs with less massaging.

> "All of this requires discipline and agency. All of this requires humans."
