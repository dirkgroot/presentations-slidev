---
layout: two-cols-header
layoutClass: avisi-white-with-footer avisi-about-slide
---

# Avisi<span class="emphasis">?</span>

::left::

- Software company in Arnhem, the Netherlands
- Founded in 2000
- ~100 employees
- Software development, Cloud services, Consultancy, Innovation

::right::

![Avisi office](./avisi_photo.png)

<style>
.avisi-about-slide ul {
  list-style: none;
}

/* The 16:9 canvas has less vertical room than the source's Reveal canvas:
   without a cap the photo renders at column width x natural aspect (~81% of
   the slide height) and runs into the footer band. Reveal capped imgs at
   95% max-height; a percentage won't resolve in our flex columns
   (content-driven height), so pin a canvas-px cap here instead. */
.avisi-about-slide .col-right img {
  max-height: 320px;
}
</style>
