---
title: Pi (Coding Agent)
aliases: [Pi agent, pi-mono, earendil pi]
tags: [AI, agents, coding-agent, tools]
created: 2026-04-09
updated: 2026-04-12
sources:
  - "[[armin-ronacher-pi-minimal-agent]]"
  - "[[mario-zechner-building-pi-coding-agent]]"
  - "[[lucas-meijer-love-letter-to-pi]]"
type: entity
---

# Pi (Coding Agent)

Pi is a minimal coding agent written by [[Mario Zechner]], designed around a single organizing philosophy: **LLMs are good at writing and running code, so embrace this rather than working around it.** It is the engine underlying [[OpenClaw]], and the agent [[Armin Ronacher]] uses almost exclusively.

As of April 2026, Pi is owned by [[Earendil]] and lives at [github.com/earendil-works/pi](https://github.com/earendil-works/pi). Mario remains full technical lead. Home: [pi.dev](https://pi.dev).

## Licensing (3-Tier Model)

Pi's commercial structure, introduced when it joined [[Earendil]]:

| Tier           | License            | What it is                                                                       |
| -------------- | ------------------ | -------------------------------------------------------------------------------- |
| **Core**       | MIT, forever       | Pi as you know it — non-negotiable                                               |
| **Value-add**  | Fair Source (DOSP) | Future commercial features; source available; converts to full OSS after a delay |
| **Enterprise** | Proprietary        | Cloud infrastructure, enterprise features; funds tiers 1 & 2                     |

DOSP = Delayed Open Source Publication. Fair Source means free to use, source available, but not OSS until the delay expires. See [Armin's licensing post](https://rfc.earendil.com/0015/).

## Governance

- Mario Zechner: full technical direction (roadmap, merges, what's OSS vs not), shared with Armin and Colin
- External contributions: no CLA, no DCO — PRs reviewed as always
- Trademark: Pi name and logo owned by Earendil (Mozilla/Linux model)
- Repo moved from `badlogic/pi-mono` → `earendil-works/pi`; package from `@mariozechner/pi-coding-agent` → `@earendil/pi`

## Origin

Pi was born from frustration. Mario began using Claude Code in April 2025, liked it, then started to get annoyed as Anthropic kept adding features and modifying the toolset and system prompt — sometimes in ways that broke his workflows. Before building pi, he hacked Claude Code itself: patched the binary to disable anti-debugging checks, monkeypatched `fetch` to intercept API calls, and built a suite of companion tools (claude-trace, claude-bridge, cccost). He even built [cchistory.mariozechner.at](https://cchistory.mariozechner.at) to track system prompt diffs between versions.

The conclusion: he wanted an agent harness that works exactly the way he wants, stays stable, and doesn't have built-in anti-patterns. Pi was built to scratch that itch. It's been his exclusive daily driver since late 2025.

Pi also includes **cost tracking** from the start — something Mario found other harnesses do poorly. (Claude Code disabled `/cost` for Max plan users entirely.)

## The Actual System Prompt

Pi's full system prompt (under 1,000 tokens total including AGENTS.md):

```markdown
You are an expert coding assistant. You help users with coding tasks by reading files,
executing commands, editing code, and writing new files.

Available tools:
- read: Read file contents
- bash: Execute bash commands
- edit: Make surgical edits to files
- write: Create or overwrite files

Guidelines:
- Use bash for file operations like ls, grep, find
- Use read to examine files before editing
- Use edit for precise changes (old text must match exactly)
- Use write only for new files or complete rewrites
- When summarizing your actions, output plain text directly - do NOT use cat or bash to display what you did
- Be concise in your responses
- Show file paths clearly when working with files

Documentation:
- Your own documentation is at: /path/to/README.md
```

User's AGENTS.md appended at the bottom. That's it. Why it works: frontier models are RL-trained to understand coding agent tasks and don't need thousands of tokens of guidance.

## The Four Tools

Pi has exactly four tools:

```
read   — Read file contents (text + images). Defaults to first 2000 lines; offset/limit for large files.
write  — Write content to a file. Creates file and parent dirs if needed. Overwrites if exists.
edit   — Replace exact text in a file. oldText must match exactly including whitespace.
bash   — Execute a bash command in the working directory. Returns stdout and stderr.
```

No MCP support, no built-in browser automation, no community plugin registry. Everything else is built on top.

> [!note] Why so few tools?
> The minimal toolset is not an oversight — it's the foundation of the self-extension philosophy. If you need the agent to do something it can't yet do, you have it build the capability. The agent's tools are sufficient to build any other tool. And models have been trained extensively on these four operations — they don't need more scaffolding.

## Extension System

What Pi lacks in breadth it makes up for in a well-designed extension system:

- **Custom tools**: extensions can register new tools for the LLM to call
- **State persistence**: extension state is written to disk alongside session data, surviving restarts
- **Hot reloading**: the agent writes extension code, reloads, tests, and iterates — all in a loop
- **TUI components**: extensions can render custom terminal UI — spinners, progress bars, file pickers, data tables, preview panes. Flexible enough that Mario ran Doom in it.
- **Documentation included**: Pi ships with docs and examples so the agent can extend itself without hand-holding

## Session Trees

Sessions in Pi are trees, not linear histories. This unlocks a powerful workflow:

1. You're mid-session and a tool breaks
2. **Branch** — open a side session to fix the broken tool
3. Fix it, test it
4. **Rewind** the main session to before the branch point
5. Pi **summarizes** what happened on the side branch
6. Continue the main session with the fix in place — no context pollution

This also enables clean code review: branch into a fresh review context, get findings, bring fixes back.

![[pi-answer-extension.png]]
*The /answer extension reformats the agent's questions into a clean input box*

## Deliberate Omissions

Pi's "no" list is as defining as its feature list. Each omission is a deliberate design decision rooted in [[Context Engineering]] and observability:

| Feature | Decision | Reason |
|---------|----------|--------|
| **MCP** | No | Context overhead; CLI tools + README are sufficient; session-start binding breaks hot-reload architecture |
| **Built-in todos** | No | Model-tracked state → more errors. Use `TODO.md` with checkboxes instead. |
| **Plan mode** | No | Opaque sub-agent loop. Use `PLAN.md` instead — observable, editable, persistent, versionable. |
| **Background bash** | No | Adds process tracking complexity. Use tmux: full observability, interactable, native process management. |
| **Sub-agents (default)** | No | Black box within black box; poor context transfer; fix the workflow first. Valid exception: code review. |
| **Permission prompts** | No (YOLO) | Security theater. If the agent can write and run code, arbitrary command execution is already possible. |

> [!note] The file-as-state pattern
> For todos and plans, the rule is: use a markdown file. The agent reads and writes it. You co-author it. It persists across sessions, is versionable with git, and you can always see exactly what the agent is working from.

For MCP specifically: the session-start binding makes dynamic extension difficult and forces cache invalidation when tools change. Pi's hot-reload extension system is architecturally incompatible with MCP. For MCP interop, [mcporter](https://github.com/steipete/mcporter) exposes MCP servers as CLI tools.

## Skills vs Extensions

Pi distinguishes two extension modes:

- **Skills** (slash commands): reusable prompts or workflows invoked with `/name`; live in the file system; composable
- **Extensions**: code that registers new tools, persists state, renders TUI components; more powerful, more complex

Armin Ronacher's approach: build both via the agent itself. His [agent-stuff](https://github.com/mitsuhiko/agent-stuff/tree/main/skills) repo contains skills the agent built to his specification. He discards skills when they're no longer needed — no accumulation of dead tooling.

## Example Extensions

Built by Pi, to Armin's specifications, not hand-written by him:

- **/answer** — extracts questions from the agent's last response, reformats as a structured input box
- **/todos** — manages task files in `.pi/todos`; sessions can claim tasks
- **/review** — branches into a review context; surfaces new dependencies and other call-outs
- **/control** — one Pi agent sends prompts to another; lightweight multi-agent
- **/files** — lists all files touched in the session; Quick Look, Finder, VS Code diff integration

Community extensions exist too: [Nico's subagent extension](https://github.com/nicobailon/pi-subagents) and `pi-interactive-shell` which lets Pi drive interactive CLIs in an observable TUI overlay.

## OpenClaw and Beyond

Pi's component model is designed to be embedded. [[OpenClaw]] — which went viral under several names (ClawdBot, MoltBot) — is Pi connected to a communication channel. [[Armin Ronacher]]'s Telegram bot is Pi. Mario Zechner's "mom" is Pi. The agent can build you a connected variant of itself if you point it at these examples.

## Architecture (pi-mono)

Pi is a monorepo of composable packages:

- **pi-ai** — unified LLM API: multi-provider (Anthropic, OpenAI, Google, xAI, Groq, Cerebras, OpenRouter), streaming, tool calling with TypeBox schemas, cross-provider context handoff, abort support, split tool results (LLM portion vs UI portion)
- **pi-agent-core** — agent loop, state management, message queuing, transport abstraction
- **pi-tui** — terminal UI framework using retained mode + differential rendering + synchronized output (no-flicker); scrollback-buffer approach (not full-screen takeover)
- **pi-coding-agent** — the CLI: session management, slash commands, model switching, AGENTS.md loading, HTML export, headless/RPC mode

## Related Concepts

- [[Self-Extending Agents]] — the philosophy Pi embodies
- [[Context Engineering]] — the core motivation for Pi's design
- [[CLI Tools Pattern]] — how to add capabilities to Pi without MCP
- [[Agentic Coding — Risks and Discipline]] — the risks this approach must navigate
- [[MCP Tools vs Custom Function Tools]] — Pi's implicit answer to this question
- [[Agent Tools — Design Principles]] — Pi as an extreme case study (4 tools only)

## In the Wild

[[Lucas Meijer]] (Unity co-founder) gave a conference talk — [[lucas-meijer-love-letter-to-pi]] — that serves as an independent practitioner's endorsement of Pi. Key observations from an experienced outsider:

- `/tree` for context branching is the feature he uses most; pruning dead-end side quests is central to his workflow
- The 50% context rule: above 50% context fill, agent quality degrades noticeably; Pi's `/tree` makes it practical to stay under
- `/answer` extension (community-built) as a model for the right way to extend Pi — solve actual friction, not hypothetical problems
- Pi's self-extension capability (write an extension, `/reload`, hot-reload) as an example of "Barba Papa software" — software that morphs to fit the user
- Prefers Pi over Claude Code for precise context control in a world where nobody yet knows what ergonomic AI assistance looks like

## Sources

- [[armin-ronacher-pi-minimal-agent]] — Armin Ronacher's firsthand account of Pi's design (2026-01-31)
- [[mario-zechner-building-pi-coding-agent]] — Mario's deep technical account of building Pi (2025-11-30)
- [[mario-zechner-ive-sold-out]] — Mario's announcement of Pi joining Earendil, governance and licensing details (2026-04-08)
- [[mario-zechner-slowing-the-fuck-down]] — Mario's essay on agentic coding discipline
- [[lucas-meijer-love-letter-to-pi]] — Unity co-founder's practitioner's-eye view of Pi in production (2026-03)
