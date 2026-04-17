---
title: Claude Code Internals
aliases: [claude-trace, Claude Code hidden behaviors, Claude Code system prompt]
tags: [AI, agents, claude-code, context-engineering, tools]
created: 2026-04-11
updated: 2026-04-11
source: "[[mario-zechner-practical-guide-agentic-computering]]"
type: concept
---

# Claude Code Internals

What's actually happening inside Claude Code — revealed by [[Mario Zechner]]'s `claude-trace` tool, which hooks Node.js's `fetch` function inside the Claude Code process and logs every API call to raw JSONL + reconstructed HTML.

This was documented in the video [[mario-zechner-practical-guide-agentic-computering]] (July 2025), and later motivated the creation of [[Pi (Coding Agent)]] — an agent harness built explicitly to be observable and predictable.

---

## How claude-trace Works

`claude-trace` starts Claude Code with a monkeypatched `fetch` function. All outgoing API requests and incoming responses are logged. Output: raw JSONL files + a per-session HTML view with collapsible turns, tool calls, and raw payloads.

```bash
npx claude-trace
claude-trace --include-all-requests  # includes Haiku quota/word calls
```

---

## Hidden Behaviors

### Startup: Quota Check via Haiku

Every session, before the user submits anything, Claude Code sends a dummy inference request to `claude-haiku` with `max_tokens: 1`. The response content doesn't matter — it's used to check whether the account has quota. There's no dedicated quota endpoint; a full LLM call is made.

### UI Words via Haiku

When the user types in the edit field, Claude Code sends the input to Haiku with:

> *"Analyze this magic and come up with a single positive, cheerful, and delightful verb."*

This generates the "Crafting…", "Pondering…" words shown in the status bar. Originally fired per-keystroke; patched to once-per-message submission after mario published claude-trace.

### VS Code Extension Injection

The Claude Code VS Code extension injects the user's currently-open files into every turn as a `<system_reminder>`. The reminder itself includes the caveat that this *"may or may not be related to the current task."*

In practice it frequently isn't — developers open files from other projects while Claude works, poisoning the context with irrelevant content. There is no UI toggle to disable this injection. Disabling the extension via `IDE: none` and restarting Claude restores it automatically.

> This is one of the reasons Mario built [[Pi (Coding Agent)]] — to have full control over exactly what enters the context.

### System Prompt

Fully readable via claude-trace. Not obfuscated. Nothing particularly surprising — well-written Anthropic prompting. Includes a reminder that a to-do list tool is available and that Claude should not mention it to users.

---

## Tool Definitions

All tool definitions are visible in the system prompt. Key observations:

### Task (Sub-Agent)
Spawns a separate Claude Code instance with a fresh context. The orchestrating model generates a prompt, sends it to the sub-agent, and receives back only the result. The sub-agent's full context never enters the main session. Useful for isolated research; problematic when the result must integrate precisely with existing work (the orchestrator may under-specify what the sub-agent needs to know).

### Bash
Versatile and used as the primary tool for most operations. Claude Code rarely uses `ls`, `cat`, or other redundant shell tools — it reaches for Bash directly and composes commands efficiently.

### Read
Has a 200-line limit per call and an approximate 30–65k token limit. Large files must be chunked across multiple `read` calls. **Known bug:** prefixes every returned content line with extra whitespace characters. This whitespace leaks into `edit` tool inputs (Claude copies lines from Read output into oldText/newText), breaking the exact-match requirement.

### Edit
Requires a perfect exact match of `oldText` in the file, including all whitespace. Fails when the whitespace-prefix bug from `Read` is carried over. This is the suspected root cause of many unexplained `edit` failures.

### Web Fetch
Does **not** return the raw content of the URL. The content is processed by an intermediary LLM that summarizes it before the result enters Claude Code's context. Reason: prompt injection mitigation — a malicious page could instruct Claude to exfiltrate local files if raw HTML were injected directly.

### Web Search
Same as Web Fetch — returns a summary, not raw search results. The developer has no control over what from the search results enters the context.

---

## Implications for [[Context Engineering]]

These hidden behaviors directly influence how context should be managed:

1. **VS Code extension:** If you use Claude Code from the CLI (not the VS Code extension), you avoid the open-file injection entirely — and gain full context control.
2. **Web fetch/search summaries:** If you need raw content or precise control over what gets injected, use a CLI tool (e.g. `curl`, a custom scraper) via Bash instead of the built-in web tools.
3. **Read whitespace bug:** If edits are failing unexpectedly, this is likely the cause. Workaround: use Bash (`sed`, `awk`, `grep`) to construct the exact match string rather than copying from Read output.
4. **Sub-agent (Task):** Think carefully about what context the sub-agent needs — it only gets what you explicitly pass in the prompt, and its failures are opaque from the main session.

---

## cchistory: Tracking Changes Over Time

Mario also built [cchistory.mariozechner.at](https://cchistory.mariozechner.at) — a public record of Claude Code's system prompt across versions. Since Anthropic modifies the prompt and toolset with each release (often silently), this tool makes it possible to track what changed and how it affects agent behavior.

---

## Related

- [[mario-zechner-practical-guide-agentic-computering]] — source video where these findings were documented
- [[Pi (Coding Agent)]] — the agent harness built as a direct response to these limitations
- [[Context Engineering]] — what to do about all of this
- [[CLI Tools Pattern]] — using Bash tools instead of built-in web/fetch tools for raw control
- [[Mario Zechner]] — author
