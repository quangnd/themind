 # Movie Info — Add Media to the WikiLLM Vault

You are a wiki maintainer adding structured reference information to a personal knowledge vault. The user wants to add a film or TV series to their vault so it can be referenced and analyzed later (especially with `/watch`).

The vault lives at `/Users/mun/Data/Obsidian-Vault/WikiLLM/`. Study `index.md` to understand existing structure before creating anything.

---

## Step 1: Identify what was requested

`$ARGUMENTS` will be something like:
- `Parasite` — a film
- `Fargo` — a TV series (full series)
- `Fargo S2` — a specific season
- `The Bear S02E07` — a specific episode

Determine: **film or TV series?** If ambiguous, ask once.

---

## Step 2: Check if a page already exists

Before creating anything, check whether a page already exists:
- Glob `TV/` and `Films/` directories
- Search `index.md` for the title

If a series page exists but a season page is missing, create only what's missing.

---

## Step 3: Create the pages

Use your knowledge to fill in the content. Be accurate — if you're uncertain about something, note it as unverified rather than fabricating.

### For a FILM → create `Films/[Title] ([Year]).md`

```yaml
---
title: "Film Title (Year)"
aliases: [Title, Director's Title]
tags: [film, genre, year, country]
type: summary
created: YYYY-MM-DD
updated: YYYY-MM-DD
director: Name
year: YYYY
runtime: "Xh Xm"
country: Country
language: Language
---
```

Content sections:
- **Logline** — one sentence that captures the story and its tension
- **Plot Summary** — 3–5 paragraphs; enough to orient analysis without spoiling the experience of watching
- **Key Characters** — each character with a brief description of their role and central tension
- **Themes** — 4–6 bullet points naming the major thematic concerns
- **Craft Notes** — anything notable about cinematography, score, structure, or directorial style
- **Critical & Cultural Context** — why this film matters; awards, influence, cultural conversation
- **See Also** — wikilinks to thematically related vault pages if any exist

---

### For a TV SERIES → create two pages

#### Series Overview: `TV/[Series Name] (TV Series).md`

```yaml
---
title: "Series Name (TV Series)"
aliases: [Series Name]
tags: [tv-series, genre, decade, network]
type: summary
created: YYYY-MM-DD
updated: YYYY-MM-DD
creator: Name
network: Network
years: YYYY–YYYY
seasons: N
status: ended | ongoing
---
```

Content sections:
- **Logline** — one sentence
- **Premise** — 2–3 paragraphs on what the show is and what it's doing
- **Recurring Themes** — the ideas the show returns to across all seasons
- **Tone & Style** — what makes it distinctive to watch
- **Season Overview** — a brief paragraph per season with a link to the season page (create as `[[TV/Series Name S01]]`, etc.)
- **Key Figures** — creator, showrunner, notable directors/writers if relevant
- **Critical & Cultural Context**
- **See Also**

#### Season Page: `TV/[Series Name] S0X.md`

```yaml
---
title: "Series Name S0X — Season Title (if named)"
aliases: [Series Name Season X]
tags: [tv-series, series-name, season, genre]
type: summary
created: YYYY-MM-DD
updated: YYYY-MM-DD
series: "[[TV/Series Name (TV Series)]]"
season: X
year: YYYY
episodes: N
---
```

Content sections:
- **Season Summary** — 2–3 paragraphs: arc, setting, what this season is doing thematically
- **Central Conflict** — what drives the season narratively
- **Key Characters** (season-specific or introduced this season)
- **Themes** — what this season is specifically exploring (may differ from series-wide themes)
- **Episode Guide** — a table or list:

```
| Ep | Title | Brief Description |
|----|-------|-------------------|
| E01 | "Episode Title" | One-line description |
| E02 | "Episode Title" | One-line description |
...
```

Leave a `[[TV/Series Name S0XE0X — Episode Title]]` link for each episode — these pages will be created by `/watch` after analysis.

- **See Also** — link back to series page and any related vault pages

---

## Step 4: Update index.md

Add new entries under a `## Films` or `## Television` section (create the section if it doesn't exist). Format:

```
- [[Films/Title (Year)]] — One-line summary
- [[TV/Series Name (TV Series)]] — One-line summary
- [[TV/Series Name S0X]] — Season X summary
```

---

## Step 5: Update log.md

Append to today's date section:

```
- [INGEST] Added [[Films/Title (Year)]] — director, year, genre
- [INGEST] Added [[TV/Series Name (TV Series)]] and [[TV/Series Name S0X]] — X episodes
```

---

## Step 6: Report to the user

When all files are created and index/log are updated, tell the user:

- What pages were created (with their paths)
- What's ready for `/watch` (e.g., "You can now run `/watch Fargo S02E01` and I'll have the season context")
- Any information you were uncertain about and flagged as unverified

---

## Important rules

- **Never modify files in `Sources/`**
- **Always include frontmatter** on every wiki page
- **Always use `[[wikilinks]]`** for internal references
- **Update `index.md` and `log.md`** after every operation
- No external image URLs — if you reference images, note them as pending download
- Write in narrative, explanatory prose — not just facts
