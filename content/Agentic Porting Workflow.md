---
title: Agentic Porting Workflow
aliases: [LSP porting workflow, port.md pattern, LLM as porting substrate]
tags: [AI, agents, coding-workflow, context-engineering, porting, design-philosophy]
created: 2026-04-11
updated: 2026-04-11
source: "[[mario-zechner-practical-guide-agentic-computering]]"
type: concept
---

# Agentic Porting Workflow

A structured, repeatable workflow for using an LLM to port code between languages or between versions — developed by [[Mario Zechner]] for porting Spine's reference Java runtime to C++, Dart, Swift, and others. The result: 5,000 changed lines across 68 files ported in **one day** instead of two weeks.

The central insight:

> *"Your prompts are your programming language. Your JSON and MD files are your state. Your program manipulates the state on disk and queries it — just like a regular program, except super slow compared to a CPU."*

Claude Code is not a tool here — it's a **computing substrate** executing a program written in natural language.

---

## The Problem Being Solved

Spine (a commercial 2D skeletal animation tool) has a reference implementation in Java (`spine-libgdx`). Between releases, hundreds to thousands of lines change. Those changes must be manually ported to C++, Dart, Swift, and other runtimes.

Prior method: open the Java source, the git diff, and the target C++ file side by side; port line by line by hand. Tedious, error-prone, slow.

---

## Prerequisites: Tools Built

### LSP CLI
A command-line tool that takes a directory and target language, installs an isolated LSP server (separate from the developer's VS Code LSPs), and walks all source files to produce a `symbols.json` database:

```json
{
  "language": "java",
  "directory": "/path/to/spine-libgdx",
  "symbols": [
    {
      "name": "Animation",
      "type": "class",
      "file": "Animation.java",
      "range": { "start": 1, "end": 340 },
      "preview": "public class Animation {",
      "javadoc": "...",
      "children": [ /* fields, methods, inner types */ ]
    }
  ]
}
```

Generated in seconds. Generated for **both** the reference runtime (Java) and the target runtime (C++). Claude queries it with `jq` — no grepping, no directory traversal, no guessing.

> This is the [[CLI Tools Pattern]] applied to code intelligence: a queryable flat-file database instead of an MCP code-indexing server. Massively more token-efficient.

### VS Clot
A VS Code extension + MCP server that lets Claude open files and diffs directly in the editor from the terminal. The one MCP server Mario actually uses.

### Porting Plan Generator
A script that takes the two git commits (from/to in the reference runtime) and the target language, then generates a `porting-plan.json`:

```json
{
  "metadata": {
    "from_commit": "v4.2",
    "to_commit": "v4.3-beta",
    "reference_runtime": "/path/to/spine-libgdx",
    "target_runtime": "/path/to/spine-cpp"
  },
  "items": [
    {
      "file": "Animation.java",
      "types": [
        {
          "name": "Animation",
          "status": "pending",
          "candidate_files": ["Animation.h", "Animation.cpp"]
        }
      ]
    }
  ]
}
```

The `candidate_files` are auto-discovered from the target runtime's LSP JSON.

---

## The Program (port.md)

`port.md` is a markdown file that describes the full porting workflow. Claude reads it and executes it step by step — a **program in natural language**:

### Step 1 — Setup
```
Read the metadata field from porting-plan.json using jq.
(Not the full file — only the metadata object.)
```
Only the metadata enters the context. The full porting plan is never read wholesale.

### Step 2 — Conventions File
```
Read target-runtime-conventions.md if it exists.
If not: generate it using parallel task agents.
  - Analyze memory management patterns in the target runtime
  - Identify RTTI and access modifier conventions
  - Note custom collections and utility classes
  Write findings to target-runtime-conventions.md.
```
The conventions file is generated once, human-reviewed, and re-used across all sessions. It encodes what an experienced developer "just knows" about the target codebase.

### Step 3 — Porting Notes
```
Read porting-notes.md — accumulated edge cases from prior sessions.
Example notes:
  - "C++ does not have toString methods"
  - "Methods with Matrix3 are not ported from Java to C++"
  - "Use SpineVector instead of std::vector"
```
Notes grow with each session. Claude updates them when it encounters new edge cases.

### Step 4 — The Loop
```
Repeat:
  1. Query porting-plan.json for next pending type (jq).
  2. Open in VS Code (via VS Clot):
     - Java source file
     - Git diff of Java file (from/to commits)
     - C++ candidate files (if they exist)
  3. STOP. Ask the user: "Port Animation? [y/n]"
  4. On yes:
     a. Read the full Java source for this type (or use range from LSP JSON)
     b. Read all existing C++ candidate files (chunked if large)
     c. Read dependent/parent types from LSP JSON + target runtime
     d. Port incrementally, following conventions file and porting notes
     e. Compile the modified C++ file to verify
     f. Open the diff of changed C++ files in VS Code
     g. Mark type as "done" in porting-plan.json via jq
  5. Proceed to next pending type.
```

---

## Why This Works

### Context Discipline
Only the information needed for the *current type* is in context at any time. The porting plan JSON stays on disk, queried with `jq` per-item. The conventions file is loaded once at session start. The LLM never holds the entire codebase in working memory.

### State on Disk
The porting plan is the authoritative progress tracker. Porting status, candidate files, session restarts — all handled by the JSON file. The LLM never needs to remember what it's done; it queries the file.

### Human Checkpoints
Claude stops before each type and asks for confirmation. For simple, cosmetic changes (documentation updates, visibility modifiers), it's quick to approve and move on. For complex types with heavy math or architectural changes, the human intervenes directly.

### Compilation as Success Criterion
The loop doesn't continue until the modified C++ file compiles. This is the tight feedback loop that prevents errors from compounding. Claude debugs and retries within the same context if compilation fails.

### Porting Notes as Memory
Edge cases discovered in one session are written to `porting-notes.md` and available in all future sessions. The LLM doesn't have to rediscover that C++ lacks `toString` methods every time.

---

## The Result

Before: 2 weeks to port a version's worth of changes.
After: 1 day.

Mario's note: the human is still in the loop for review at each step. If Claude ports something incorrectly, he corrects it or codes it by hand — sometimes the developer is faster. The workflow doesn't replace judgment; it replaces mechanical transcription.

---

## Generalizing the Pattern

This workflow generalizes beyond language porting to any **systematic, multi-file transformation** task:

1. **Generate a task database** (JSON) mapping what needs to change and where
2. **Write a conventions file** encoding the target state
3. **Write a workflow file** (md) as the program Claude executes
4. **Use jq** (or any CLI query tool) to navigate state without polluting context
5. **Checkpoint with compilation, tests, or human review** at each iteration

See [[Context Engineering]] for the broader principle, and [[CLI Tools Pattern]] for the LSP + jq technique specifically.

---

## Related

- [[mario-zechner-practical-guide-agentic-computering]] — source video
- [[Context Engineering]] — the discipline this workflow embodies
- [[CLI Tools Pattern]] — LSP CLI + jq as an alternative to code-indexing MCPs
- [[Five Workflow Patterns for AI Agents]] — this fits the "pipeline" and "human-in-loop" patterns
- [[Agentic Coding — Risks and Discipline]] — Mario's later essay on what can go wrong at scale
- [[Pi (Coding Agent)]] — the agent harness Mario later built to formalize these principles
- [[Mario Zechner]] — author
