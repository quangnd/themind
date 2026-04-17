---
title: AI Agents — How They Work
aliases: [agentic loop, augmented LLM, agent fundamentals]
tags: [concept, AI, agents, LLM]
created: 2026-04-05
updated: 2026-04-05
source: "[[ai-agents-full-course-for-laymen]]"
type: concept
---

# AI Agents — How They Work

![[Attachments/agents-how-agents-work.jpg]]

An AI agent is not magic — it's a surprisingly simple loop. Understanding this loop is what separates someone who uses agents from someone who can build and debug them.

## The Core Loop

Every agent, regardless of framework (LangGraph, CrewAI, Anthropic SDK, OpenAI Agents SDK), runs the same fundamental cycle:

> **User input → LLM thinks → LLM decides (respond or call a tool) → if tool: execute it, feed result back → repeat**

Three components make up this loop:

- **The LLM (brain):** Reasons about the situation and decides what to do next
- **Tools (hands):** Functions the model can call to take real-world actions — calculators, web search, file I/O, APIs
- **Memory (notepad):** Records what has happened so far so the LLM can reason over it

All frameworks are just abstractions around this loop. They don't change its essence.

## Plain LLMs vs Augmented LLMs

A plain LLM accepts text and emits text — nothing more. An **augmented LLM** gains three additional capabilities that make agents possible:

| Capability | What it does | Examples |
|-----------|-------------|---------|
| **Tools** | Functions the model can call | Calculator, database queries, file operations, APIs |
| **Retrieval** | Pull relevant info from external sources | Search engines, documents, vector databases |
| **Memory** | Retain information across interactions | Message history, external storage |

Both Anthropic and OpenAI expose tools via JSON schemas. The implementation differs slightly — Anthropic uses `input_schema`, OpenAI wraps functions in a `function` object with `parameters` — but the concept is identical.

## Workflows vs. Agents

One of the most useful distinctions to make before building anything:

| | Workflows | Agents |
|--|----------|--------|
| **Control** | Your code controls execution | LLM decides the next step |
| **Predictability** | Same input always produces same path | Dynamic, may call tools repeatedly |
| **Best for** | Well-defined tasks with fixed steps | Open-ended tasks requiring judgment |
| **Cost** | Cheaper (fewer LLM calls) | More expensive |

> Start by using a simple workflow. Graduate to an autonomous agent only when the workflow can't handle the task.

Most problems that *feel* like they need full agent autonomy can actually be solved with one of the [[Five Workflow Patterns for AI Agents|five workflow patterns]]. This distinction matters because autonomous agents are significantly harder to debug and keep reliable.

## See Also

- [[Five Workflow Patterns for AI Agents]]
- [[Building Your First AI Agent]]
- [[Agent Tools — Design Principles]]
- [[Agent Memory]]
