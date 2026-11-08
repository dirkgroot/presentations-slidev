<script setup lang="ts">
import { computed } from 'vue'
import { renderSVG } from 'uqr'

const props = withDefaults(defineProps<{
  value: string
  size?: number
}>(), { size: 150 })

const svg = computed(() => renderSVG(props.value, { blackColor: 'currentColor' }))
</script>

<template>
  <div class="avisi-qr" v-html="svg" :style="{ width: `${size}px`, height: `${size}px` }" />
</template>

<style scoped>
.avisi-qr {
  /* margin auto centers the fixed-width block: flex items blockify
     inline-block, so text-align can't do it */
  margin: 0 auto;
  color: var(--avisi-color-dark-blue);
}

.avisi-qr :deep(svg) {
  display: block;
  width: 100%;
  height: 100%;
}
</style>
