---
title: Slash Commands
aliases: [commands, slash commands]
tags: [meta, commands, reference]
type: overview
created: 2026-04-05
updated: 2026-04-05
---

# Slash Commands

Custom slash commands available in this vault (defined in `.claude/commands/`).

---

## `/movie-info [title]`

Adds a film or TV series to the vault before watching/analyzing.

```
/movie-info Parasite
/movie-info Fargo S2
/movie-info The Bear S02E07
```

**What it creates:**
- Film → `Films/[Title] (Year).md`
- TV series → `TV/[Series] (TV Series).md` + `TV/[Series] S0X.md` with full episode guide
- Updates `index.md` and `log.md`

**Run this before `/watch`** so the analysis session has context.

---

## `/watch [title]`

Deep analysis of a film or episode through Socratic dialogue. Checks the vault for existing context first, then opens with 3–4 focused questions across character, theme, symbolism, structure, and emotional truth. Follows your responses one thread at a time.

```
/watch Fargo S02E01
/watch Parasite
/watch The Bear S02E07
```

**What it does:**
- Reads season/film page from vault before asking questions
- Asks one sharp question at a time and follows your thinking
- At the end of a rich conversation, offers to save insights as `TV/[Series] S0XE0X — [Title].md`

**Recommended flow:** `/movie-info` first, then `/watch`.

---

## `/book-info [title]`

Adds a book to the vault. Detects fiction vs. non-fiction and adjusts the page structure accordingly.

```
/book-info Crime and Punishment
/book-info Thinking, Fast and Slow
/book-info Flow by Csikszentmihalyi
```

**What it creates:**
- `Books/[Author] — [Title].md` — full book page
- `Authors/[Author Name].md` — author profile (if one doesn't exist)
- Updates `index.md` and `log.md`

**Fiction pages include:** logline, plot summary, key characters, themes, craft & style, critical context

**Non-fiction pages include:** central argument, key concepts, structure overview, evidence & method, strengths & limitations, critical context
