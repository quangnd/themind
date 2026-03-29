---
title: Theme Test
publish: true
created: 2026-03-29
modified: 2026-03-29T00:00:00.000+07:00
tags:
  - test
  - theme
---

This page tests all visual elements to verify theme changes don't break layout.

---

## Headings

# Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6

---

## Text Styles

This is a normal paragraph with **bold text**, *italic text*, ***bold italic***, and ~~strikethrough~~. Here is some `inline code` within a sentence. And here is a ==highlighted text== to test the textHighlight color.

> This is a blockquote. It should have a colored left border using the secondary color.
>
> It can span multiple lines.

---

## Links

- [[index|Internal link to home]]
- [External link to Quartz docs](https://quartz.jzhao.xyz)
- A broken internal link: [[nonexistent-page]]

---

## Lists

Unordered list:
- First item
- Second item
  - Nested item
  - Another nested item
    - Deeply nested
- Third item

Ordered list:
1. First step
2. Second step
   1. Sub-step A
   2. Sub-step B
3. Third step

Task list:
- [ ] Unchecked task
- [x] Completed task
- [ ] Another pending task

---

## Code Blocks

Inline: Use the `npx quartz build` command to build.

```javascript
// JavaScript with syntax highlighting
function greet(name) {
  const message = `Hello, ${name}!`;
  console.log(message);
  return message;
}

const result = greet("World");
```

```python
# Python example
def fibonacci(n):
    """Generate fibonacci sequence up to n."""
    a, b = 0, 1
    while a < n:
        yield a
        a, b = b, a + b

for num in fibonacci(100):
    print(num)
```

```css
/* CSS example */
:root {
  --primary: #fcf5e4;
  --accent: #7b6cd9;
}

body {
  font-family: "iA Writer Quattro S", sans-serif;
  background: var(--primary);
  color: #262626;
}
```

---

## Tables

| Feature       | Default Theme | Typewriter Theme |
|---------------|:------------:|:----------------:|
| Background    | Cool gray    | Warm parchment   |
| Body Font     | Source Sans  | iA Writer Quattro|
| Code Font     | IBM Plex     | JetBrains Mono   |
| Accent Color  | Blue         | Purple           |
| Feel          | Modern       | Classic          |

---

## Callouts

> [!note] Note
> This is a note callout.

> [!tip] Tip
> This is a tip callout with some helpful advice.

> [!warning] Warning
> This is a warning callout. Pay attention!

> [!info] Information
> This is an info callout with details.

> [!example] Example
> This is an example callout showing usage.

> [!quote] Quote
> "Typography is the craft of endowing human language with a durable visual form." — Robert Bringhurst

---

## Math (LaTeX)

Inline math: $E = mc^2$

Display math:

$$
\int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi}
$$

---

## Images and Media

The image below tests border-radius and max-width behavior:

![Quartz icon](/static/icon.png)

---

## Horizontal Rules & Spacing

Text above the rule.

---

Text below the rule. The spacing should be consistent.

---

## Footnotes

This sentence has a footnote[^1] and another one[^2].

[^1]: This is the first footnote, testing the footnote border-top style.
[^2]: Second footnote to verify multiple footnotes render correctly.

---

## Mixed Content Stress Test

The following section combines multiple elements to test layout integrity:

### A code snippet inside a list

1. First, configure the theme:
   ```ts
   import { typewriterTheme } from "./quartz/themes"
   // In quartz.config.ts:
   theme: typewriterTheme,
   ```
2. Then update the styles:
   - Edit `custom.scss`
   - Import the theme SCSS

### A table with code and links

| Command | Description |
|---------|-------------|
| `npx quartz build` | Build the site |
| `npx quartz build --serve` | Build and serve locally |
| See [[index\|home]] | Link to homepage |

### Nested blockquotes and formatting

> **Important:** This blockquote contains **bold**, *italic*, and `code`.
>
> > This is a nested blockquote to test depth rendering.
>
> - And a list inside a blockquote
> - With multiple items

---

## Long Content Test

This paragraph is intentionally longer to test line width, line height, and text wrapping behavior across different viewport sizes. The Typewriter theme targets a maximum line width of 40rem with 1.5 line-height, while the default Quartz theme uses different values. This content should remain readable and well-spaced regardless of which theme is active. Resize the browser window to verify the responsive layout doesn't break at mobile, tablet, and desktop breakpoints.
