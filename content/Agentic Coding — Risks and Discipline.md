---
title: Agentic Coding — Risks and Discipline
aliases: [coding agents discipline, agentic coding risks, slowing down with AI]
tags: [ai-agents, software-quality, discipline, coding, production]
created: 2026-04-06
updated: 2026-04-06
source: "[[mario-zechner-slowing-the-fuck-down]]"
type: concept
---

# Agentic Coding — Risks and Discipline

Coding agents can build full projects at speed. But after ~12 months of production use, a pattern has emerged: teams that over-delegate to agents often code themselves into an unmaintainable corner. This page synthesizes the failure modes and the principled alternative.

> [!note] Sources
> Primary synthesis from [[mario-zechner-slowing-the-fuck-down]] by [[Mario Zechner]] (2026-03-25), with additional observations from [[mario-zechner-year-in-review-2025]] (2025-12-22).

---

## Year-End Honest Assessment (December 2025)

After a full year of production agentic coding, Mario's summary:

> *"Nobody knows yet how to do this properly. We are all just throwing shit at the wall, declaring victory, while secretly crying over all the tech debt we introduced into our codebases by letting agents run amok. If somebody claims they have found the solution, don't trust them, they have not. But there seem to be a few principles crystallizing that lead to more predictable outcomes, even if those outcomes are still far from reliable."*

This is a useful corrective to the triumphalist narratives circulating in AI social media. The few crystallizing principles — keep humans in the loop, scope tasks well, write architecture by hand — are what this page documents.

**The two camps** (observed by [[Armin Ronacher]] in his own year-end post): those who keep agents on a tight leash vs. those who orchestrate armies of agents. Mario is firmly in the tight-leash camp. His observation on the army-of-agents camp: they haven't published much open source. The people who *have* shipped and documented their work tend to be the ones staying in the loop. "Maybe there's a lesson in there somewhere."

**On productivity:** After a full year, Mario's honest answer is he doesn't actually know if his productivity increased. Not obviously more projects — but technically deeper ones than he'd have attempted without agents. The difference may be in what gets *started*, not in how fast things get done.

---

## The Failure Mode: Booboo Compounding

Agents make errors — "booboos." Individually, each is harmless: a useless method here, a type that doesn't make sense, duplicated code there. The danger is systemic:

**Humans learn and self-limit.** A human makes the same error a few times, then stops (through feedback, pain, or growth). And a human is a *bottleneck* — there are only so many booboos per day. The pain threshold gets hit before the mess becomes unrecoverable.

**Agents do neither.** They repeat the same errors indefinitely (no in-built learning), and there is no natural bottleneck. An orchestrated agent swarm can compound errors at rates no human team could match. You remove yourself from the loop; you don't feel the pain until the codebase is a monster.

The result: a codebase you can no longer trust — including the tests, which the agents also wrote.

> [!warning] The delayed pain problem
> You only discover the compounding mess when you try to add a new feature or when users lose data. By then, the architecture can't accommodate the change, and the agents can't fix it either.

---

## Merchants of Complexity

Agents are trained on massive codebases — including many with terrible "industry best practices." When you delegate architectural decisions to them, you get an amalgam of learned complexity. Worse: each agent only ever has a **local view** of the codebase.

No agent sees:
- All prior design decisions
- What other agents have done in parallel runs
- The full shape of the system

This leads to cascading inconsistencies: code duplication, abstractions built for their own sake, incompatible patterns layered on top of each other.

Human-made enterprise codebases reach the same state — but over years, and the organization co-evolves to cope. With agents and two humans, you can reach enterprise-mess complexity in **weeks**.

---

## Agentic Search Has Low Recall

Before an agent can fix a problem, it must *find* all the relevant code. The bigger and messier the codebase, the lower the recall — regardless of search tool (ripgrep, LSP, vector DB). The agent misses existing code, duplicates it, introduces more inconsistencies. This is the root cause of most booboos in the first place.

This also means agents can't reliably dig themselves (or you) out of a complexity hole they helped create.

---

## What Good Agent Tasks Look Like

Agent tasks that work well share three properties:

1. **Scopeable** — the agent doesn't need to understand the full system to complete the task
2. **Self-evaluatable** — there's an objective metric the agent can check its work against (startup time, loss, test pass rate)
3. **Non-mission-critical** — ad hoc tools, internal scripts, exploratory prototypes; nothing user-data-critical

> [!tip] The eval function caveat
> Auto-research and optimization tasks work because the eval function closes the loop. But an eval function only captures the metrics you define. The agent will happily ignore code quality, complexity, or correctness if those aren't measured. Always be the final quality gate.

---

## The Discipline Framework: Slow Down

[[Mario Zechner]]'s prescription:

### Keep humans in the loop

Set a limit on how much agent-generated code you accept per day — tied to your realistic capacity to review it. Code you haven't understood is a liability you've accepted blindly.

### Write architecture by hand

Anything that defines the gestalt of a system — architecture, public APIs, data models — write it yourself. Use the agent for grunt work only. The friction of writing forces comprehension: you understand what you're building, how it feels, whether it's right. This is where **experience and taste** enter, things current LLMs cannot supply.

### Stay in the code

Being present in the codebase — even just for architectural scaffolding — means you understand it. This understanding directly compensates for agents' low recall: you can guide the agent to the right code, catch inconsistencies, and fix problems yourself if needed.

### Learn to say no

Slowing down naturally limits feature scope. That's a feature. Fewer things, built well, that actually work.

> "All of this requires discipline and agency. All of this requires humans."
> — [[Mario Zechner]]

---

## Connection to Human Capabilities

The argument maps directly onto [[The 5 Human Capabilities]]: agents can handle computation and transformation at scale, but they lack variation (genuine taste), selection (knowing what *not* to build), and sustained *attention* — the thing that makes a codebase coherent over time.

The human bottleneck, usually seen as a weakness, is actually a **quality mechanism**. Remove it, and you remove the feedback loop that keeps complexity in check.

See also: [[Agency]], [[Making Your Agent Reliable]], [[Multi-Agent Systems]]

---

## Related Pages

- [[Multi-Agent Systems]] — when multi-agent actually makes sense; the supervisor model
- [[Making Your Agent Reliable]] — how to diagnose failures and fix the right things first
- [[Agent Tools — Design Principles]] — keeping tools narrow so agents can succeed at scoped tasks
- [[Agency]] — why maintaining your own agency (not delegating it) is the core skill
- [[The 5 Human Capabilities]] — the framework for why humans remain irreplaceable even with powerful agents
