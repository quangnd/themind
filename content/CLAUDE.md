# WikiLLM — LLM-Maintained Personal Wiki

An LLM-maintained, persistent knowledge base living in an Obsidian vault. Inspired by [Karpathy's LLM Wiki pattern](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f). The wiki is a compounding artifact — synthesis happens once and stays current, not re-derived repeatedly.

## Three-Layer Architecture

### 1. Raw Sources (`Sources/`)
Immutable, curated input documents. The LLM reads but **never modifies** these. Sources include articles, papers, books, transcripts, web clippings, Claude Code output, prompt templates — anything the user feeds in.

### 2. The Wiki (everything else)
LLM-generated and LLM-maintained markdown pages organized by topic. Flat structure with **MOC (Map of Contents)** files for navigation. Pages are interlinked with `[[wikilinks]]`.

### 3. The Schema (this file)
Defines wiki structure, conventions, and workflows. Transforms the LLM from generic chatbot to disciplined wiki maintainer.

---

## Directory Structure

```
WikiLLM/
├── CLAUDE.md              # This file — the schema
├── index.md               # Master index of all wiki pages with summaries
├── log.md                 # Append-only chronological activity log
├── Sources/               # Raw immutable source material
│   └── ...
├── Attachments/           # Downloaded images and media (local only)
│   └── ...
├── MOCs/                  # Map of Contents files by domain
│   └── ...
├── Prompts/               # Prompt library (reusable prompts & templates)
│   └── ...
├── TV/                    # Television series, season, and episode pages
│   └── ...
├── Films/                 # Film pages
│   └── ...
├── Books/                 # Book pages (fiction and non-fiction)
│   └── ...
├── Authors/               # Author entity pages
│   └── ...
└── (wiki pages)           # Flat — all topic/entity/concept pages live at root
```

> **Author pages rule:** All author/person entity pages go in `Authors/` (e.g. `Authors/Malcolm Gladwell.md`). Obsidian will auto-update wikilinks on move. Never create author pages at root.

> **Wikilink rule:** Always use the short filename when linking — `[[Dan Koe]]`, not `[[Authors/Dan Koe]]`; `[[dan-koe-essays-as-thinking-tools]]`, not `[[Sources/dan-koe-essays-as-thinking-tools]]`. Obsidian resolves links by filename, not path. Never include a folder prefix in any wikilink.

---

## Page Conventions

### Frontmatter
Every wiki page MUST have YAML frontmatter:

```yaml
---
title: Page Title
aliases: [simple alias, another alias]
tags: [relevant, tags]
created: YYYY-MM-DD
updated: YYYY-MM-DD
source: "[[source-file]]"  # if derived from a source
type: concept | entity | summary | moc | prompt | overview
---
```

> **Aliases rule:** Never use double-quoted strings inside inline alias arrays (`aliases: ["foo"]`). Obsidian's YAML parser does not handle this reliably. Use the inline form `aliases: [foo, bar]` for simple strings with no commas. For aliases that contain commas or other special characters, use block-list format:
> ```yaml
> aliases:
>   - simple alias
>   - alias, with comma
> ```
> Never mix both styles in the same file.

### Linking
- Use Obsidian `[[wikilinks]]` for internal links
- Use `[[Page Name|display text]]` when the link text should differ
- Use `![[Attachments/image.png]]` for embedded images

### Images
- **Always download images locally** to `Attachments/`
- Never link to external image URLs — the vault must work offline
- Name images descriptively: `Attachments/topic-description.png`

### Tone & Style
- **Narrative and explanatory** — write as if teaching someone the topic
- Provide context and reasoning, not just facts
- Use headings, bullet points, and callouts (`> [!note]`, `> [!tip]`) for structure
- Include examples where helpful
- Cite sources with `[[wikilinks]]` back to `Sources/`

---

## Operations

### Query (Primary)
When the user asks a question:
1. Search relevant wiki pages (grep index.md, scan MOCs, follow wikilinks)
2. Read the relevant pages
3. Synthesize an answer with `[[citations]]` to wiki pages and sources
4. If the answer reveals a gap — offer to create or update wiki pages
5. If the answer is substantial and reusable, offer to save it as a new wiki page

### Ingest
When the user provides a new source:
1. Save the raw source to `Sources/` (never edit the source, only update frontmatter if needed)
2. If the source contains images, download them to `Attachments/`
3. Read and discuss key takeaways with the user
4. Create or update wiki pages: summaries, concept pages, entity pages
5. Update relevant MOC files
6. Update `index.md` with new/changed pages
7. Append to `log.md`

A single source may touch 5–15 wiki pages. Follow the threads — update cross-references, note connections to existing pages, flag contradictions.

### Lint
Periodic health checks on the wiki:
1. Find contradictions between pages
2. Identify stale claims or outdated information
3. Find orphan pages (not linked from any MOC or other page)
4. Spot data gaps worth filling
5. Check for broken wikilinks
6. Verify all images exist in `Attachments/`
7. Report findings and suggest fixes

---

## index.md Format

The master index is a content-oriented catalog. Organized by category, each entry has the page name and a one-line summary:

```markdown
## Category Name

- [[Page Name]] — One-line summary of what this page covers
- [[Another Page]] — Summary
```

This enables efficient search without embedding infrastructure.

---

## log.md Format

Chronological log with a parseable prefix per entry:

```markdown
## YYYY-MM-DD

- [INGEST] Processed "Source Title" → created [[Page A]], [[Page B]], updated [[Page C]]
- [QUERY] "User's question" → synthesized from [[Page X]], [[Page Y]]
- [LINT] Health check: found 2 orphan pages, 1 contradiction
- [UPDATE] Revised [[Page Z]] with new information from [[Source]]
```

**Three rules for maintaining log.md:**

1. **Merge same-date entries** — there must never be more than one `## YYYY-MM-DD` heading per date. When adding entries for a date that already exists, insert them under the existing heading, not in a new section.
2. **Sort dates descending** — the most recent date appears first. Re-sort the file whenever a new date section is added.
3. **Update the `updated:` frontmatter field** — every time log.md is written, update the `updated:` date in its YAML frontmatter to today's date.

---

## MOC (Map of Contents) Files

MOCs live in `MOCs/` and serve as navigational hubs for a domain or topic cluster. They are not just lists — they provide narrative context for how pages relate:

```markdown
---
title: MOC — Topic Name
tags: [moc]
type: moc
created: YYYY-MM-DD
updated: YYYY-MM-DD
---

# Topic Name

Brief overview of this domain and why it matters.

## Core Concepts
- [[Concept A]] — how it relates to the domain
- [[Concept B]] — how it relates

## Key Entities
- [[Entity A]] — role and significance

## Sources
- [[Sources/source-file]] — what it contributed

## Open Questions
- Things still to explore or clarify
```

---

## Prompt Library (`Prompts/`)

Reusable prompts and templates saved from Claude Code sessions or crafted by the user. Each prompt file follows:

```yaml
---
title: Prompt Name
tags: [prompt, domain]
type: prompt
created: YYYY-MM-DD
updated: YYYY-MM-DD
use_case: "When to use this prompt"
---
```

Notes:
- Whenever a prompt you write in Claude Code produces something genuinely useful, save it to Prompts folder.

---

## Rules for the LLM

1. **Never modify files in `Sources/`** — they are immutable records
2. **Always update `index.md`** when creating or significantly changing a wiki page
3. **Always update `log.md`** after any operation (ingest, query that produces pages, lint)
4. **Always download images locally** to `Attachments/` — no external image URLs
5. **Always use `[[wikilinks]]`** for internal references
6. **Always include frontmatter** on every wiki page
7. **Update the `updated:` date** in frontmatter when revising a page
8. **Follow wikilink threads** — when updating a page, check what links to it and update those if needed
9. **Flag contradictions** rather than silently overwriting — note them in the page and in `log.md`
10. **Ask before large restructuring** — if an ingest would touch >10 pages, outline the plan first
