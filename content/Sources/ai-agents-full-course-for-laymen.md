---
title: AI Agents — A Full Course for Anyone to Build Their First Agent
source_url: https://x.com
author: "@hooeem"
type: source
date_captured: 2026-04-05
format: long-form article
---

No-one has made a full course so that anyone (yes, you) can create an AI agent from scratch.

If you wanted to, you could read this article and create an agent that is useful for you to utilise today, because creating an agent for agents sake means nothing, it needs to be for a reason.

So what did I do?

I took resources from Anthropic, OpenAI, and other experts on the internet who have given bits of information that is useful here and there, I took them all, put it together with my mate Claude, and created a full course for the layman (me) to understand so that we (me and you) can create an agent today.

This is a long article, at the end of it, you will be able to build your first agent, just so to help you navigate this article the text that is **CAPITALISED AND BOLD** are the subheadings, there's 8 in total, each one will have an image so you can get to each part you want to:

1. How agents work
2. Five workflows
3. Building your agent
4. Utilising tools
5. Giving your agent memory
6. Making your agent work
7. Multiple agents
8. Wrapping it all up

Okay, let's get straight into it here...

## 1: HOW AGENTS WORK

![[Attachments/agents-how-agents-work.jpg]]

It's important to know this stuff, if you don't then you'll have no idea why you'll need one or not... so...

This is the core loop shared by all agents:

**User input → LLM thinks → LLM decides (respond or call a tool) → if tool: execute it, feed result back → repeat**

The LLM is the **"brain"** that reasons. **Tools** are the "hands" that perform actions (calculator, web search, file I/O). **Memory** is the "notepad" that records what has happened so far. Whether you use LangGraph, CrewAI, Anthropic's SDK or OpenAI's Agents SDK, the frameworks wrap this loop with abstractions but do not change its essence.

**Augmented LLMs**

A plain LLM accepts text and emits text. An **augmented LLM** adds three capabilities:

- **Tools:** functions the model can call (calculators, databases, APIs, file operations, etc.). Anthropic and OpenAI expose tools via JSON schemas; Anthropic passes an input_schema while OpenAI wraps functions in a function object with parameters
- **Retrieval:** ability to pull relevant information from external sources (search engines, documents, vector databases).
- **Memory:** ability to retain information across interactions via a message history or other persistent storage.

Workflows vs. true agents

The distinction between **workflows** and **agents** matters when choosing an approach. Workflows are deterministic; your code controls execution and the same input always produces the same path. They are ideal for well-defined tasks with fixed steps and are cheaper (fewer LLM calls). Agents are dynamic; the LLM decides the next step and may call tools repeatedly. They are best for open-ended tasks but cost more. The process for you finding if you need to create an agent or not should start by using a simple workflow and then seeing whether or not you'll graduate that to become an autonomous agent.

## 2: THE FIVE CORE WORKFLOW PATTERNS

![[Attachments/agents-five-workflows.jpg]]

Because believe it or not, most problems can actually be solved without needing full autonomy. These five patterns, documented by Anthropic and widely adopted, cover common cases. Each pattern relies on an augmented LLM.

> **Pattern 1: Prompt chaining**

**What it is:** Break a task into sequential steps. Each LLM call processes the output of the previous one. Add programmatic "gates" between steps to verify quality.

**When to use it:** Tasks that decompose cleanly into fixed subtasks. You trade speed for accuracy by making each LLM call simpler.

**Example use cases:** Generate marketing copy then translate it. Write an outline, verify it covers key topics, then write the full document.

> **Pattern 2: Routing**

**What it is:** Classify incoming input, then route it to a specialised handler. Each handler gets its own optimised prompt.

**When to use it:** Different categories of input need fundamentally different treatment. Customer service triage is the classic example.

> **Pattern 3: Parallelisation**

**What it is:** Run multiple LLM calls simultaneously. **Sectioning** splits a task into independent subtasks processed in parallel. Voting runs the same task multiple times and aggregates results for higher confidence.

**When to use it:** When subtasks are independent (sectioning) or when you need consensus on a critical decision (voting).

> **Pattern 4: Orchestrator-workers**

**What it is:** A central LLM (the orchestrator) dynamically breaks down a task and delegates subtasks to worker LLMs. Unlike parallelisation, the subtasks are not predefined, the orchestrator decides them at runtime.

**When to use it:** Complex tasks where you cannot predict the structure in advance. Code generation across multiple files, research tasks, and report writing.

> **Pattern 5: Evaluator-optimiser**

**What it is:** One LLM generates output, another evaluates it and provides feedback. If evaluation fails, the feedback loops back. This repeats until quality criteria are met.

**When to use it:** When clear evaluation criteria exist and iterative refinement adds measurable value. Translation, code generation, and writing tasks.

## 3: BUILDING YOUR AGENT

![[Attachments/agents-building-your-agent.jpg]]

This is the part of the article you came for... let's dive in:

So how do you turn "I want an agent to do XYZ" into something real?

The easiest way to think about it is this:

1. **Write down the job**
2. **Decide what tools it needs**
3. **Tell the model how to behave**
4. **Test it on 5 real examples**
5. **Only add more complexity if it fails**

You do **not** need to master five frameworks to build your first agent. For me and you the best starting point is:

- **Anthropic** if you want an agent that works like a capable operator with tools, files, shell commands, web actions, and strong coding workflows
- **OpenAI** if you want a clean developer SDK with hosted tools, handoffs, guardrails, and a simple path to production

**The simplest mental model**

When building an agent, answer these four questions first:

**1. What is the outcome?** What should the agent actually produce?

**2. What information does it need?** Does it need web search, files, a database, a spreadsheet, a CRM, or just the user's message?

**3. What actions should it be allowed to take?** Can it only answer? Can it search? Can it edit files? Can it send emails? Can it write code? Can it call your own functions?

**4. What rules must it follow?** Tone, format, constraints, safety rules, what to do when uncertain, and what "good" looks like.

**Agent = Role + Goal + Tools + Rules + Output format**

**Five beginner agent types:**

1. **Research agent** — gather information and summarise it (needs: web search, clear output format)
2. **Content agent** — write, rewrite, summarise, or transform content (needs: strong system prompt, optional file access)
3. **Workflow agent** — follow a repeatable business process (needs: clear categories, rules, sometimes custom tools)
4. **Personal knowledge agent** — answer questions using your documents (needs: file search or RAG)
5. **Operator agent** — take actions in an environment (needs: tools, permissions, safety boundaries)

**Build path:**

Step 1: Write one sentence describing the agent
Step 2: Ask Claude/ChatGPT to turn that into a spec, system prompt, tool list, and 10 test prompts
Step 3: Build the smallest working version
Step 4: Test it on 10 real examples
Step 5: Improve one thing at a time (prompt → output structure → examples → tools → memory → retrieval)

**Biggest mistake:** Trying to build an "all-purpose super agent." Start with one job, one agent, one clear prompt, one or two tools maximum.

## 4: UTILISING TOOLS

![[Attachments/agents-utilising-tools.jpg]]

Most people get this wrong. They think: "More tools = smarter agent." Wrong.

**Better tools = smarter agent. Fewer tools = more reliable agent.**

A tool is just: "Something the AI can't do on its own." Examples: calculate numbers, search the web, read files, send emails, query a database.

**Key rules:**
- If it requires external data or action → use a tool. If not → don't add one.
- One tool = one clear job
- Tool descriptions matter more than the tool itself — tell the agent WHEN to use it
- Run real tests and fix failures one at a time

## 5: GIVE YOUR AGENT MEMORY

![[Attachments/agents-memory.jpg]]

There are TWO types of memory:

**1. Short-term memory (conversation):** What has been said so far. You get this by default — just don't reset messages.

**2. Long-term memory (external knowledge):** Stuff the agent can look up later — your notes, PDFs, documents, databases.

**When do you actually need memory?**
- Does the agent need to remember things across messages? → short-term
- Does it need to use external documents? → long-term (RAG)
- Otherwise → you probably don't need it

Start with no memory. Add only when something breaks.

## 6: MAKING YOUR AGENT WORK IRL

![[Attachments/agents-making-it-work.jpg]]

Use AI to create 15 realistic test cases — messy, vague, real-world style. Include edge cases, confusing inputs, bad inputs.

Don't test: "Please classify this billing request"
Test: "why tf did i get charged again"

When it fails, ask:
- Is the prompt unclear?
- Is the output format vague?
- Is a tool missing?
- Is a rule missing?

Fix clarity before adding complexity.

## 7: MULTIPLE AGENTS

![[Attachments/agents-multiple-agents.jpg]]

**Start with ONE agent. Always.**

Only add more when:
- The task is clearly split
- One agent is struggling
- Roles are very different

The only 3 times you need multiple agents:
1. Different skills (research + writing)
2. Clear pipeline (analyse → write → output)
3. Different permissions (read vs. execute)

**Safest pattern:** Supervisor model — User → Main agent → (calls others if needed)

Do NOT start with swarms or fully autonomous multi-agent systems. They break easily.

## 8: WRAPPING IT ALL UP

The most important insight: **agents are conceptually simple but operationally demanding**. The core loop fits in 50 lines of Python. The real work is in tool design, error handling, evaluation, and knowing when simpler patterns will outperform autonomous agents.

Three actionable takeaways:
1. **Build the from-scratch agent first** — understanding the raw loop makes every framework transparent
2. **Start with the simplest pattern that works** — prompt chains handle most multi-step tasks
3. **Invest in tool design and evaluation early** — well-designed tools outperform switching models

The fundamentals are stable: the agentic loop, the five workflow patterns, the principles of good tool design, and the discipline of starting simple.
