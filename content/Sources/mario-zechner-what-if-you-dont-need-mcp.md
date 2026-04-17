---
title: "What if you don't need MCP?"
source: "https://mariozechner.at/posts/2025-11-02-what-if-you-dont-need-mcp/"
author: "[[Mario Zechner]]"
published: 2025-11-02
created: 2026-04-09
tags: [source, AI, agents, MCP, tools, CLI]
type: summary
---

# What if you don't need MCP?

*By [[Mario Zechner]], mariozechner.at, 2025-11-02*

A practical argument for replacing MCP servers with simple Bash/CLI scripts, illustrated through a minimal browser DevTools toolkit. The central claim: in most agentic coding situations, CLI tools invoked via Bash are more efficient, composable, and extensible than MCP servers.

## The Problem with Popular MCP Servers

- They need to cover all bases, which means many tools with lengthy descriptions
- Playwright MCP: 21 tools, **13.7k tokens** (6.8% of Claude's context)
- Chrome DevTools MCP: 26 tools, **18.0k tokens** (9.0% of context)
- Too many tools confuses the agent, especially when combined with other MCP servers
- Composability problem: all output must pass through the agent's context; can't pipe to disk directly
- Hard to extend: must understand the codebase to modify

## The CLI Alternative

A minimal browser toolkit (4 Node.js scripts + a README):

| Script | What it does |
|--------|-------------|
| `start.js [--profile]` | Launch Chrome on :9222 with optional profile copy |
| `nav.js <url> [--new]` | Navigate current tab or open new tab |
| `eval.js 'code'` | Execute JavaScript in active tab (page context) |
| `screenshot.js` | Capture viewport → temp PNG file path |

Total README size: **225 tokens** vs 13k–18k for equivalent MCP servers.

The agent invokes all of these via Bash. It already knows how to use Bash and write DOM/JS code — no extra tool definitions needed.

## Why It Works

The model already knows:
- How to invoke CLI scripts via Bash
- How to write Node.js and DOM JavaScript
- How to read a README and understand a tool's interface

So the README is sufficient as the entire tool specification. No formal tool schema, no MCP protocol overhead.

## Composability

With Bash tools:
- Outputs can be piped to files without going through context
- Multiple invocations can be chained in a single Bash command
- Output format is trivially changeable (just modify the script)

With MCP: all output routes through the agent's context, creating a bottleneck.

## Extensibility: The Cookies Tool Example

Mario needed HTTP-only cookies during a scraping session. Told Claude to write a new `cookies.js` script and update the README. Done in under a minute. Equivalent modification of an MCP server would require understanding the existing codebase.

## On-Demand Loading

The README is read into context only when the agent needs those tools — not at every session start. This is similar to Anthropic's skills system but more ad-hoc and agent-agnostic.

## Setup Pattern

```bash
# ~/agent-tools/browser-tools/ contains the scripts
alias cl="PATH=$PATH:/Users/badlogic/agent-tools/browser-tools && claude --dangerously-skip-permissions"
```

- Scripts prefixed with full tool name (e.g. `browser-tools-start.js`) to prevent collisions
- Directory added to Claude Code via `/add-dir` → enables `@README.md` references
- README contains one line noting scripts are globally available (saves working-dir context changes)

## Caveats

- You must design and maintain your own tool structure
- Less portable than MCP (no standardized protocol)
- Best for personal/team tools; MCP still wins for maintained community integrations

## Related

- [[armin-ronacher-pi-minimal-agent]] — Armin's post on the same philosophy (skills vs MCP)
- [[mario-zechner-slowing-the-fuck-down]] — related essay on agentic discipline
