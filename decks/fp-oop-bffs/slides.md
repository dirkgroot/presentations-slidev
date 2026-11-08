---
theme: ../../themes/avisi
title: "FP and OOP: BFFs?"
author: Dirk Groot
comark: true
transition: fade
src: ../../shared/slides/avisi-logo.md
---

---
src: ../../shared/slides/whoami.md
---

---
src: ../../shared/slides/about-avisi.md
---

---
class: avisi-white-with-footer
---

<!-- markdownlint-disable-next-line MD013 -->
# <span class="emphasis">FP</span> and <span class="emphasis">OOP</span>:<br>Best Friends Forever<span class="emphasis">?</span>

## Combining the best of two worlds{.avisi-subtitle}

---
class: avisi-white-with-footer
---

# Background<span class="emphasis">.</span>

## FP has become mainstream{.avisi-subtitle}

<v-clicks>

- FP languages on the JVM: Scala, Clojure
- FP features are being adopted by existing OOP languages (Java, C#, C++)
- FP features are built into new languages (Kotlin, Rust)

</v-clicks>

---
class: avisi-white-with-footer
---

# So what<span class="emphasis">?</span>

<v-click>

<h2 class="avisi-subtitle">Let's refactor some FP into an OOP program<br>and see what happens<span class="emphasis">!</span></h2>

</v-click>

<v-click>

<h2 class="avisi-subtitle">Goals<span class="emphasis">:</span></h2>

</v-click>

<v-clicks>

- Prefer immutability
- Treat functions as first-class citizens
- Minimize exception handling

</v-clicks>

---
class: avisi-white-with-footer
---

# Summary<span class="emphasis">.</span>

<v-clicks>

- Starting point: A piece of OO/procedural code
- Introduced FP techniques and patterns
  - Algebraic datatype: <span class="emphasis">`Status`</span>
  - Functor: <span class="emphasis">`map`</span>
  - Monad: <span class="emphasis">`flatMap`</span>
  - Currying: <span class="emphasis">`(ProductName) -> (Quantity) -> ShoppingCartItem`</span>
  - Applicative functor: <span class="emphasis">`apply`</span>
- <span class="emphasis">Bonus</span>: We solved input validation, once and for all! 🥳

</v-clicks>

---
class: avisi-white-with-footer
---

# OOP and FP: BFFs<span class="emphasis">?</span>

## <span class="emphasis">Yes!</span><br>But a good relationship is about giving and receiving{.avisi-subtitle}

---
layout: two-cols-header
layoutClass: avisi-white-with-footer
---

# Trade-offs<span class="emphasis">.</span>

::left::

<v-click>

## FP{.avisi-subtitle}

- <b class="minus">-</b> Allow some impure code
- <b class="plus">+</b> Encapsulation

</v-click>

::right::

<v-click>

## OOP{.avisi-subtitle}

- <b class="minus">-</b> Constructors
- <b class="minus">-</b> Exceptions
- <b class="plus">+</b> Immutability / referential transparency
- <b class="plus">+</b> More patterns
- <b class="plus">+</b> First-class functions

</v-click>

<style scoped>
ul {
  list-style: none;
}

.minus {
  color: darkred;
}

.plus {
  color: green;
}
</style>

---
class: avisi-white-with-footer
---

# Thank you<span class="emphasis">!</span>

**Slides** [https://presentations.dirkgroot.nl/fp-oop-bffs](https://presentations.dirkgroot.nl/fp-oop-bffs){target=_blank}

<QrCode value="https://presentations.dirkgroot.nl/fp-oop-bffs" :size="150" />

**Example code** [https://github.com/dirkgroot/fp-oop-bffs](https://github.com/dirkgroot/fp-oop-bffs){target=_blank}

<QrCode value="https://github.com/dirkgroot/fp-oop-bffs" :size="150" />
