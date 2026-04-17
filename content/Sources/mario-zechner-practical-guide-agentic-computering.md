---
title: "I can't sleep gud anymore - A Practical Guide to Agentic Computering"
source: "https://www.youtube.com/watch?v=sq6a3WC5_Ns"
author: "[[Mario Zechner]]"
published: 2025-07-02
created: 2026-04-11
tags: [source, AI, agents, claude-code, context-engineering, coding-workflow, youtube]
type: summary
---

# I can't sleep gud anymore — A Practical Guide to Agentic Computering

*By [[Mario Zechner]], YouTube, 2025-07-02*

A practical deep-dive video covering four areas: why Claude Code beats Cursor, what's actually inside Claude Code (via `claude-trace`), how to manage context and compaction, and a sophisticated code-porting workflow using LSP databases + jq. Published shortly after VibeTunnel. This is the technical companion to the [[Vienna School of Agentic Coding]]'s first wave of open-source tools.

---

## Part 1 — Why Claude Code

Claude Code's three-part advantage over Cursor and other non-LLM-provider tools:

1. **Unlimited tokens** — The Max plan ($100–$200/month) gives effectively unlimited usage. This means Anthropic doesn't need to silently reduce context — no hidden summarization or truncation tricks to preserve margins.
2. **Tools that actually loop** — Claude Code's built-in tools let the agent keep running until it reaches a defined success state. You can step away and come back. Cursor agent mode breaks and stops silently.
3. **Visible and hackable context** — `Ctrl+R` shows tool call details; `claude-trace` exposes everything. Other harnesses inject hidden content; Claude Code is more inspectable.

---

## Part 2 — claude-trace: Inspecting Claude Code's Internals

`claude-trace` is a companion tool Mario built that hooks Node.js's `fetch` function inside the Claude Code process, logging every API request and response. Output: raw JSONL files + a reconstructed HTML view with collapsible sections per turn.

**Install / use:**
```bash
npx claude-trace     # or install globally
claude-trace --include-all-requests  # logs quota and Haiku calls too
```

### Hidden Behaviors Discovered

**Quota check on startup:** Every session Claude Code sends a dummy inference request to `claude-haiku`, max tokens = 1. It doesn't matter what Haiku replies — the point is to trigger a quota check. There's no dedicated quota endpoint; they fire a real LLM call.

**"Please wait" words via Haiku:** For each user input into the edit field, Claude Code sends that input to Haiku with the prompt: *"Analyze this magic and come up with a single positive, cheerful, and delightful verb."* This generates the cute activity words shown in the UI (e.g. "Pondering…", "Crafting…"). Originally once-per-token-typed; since patched to once-per-message submission.

**VS Code extension context injection:** The VS Code Claude Code extension injects the list of currently-open files into every turn as a `<system_reminder>`. The reminder itself says this information "may or may not be related to the current task." In Mario's workflow it usually isn't — he has other projects open while Claude works — and this poisons context with irrelevant file content.

> *"This is really annoying. This poisons my context and confuses Claude."*

No way to disable it via the UI: turning off the extension, switching to `IDE: none`, and restarting Claude restores the extension automatically.

**Full system prompt accessible:** The system prompt is not obfuscated. Mario reads it via claude-trace; nothing surprising, presumably well-written by Anthropic. Notably contains a reminder that a to-do list tool is available — and that Claude should not mention this to users.

### Tool Analysis (from tool definitions in system prompt)

| Tool | Observations |
|------|-------------|
| **Task** | Spawns a sub-agent with a fresh context; orchestrating Claude generates a prompt, passes it in, gets back only the result. Only the result lands in the main context. |
| **Bash** | Versatile and heavily used. Claude almost never uses `ls`, `cat`, or other redundant commands. |
| **Read** | Frequently used. Has a 200-line limit and ~30–65k token limit — large files must be chunked. **Bug:** prefixes every content line with extra whitespace, which leaks into `edit` tool inputs and breaks exact-match. |
| **Edit** | Requires exact `oldText` match including whitespace. Fails when whitespace from `Read` slips in. |
| **Multi-edit** | Rarely used in practice. |
| **Web fetch** | Does NOT return raw content. Routes through an LLM that summarizes the page — prompt injection mitigation. If you need raw HTML, you won't get it. |
| **Web search** | Same — returns an LLM summary, not raw results. |

---

## Part 3 — Context Management and Compaction

### The Compaction Problem

When context fills (~10% remaining), Claude Code auto-compacts: the entire conversation is summarized into a new context. The summary is lossy. Detailed design proposals, negotiated formats, and accumulated decisions are compressed to vague abstractions. Mario demonstrates: three binary protocol proposals, carefully developed across the conversation, become a single vague bullet in the compaction summary.

> *"If you miss that point and run into compaction, you're in a world of hurt."*

### Better Strategy: Write a Task Summary File

Instead of relying on `/compact` (one-shot, often inadequate), the preferred approach:

1. **At ~20% remaining:** instruct Claude to write a `task-summary.md` file capturing all important state — proposals, decisions, file locations, next steps. Be specific: *"Please write the binary format proposals verbatim."*
2. **Iterate on it** — there's still room in context; keep correcting until it's accurate. Never trust Claude to get this right first try.
3. **Quit the session** — don't compact, don't let it auto-compact.
4. **Open a new session** — instruct Claude to read `spec.md` (the project spec) and `task-summary.md`.
5. **Continue** — the new session picks up from the summary.

Why better than `/compact` with custom instructions: you can inspect and correct the file before committing, and you can iterate without burning the one-shot chance.

The escape valve: if compaction is already running, press Escape twice to go back and interrupt it.

---

## Part 4 — The Porting Workflow

Mario uses Claude Code professionally to port Spine's reference Java runtime to C++, Dart, Swift, and other languages between versions. 5,000 lines changed across 68 files; previously took 2 weeks by hand. With this workflow: 1 day.

### Tools Built

**LSP CLI** — given a directory and target language, installs the appropriate LSP server (isolated from VS Code LSPs), walks all source files, and outputs a `symbols.json`:
```json
{
  "language": "java",
  "directory": "/path/to/spine-libgdx",
  "symbols": [
    {
      "name": "Animation",
      "type": "class",
      "file": "Animation.java",
      "range": {"start": 1, "end": 340},
      "preview": "public class Animation {",
      "javadoc": "...",
      "children": [/* fields, methods, inner types */]
    }
  ]
}
```
Claude queries this with `jq` — no grepping, no `ls`, no guessing. Generated in seconds. Created for both the reference runtime (Java) and the target runtime (C++).

**VS Clot** — a VS Code extension + MCP server that lets Claude open files and diffs directly in the editor from the terminal. Mario's only productive MCP usage.

### port.md as a Program

The full porting workflow is expressed as a markdown file (`port.md`) which Claude executes step by step. It is literally a program in natural language, with Claude as the computing substrate:

1. **Setup:** read porting plan metadata via `jq` (not the full JSON — just the metadata field to avoid context pollution)
2. **Conventions:** read `target-runtime-conventions.md` if it exists, otherwise generate it using parallel task agents; encodes memory management, RTTI, access modifiers, custom collections for the target language
3. **Porting notes:** read accumulated edge cases from prior sessions (e.g. *"C++ doesn't have `toString` methods"*, *"methods with Matrix3 aren't ported from Java to C++"*)
4. **Loop:**
   - Query porting plan JSON with `jq` for next pending type
   - Open the Java source, the Java diff (git range), and any existing C++ candidate files in VS Code via VS Clot
   - **Stop and ask user** — should we port this type?
   - Read full source and dependent types into context
   - Port incrementally, following conventions
   - Compile the C++ file to verify
   - Open the diff of changed files in VS Code
   - Mark type as `done` in porting plan JSON via `jq`
   - Proceed to next pending type

### Key Principles

- **Context discipline:** only what's needed for the current type enters context. Metadata is fetched with `jq` (not reading entire JSON). The conventions and notes are pre-loaded once.
- **State on disk:** the porting plan JSON is the authoritative state. Progress survives session restarts. The LLM queries it, never holds it in working memory.
- **Human checkpoints:** Claude stops before porting each type and asks for confirmation. For complex types, Mario intervenes or codes by hand.
- **Compiling as success criterion:** Claude compiles after each port. If compilation fails, it debugs and retries.

> *"Your prompts are your programming language. Your JSON and MD files are your state. Your program manipulates the state on disk and queries it — just like a regular program, except super slow compared to a CPU. But it gives you the flexibility to express workflows like this in natural language."*

---

## Part 5 — Closing Thoughts

**On MCP:** Most MCP servers are useless — they dump enormous token payloads into context with little control. Exceptions: VS Code extension (VS Clot) for file opening; Playwright or Puppeteer for front-end iteration. LSP CLI + jq is vastly superior to any code-indexing MCP.

**On sub-agents (Task tool):** Useful for isolated research or code review. Poor context transfer — the orchestrator decides what to pass in, and if it decides wrong, debugging is blind. Avoid for anything where the result must integrate cleanly with existing context.

**On LLM-generated tests:** Claude generates terrible tests. It mocks everything, and when tests fail, it softens asserts rather than fixing the code. Treat LLM-generated tests as first drafts — always review whether they actually test what you intend. Don't skip this or you'll have 100,000 near-useless tests and a broken CI.

**On understanding your code:** Whether generated or not — understand it. This is non-negotiable.

**Recommended follows:** Peter Steinberger, [[Armin Ronacher]] — not "fret boys," share insightful observations about agentic coding, not low-quality hype.

---

## Related

- [[Mario Zechner]] — author
- [[Claude Code Internals]] — wiki synthesis of what claude-trace revealed
- [[Context Engineering]] — the compaction strategy fits here
- [[Agentic Porting Workflow]] — the Spine porting workflow as a reusable pattern
- [[CLI Tools Pattern]] — LSP CLI + jq is the CLI-tools-over-MCP philosophy applied
- [[Vienna School of Agentic Coding]] — Steinberger and Ronacher both mentioned
- [[mario-zechner-what-if-you-dont-need-mcp]] — companion article, same MCP skepticism
- [[mario-zechner-building-pi-coding-agent]] — the follow-on to this work
