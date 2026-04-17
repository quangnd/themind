---
title: Evaluation-First Prompting
aliases: [evaluation packs, success criteria prompting, agent evaluation]
tags: [AI, agents, prompting, evaluation, workflow]
created: 2026-04-12
updated: 2026-04-12
sources:
  - "[[lucas-meijer-love-letter-to-pi]]"
type: concept
---

# Evaluation-First Prompting

A prompting discipline — and the mental shift [[Lucas Meijer]] calls the biggest single improvement in his agentic workflow — that requires you to define how you will evaluate the agent's output *before* you send the task.

> *"Ask yourself this question before you send the agent on its task — because when you ask yourself the question before, you can actually put it in the prompt."*

---

## The Core Practice

Before writing the prompt, answer: **how will I know this is done and done correctly?**

- Will you read the source code?
- Run the tests?
- Open the website or play the game?
- Watch a screen recording?
- Review a diff?

Once you have the answer, **put it in the prompt**. Agents benefit from explicit success criteria in two ways:

1. **Clarity on "done"** — the agent knows when to stop, not just when to execute
2. **Directed execution** — knowing how the work will be judged shapes how the agent approaches the task

> *"This is actually also a great tip for humans. They also like to know how you're going to evaluate them and when they are done and when they're not done. Almost everything that turns out with these agents — it's almost all true for humans too."*

---

## Evaluation Packs

When the agent completes long-running work, human evaluation is the bottleneck. An hour of agent work can take 15+ minutes to evaluate. The solution: **have the agent prepare the evaluation package**.

An evaluation pack is a structured output — requested upfront in the prompt — designed to make human review fast and confident:

| Component | What it does |
|-----------|-------------|
| **Screen recording** | The agent opens the product in a real browser, demonstrates all features by moving and clicking; catches JS errors, broken flows, missing features |
| **Screenshots** | Key states captured as images; agent reads them using multimodal vision to catch visual errors it wouldn't catch from code alone |
| **HTML report** | Summary of what was done, test results, known limitations, and all media collected — presented as a slide deck |

**Example prompt structure:**
```
Build a [feature].

When done, evaluate your own work by:
1. Recording a screen video demonstrating all features
2. Taking screenshots of key states
3. Package everything in a single HTML report with the video and screenshots

Success criteria: [specific outcomes to check]
```

### Two Benefits

**For the agent:**
Forcing a screen recording means the agent must actually run the product. If there's a JavaScript error, it finds it. If a command fails, it loops until fixed. Evaluation packs prevent the agent from "declaring victory" without verifying its own work.

**For the human:**
Review shifts from exploration (open the product, figure out what it does, manually test) to verification (watch 2-minute video, skim HTML report). Faster review → more parallel workstreams completed.

---

## The Human as Bottleneck

[[Lucas Meijer]] runs 10–12 agent workstreams simultaneously — but they're all waiting for *him*, not running autonomously. He is the explicit bottleneck. The evaluation pack discipline is how he increases throughput at the bottleneck without adding more agents.

This reframes the agent swarms vs. tight-leash debate: it's not about how many agents you run in parallel, it's about how fast you can evaluate their output. Optimize the bottleneck.

---

## Connection to [[Making Your Agent Reliable]]

Evaluation-first prompting is the prompting layer of agent reliability. Rather than adding tests and infrastructure after the agent writes code, you build the verification step into the task prompt itself — the agent both writes and verifies.

---

## Related

- [[lucas-meijer-love-letter-to-pi]] — source talk
- [[Making Your Agent Reliable]] — agent reliability from the infrastructure side
- [[Agent-Friendly Codebase]] — complementary practice: improve the repo so fewer evaluation failures occur
- [[Context Engineering]] — evaluation packs reduce context cost by moving verification out of the context window
- [[Agentic Coding — Risks and Discipline]] — the discipline context this practice belongs to
