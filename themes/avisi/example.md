---
theme: ./
title: Avisi Theme Demo
author: Dirk Groot
comark: true
---

# Avisi Theme Migration Demo

## This deck exercises every piece of the Avisi branding migrated from the Reveal.js source repo

Layouts `cover` and `default`, four background classes, Poppins, and the token colors.

---
layout: cover
class: avisi-fancy
---

<img src="/assets/avisi_logo.png" alt="Avisi logo" style="width: 35%">

---
class: avisi-white-with-footer
---

# Title looks like this<span class="emphasis">.</span>

## Subtitles render in dark gray; links and bullet markers in light blue:

<ul>
  <li>[<a href="https://avisi.nl">avisi.nl</a>] — even without a hyperlink, text stays `#1199bb`</li>
  <li>Table borders are stripped (source: `table td { border-bottom: none }`)</li>
  <li>Body text is dark gray `#595959`, headings dark blue `#003345`</li>
</ul>

| Column A | Column B |
|----------|----------|
| no row   | borders  |
| retained | here     |

---
---

# Comark subtitle<span class="emphasis">.</span>

## Subtitles render in dark gray; links and bullet markers in light blue {.avisi-subtitle}

## Section heading stays dark blue

- Enabled via `comark: true` in the headmatter; the subtitle heading above carries an explicit
  trailing attribute block — no raw HTML
- `.avisi-subtitle` only styles `h2` elements in this theme, so classing anything else is inert
- An `h2` directly after the `h1` (`h1 + h2`) styles identically when no class is given

---
class: avisi-fancy-with-footer
---

# Fancy background<span class="emphasis">.</span>

<!-- Dark backgrounds (avisi-fancy*) default to white text — no per-element
style attributes needed (the source decks colored each element manually). -->

background.png composited with the footer logo (was `FancyWithFooter`)

## White heading, now by default<span class="emphasis">.</span>

---
layout: two-cols
layoutClass: avisi-half-gray gap-8
---

# Split right<span class="emphasis">.</span>

- Left half on `#f8f8f8`
- Right half on `#eee`
- Footer logo bottom-left

::right::

The gray half is a content zone

---
---

# Code<span class="emphasis">.</span>

```ts
export function greet(name: string): string {
    const message = `Hello, ${name}!`
    console.log(message)
    return message
}
```

---
---

# Typography ladder<span class="emphasis">.</span>

#### Heading 4 — 1.0em × 0.95

### Heading 3 — 1.3em × 0.95

## Heading 2 — 1.6em × 0.95

# Heading 1 — 2.5em × 0.95
