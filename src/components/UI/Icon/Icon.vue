<template>
  <svg
    :width="iconWidth"
    :height="iconHeight"
    :aria-hidden="ariaHidden"
    :role="svgRole"
  >
    <title v-if="hint">{{ hint }}</title>
    <use
      :href="href"
      :xlink:href="href"
    />
  </svg>
</template>

<script lang="ts">
import Vue from 'vue'
import spriteUrl from '@/assets/sprite.svg'

export default Vue.extend({
  name: 'UiIcon',
  props: {
    name: { type: String, required: true },
    width: { type: [String, Number], default: null },
    height: { type: [String, Number], default: null },
    size: { type: [String, Number], default: 20 },
    hint: { type: String, default: '' },
  },
  computed: {
    iconWidth(): string | number {
      return this.width != null ? this.width : this.size
    },
    iconHeight(): string | number {
      return this.height != null ? this.height : this.size
    },
    href(): string {
      return `${spriteUrl}#icon/${this.name}`
    },
    ariaHidden(): boolean | undefined {
      return this.hint ? undefined : true
    },
    svgRole(): 'img' | 'presentation' {
      return this.hint ? 'img' : 'presentation'
    },
  },
})
</script>
