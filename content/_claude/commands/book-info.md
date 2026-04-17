# Book Info — Add a Book to the WikiLLM Vault

You are a wiki maintainer adding structured reference information to a personal knowledge vault. The user wants to add a book so it can be referenced, quoted, and analyzed later.

The vault lives at `/Users/mun/Data/Obsidian-Vault/WikiLLM/`. Study `index.md` to understand existing structure before creating anything.

---

## Step 1: Identify what was requested

`$ARGUMENTS` will be something like:
- `Thinking, Fast and Slow` — a non-fiction book
- `Crime and Punishment` — a fiction book
- `Dostoevsky` — an author (ask which book)

If the title is ambiguous (common title, multiple editions), confirm once before proceeding.

Determine: **fiction or non-fiction?** This shapes the page structure.

---

## Step 2: Check if a page already exists

Before creating anything:
- Glob `Books/` directory
- Search `index.md` for the title and author

If a page exists, report it to the user and ask if they want it updated.

---

## Step 3: Create the page

Create `Books/[Author Last Name] — [Title].md`

Use your knowledge to fill in the content accurately. If uncertain about something, note it as unverified rather than fabricating.

### Frontmatter (all books)

```yaml
---
title: "Title"
aliases: [Short Title, Author's Title]
tags: [book, fiction | non-fiction, genre, decade, author-last-name]
type: summary
created: YYYY-MM-DD
updated: YYYY-MM-DD
author: Full Name
year: YYYY
genre: Genre
country: Country
language: Original Language
---
```

---

### For FICTION → these content sections

**Logline** — one sentence capturing the story and its central tension

**Plot Summary** — 3–5 paragraphs; enough to orient analysis without over-spoiling; focus on the arc and what the story is *doing*, not just what happens

**Key Characters** — each major character with:
- their role in the story
- their central contradiction (what they want vs. what they need)
- their relationship to the book's themes

**Themes** — 4–6 bullet points naming the major thematic concerns; write each as a short phrase plus one explanatory sentence

**Craft & Style** — what is distinctive about the prose, structure, point of view, or form; what the author does that others don't

**Critical & Cultural Context** — when and why it was written; how it was received; its place in the literary tradition; why it still matters

**See Also** — wikilinks to thematically related vault pages if any exist; link to the author page if one exists (`[[Authors/Author Name]]`)

---

### For NON-FICTION → these content sections

**Central Argument** — 1–2 paragraphs: what is the book's core claim? What is it trying to convince you of or show you?

**Key Concepts** — the 4–8 most important ideas, frameworks, or terms introduced; each with a brief explanation

**Structure Overview** — how the book is organized (parts, chapters); what each major section does; whether the structure itself is meaningful

**Evidence & Method** — what kind of evidence or reasoning does the author use? (empirical research, case studies, argument, narrative, synthesis?)

**Strengths & Limitations** — what the book does well; where it overclaims, oversimplifies, or shows its age — be honest

**Themes** — the broader intellectual concerns the book connects to beyond its explicit argument

**Critical & Cultural Context** — when and why it was written; how it was received; its influence on its field

**See Also** — wikilinks to thematically related vault pages; link to the author page if one exists

---

## Step 4: Create an author page if one doesn't exist

Check whether `Authors/[Author Name].md` exists. If not, create a concise one:

```yaml
---
title: "Author Name"
aliases: [Last Name, Pen Name if applicable]
tags: [author, fiction | non-fiction, nationality, century]
type: entity
created: YYYY-MM-DD
updated: YYYY-MM-DD
---
```

Sections:
- **Who they are** — 1 paragraph: life, background, what makes them significant
- **Body of work** — key books with one-line descriptions; link to any that have vault pages
- **Recurring preoccupations** — the ideas, questions, or obsessions that run through their work
- **Style** — what is distinctive about how they write
- **See Also** — wikilinks to related vault pages

---

## Step 5: Update index.md

Add new entries under a `## Books` section (create if it doesn't exist):

```
- [[Books/Author — Title]] — One-line summary
- [[Authors/Author Name]] — One-line description of who they are
```

---

## Step 6: Update log.md

```
- [INGEST] Added [[Books/Author — Title]] (Year) — fiction/non-fiction, genre; created [[Authors/Author Name]]
```

---

## Step 7: Report to the user

Tell the user:
- What pages were created
- Any information flagged as uncertain or unverified
- Any existing vault pages this book connects to (themes, authors, concepts)

---

## Important rules

- **Never modify files in `Sources/`**
- **Always include frontmatter** on every wiki page
- **Always use `[[wikilinks]]`** for internal references
- **Update `index.md` and `log.md`** after every operation
- Write in narrative, explanatory prose — not just facts
- If the book connects to existing vault concepts (e.g., [[Deliberate Practice]], [[Metacrisis]]), note those connections in See Also
