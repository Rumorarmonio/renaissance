<template>
  <div :class="$style.root">
    <div
      :class="[$style.icon, $style[`${variant}Icon`]]"
      aria-hidden="true"
    >
      {{ variant === 'success' ? '✓' : variant === 'error' ? '×' : 'i' }}
    </div>
    <h2 :class="$style.title">
      {{ title }}
    </h2>
    <p
      v-if="message"
      :class="$style.message"
    >
      {{ message }}
    </p>
    <button
      :class="$style.button"
      type="button"
      @click="handleConfirm"
    >
      {{ buttonText }}
    </button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { closeModal } from '@/modals/modalActions'
import type { StatusMessageModalParams } from '@/modals/types'
import { useModalStore } from '@/stores/modalStore'

export default Vue.extend({
  name: 'StatusMessageModal',
  data: () => ({
    modalStore: useModalStore(),
  }),
  computed: {
    params(): StatusMessageModalParams {
      return (this.modalStore.getParams('statusMessage') || {}) as StatusMessageModalParams
    },
    variant(): string {
      return this.params.variant || 'success'
    },
    title(): string {
      if (this.params.title) return this.params.title
      return this.variant === 'success'
        ? 'Операция выполнена'
        : this.variant === 'error'
          ? 'Не удалось выполнить операцию'
          : 'Сообщение'
    },
    message(): string {
      return this.params.hideMessage ? '' : this.params.message || ''
    },
    buttonText(): string {
      return this.params.buttonText || 'Хорошо'
    },
  },
  methods: {
    async handleConfirm(): Promise<void> {
      if (this.params.onConfirm) await this.params.onConfirm()
      closeModal('statusMessage')
    },
  },
})
</script>

<style lang="scss" module src="./StatusMessageModal.module.scss"></style>
