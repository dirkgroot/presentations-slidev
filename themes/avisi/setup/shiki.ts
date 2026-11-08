import { defineShikiSetup } from '@slidev/types'

// The Reveal.js source repo used highlight.js with the ir-black theme for all
// code (a dark block on white slides). ir-black is not bundled with Shiki, so
// dark-plus stands in until ir-black is hand-ported to a Shiki theme (if ever).
export default defineShikiSetup(() => ({
  theme: 'dark-plus',
}))
