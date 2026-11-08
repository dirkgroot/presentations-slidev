<template>
  <div class="slidev-layout two-columns w-full h-full" :class="props.layoutClass">
    <div class="col-left" :class="props.class">
      <slot />
      <slot name="left" />
    </div>
    <div class="col-right" :class="props.class">
      <slot name="right" />
    </div>
  </div>
</template>

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
