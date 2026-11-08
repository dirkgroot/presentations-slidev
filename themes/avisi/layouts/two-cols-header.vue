<!--
  Theme override of the client's grid-based two-cols-header: the default slot
  (e.g. a title) spans both columns and is centered by the theme's global
  centering, with the two columns below it. Same slot contract as the
  built-in:

```md
---
layout: two-cols-header
---
# Title spanning both columns
::left::
# Left
::right::
# Right
```
-->

<script setup lang="ts">
const props = defineProps({
  class: {
    type: String,
  },
  layoutClass: {
    type: String,
  },
})
</script>

<template>
  <div class="slidev-layout two-cols-header w-full h-full" :class="props.layoutClass">
    <div class="col-header">
      <slot />
    </div>
    <div class="cols">
      <div class="col-left" :class="props.class">
        <slot name="left" />
      </div>
      <div class="col-right" :class="props.class">
        <slot name="right" />
      </div>
    </div>
    <div class="col-bottom" :class="props.class">
      <slot name="bottom" />
    </div>
  </div>
</template>
