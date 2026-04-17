---
title: WikiLLM — How to Use This Wiki
aliases: [wiki workflow, how to use, getting started]
tags: [meta, workflow, guide]
created: 2026-04-05
updated: 2026-04-05
type: overview
---

# WikiLLM — How to Use This Wiki

This note is your practical guide to working with the wiki. There are four operations: **Query**, **Ingest**, **Lint**, and **Cultivate**. You'll use them in that order of frequency — query most often, ingest whenever new material comes in, cultivate after heavy ingest sessions, lint occasionally to keep things healthy.

The wiki compounds over time. Every source you ingest makes the next query richer. Every query that reveals a gap becomes an invitation to ingest more.

---

## Slash Commands

Custom commands are available in this vault. See [[Slash Commands]] for the full reference. Quick summary:

| Command | What it does |
|---|---|
| `/movie-info [title]` | Adds a film or TV series to the vault — series overview, season page, episode guide |
| `/watch [title]` | Deep Socratic analysis of a film or episode; checks vault for context first |
| `/book-info [title]` | Adds a book to the vault — fiction or non-fiction, with author page |

**Recommended flow for media:** `/movie-info` first to build context, then `/watch` to go deep.

---

## The Four Operations

### Query — Ask First

Before ingesting anything, ask. If the wiki already has relevant pages, you'll get a cited answer instantly. If it doesn't, the gap tells you exactly what's worth ingesting next.

**How to trigger a query:**
Just ask a question in Claude Code. No special command needed.

**Examples:**

> "What does Dan Koe say about AI and creativity?"

Claude searches `index.md`, reads [[Dan Koe]] and [[Essays as Thinking Tools]], synthesises an answer with `[[citations]]`, and — if the answer is substantial and reusable — offers to save it as a new page.

> "How does the Metacrisis connect to the attention economy?"

Claude reads [[Metacrisis]] and [[Epistemic Commons]], traces the connection through [[Fast Content vs Slow Content]], and surfaces it as a narrative answer.

> "What's the difference between a workflow and an agent?"

Claude reads [[AI Agents — How They Work]] and [[Five Workflow Patterns for AI Agents]], gives you the distinction with concrete examples.

**What happens when the wiki doesn't know:**
Claude will tell you there's a gap and ask if you'd like to ingest something to fill it. That's the signal to move to Ingest.

---

### Ingest — Feed the Wiki

Ingesting is how the wiki grows. You bring material; Claude reads it, extracts the concepts, creates or updates pages, and keeps everything interlinked.

**How to trigger an ingest:**
Paste the content directly into the chat, or tell Claude you have something to ingest and provide it. For films, TV, and books, use the dedicated commands below.

---

#### Example 1 — Film or TV Series

Use `/movie-info` to build a structured reference page before watching, then `/watch` to go deep.

**Step 1 — Build the reference:**
```
/movie-info Arrival
/movie-info The Bear S03
```

**What Claude creates:**
- `Films/Arrival (2016).md` — logline, plot summary, key characters, themes, craft notes, critical context
- Or for TV: `TV/The Bear (TV Series).md` + `TV/The Bear S03.md` with full episode guide

**Step 2 — Analyse an episode or film:**
```
/watch Arrival
/watch The Bear S03E01
```

Claude reads the vault page for context, then opens a Socratic dialogue: 3–4 focused questions across character, theme, symbolism, structure, emotional truth. Follows your responses one thread at a time. At the end of a rich conversation, offers to save the analysis as an episode page.

---

#### Example 2 — Book

Use `/book-info` to add a book to the vault. Claude detects fiction vs. non-fiction and adjusts the structure.

```
/book-info The Power of Now by Eckhart Tolle
/book-info Crime and Punishment
```

**What Claude creates:**
- `Books/Tolle — The Power of Now.md` — for non-fiction: central argument, key concepts, structure, strengths & limitations; for fiction: logline, plot, characters, themes, craft
- `Authors/Eckhart Tolle.md` — author profile (if one doesn't exist)
- Updates `index.md` and `log.md`

**Cross-links that emerge:** If you've already ingested anything related — say, [[The Meaning Economy]] and [[Flow State and Psychic Negentropy]] — Claude notices the resonance with Tolle's "pain body" and psychic entropy and links them. The wiki makes invisible connections visible.

---

#### Example 3 — Article or Newsletter

Clip with Obsidian Web Clipper and paste directly into the chat.

> "Ingest this article…" [paste clipped markdown]

**What Claude creates:**
- `Sources/article-title.md` — the raw source saved immutably
- One or more concept pages extracted from the source
- Any images in the article downloaded to `Attachments/`
- Relevant existing pages updated if they touch the same territory
- `index.md` and `log.md` updated

---

### Cultivate — Work With What You Ingested

Ingesting puts ideas on the page. Cultivation is what moves them into the mind. After any heavy reading or ingest session, create a Thinking Practice note to track what you should actually *do* with the ideas.

**How to trigger:**
> "I ingested a lot today — create a thinking practice note with a todo list."

**What Claude creates:**
`Thinking Practice — YYYY-MM-DD.md` with:
- A list of everything ingested that session
- **This Week** — small, immediate actions: apply one concept, write 20 minutes, notice something
- **This Month** — higher-investment work: write an essay, start the note-taking practice on a book, go to primary sources
- **Ongoing practices** — things to fold into regular life
- **Open questions** — no checkboxes, just things worth sitting with

The note uses Obsidian checkboxes so you can track what you've done. Return to it. Cross things off. Add things.

> [!tip] The key move
> Don't just read — **generate**. After finishing anything substantial, spend 10 minutes writing what it sparked in *you*, not what it said. This is [[Note-Taking as Thinking]]'s Level 3: taking notice, not just taking notes.

---

### Lint — Health Check

Run this occasionally (every few weeks, or after a big burst of ingesting) to keep the wiki coherent.

**How to trigger:**
> "Run a lint on the wiki."

**What Claude checks:**
- Pages that contradict each other
- Orphan pages not linked from any MOC
- Broken `[[wikilinks]]`
- Missing images in `Attachments/`
- Sources present as files but missing from `index.md`
- Stale claims that newer sources have superseded
- Obvious gaps worth filling

Claude reports findings and suggests fixes. You decide what to act on.

---

## The Full Workflow Loop

```
Have a question?
    ↓
QUERY → Get a cited answer from existing pages
    ↓
Answer is thin or missing?
    ↓
INGEST → Article/book/film/TV (use /book-info, /movie-info, /watch)
    ↓
Wiki grows → New pages, updated links, richer connections
    ↓
After a heavy session:
CULTIVATE → Thinking Practice note: apply, write, connect, slow-read
    ↓
Every few weeks:
LINT → Health check, fix contradictions, surface gaps
    ↓
Back to QUERY (now richer)
```

---

## Vault Structure

```
WikiLLM/
├── CLAUDE.md              # Schema and rules
├── index.md               # Master index
├── log.md                 # Append-only activity log
├── Sources/               # Raw immutable source material
├── Attachments/           # Downloaded images (local only)
├── MOCs/                  # Map of Contents files by domain
├── Prompts/               # Reusable prompt library
├── TV/                    # TV series, season, and episode pages
├── Films/                 # Film pages
├── Books/                 # Book pages (fiction and non-fiction)
├── Authors/               # Author entity pages
└── (wiki pages)           # Flat — concept, entity, summary pages at root
```

---

## Tips

**Clip anything interesting.** The lower the friction of ingestion, the more the wiki compounds. Obsidian Web Clipper → paste → done.

**Rough notes are fine.** You don't need polished source material. A voice memo transcript, a rough brain dump after watching a film, a few bullet points from a book — Claude will work with it.

**Query before you think you know.** The wiki often surfaces connections you forgot you'd built. Ask before assuming there's nothing there.

**Let gaps accumulate.** When a query returns thin results, note the gap mentally. Then ingest something that fills it. The wiki grows in response to what you actually need to know.

**Cultivate after heavy sessions.** Reading without cultivation is like eating without digesting. The Thinking Practice note is the digestion step.

**The Prompts/ folder is for you too.** Whenever a prompt you write in Claude Code produces something genuinely useful, save it.

---

## See Also

- [[Slash Commands]] — full reference for `/movie-info`, `/watch`, `/book-info`
- [[CLAUDE.md]] — the full schema and rules
- [[index.md]] — master index of all pages
- [[log.md]] — activity history
- [[Note-Taking as Thinking]] — the philosophy behind the Cultivate operation
- [[MOC — Sensemaking and Civilization]]
- [[MOC — AI Agents]]
- [[MOC — Learning and Self-Education]]
