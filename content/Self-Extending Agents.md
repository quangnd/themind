---
title: Self-Extending Agents
aliases: [agents that build agents, self-modifying agents]
tags: [AI, agents, architecture, design-philosophy]
created: 2026-04-09
updated: 2026-04-12
sources:
  - "[[armin-ronacher-pi-minimal-agent]]"
  - "[[lucas-meijer-love-letter-to-pi]]"
type: concept
---

# Self-Extending Agents

A self-extending agent is one that builds its own tools, skills, and extensions rather than relying on a pre-built ecosystem. The core bet: **LLMs are good at writing and running code**, so when a capability is missing, the right response is to have the agent create it.

This is a design philosophy, not a feature. It shapes architectural decisions at every level.

## The Central Idea

Most agent frameworks address the question "how does the agent access new capabilities?" by pointing at a plugin marketplace: download MCP servers, install community extensions, enable integrations. Self-extending agents invert this:

> Instead of downloading someone else's extension, point the agent at an existing example and have it build a variant to your specification.

The agent maintains its own functionality. It writes, loads, tests, and discards capabilities as needed. Tooling is ephemeral and purpose-built — not accumulated.

## Architectural Requirements

For this to work, the underlying architecture needs specific properties:

1. **Sufficient base tools** — the agent must be able to write files, execute code, and read results. Four tools suffice: Read, Write, Edit, Bash.

2. **Hot reloading** — the agent writes extension code, reloads it into the running session, tests it, and iterates. No restart, no session loss.

3. **State persistence for extensions** — extensions need to store state between turns. This state lives alongside (but separate from) the AI message history, so it doesn't pollute the context.

4. **Session isolation** — side quests (like building a broken tool) shouldn't pollute the main session. Session trees, branching, and summarization enable this.

5. **Minimal core** — the smaller the pre-built surface area, the less there is to fight against. A large built-in toolset creates friction when you want to replace or modify a capability.

## Why Not MCP?

The [[MCP Tools vs Custom Function Tools|MCP]] model requires tools to be declared at session start. This means:
- Dynamic extension is hard (can't add tools mid-session cleanly)
- Changing a tool requires invalidating cache or confusing the model about prior invocations
- The community extension model creates dependency on external maintainers

Self-extending agents sidestep this entirely. The agent writes the tool, reloads it, and the session continues. There's no session-start binding to fight against.

> [!note] Not anti-MCP in principle
> The objection is architectural, not ideological. MCP works fine for stable, widely-used integrations. The friction appears when you want an agent that *grows itself* dynamically within a session.

## The Skill Library vs Skill Store

Two models for distributing reusable agent capabilities:

| Skill Store | Skill Library |
|-------------|---------------|
| Download from community | Build with your agent |
| External dependency | Owned by you |
| General-purpose | Tuned to your workflow |
| Stable, tested | Evolves as needs change |
| Harder to customize | Trivially forkable |

A self-extending agent naturally builds a personal skill library. Skills that stop being useful get discarded. Skills that need tweaking get modified via a prompt. The agent is the maintainer.

## "Software Building Software"

The endpoint of this philosophy, taken literally: remove the UI, connect the agent to a communication channel, and let it run. This is what [[OpenClaw]] does. The agent responds to messages by writing and running code. The human's role shifts from implementer to specifier.

[[Armin Ronacher]] frames this as a natural continuation:
> *"Part of the fascination that working with a minimal agent like Pi gave me is that it makes you live that idea of using software that builds more software."*

## Risks and Discipline

Self-extension amplifies both capability and failure modes. An agent that can modify its own tools can also break them. Mitigations:

- **Session trees** — branch before modifying tools; rewind if the fix is wrong
- **Explicit testing loops** — agent writes, reloads, tests, iterates before moving on
- **Minimal changes** — extend only when genuinely needed, not speculatively
- **Human review points** — use a /review branch before merging agent-written tools

See [[Agentic Coding — Risks and Discipline]] for the broader case for slowing down in agentic workflows.

## Barba Papa Software

[[Lucas Meijer]] introduces an evocative name for this category of software: **Barba Papa software**, named after the 1970s French/Dutch cartoon character who shapeshifts into whatever form an adventure requires.

> *"Software that instead of [one programmer writes it once and thousands of people use it] — a programmer writes a base for the software, and then when you use it, it morphs itself into whatever shape is good for you and is good for the problem you have right now."*

This reframes self-extension not as a developer feature but as a product philosophy. The traditional software model: one team writes everything, millions of users take it or leave it. The Barba Papa model: a minimal base + the agent shapes the rest per user and per task.

Lucas sees this as the right model for both coding agents (Pi) and his new game engine. The insight applies broadly: any sufficiently hackable system can Barba Papa.

## Pi as the Reference Implementation

[[Pi (Coding Agent)]] by [[Mario Zechner]] is the clearest working example of this philosophy. Four tools, minimal system prompt, hot-reloading extension system, session trees. Everything else is built by the agent on top of this core.

## Related

- [[Pi (Coding Agent)]] — reference implementation
- [[Agent Tools — Design Principles]] — what "fewer, better tools" looks like in practice
- [[MCP Tools vs Custom Function Tools]] — the architectural tradeoff
- [[Agentic Coding — Risks and Discipline]] — the discipline required to make this safe
- [[AI Agents — How They Work]] — the underlying agentic loop
