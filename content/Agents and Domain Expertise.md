---
title: Agents and Domain Expertise
aliases: [domain experts and agents, agents for non-programmers, agent force multiplier]
tags: [AI, agents, expertise, education, workflow]
created: 2026-04-09
updated: 2026-04-09
source: "[[mario-zechner-year-in-review-2025]]"
type: concept
---

# Agents and Domain Expertise

Coding agents are not democratizing tools in the sense that anyone can pick them up and do technical work. They are **force multipliers for domain expertise** — they make domain experts dramatically more productive, but they don't replace the domain knowledge required to verify that the work is correct.

> [!note] Source
> Primary insight from [[Mario Zechner]]'s "Teaching My Linguist Wife Claude Code" section in [[mario-zechner-year-in-review-2025]] (2025-12-22).

---

## The Steffi Experiment

Mario's partner Steffi is a linguist. Not a programmer — minor HTML, JavaScript, and Python experience. She was doing linguistic data analysis by hand in Excel across 18,000+ rows of annotation data from 32 speakers.

Mario introduced her to Claude Code over two evenings. The agent wrote Python scripts for every stage of her pipeline:

1. Convert Excel files to CSV
2. Split annotation columns into separate fields
3. Filter irrelevant forms
4. Count linguistic phenomenon values per speaker and setting
5. Run summary statistics and clustering
6. Generate charts

When 10 data points had errors, she fixed them in the source database, re-exported, and re-ran the pipeline. Everything regenerated automatically. Reproducibility for free.

**What made this work:** Steffi couldn't judge the Python code. But she could judge the *output of each stage* — whether the CSV looked right, whether the counts made sense for her data, whether the charts told the story she expected. Her domain expertise was the verification mechanism at every step.

---

## The Core Insight

Two repeating observations from this experiment:

1. **Agents are most effective in the hands of domain experts.** The agent provides the code; the expert provides the judgment. The more a person knows their domain, the more precisely they can specify what they want and the more reliably they can detect errors.

2. **Domain experts often don't know yet what agents can do for them.** Steffi didn't know to ask for help. Once she understood what was possible, she developed intuition about what was hard and what was easy quite quickly.

The barrier isn't technical access. It's conceptual: knowing that verifiable, automatable tasks exist in your workflow and that an agent can handle them while you remain the quality gate.

---

## The Pipeline Pattern

The key structural insight Mario gave Steffi: design your work as **a pipeline of small scripts**, where:
- Each script takes files as inputs and produces files as outputs
- You can inspect and verify the output at each stage
- Stages feed into each other
- The whole pipeline is reproducible by re-running the scripts

This structure makes agent-generated code safe for non-programmers to rely on: the outputs are checkable at each step without reading the code. The expert's verification lives at the data level, not the code level.

This is a general principle applicable to any domain with structured data: financial analysis, scientific research, journalism, legal document review, medical data processing.

---

## The Scalability Problem

Mario tried to teach Steffi, and it worked — but it required two evenings of personal tutoring. Scaling this to a broader audience of non-technical domain experts is genuinely hard:

- Every domain expert comes with different baseline technical knowledge
- Questions will differ, requiring personal answers
- Existing AI hype focuses on chat interfaces, not pipeline workflows
- There's no good curriculum that generalizes across domains

The bottleneck isn't the agent's capability. It's the education and trust-building required to help a domain expert understand *what kinds of tasks* are safe to delegate to an agent and *how to verify* that the outputs are correct.

This is partly why AI productivity gains appear concentrated among technical users \u2014 they already have the mental model for what verification looks like at each step.

---

## Relation to Human Oversight

This pattern reinforces the core argument in [[Agentic Coding — Risks and Discipline]]: agents work well when a human can evaluate the output. The domain expert is the evaluator. Remove the domain expert (or give the agent to someone who can't evaluate the outputs), and the quality gate disappears.

[[The 5 Human Capabilities]] frames this differently: the agent handles computation and transformation; the domain expert supplies selection (knowing which outputs are correct and which to reject) and attention (maintaining quality coherence over the full task).

---

## Related

- [[Agentic Coding — Risks and Discipline]] — staying in the loop as the primary quality mechanism
- [[Making Your Agent Reliable]] — testing and verification frameworks
- [[The 5 Human Capabilities]] — why humans remain the necessary quality gate
- [[Context Engineering]] — giving agents the right context to produce verifiable outputs
- [[Agency]] — the domain expert as the agent of judgment, not the LLM
