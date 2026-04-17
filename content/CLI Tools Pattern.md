---
title: CLI Tools Pattern
aliases: [Bash tools over MCP, README as tool spec, CLI agent tools]
tags: [AI, agents, tools, MCP, design-philosophy]
created: 2026-04-09
updated: 2026-04-09
source: "[[mario-zechner-what-if-you-dont-need-mcp]]"
type: concept
---

# CLI Tools Pattern

A technique for equipping agents with capabilities using simple CLI scripts + a README file, invoked via Bash — instead of MCP servers or custom function tools. Articulated by [[Mario Zechner]] (2025-11-02) and echoed by [[Armin Ronacher]].

The core bet: **models already know how to use Bash and write code**. This existing knowledge is the protocol. You don't need a new one.

## The Pattern

1. Write a small CLI script for each capability (Node.js, Python, whatever)
2. Document all scripts in a single `README.md` (the "tool spec")
3. Tell the agent to read the README when it needs those tools
4. The agent invokes the scripts via its existing Bash tool

That's it. No tool schemas. No MCP server. No protocol overhead.

## Token Efficiency

This is the most striking advantage. For browser automation specifically:

| Approach | Tools | Tokens |
|----------|-------|--------|
| Playwright MCP | 21 | ~13,700 |
| Chrome DevTools MCP | 26 | ~18,000 |
| **CLI Tools (4 scripts + README)** | 4 | **~225** |

The MCP servers pay this cost in *every session*, loaded into the system prompt at start. The CLI README is loaded only when needed, and only the README — not a formal tool schema for each function.

The reason for the efficiency gap: MCP tools need explicit, machine-readable schemas for every parameter. CLI tools rely on the model's existing knowledge of Bash and the target language. The README is human-readable documentation — which models are already trained to understand.

![[mcp-cli-scrape-tokens.png]]
*Token tally from a Hacker News scraping session using CLI tools*

## Why Composability Matters

With MCP, all tool output routes through the agent's context window:

```
Tool call → agent context → agent decides what to do with it
```

With CLI tools and Bash, the agent can compose operations without the context bottleneck:

```bash
./nav.js https://example.com && ./eval.js 'document.title' > /tmp/title.txt
```

The output can go directly to disk, be piped to another script, or be combined with other results — all in one Bash call, none of it necessarily entering the context.

## On-Demand Loading

A critical difference from MCP: the tool context is **not loaded at session start**. The agent reads the README only when it enters a task that needs those tools. This is similar to Anthropic's [[Self-Extending Agents|skills system]] but more ad-hoc and works with any coding agent.

Practical implication: a session debugging a Python script doesn't pay for browser tool context. A session doing web scraping loads it once, then the model knows how to use the tools.

## Extensibility in Practice

Adding a new tool takes minutes:
1. Write the script
2. Add a section to the README
3. Done — the agent can use it immediately

![[mcp-cli-extension-tool.png]]
*Adding a cookies extraction tool in under a minute*

No need to understand an existing codebase. No PR to a community repo. No version pinning. The tool is exactly what you need and nothing more.

Output format is also trivially changeable — just modify the script's `console.log` calls. With MCP, the output contract is harder to change unilaterally.

## What the Agent Needs to Know

The README is the only interface document. A well-written README section for a tool looks like:

```markdown
## Navigate

\`\`\`bash
./nav.js https://example.com
./nav.js https://example.com --new
\`\`\`

Navigate current tab or open new tab.
```

Three lines. The model fills in everything else from its existing knowledge of URLs, Bash argument conventions, and what "navigate" means in a browser context.

## Setup Pattern (Claude Code)

```bash
# ~/agent-tools/ holds all tool repos
alias cl="PATH=$PATH:~/agent-tools/browser-tools:~/agent-tools/other-tools && claude --dangerously-skip-permissions"
```

- Scripts prefixed with tool category (e.g. `browser-tools-start.js`) to prevent name collisions
- Tool directory added via Claude Code's `/add-dir` → enables `@README.md` references
- One line in each README: "all scripts are globally available" (saves working-directory context)

## When MCP Still Wins

The CLI pattern is not universally better. MCP wins when:
- A maintained community server already exists for a well-known service (GitHub, Slack, databases)
- You need the same integration across multiple agents without per-agent setup
- The underlying service has a complex auth/connection model that's already solved in an MCP server
- You want automatic updates as the service's API changes

CLI tools win when:
- You're building for personal/team use with custom requirements
- You need to add or modify tools quickly mid-session
- Token efficiency and composability matter
- You're working with an agent that has a Bash tool but no MCP support

## Relationship to Self-Extending Agents

This pattern is a manifestation of the [[Self-Extending Agents]] philosophy: rather than downloading someone else's integration, build exactly what you need. The CLI pattern is the minimal version — no extension system required, just Bash.

[[Pi (Coding Agent)]] takes this further with a formal extension system (hot reload, state persistence, TUI components). The CLI pattern works without any of that — it's available to any agent with a Bash tool.

## Related

- [[MCP Tools vs Custom Function Tools]] — the broader decision framework
- [[Self-Extending Agents]] — the philosophy this pattern embodies
- [[Agent Tools — Design Principles]] — design principles for agent tools generally
- [[Pi (Coding Agent)]] — Pi's extension system as a more structured version of this idea
- [[mario-zechner-what-if-you-dont-need-mcp]] — source article with full code examples
