<template>
  <button
    :class="[
      $style.button,
      'text-0px-h4',
      { [$style.inCart]: inCart },
    ]"
    :disabled="disabled"
    :type="type"
    @click="$emit('click', $event)"
  >
    <span
      v-if="inCart"
      :class="$style.icon"
      aria-hidden="true"
    >✓</span>
    <span><slot /></span>
  </button>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'BaseButton',
  props: {
    disabled: Boolean,
    inCart: Boolean,
    type: {
      type: String,
      default: 'button',
    },
  },
})
</script>

<style lang="scss" module src="./BaseButton.module.scss"></style>
