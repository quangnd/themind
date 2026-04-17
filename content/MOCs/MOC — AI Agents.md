---
title: MOC — AI Agents
tags: [moc, AI, agents]
type: moc
created: 2026-04-05
updated: 2026-04-05
---

# AI Agents

A practical map for building, understanding, and scaling AI agents — from the fundamental loop to multi-agent architectures. The guiding philosophy: **start simple, add complexity only when forced, fix one thing at a time.**

## Foundations

- [[AI Agents — How They Work]] — the core agentic loop, augmented LLMs, workflows vs. agents
- [[Five Workflow Patterns for AI Agents]] — prompt chaining, routing, parallelisation, orchestrator-workers, evaluator-optimiser

## Building

- [[Building Your First AI Agent]] — the formula, design process, five beginner agent types, Anthropic vs. OpenAI
- [[Agent Tools — Design Principles]] — fewer better tools, one job per tool, why descriptions matter more than the tool itself
- [[Agent Tools — Practical Starter Kit]] — concrete tools to build, tiered from datetime/calculator up to action tools; what not to build early
- [[Agent Memory]] — short-term vs. long-term, when you actually need RAG, what not to add early

## Operations

- [[Making Your Agent Reliable]] — real-world testing, diagnosing failures, the correct order of improvements
- [[Multi-Agent Systems]] — when to actually use multiple agents, the supervisor model, what not to start with
- [[Agentic Coding — Risks and Discipline]] — booboo compounding, merchants of complexity, low recall, and the case for slowing down

## Agent Design Philosophy

- [[Self-Extending Agents]] — agents that build their own tools; the minimal core + self-extension model; Pi as reference implementation
- [[Context Engineering]] — controlling what enters the model's context; the primary lever for agent quality; observability as prerequisite
- [[CLI Tools Pattern]] — Bash/CLI scripts + README as a lightweight, token-efficient agent tool interface
- [[Pi (Coding Agent)]] — Mario Zechner's 4-tool minimal agent; extension system, session trees, hot reloading; now at [[Earendil]]
- [[Vienna School of Agentic Coding]] — the loose Vienna-connected collective (Zechner, Ronacher, Steinberger) that converged on minimal agentic design
- [[Earendil]] — the company housing Pi; building agent-powered consumer products

## Related Concepts

- [[MCP Tools vs Custom Function Tools]] — when to use MCP vs custom function tools

## Sources

- [[ai-agents-full-course-for-laymen]] — full practical guide compiled from Anthropic, OpenAI, and expert sources
- [[mario-zechner-slowing-the-fuck-down]] — critical essay on agentic coding in production (2026)
- [[armin-ronacher-pi-minimal-agent]] — firsthand account of Pi's design and the self-extension philosophy (2026)

## Answered Questions

**How do MCP tools fit? When do they replace custom function tools?**
See [[MCP Tools vs Custom Function Tools]]. Short answer: use custom function tools for one-off, use-case-specific logic; use MCP when a community server already exists or when you need the same tool across multiple agents. For first agents, always start with custom tools.

**At what point does a vector DB outperform simple file search?**
File search (keyword/BM25) is sufficient when: corpus is small (<100 docs), keyword matching finds the right content, documents are stable. Vector DB wins when: corpus is large, you need semantic similarity (conceptually related content without keyword match), or documents update frequently. For personal knowledge agents, file search handles the vast majority of cases. Add vectors only when search quality is measurably failing.

**How do you evaluate agent quality systematically?**
Four approaches, in order of complexity: (1) **Golden dataset** — 20–50 curated input/output pairs; run after every prompt change; (2) **LLM-as-judge** — a second LLM evaluates outputs against a rubric; cheaper than human review; (3) **Regression testing** — track pass rate on golden dataset across versions; alert when it drops; (4) **Eval frameworks** — tools like Braintrust or PromptFoo automate this pipeline. Start with a golden dataset. Everything else is built on top of it.

## Open Questions

- What's the practical difference between Anthropic's Claude Agent SDK and OpenAI's Agents SDK in production? → *Needs hands-on comparison or a dedicated source ingested*
