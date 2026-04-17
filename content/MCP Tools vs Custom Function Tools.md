---
title: MCP Tools vs Custom Function Tools
aliases: [MCP, Model Context Protocol, function tools, tool choice]
tags: [concept, AI, agents, MCP, tools]
created: 2026-04-05
updated: 2026-04-09
type: concept
---

# MCP Tools vs Custom Function Tools

MCP (Model Context Protocol) is Anthropic's open standard for connecting external tools, data sources, and services to LLMs. It sits alongside — not replacing — custom function tools. Knowing when to use which saves significant development time.

## What MCP Is

MCP defines a standard interface (client-server protocol) so that any LLM application can connect to any MCP-compatible tool without custom integration code. Think of it like USB — a universal connector so you don't need a different cable for every device.

An MCP server exposes tools (functions the LLM can call), resources (data the LLM can read), and prompts (reusable templates). The LLM client discovers what's available and calls them through the standard protocol.

## The Decision Framework

**Use an MCP tool when:**
- A community or vendor already maintains an MCP server for the service (GitHub, Slack, databases, web search, file systems)
- The tool needs to work across multiple agents or applications — write once, use everywhere
- The integration is complex enough that maintaining it yourself would be burdensome
- You want tool access to update automatically as the underlying service changes

**Build a custom function tool when:**
- The logic is specific to your use case and won't generalize
- You need tight control over inputs, outputs, and error handling
- The tool is a thin wrapper around your own internal data or logic
- You're prototyping and want to move fast without setting up an MCP server

## In the [[Building Your First AI Agent|Beginner Agent]] Context

For first agents: use custom function tools. They're simpler, more debuggable, and you own the code. The [[Agent Tools — Design Principles|one-tool-one-job principle]] applies to both.

Migrate to MCP when:
- You find yourself writing the same integration (e.g., web search, file access) for multiple agents
- A maintained MCP server exists for what you need — why rewrite it?
- Your agent ecosystem grows to the point that consistent tooling across agents matters

## Practical Examples

| Need | Custom tool | MCP server |
|------|------------|-----------|
| Your internal database | ✓ (you own it) | — |
| GitHub repo access | — | ✓ (maintained by community) |
| Calculator | ✓ (10 lines of Python) | — |
| Web search | — | ✓ (Brave, Exa MCP servers exist) |
| Your own API | ✓ | — |
| File system access | Either | ✓ (Anthropic ships one) |

## In Claude Code Specifically

Claude Code uses MCP extensively — it's how the IDE connects to external services, databases, and APIs. When you see `/mcp` or MCP-prefixed tools in Claude Code, these are MCP servers exposing capabilities through the standard protocol.

This is also why Claude Code can interact with tools like Figma, Atlassian, and Microsoft 365 (visible in this session's available tools) without custom integration code — MCP servers handle the connection.

## A Third Option: CLI Tools via Bash

[[Mario Zechner]] (2025) documented a pattern that sidesteps the MCP vs. function-tool question entirely: **Bash/CLI scripts + a README file**. For agents that already have a Bash tool (like Pi or Claude Code), this is often the most efficient choice.

Comparison for browser automation:

| Approach | Tools | Tokens |
|----------|-------|--------|
| Playwright MCP | 21 | ~13,700 |
| Chrome DevTools MCP | 26 | ~18,000 |
| CLI scripts + README | 4 | ~225 |

The README is loaded on-demand (not at session start), output is composable via Bash pipes, and adding a new tool takes minutes. This wins when you need personal/team tools with custom requirements and fast iteration. See [[CLI Tools Pattern]] for the full framework.

## See Also

- [[Agent Tools — Design Principles]]
- [[CLI Tools Pattern]] — Bash/CLI scripts as a lightweight alternative to MCP
- [[Self-Extending Agents]] — the philosophy behind building your own tools
- [[Building Your First AI Agent]]
- [[AI Agents — How They Work]]
