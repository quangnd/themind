---
title: Agent-Friendly Codebase
aliases: [Marble Madness codebase, agent-ready repo, codebase agent hygiene]
tags: [AI, agents, codebase, workflow, continuous-improvement]
created: 2026-04-12
updated: 2026-04-12
source: "[[lucas-meijer-love-letter-to-pi]]"
type: concept
---

# Agent-Friendly Codebase

The practice of continuously improving a codebase so that coding agents can navigate it reliably — and the feedback loop that drives that improvement. Introduced by [[Lucas Meijer]] via the **Marble Madness metaphor**.

---

## The Marble Madness Metaphor

> *"I like to pretend that the marble is your coding agent and the level is your repo — and it's your job for this marble to roll down your repo very conveniently."*

Marble Madness (1984 Atari arcade game) has a marble that must roll through obstacle-filled levels. The marble doesn't think; the level design determines whether it succeeds or falls off a cliff.

Applied to agents: the agent's success is largely determined by the quality of the codebase it navigates. A repo full of outdated docs, noisy build output, and missing context is a dangerous level. Your job is to smooth the path.

---

## Common Hazards

| Hazard | Why it derails agents |
|--------|----------------------|
| Incomplete `AGENTS.md` / `CLAUDE.md` | Agent lacks project-specific rules; makes wrong assumptions |
| Incorrect `AGENTS.md` | Worse than missing — agent follows wrong instructions confidently |
| Build warnings ignored for years | Agent can't distinguish signal from noise; goes off-track chasing old warnings |
| Stale documentation | Agent follows outdated commands (e.g. `make mac` when it's now `make :mac`) and has to read full source to recover |
| Inconsistent naming conventions | Agent can't predict file locations; excess exploration burns context |
| Missing context files (spec.md, architecture.md) | Agent re-derives known decisions; wastes turns and context |

---

## The Improvement Loop

**Step 1 — Run the agent on a task**

**Step 2 — Read the full session transcript**
Read every tool call. Ask: *"Why did it go there? Why did it try that? What caused it to backtrack?"*

**Step 3 — Make targeted repairs**
Fix what the transcript reveals: update docs, fix build warnings, expand AGENTS.md, correct stale commands.

**Step 4 — Automate the analysis**
When the manual read feels tedious, hand it back to the agent:
```
Analyze the previous session transcript. Find all places where the agent 
went in a wrong direction only to later figure out the correct one. 
For each friction point, recommend what I could have added or changed in 
the repo to have prevented it. Present as HTML.
```

This produces a structured friction report: what went wrong, why, and what to fix.

**Step 5 — Repeat**
Each iteration makes the level smoother. Compounding: the better the codebase, the better the next session, the more accurate the next friction report.

---

## The Documentation Trap

It's easy to accumulate a growing pile of AI-generated MD files — instructions, summaries, notes, specs. Without curation, the "helpful" documentation becomes another hazard: agents read stale or contradictory files and get confused.

Principles for lean documentation:
- **Accurate over comprehensive** — one correct sentence beats three paragraphs with an error
- **Delete stale docs** — outdated instructions are worse than no instructions
- **Audit on session review** — when a transcript shows the agent misread a doc, fix the doc immediately
- **AGENTS.md as the canonical entry point** — everything else is referenced from there, not discovered by accident

This mirrors [[Mario Zechner]]'s `spec.md` pattern in [[Agentic Porting Workflow]]: a maintained, accurate context file the agent always reads at session start.

---

## Relation to [[Context Engineering]]

An agent-friendly codebase reduces context waste. When agents don't need to explore to find things (because docs are correct, symbol databases exist, build output is clean), they spend fewer tokens on navigation and more on the actual task.

The codebase is precomputed context — information encoded in the repo structure that the agent can load on demand, rather than deriving it live during a session.

---

## Related

- [[lucas-meijer-love-letter-to-pi]] — source talk
- [[Evaluation-First Prompting]] — the complementary practice (evaluate output well; improve the agent's path to producing it)
- [[Context Engineering]] — codebase as precomputed context
- [[Agentic Porting Workflow]] — Mario Zechner's spec.md and conventions.md as agent-friendly codebase patterns
- [[Agentic Coding — Risks and Discipline]] — the risks of skipping this work
- [[Making Your Agent Reliable]] — the testing/reliability side of the same coin
