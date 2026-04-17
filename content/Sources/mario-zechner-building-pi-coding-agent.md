---
title: "What I learned building an opinionated and minimal coding agent"
source: "https://mariozechner.at/posts/2025-11-30-pi-coding-agent/"
author: "[[Mario Zechner]]"
published: 2025-11-30
created: 2026-04-09
tags: [source, AI, agents, coding-agent, context-engineering]
type: summary
---

# What I learned building an opinionated and minimal coding agent

*By [[Mario Zechner]], mariozechner.at, 2025-11-30*

Mario's deep technical account of building Pi from scratch. The framing: existing coding agents make context engineering impossible by injecting hidden content. Pi is an attempt to fix that.

## Why Build Pi?

- Claude Code (Mario's preferred tool) had grown into a "spaceship with 80% functionality I don't need"
- System prompt and tools change on every release, breaking workflows and shifting model behavior
- No harness provides full observability into what goes into context
- Self-hosted model support was universally poor (Vercel AI SDK incompatibilities)
- Accumulated API baggage in existing harnesses makes developer experience rough

Core motivation: **context engineering is paramount** — precisely controlling what enters the model's context yields better outputs, especially for code. No existing harness allows this.

## The Four Components

### pi-ai
Unified LLM API. Supports: Anthropic, OpenAI, Google, xAI, Groq, Cerebras, OpenRouter, and any OpenAI-compatible endpoint. Key features:
- Streaming and tool calling with TypeBox schemas + AJV validation
- Thinking/reasoning support across providers
- Cross-provider context handoff (thinking traces converted to `<thinking>` tags)
- Token and cost tracking (best-effort — providers are inconsistent)
- AbortController support throughout
- Partial JSON parsing during tool call streaming (for progressive UI display)
- **Split tool results**: separate content for LLM vs. UI display
- Works in the browser (Anthropic and xAI support CORS)

Provider quirks catalogued: Cerebras/xAI/Mistral don't like `store` field; Mistral uses `max_tokens` not `max_completion_tokens`; Google doesn't support tool call streaming.

### pi-tui
Minimal terminal UI framework using the "scrollback buffer" approach (not full-screen takeover). Key techniques:
- Retained mode: components cache rendered output; only re-render if changed
- Differential rendering: only redraws lines that changed since last render
- Synchronized output (`CSI ?2026h/l`) for flicker-free updates in modern terminals
- Works brilliantly in Ghostty/iTerm2; some flicker in VS Code terminal (acceptable)

Design choice over full-screen TUIs: preserves native terminal scrollback, search, and mouse scrolling. Constraints produce minimal programs.

### pi-agent-core
Agent loop handling full orchestration: process user messages → execute tool calls → feed results back → repeat until no tool calls. Message queuing, attachment handling, transport abstraction (direct or proxy).

### pi-coding-agent
The CLI. Full feature list in README. What's interesting is where it deviates from other harnesses.

## The Actual System Prompt

```markdown
You are an expert coding assistant. You help users with coding tasks by reading files, executing commands, editing code, and writing new files.

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

Plus the user's AGENTS.md appended at the bottom. **Total: under 1000 tokens.** Compared to Claude Code's multi-thousand-token system prompt.

Why it works: frontier models have been RL-trained to understand coding agents. They don't need 10,000 tokens of guidance.

## Design Decisions (The "No" List)

| Feature | Decision | Reason |
|---------|----------|--------|
| **MCP** | No | Context overhead; CLI tools + README are sufficient (see [[mario-zechner-what-if-you-dont-need-mcp]]) |
| **Built-in todos** | No | Add state the model must track → more errors. Use TODO.md instead. |
| **Plan mode** | No | Use PLAN.md instead — file-based, persistent, observable, collaborative |
| **Background bash** | No | Use tmux instead — full observability, interactable |
| **Sub-agents** | Mostly no | Black box within black box; poor context transfer; fix the workflow instead. Valid for code review. |
| **Permission prompts** | No (YOLO) | Security theater — once agent can write and run code, it's game over |

## File-as-State Pattern

For todos and plans, Mario's philosophy is: use a file. The agent reads and writes it. You can edit it collaboratively. It persists across sessions. It's versionable. It's observable. No hidden state.

## Benchmarks

Terminal-Bench 2.0 against Codex, Cursor, Windsurf. Pi with Claude Opus 4.5 placed competitively. Mario's note: Terminus 2 (Terminal-Bench's own minimal agent using only tmux) also ranks well — more evidence that minimal tooling can match feature-heavy harnesses.

## Related

- [[mario-zechner-what-if-you-dont-need-mcp]] — the CLI tools over MCP argument (referenced in this article)
- [[mario-zechner-slowing-the-fuck-down]] — the discipline argument (same author)
