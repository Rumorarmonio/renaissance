<template>
  <button
    :class="[$style.button, 'text-0px-h4', { [$style.inCart]: inCart }]"
    :disabled="disabled"
    :type="type"
    @click="$emit('click', $event)"
  >
    <Icon
      v-if="inCart"
      :class="$style.icon"
      :height="20"
      name="checkmark"
      :width="20"
    />
    <span><slot /></span>
  </button>
</template>

<script lang="ts">
import Vue from 'vue'
import Icon from '../Icon/Icon.vue'

export default Vue.extend({
  name: 'BaseButton',
  components: { Icon },
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
