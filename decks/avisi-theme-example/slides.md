---
theme: ../../themes/avisi
title: Avisi Theme Demo
author: Dirk Groot
comark: true
layout: cover
class: avisi-fancy
---

<img src="/assets/avisi_logo.png" alt="Avisi logo" style="width: 35%">

# Avisi Theme Demo<span class="emphasis">.</span>

---
class: avisi-white-with-footer
---

# Typography ladder<span class="emphasis">.</span>

#### Heading 4 — 1.0em × 0.95

### Heading 3 — 1.3em × 0.95

## Heading 2 — 1.6em × 0.95

# Heading 1 — 2.5em × 0.95

---
class: avisi-white-with-footer
---

# Subtitle<span class="emphasis">.</span>

## I am the subtitle — bold, dark gray {.avisi-subtitle}

## I am a plain heading — dark blue, like any h2

---
class: avisi-white-with-footer
---

# Lists, links & tables<span class="emphasis">.</span>

- Links are plain light-blue text, no underline: [avisi.nl](https://avisi.nl)
- Bullet markers match the link color; body text is dark gray `#595959`

| Feature                 | Behavior                                                                               |
|-------------------------|----------------------------------------------------------------------------------------|
| Text alignment in cells | Both left-aligned                                                                      |
| Horizontal table width  | Shrink-wrapped to the content's minimum required width |
| Row borders             | None         |

---
class: avisi-white-with-footer
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
class: avisi-fancy-with-footer
---

# Dark background<span class="emphasis">.</span>

## White text is the default on the dark classes

- No per-element styles needed
- Footer logo sits bottom-left
- Links, markers and the accent keep their light-blue tint

---
layout: two-cols
layoutClass: avisi-half-gray gap-8
---

# Split slide<span class="emphasis">.</span>

- Left half on the base `#f8f8f8`
- Footer logo bottom-left

::right::

- Right half on light gray `#e6e6e6`
- Split painted at exactly 50% slide width
