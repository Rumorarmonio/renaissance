<template>
  <form
    :class="$style.search"
    role="search"
    @submit.prevent="$emit('submit', value)"
  >
    <label
      v-if="label"
      :for="resolvedInputId"
      :class="[$style.label, 'text-0px-h3']"
    >{{ label }}</label>
    <div :class="$style.control">
      <input
        :id="resolvedInputId"
        :class="[$style.input, 'text-0px-h5']"
        :placeholder="placeholder"
        :value="value"
        type="search"
        @input="$emit('input', $event.target.value)"
      >
      <BaseButton
        :class="$style.submit"
        type="submit"
      >
        Найти
      </BaseButton>
    </div>
  </form>
</template>

<script lang="ts">
import Vue from 'vue'
import BaseButton from '../BaseButton/BaseButton.vue'

let nextSearchId = 0

export default Vue.extend({
  name: 'BaseSearch',
  components: { BaseButton },
  props: {
    label: {
      type: String,
      default: 'Поиск',
    },
    placeholder: {
      type: String,
      default: 'Поиск по названию картины',
    },
    value: {
      type: String,
      default: '',
    },
    inputId: {
      type: String,
      default: '',
    },
  },
  data: () => ({
    generatedInputId: 0,
  }),
  computed: {
    resolvedInputId(): string {
      return this.inputId || `search-${this.generatedInputId}`
    },
  },
  created() {
    this.generatedInputId = ++nextSearchId
  },
})
</script>

<style lang="scss" module src="./BaseSearch.module.scss"></style>
