---
title: Multi-Agent Systems
aliases: [multi-agent, agent swarms, orchestrator, supervisor model]
tags: [concept, AI, agents, architecture]
created: 2026-04-05
updated: 2026-04-05
source: "[[ai-agents-full-course-for-laymen]]"
type: concept
---

# Multi-Agent Systems

![[Attachments/agents-multiple-agents.jpg]]

The assumption that "more agents = more powerful" is one of the most reliable ways to build something that breaks. Most people who reach for multi-agent systems don't actually need them.

**Default rule: start with one agent. Always.**

## The Only Three Times You Actually Need Multiple Agents

**1. Different skills required**
The task genuinely requires expertise that can't coexist in one prompt. Example: a research agent and a writing agent with fundamentally different operating modes.

**2. A clear pipeline exists**
There's a defined sequence of transformations where each stage is genuinely distinct. Example: Input → Analyse → Write → Format → Output.

**3. Different permissions needed**
One part of the task requires read access, another requires write/execute access. Separating them is a security or reliability choice.

If your situation doesn't clearly match one of these, you probably don't need multiple agents.

## When to Add More Agents

Only add agents when:
- The task is clearly split into distinct roles
- One agent is struggling and you can clearly identify which subtask is the problem
- The roles are sufficiently different that a single prompt can't serve both well

## The Safest Pattern: Supervisor Model

```
User → Main agent → (calls specialist agents if needed)
```

The main agent handles the conversation and delegates specific subtasks to specialists. The user only ever talks to the main agent.

This is far more reliable than swarms or fully autonomous multi-agent systems, which break easily and are very hard to debug.

## What Not to Start With

- **Swarms** — multiple agents running autonomously with no central coordinator
- **Fully autonomous multi-agent pipelines** — where agents spawn other agents

These patterns are powerful in theory and brittle in practice. They're appropriate for mature systems, not first versions.

## Keeping Roles Simple

**Bad role description:**
> "AI strategist agent with dynamic cognitive layering"

**Good role descriptions:**
> "Research agent" / "Writer agent"

Narrow, concrete roles are easier to prompt, easier to test, and easier to debug.

## The Expansion Path

Start with 1 agent. If it struggles, identify the bottleneck. Only then add a second agent with a specific, narrow role. Test the 2-agent system thoroughly before considering a third.

## See Also

- [[AI Agents — How They Work]]
- [[Five Workflow Patterns for AI Agents]]
- [[Building Your First AI Agent]]
- [[Making Your Agent Reliable]]
