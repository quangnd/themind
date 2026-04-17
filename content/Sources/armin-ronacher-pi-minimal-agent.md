---
title: "Pi: The Minimal Agent Within OpenClaw"
source: "https://lucumr.pocoo.org/2026/1/31/pi/"
author: "[[Armin Ronacher]]"
published: 2026-01-31
created: 2026-04-09
tags: [source, AI, agents, coding-agent]
type: summary
---

# Pi: The Minimal Agent Within OpenClaw

*By [[Armin Ronacher]], lucumr.pocoo.org, 2026-01-31*

A firsthand account of Pi — the minimal coding agent inside [[OpenClaw]] — and why Armin became its primary advocate. The article explains Pi's design philosophy, extension system, and how it embodies the idea of software that builds software.

## What Is Pi

Pi is a coding agent by [[Mario Zechner]]. Its distinguishing properties:

- **Tiny core**: shortest system prompt of any known agent, four tools only: Read, Write, Edit, Bash
- **Extension system**: extensions can register new tools, persist state to sessions, and render TUI components
- **Session trees**: sessions branch and rewind; a side-quest fix doesn't pollute the main session

## What's Not In Pi (And Why)

No MCP support — not lazy omission, but philosophy. Pi's answer to "I want the agent to do X" is not "download an extension" but "ask the agent to write one." Pi celebrates code writing and running code.

External extensions can be downloaded but the spirit is to point the agent at an example and have it build a variant.

## Architecture for Malleability

- The AI SDK stores sessions as trees of messages from multiple model providers, avoiding lock-in to provider-specific features
- Custom messages alongside model messages allow extensions to store state without cluttering the AI's context
- Hot reloading: agent writes extension, reloads, tests, loops until it works
- Ships with documentation and examples so the agent can extend itself
- Session branching: navigate to a side branch, fix a broken tool, summarize the branch, rewind — main session stays clean

## Extensions Armin Uses

- **/answer** — extracts the agent's questions from prose and reformats into a clean input box
- **/todos** — manages `.pi/todos` markdown files; sessions can claim tasks
- **/review** — branches into a fresh review context (modeled after Codex); calls out newly added dependencies
- **/control** — one Pi agent sends prompts to another; simple multi-agent without complex orchestration
- **/files** — lists all files changed or referenced in session; reveal in Finder, diff in VS Code, Quick Look

All of these were built by the agent to Armin's specifications, not written by him directly.

## The Bigger Point

OpenClaw removes the UI entirely and connects Pi to a communication channel. Its viral growth suggests this direction — software that writes and runs code, that builds its own functionality — is the future of agents. The minimal core + self-extension model is what makes that viable.
