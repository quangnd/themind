---
title: "A love letter to Pi"
source: "https://www.youtube.com/watch?v=fdbXNWkpPMY"
author: "[[Lucas Meijer]]"
published: 2026-03-19
created: 2026-04-12
tags: [source, AI, agents, coding-agent, pi, evaluation, context-engineering, youtube]
type: summary
---

# A love letter to Pi

*By [[Lucas Meijer]], YouTube, ~2026-03-19*

A conference talk by Lucas Meijer (Unity co-founder, now building a new AI-oriented game engine) about what actually works for him with coding agents. The talk covers HTML as output, making codebases agent-friendly, evaluation-first prompting, evaluation packs, Pi's context management, and the concept of "Barba Papa software" — self-extending agents that morph to fit the user.

---

## Speaker Background

Lucas Meijer co-created Unity (the game engine). He now runs a bi-monthly coping session for brownfield programmers adapting to AI agents, and is building a new game engine designed for humans + agents working together.

Tool preference: **Codex** for writing software (*"like Claude Code but for programming"*), and **Pi** for its hackability and precise context control.

---

## 1 — HTML as Output Format

The 80s terminal aesthetic of coding agents is unnecessary. Lucas ends many prompts with:

> *"Present your work as a single HTML slide deck."*

The result: a structured, navigable HTML file with a sidebar index instead of a wall of terminal text. Much easier to consume large amounts of information, skim sections, and share results. Pair with the HTML output format: use the `/share` command in Pi to export full session histories as HTML.

---

## 2 — Making Your Codebase Agent-Friendly (The Marble Madness Metaphor)

**Metaphor:** the agent is the marble, your repo is the level. Your job is to make the marble roll down smoothly — remove the hazards.

Hazards that derail agents:
- Incomplete or incorrect `AGENTS.md` instructions
- Build systems that have been spewing 500 warnings for years ("just ignore those")
- Stale documentation (e.g. the build command changed, but docs still say the old one)

**The improvement loop:**

1. Read the full session transcript — all tool calls, every decision
2. Ask: *"Why did the agent go there? Why did it do that?"*
3. Make changes to the repo accordingly

When this feels tedious, automate it:
```
Analyze the previous session. Find places where the agent went in the wrong 
direction only to later find the right way. Recommend what I could have added 
to the repo that would have prevented that mistake. Present as HTML.
```

This creates a **continuous improvement loop**: agent runs → session review → repo improvement → next agent run is smoother. The goal is the most beautiful Marble Madness level.

Warning: it's easy to accumulate a mess of AI-generated MD files. Keep your documentation lean and accurate, not comprehensive and stale.

---

## 3 — Evaluation-First Prompting

> *"The biggest mental shift that made the biggest difference for me."*

**The question:** before sending the agent on a task, ask yourself: *"How will I evaluate this work when it's done?"*
- Will you read the transcript?
- Read the source code?
- Play the game / open the website?
- Run the tests?

**Why it matters:** once you know how you'll evaluate, you can put it in the prompt. Agents benefit from knowing success criteria ahead of time — it gives them clarity on when they are done and when they are not.

> *"This is actually also a great tip for humans."*

Almost everything that works for agents also works for humans: clear success criteria, defined evaluation method, explicit scope.

---

## 4 — Evaluation Packs

The human is the bottleneck in any multi-agent workflow. If the agent does an hour of work, evaluation can take 15+ minutes. The solution: **make the agent prepare the evaluation package**.

Lucas calls these "evaluation packs" — structured outputs the agent produces to make human review efficient:

**Example:** one-shot web app (photo timeline with drag-and-drop animation):
- Ask the agent to **record a screen video** demonstrating all features by moving the mouse and interacting with the UI
- Ask for **screenshots** at key states (agent reads the image files using multimodal capabilities to catch visual errors)
- Package it all in an **HTML slide deck** with video + screenshots

Benefits:
1. **Human efficiency** — review takes minutes, not manual exploration
2. **Prevents agent cheating** — if forced to record a video, the agent must actually open Chrome, run the JS, and interact with the real product. If there's a JS error, it finds it. If a command fails, it catches it.
3. **Agent self-improvement** — when the agent knows it must produce a demo video, it loops on failures until the thing actually works

The evaluation pack is part of the prompt, not an afterthought.

---

## 5 — Context Management with Pi

### /tree — Context as a Non-Linear Tree

Pi's `/tree` command shows your entire session as a **branching tree**, not a flat transcript. This is the most important feature for Lucas.

Use cases:
- See at a glance how the session branched
- Navigate back to any prior branch point
- **Prune dead-end side quests**: when you go into an experiment that fails or is irrelevant, don't continue carrying it in context — go back

When going back, two options:
- **No summary** — throw the branch away entirely (for truly irrelevant side quests)
- **Summary** — compress the branch into a single summary node (for explorations where the outcome — "we tried X and it failed because Y" — is useful to keep)

### The 50% Rule

> *"Once you get into the 50–60% context range, you enter this dumb zone and it gets more stupid."*

Lucas watches the context % indicator (shown in most modern coding agents). If it goes above 50%, he gets nervous and starts pruning or restarting. Staying below 50% is a hard rule.

### Don't Argue — Go Back

The mistake: treating the agent like a human and arguing with it (*"No, I didn't want it like that. I wanted it like this."*). Every argument costs context tokens AND carries the bad direction forward.

The right move: use `/tree` to go back to before the wrong turn. Rephrase the prompt. Restart from a clean state.

> *"You should never tell it 'no I didn't want it like that, I wanted it like that.' Don't argue with these things."*

### /answer Extension

When asking the agent to interview you about a plan (e.g. "ask me 5 questions before you start"), the vanilla experience is painful — you get 20 questions and type answers one by one.

The `/answer` extension (built by a community contributor, not Pi's core team) solves this: it extracts all questions from the agent's last message using a cheap LLM, presents them in a structured form UI, and on submit turns them into a single clean user message.

Lucas uses this as an example of the right way to extend Pi: **notice a problem you actually have** (not a problem you don't have, like "how do I manage 20 agent swarms"), and build a targeted solution.

---

## 6 — Self-Extending "Barba Papa" Software

**Barba Papa** — a French/Dutch cartoon from the 1970s. Characters go on adventures and shapeshift into whatever form the adventure requires.

Lucas uses this as a metaphor for a new category of software:

> *"Software that instead of [one programmer writes it once and thousands of people use it] — a programmer writes a base for the software, and then when you use it, it morphs itself into whatever shape is good for you and is good for the problem you have right now."*

Pi embodies this: it's a coding agent that has access to its own documentation, so you can tell it to **write extensions for itself**. During the talk, Lucas live-demos asking Pi to write a Doom-in-overlay extension in real time. Pi writes the code, and `/reload` hot-reloads the extension — no restart required.

This is also Lucas's vision for his new game engine: a base that adapts to each user and each problem, not a monolith that tries to cover every use case upfront.

**Why this matters for the current AI moment:** nobody knows yet what ergonomic AI assistance looks like. We're too early. The right response is experimentation — trying things, seeing what sticks — not waiting for a vendor to prescribe one workflow for everyone. Hackable tools enable this; locked-down platforms don't.

---

## Key Takeaways

| Insight | Application |
|---------|-------------|
| HTML over terminal | End prompts with "present as a single HTML slide deck" |
| Marble Madness | Read transcripts, fix AGENTS.md + docs, run the improvement loop |
| Evaluation-first | Define success criteria *before* sending the task; put it in the prompt |
| Evaluation packs | Have agent produce video + screenshots + HTML; prevents cheating, speeds review |
| 50% rule | Watch context %; prune at 50 with `/tree` |
| Don't argue | Use `/tree` to go back; rephrase; never carry bad context forward |
| /answer extension | Structured Q&A for plan interviews |
| Barba Papa software | Pi as self-extending, morphing software; the vision for hackable tools |

---

## Related

- [[Lucas Meijer]] — author/speaker
- [[Pi (Coding Agent)]] — the main subject of the talk
- [[Evaluation-First Prompting]] — wiki synthesis of sections 3 + 4
- [[Agent-Friendly Codebase]] — wiki synthesis of section 2
- [[Context Engineering]] — the 50% rule, /tree branching, don't-argue pattern
- [[Self-Extending Agents]] — Barba Papa software
- [[mario-zechner-practical-guide-agentic-computering]] — complementary deep-dive on context management
