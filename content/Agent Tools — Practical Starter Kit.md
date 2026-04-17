---
title: Agent Tools — Practical Starter Kit
aliases: [starter tools, personal agent tools, what tools to build]
tags: [concept, AI, agents, tools, practical]
created: 2026-04-10
updated: 2026-04-10
source: "[[ai-agents-full-course-for-laymen]]"
type: concept
---

# Agent Tools — Practical Starter Kit

Most people building their first agent stall at the same question: *what tools do I actually give it?*

The design principles are clear (see [[Agent Tools — Design Principles]]): one job per tool, precise descriptions, fewer is better. But that doesn't tell you which tools to start with. This page does.

> **The rule for starting:** build the tools you *know* you'll need from the task description. Don't speculate. Every tool you don't add is a failure mode you don't have to debug.

---

## The Minimum Viable Tool Set

Before thinking about your use case, most personal agents benefit from these four baseline tools. They're small, safe, and fill gaps the LLM literally cannot fill on its own.

### 1. Current Date/Time

```python
def get_current_datetime() -> str:
    """Returns the current date and time."""
    from datetime import datetime
    return datetime.now().isoformat()
```

**Why it matters:** LLMs have a knowledge cutoff. Any agent that reasons about recency, schedules, or "what's new" needs access to now. This is the smallest possible tool and one of the most commonly overlooked.

**Description to give the agent:**
> "Use this tool whenever you need to know the current date or time. Never guess or assume today's date."

---

### 2. Calculator

```python
def calculate(expression: str) -> str:
    """Evaluates a mathematical expression and returns the result."""
    return str(eval(expression))  # scope to safe operations in production
```

**Why it matters:** LLMs hallucinate arithmetic, especially percentages, compound growth, and multi-step calculations. A calculator tool makes your agent reliable for any quantitative task.

**Description to give the agent:**
> "Use this tool for all arithmetic, percentages, compound interest, and numeric calculations. Never perform mental math. Always call this tool."

---

### 3. Web Search

```python
def search_web(query: str) -> list[dict]:
    """Searches the web and returns top results with titles, URLs, and snippets."""
    ...
```

**Why it matters:** The single most common reason to add a tool. If your agent needs to know anything that happened after its training cutoff — prices, news, documentation, recent releases — this unlocks it.

**Description to give the agent:**
> "Use this to find current information from the web. Use it when you need real-time data, news, recent documentation, or anything that might have changed since your training."

> [!tip] Use an existing provider
> Don't build this from scratch. Tavily, Brave Search API, and SerpAPI all offer clean APIs with free tiers. Pick one and wrap it in a single function.

---

### 4. Fetch URL Content

```python
def fetch_url(url: str) -> str:
    """Fetches and returns the readable text content of a URL."""
    ...
```

**Why it matters:** Search gives you links. Fetch lets you read them. Together, these two tools give your agent a basic research loop: search → find relevant page → read it → reason about it.

**Description to give the agent:**
> "Use this to read the content of a specific webpage. Use it after a web search when you need the full content of a result, not just the snippet."

---

## Knowledge Tools (Reading and Writing)

Once your agent needs to work with *your* files, documents, or notes, add these.

### 5. Read File

```python
def read_file(path: str) -> str:
    """Returns the full text content of a file at the given path."""
    with open(path, "r") as f:
        return f.read()
```

**When to add it:** The moment your agent needs to reference documents you own — notes, reports, code files, transcripts.

**What not to do:** Don't make this a "manage files" function that also writes, renames, and deletes. That's three tools in one. Keep it read-only.

---

### 6. Write File

```python
def write_file(path: str, content: str) -> str:
    """Writes content to a file. Creates the file if it doesn't exist."""
    with open(path, "w") as f:
        f.write(content)
    return f"Written to {path}"
```

**When to add it:** When your agent needs to produce persistent outputs — summaries, reports, updated notes.

**Caution:** This is a *state-changing* tool. Add it only when your use case requires writing. Read-only agents are easier to trust and debug.

---

### 7. Search Files / Knowledge Base

```python
def search_notes(query: str) -> list[dict]:
    """Searches your local notes/documents and returns matching excerpts."""
    ...
```

**When to add it:** When your agent has more files than it can read in one context window. Keyword search handles most personal knowledge bases. You don't need a vector database until keyword search is measurably failing.

**Description to give the agent:**
> "Use this to find relevant notes or documents from the knowledge base. Use it before read_file to identify which files to read."

---

## Action Tools (for Agents That Do Things)

These tools have side effects. Add them when the agent's job is to take real-world actions, not just reason.

### 8. Send Email (Draft or Send)

```python
def draft_email(to: str, subject: str, body: str) -> str:
    """Creates an email draft for review. Does not send automatically."""
    ...
```

**Prefer draft-first:** An email draft tool returns a preview for human approval before sending. This is the appropriate default for any agent that communicates externally. Reserve auto-send for agents with very narrow, well-tested tasks.

---

### 9. Run Shell Command / Script

```python
def run_script(script: str) -> str:
    """Executes a shell command and returns stdout."""
    ...
```

**When to add it:** For agents that automate system tasks — file processing, running build commands, querying local databases.

**Caution:** This is the most powerful and most dangerous tool on this list. Scope it tightly: prefer pre-defined scripts over open-ended shell execution. See [[CLI Tools Pattern]] for a safer approach using README-specified commands.

---

## What NOT to Build First

| Tempting tool | Why to skip it early |
|--------------|---------------------|
| `manage_files(action, path, dest, ...)` | Too broad; agent won't know when to use it |
| `full_web_scraper(url, selectors, ...)` | Over-engineered; `fetch_url` handles 90% of cases |
| `database_query(sql)` | Requires tight sandboxing; adds debugging surface |
| Vector search / RAG | Overhead not justified until keyword search clearly fails |
| Multi-step "orchestrate" tool | Agents should orchestrate; tools should do one thing |

---

## Progression Model

Build in this order, stopping when you have what you need:

```
Tier 0 (always): current_datetime, calculator
Tier 1 (research): search_web + fetch_url
Tier 2 (knowledge): read_file + search_notes
Tier 3 (output): write_file
Tier 4 (action): draft_email, run_script
```

Most personal agents never need Tier 4. Most beginner agents only need Tier 1.

> [!tip] The stopping rule
> When you can describe every step of your agent's task without mentioning a tool, you don't need a new tool — you need a better prompt.

---

## See Also

- [[Agent Tools — Design Principles]] — the underlying principles behind these choices
- [[Building Your First AI Agent]] — how to put tools together into a working agent
- [[MCP Tools vs Custom Function Tools]] — when to use an existing MCP server instead of rolling your own
- [[CLI Tools Pattern]] — shell scripts as a lightweight, token-efficient alternative to function tools
- [[Making Your Agent Reliable]] — what to do when tools don't behave as expected
