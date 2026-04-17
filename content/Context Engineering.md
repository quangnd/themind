---
title: Context Engineering
aliases: [context control, context window management, context design]
tags: [AI, agents, context, design-philosophy]
created: 2026-04-09
updated: 2026-04-12
sources:
  - "[[mario-zechner-building-pi-coding-agent]]"
  - "[[mario-zechner-practical-guide-agentic-computering]]"
  - "[[lucas-meijer-love-letter-to-pi]]"
type: concept
---

# Context Engineering

The practice of precisely controlling what enters the model's context window — what gets included, when, and in what form. [[Mario Zechner]] frames this as the primary lever for agent quality, especially for code generation: **exactly controlling what goes into the model's context yields better outputs**.

The problem: most existing agent harnesses make context engineering difficult or impossible. They inject content behind the scenes that isn't surfaced in the UI, making it hard to reason about or correct.

## Why Context Is the Bottleneck

Models don't perform uniformly across all inputs. The same model can produce dramatically different outputs depending on:

- How much total context is occupied (fuller context → more noise, less focus)
- What specific content is present (irrelevant tool definitions crowd out relevant code)
- What's hidden vs. visible (you can't fix what you can't see)
- When things get loaded (session-start vs. on-demand)

Context engineering is the discipline of managing all of these. It's engineering in the literal sense: deliberate design of a system, with tradeoffs measured against outcomes.

## The Observability Problem

You can't engineer what you can't observe. Most harnesses fail here in two ways:

1. **Hidden injection**: The harness adds content to the system prompt or messages that's never shown to the user — tool definitions, memory summaries, retrieved documents, prior session context. You don't know what the model is actually seeing.

2. **Sub-agent opacity**: When a harness spawns a sub-agent, the orchestrating agent decides what context to pass. The user has zero visibility into what that sub-agent saw and what it did. If it fails, debugging requires guessing.

[[Pi (Coding Agent)]] was designed from scratch to expose every aspect of the session — every message, every tool call, every result.

## Practical Techniques

### On-Demand Context Loading

Don't pay for tool context you aren't using. Rather than loading all tool definitions at session start (as MCP requires), load them only when needed:

```bash
# Agent reads this README only for sessions that need browser tools
@browser-tools/README.md
```

Result: a browser tools README at 225 tokens vs. 13,700–18,000 tokens for equivalent MCP servers loaded at every session start. See [[CLI Tools Pattern]].

### Minimal System Prompts

Pi's system prompt is under 1,000 tokens total. The rest of the harnesses use 5,000–15,000+ tokens. This is possible because frontier models are RL-trained to understand coding agent tasks — they don't need extensive instruction. The tokens saved are available for actual work.

### File-as-State Over Built-in Features

Hidden internal state (built-in todos, plan mode outputs, sub-agent memory) is context you can't see, edit, or version. File-based equivalents expose the state fully:

- `TODO.md` with checkboxes instead of a built-in todo system
- `PLAN.md` with sections instead of plan mode
- Named files for sub-agent artifacts, shareable across sessions

This keeps the context observable and editable — you can co-author `PLAN.md` with the agent, correct it, and the changes are immediately reflected in subsequent behavior.

### Front-Loading Context Gathering

Using a sub-agent mid-session to gather context is a sign you didn't plan ahead. Better pattern:

1. Start a dedicated context-gathering session
2. Produce an artifact (a well-structured document or summary)
3. Start a fresh implementation session, handing that artifact as context

The implementation session starts clean. The artifact contains exactly what it needs. No context window occupied by tool call outputs from prior exploration.

### Session Branching

[[Pi (Coding Agent)]]'s session tree model supports a related technique: branch off a side session to fix a broken tool or explore a design question, then summarize the branch and rewind. The main session is only enriched by the conclusion, not the full exploration trace.

### Compaction Management

When a session's context nears its limit, most harnesses auto-compact: the full conversation is summarized into a shorter representation. This is lossy — detailed proposals, negotiated decisions, and accumulated domain knowledge compress to vague abstractions. A better strategy, documented by [[Mario Zechner]]:

1. **At ~20% remaining:** ask the agent to write a `task-summary.md` — proposals verbatim, decisions stated explicitly, next steps listed, relevant file paths included
2. **Iterate on it** — there's still context left; correct the file until it's accurate. Never trust the first draft.
3. **Quit the session** — don't compact, don't wait for auto-compact
4. **New session:** load `spec.md` (project context) + `task-summary.md`
5. **Continue** — the summary is the handoff

Advantage over `/compact` with custom instructions: you inspect and correct the artifact before committing. With built-in compaction you get one shot and can't fix it.

The file-as-state principle applies here too: the summary file is observable, editable, and versionable. The agent wrote it, you reviewed it, the next session reads it.

### The 50% Rule

[[Lucas Meijer]]'s hard rule: watch the context percentage shown by your agent. Once you cross 50–60%, the model enters what he calls the "dumb zone" — noticeably degraded output quality as the context becomes noisy. At 50%, start pruning.

In Pi: use `/tree` to navigate back to a clean branch point and discard the bloated conversation. Options:
- **No summary** — throw the branch away (for irrelevant side quests)
- **Summary** — compress to a note (for explorations whose outcome is worth keeping)

The insight behind the rule: a shorter, focused context is worth more than a longer one with everything in it.

### Don't Argue — Go Back

When the agent produces something wrong, the instinctive response is to correct it in the same conversation: *"No, I didn't want it like that."* This is a mistake:
- The wrong direction stays in context, costing tokens
- The agent carries the prior framing into the new attempt
- Context lengthens unnecessarily

The correct move: use the session tree (`/tree` in Pi) to go back to before the wrong turn. Rephrase the prompt from a clean state.

> *"You should never tell it 'no I didn't want it like that'. Don't argue with these things."* — [[Lucas Meijer]]

### Query Isolation with jq

For workflows that maintain large JSON state files (porting plans, task databases), never read the full file into context. Use `jq` or any CLI query tool to extract only the specific fields needed for the current step. A porting plan JSON with 68 file entries stays on disk; the agent queries it for one entry at a time. See [[Agentic Porting Workflow]] for a worked example.

## The Anti-Pattern: Sub-Agent Proliferation

Spawning multiple sub-agents in parallel to implement features is the opposite of context engineering. Each sub-agent has incomplete context, produces inconsistent code, and the results are hard to integrate. Mario: "Spawning multiple sub-agents to implement various features in parallel is an anti-pattern in my book and doesn't work, unless you don't care if your codebase devolves into a pile of garbage."

Sub-agents are valid in a narrow case: an isolated, well-scoped task (e.g. a code review) where you want the fresh perspective of a model without the current session's context. But the output should be a report back to the main session, not independent code changes.

## Relation to Minimal Agent Design

Context engineering is the *why* behind [[Pi (Coding Agent)]]'s minimal design choices. Every "no" in Pi's design (no MCP, no plan mode, no built-in todos, no sub-agents) is a context engineering decision:

- **No MCP**: avoids loading large tool schemas that may never be used
- **No built-in todos**: avoids hidden state that clutters context
- **No plan mode**: avoids an opaque sub-agent loop; use a visible file instead
- **No sub-agents by default**: avoids context you can't inspect or steer

The minimal system prompt (< 1,000 tokens) is context engineering at the foundation.

## Related

- [[CLI Tools Pattern]] — on-demand context loading via README + CLI
- [[Pi (Coding Agent)]] — reference implementation of context engineering principles
- [[Claude Code Internals]] — what claude-trace revealed about hidden context injection in Claude Code
- [[Agentic Porting Workflow]] — worked example of query isolation + session handoff
- [[Self-Extending Agents]] — building tools that respect context budgets
- [[Agent Tools — Design Principles]] — tool descriptions as context spend
- [[Agentic Coding — Risks and Discipline]] — the discipline context engineering requires
