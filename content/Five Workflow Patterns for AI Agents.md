---
title: Five Workflow Patterns for AI Agents
aliases: [workflow patterns, prompt chaining, routing, parallelisation, orchestrator-workers, evaluator-optimiser]
tags: [concept, AI, agents, workflows, patterns]
created: 2026-04-05
updated: 2026-04-05
source: "[[ai-agents-full-course-for-laymen]]"
type: concept
---

# Five Workflow Patterns for AI Agents

![[Attachments/agents-five-workflows.jpg]]

Most problems that seem to require a fully autonomous agent can actually be solved with one of these five deterministic patterns. They are documented by Anthropic and widely adopted. Knowing them is what lets you choose the right tool for the job instead of defaulting to "build an agent."

The key insight: **workflows trade flexibility for reliability**. Your code controls execution, so the same input always produces the same path. They are cheaper, more predictable, and easier to debug than autonomous agents.

---

## Pattern 1: Prompt Chaining

**What it is:** Break a task into sequential steps. Each LLM call processes the output of the previous one. Add programmatic "gates" between steps to verify quality before proceeding.

**When to use it:** Tasks that decompose cleanly into fixed subtasks where you want to trade speed for accuracy by making each call simpler.

**Examples:**
- Generate marketing copy → translate it into multiple languages
- Write an outline → verify it covers key topics → write the full document
- Extract data from a document → validate format → generate report

Think of it as an assembly line: each station does one thing well, and you can inspect the product at each handoff.

---

## Pattern 2: Routing

**What it is:** Classify incoming input first, then route it to a specialised handler with its own optimised prompt.

**When to use it:** When fundamentally different categories of input need fundamentally different treatment.

**Examples:**
- Customer service triage: billing → billing specialist, technical → support engineer, sales → sales rep
- Content moderation: flag for human review vs. auto-approve vs. auto-reject
- Research assistant: factual query → knowledge retrieval, creative request → generation, code question → coding specialist

The power of routing is that each handler can be deeply optimised for its narrow task, rather than one general prompt trying to handle everything.

---

## Pattern 3: Parallelisation

**What it is:** Run multiple LLM calls simultaneously. Comes in two forms:

- **Sectioning:** Split a task into independent subtasks and run them in parallel. Combine results at the end.
- **Voting:** Run the same task multiple times with the same or slightly varied prompts. Aggregate results for higher confidence.

**When to use it:**
- Sectioning: when subtasks are genuinely independent (analysing different sections of a document)
- Voting: when you need consensus on a critical decision or want to reduce hallucination risk

**Examples:**
- Analyse 10 customer reviews simultaneously → combine into a summary
- Ask the model to classify the same input 5 times → take the majority vote
- Process chapters of a book in parallel → merge summaries

---

## Pattern 4: Orchestrator-Workers

**What it is:** A central LLM (the orchestrator) dynamically breaks down a task at runtime and delegates subtasks to worker LLMs. The orchestrator synthesises the results.

**When to use it:** Complex tasks where you cannot predict the full structure in advance — the orchestrator figures it out dynamically.

**How it differs from parallelisation:** In parallelisation, you pre-define the subtasks. Here, the orchestrator *decides* what the subtasks are, at runtime.

**Examples:**
- Code generation across multiple files (orchestrator plans the architecture, workers implement each module)
- Research tasks (orchestrator identifies what to investigate, workers search each thread)
- Long-form report writing (orchestrator creates the structure, workers draft each section)

This is the most powerful pattern and also the most complex. Use it when routing or prompt chaining can't handle the task.

---

## Pattern 5: Evaluator-Optimiser

**What it is:** One LLM generates output, a second LLM evaluates it and provides structured feedback. If the evaluation fails, the feedback loops back to the generator. This continues until quality criteria are met.

**When to use it:** When you have clear, articulable quality criteria and iterative refinement adds measurable value.

**Examples:**
- Translation: generate → evaluate accuracy and naturalness → refine if needed
- Code generation: write code → run tests and evaluate → fix bugs if tests fail
- Writing tasks: draft → evaluate against rubric → rewrite weak sections

The evaluator can be a different model, the same model with a different prompt, or even a deterministic checker (like a test suite). The key is that feedback is *specific* enough to drive improvement.

---

## Choosing a Pattern

| Task type | Start with |
|-----------|-----------|
| Fixed sequential steps | Prompt chaining |
| Multiple input types needing different handling | Routing |
| Independent subtasks, speed matters | Parallelisation (sectioning) |
| Need high confidence on a critical decision | Parallelisation (voting) |
| Complex, unpredictable structure | Orchestrator-workers |
| Clear quality criteria, refinement adds value | Evaluator-optimiser |
| None of the above | True autonomous agent |

Only graduate to a full autonomous [[Building Your First AI Agent|agent]] when none of these patterns fit.

## See Also

- [[AI Agents — How They Work]]
- [[Building Your First AI Agent]]
- [[Agent Tools — Design Principles]]
