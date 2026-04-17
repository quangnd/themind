---
title: Mario Zechner
aliases: [Zechner, badlogicgames, Pidalf]
tags: [author, software-engineering, game-development, AI]
created: 2026-04-06
updated: 2026-04-11
type: entity
---

# Mario Zechner

Austrian software engineer and game developer. Creator of **libGDX**, **Pi**, and co-lead of Pi at [[Earendil]]. Active on X/Twitter as `@badlogicgames`. Signs off as "Pidalf."

Has deep OSS history stretching back to 2009 — including the bruising RoboVM acquisition that shaped his views on commercialization. His writing is grounded in years of production experience and is skeptical of hype without being anti-AI. He is a founding voice of the [[Vienna School of Agentic Coding]].

## Notable Work

- **libGDX** — widely used open-source Java game development framework; handed to community contributors in 2016; never directly commercialized; still powers Spine (commercial game tool)
- **RoboVM** — ahead-of-time JVM compiler for iOS (co-built); sold to Xamarin, then closed-sourced by Microsoft and shut down; the community forked it as MobiVM within days; formative and painful experience
- **Pi** — minimal coding agent: 4 tools (Read/Write/Edit/Bash), tiny system prompt, extension system with state persistence, session trees; now at [[Earendil]] (earendil-works/pi on GitHub); powers [[OpenClaw]] and [[Armin Ronacher]]'s daily workflow
- **Sitegeist** — browser research agent (October 2025); injects JavaScript via user scripts and the debugger to interact with any website; full session management, artifact generation, skills system; bypasses CSP; planned open source
- **Thoughts on Slowing the F*** Down** (2026-03-25) — critical essay on agentic coding practices and the case for discipline and human oversight

## Personal Projects

Mario builds things outside of work for two reasons: because they're interesting, and to fund **Cards for Ukraine**, a non-profit he runs with partner Tanja that sends physical postcards to Ukrainian families in Austria. The association crossed **€300,000** in donations in 2025.

**Boxie** (2025) — a fully offline embedded audio player built for his young son. Mario designed the PCBs, learned SMT soldering from scratch, and ported Doom to the hardware. The boy has 72 cartridges of audio plays, audiobooks, and music; when it breaks, they open it together. The project started as electronics education but became something more — an attempt to spark the same curiosity in his son that a Game Boy sparked in him.

**heisse-preise.io** — ongoing grocery price scraper for Austrian supermarkets, started before 2025. Mario advocates for the Austrian government to legalize scraping and require retailers to expose EAN codes. The grocers already use these APIs for "systemic price matching"; he argues consumers deserve the same access. No university will touch the data without legal cover. His mom uses the site to get angry about prices.

## The Coding Agent Arc

Mario's 2025 was shaped by a progressive disillusionment with Claude Code followed by building his own replacement:

1. **Texty** (Jan 2025) — first vibe-coded project; spell/grammar browser extension + Android app; abandoned after a few months but marked his first foray into letting the LLM take the wheel
2. **Hacking Claude Code** (April 2025) — patched the Claude Code binary to disable anti-debugging checks; monkeypatched fetch to intercept all API calls. Findings: Haiku was used for "please wait" messages (per token) and injection detection; `/cost` was disabled for Max plan users; the system prompt told Claude to delete test files (later fixed). Built and published: `claude-trace` (records all API calls), `claude-bridge` (swap providers), `cc-antidebug` (re-enable `/cost`), `cccost` (accurate cost tracking), `claude-notify` (notifications). Also built [cchistory.mariozechner.at](https://cchistory.mariozechner.at) to track system prompt diffs across Claude Code versions. See [[Claude Code Internals]] for a synthesis of these findings.

2b. **"A Practical Guide to Agentic Computering"** (July 2025) — video deep-dive covering: why Claude Code beats Cursor (unlimited tokens, working loop, hackable context), claude-trace internals, compaction management strategies, and a complete porting workflow using LSP CLI + jq + `port.md` as a natural-language program. The porting workflow reduced a 2-week manual task (5,000 lines, 68 files) to 1 day. See [[Agentic Porting Workflow]].
3. **MCP exploration and abandonment** — built `vs-claude` (VS Code MCP server), then `mailcp` (Gmail MCP). Realization: MCP outputs can only be composed by the LLM inside the context window. CLI tools composed via Bash are far more efficient. Abandoned all MCP servers; documented conclusions in [[mario-zechner-what-if-you-dont-need-mcp]].
4. **Yakety** (2025) — local voice transcription using OpenWhisper; press-and-hold hotkey; fully local; no intrusive permissions. Originally planned as a commercial product; open-sourced in December 2025. He uses it for writing (including blog posts), not coding — file paths don't transcribe well.
5. **VibeTunnel** (June 2025) — 24-hour hackathon at Peter Steinberger's Vienna flat with Armin Ronacher; goal: control Claude Code from a mobile phone. Worked but was a "Frankenstein." Peter later rebuilt the idea properly as [Clawdis](https://clawdis.ai/).
6. **Pi** (late 2025) — Anthropic kept adding features and changing Claude Code's toolset and system prompts, disrupting workflows. Mario built pi to have exactly what he wanted: 4 tools, minimal prompt, no MCP, no sub-agents, no plan mode. See [[Pi (Coding Agent)]].

## Observations on Agentic Coding

**The two camps** (from Armin's year-end post): tight leash vs. armies of agents. Mario is firmly in the tight-leash camp. Armies of agents never worked for him except maybe research tasks. His observation: army-of-agents advocates haven't published much open source, while he documents and open-sources everything. "So maybe there's a lesson in there somewhere."

**Honest year-end assessment:** "Nobody knows yet how to do this properly. We are all just throwing shit at the wall, declaring victory, while secretly crying over all the tech debt we introduced into our codebases by letting agents run amok. If somebody claims they have found the solution, don't trust them, they have not."

**Productivity question:** "Did my productivity increase via LLMs? I don't actually know." Not obviously more projects — but the ones he did have more technical depth than he'd have attempted alone.

Summary for 2025: "It's all just vibes."

## Joining Earendil

In April 2026, Mario joined [[Earendil]] as a shareholder and pi lead, declining all VC-startup offers. His reasoning:
- Primary constraint: family comes first; cannot accept CEO-level stress or absence
- Armin Ronacher is a decade-long friend with proven OSS/commercialization track record
- Earendil products are built on pi (signal feedback) and the team has kids (culture fit)
- Pi stays MIT; 3-tier licensing model preserves OSS spirit
- Last resort: "the fork button still works"

## OSS Philosophy

Shaped by the RoboVM experience: commercialization is fine, but not if it betrays the community that built you up. The RoboVM fork (MobiVM) proved that good OSS survives bad acquihires — it's a backstop Mario consciously built into Pi's future.

## Themes

- Software craft and quality
- Pragmatic skepticism about AI coding agents paired with genuine enthusiasm for what they can do
- OSS sustainability and the tension between commercial viability and community trust
- The value of human understanding and friction in software development
- Family as a real constraint on professional ambitions — not just a platitude

## Sources

- [[mario-zechner-practical-guide-agentic-computering]] — video: Claude Code internals via claude-trace, compaction management, porting workflow with LSP CLI + jq (2025-07-02)
- [[mario-zechner-what-if-you-dont-need-mcp]] — practical argument for CLI tools over MCP servers (2025-11-02)
- [[mario-zechner-building-pi-coding-agent]] — deep technical account of building Pi; context engineering philosophy; the full "no" list (2025-11-30)
- [[mario-zechner-slowing-the-fuck-down]] — critical essay on agentic coding discipline (2026-03-25)
- [[mario-zechner-ive-sold-out]] — announcement of joining Earendil with pi (2026-04-08)
- [[mario-zechner-year-in-review-2025]] — year in review: personal projects, full coding agent arc, observations on the state of agentic coding (2025-12-22)
