<template>
  <transition
    :name="transitionName"
    @after-leave="handleAfterLeave"
  >
    <div
      v-if="shouldRender"
      :class="[$style.mask, $style[`${position}Mask`]]"
      role="presentation"
      @click.self="handleMaskClick"
    >
      <section
        ref="modal"
        :class="[$style.modal, $style[position], $style[width]]"
        role="dialog"
        aria-modal="true"
        tabindex="-1"
        :aria-labelledby="header ? `${id}-header` : undefined"
      >
        <header
          v-if="header || canClose"
          :class="$style.header"
        >
          <h2
            v-if="header"
            :id="`${id}-header`"
            :class="$style.title"
          >{{ header }}</h2>
          <button
            v-if="canClose"
            :class="$style.close"
            aria-label="Закрыть"
            type="button"
            @click="close"
          >×</button>
        </header>
        <div :class="[$style.content, { [$style.noPadding]: noPadding }]">
          <slot />
        </div>
      </section>
    </div>
  </transition>
</template>

<script lang="ts">
import Vue from 'vue'
import { closeModal } from '@/modals/modalActions'
import type { ModalPosition, ModalWidth } from '@/modals/types'
import { ModalState, useModalStore } from '@/stores/modalStore'

let bodyLockCount = 0
let previousScrollbarWidth = ''
const focusableSelector = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

function lockBody(): void {
  if (bodyLockCount === 0) {
    previousScrollbarWidth = document.documentElement.style.getPropertyValue('--scrollbar-width')
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
    document.documentElement.style.setProperty('--scrollbar-width', `${scrollbarWidth}px`)
    document.body.classList.add('locked')
  }

  bodyLockCount += 1
}

function unlockBody(): void {
  bodyLockCount = Math.max(0, bodyLockCount - 1)

  if (bodyLockCount === 0) {
    if (previousScrollbarWidth) {
      document.documentElement.style.setProperty('--scrollbar-width', previousScrollbarWidth)
    } else {
      document.documentElement.style.removeProperty('--scrollbar-width')
    }
    document.body.classList.remove('locked')
  }
}

export default Vue.extend({
  name: 'Modal',
  props: {
    id: { type: String, required: true },
    header: String,
    position: { type: String, default: 'center' },
    width: { type: String, default: 'medium' },
    noPadding: Boolean,
    noCloseButton: Boolean,
  },
  computed: {
    modalStore(): ReturnType<typeof useModalStore> {
      return useModalStore()
    },
    modalState(): ModalState | undefined {
      return this.modalStore.byId[this.id as keyof ReturnType<typeof useModalStore>['byId']]
    },
    shouldRender(): boolean {
      return Boolean(this.modalState?.isOpen)
    },
    canClose(): boolean {
      return !this.noCloseButton && !this.modalState?.closeDisabled
    },
    transitionName(): string {
      return this.position === 'center' ? 'modal-center' : `modal-${this.position}`
    },
  },
  watch: {
    'modalState.isOpen': {
      immediate: true,
      handler(isOpen: boolean, wasOpen: boolean): void {
        if (typeof document === 'undefined' || isOpen === wasOpen) {
          return
        }
        if (isOpen) {
          this.focusedElement = document.activeElement as HTMLElement
          lockBody()
          document.addEventListener('keydown', this.handleKeydown)
          this.$nextTick(this.focusInitialElement)
        } else {
          document.removeEventListener('keydown', this.handleKeydown)
        }
      },
    },
  },
  data: () => ({
    focusedElement: null as HTMLElement | null,
  }),
  beforeDestroy(): void {
    document.removeEventListener('keydown', this.handleKeydown)

    if (this.modalState?.isOpen || this.modalState?.isClosing) {
      unlockBody()
    }
  },
  methods: {
    close(): void {
      closeModal(this.id as Parameters<typeof closeModal>[0])
    },
    handleMaskClick(): void {
      if (this.canClose) {
        this.close()
      }
    },
    handleKeydown(event: KeyboardEvent): void {
      const openModalIds = this.modalStore.openModalIds

      if (!this.modalState?.isOpen || openModalIds[openModalIds.length - 1] !== this.id) {
        return
      }

      if (event.key === 'Escape') {
        if (this.canClose) {
          this.close()
        }
        return
      }

      if (event.key !== 'Tab') {
        return
      }

      const modal = this.$refs.modal as HTMLElement | undefined
      const focusableElements = modal
        ? Array.from(modal.querySelectorAll<HTMLElement>(focusableSelector))
        : []

      if (!focusableElements.length) {
        event.preventDefault()
        modal?.focus()
        return
      }

      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault()
        lastElement.focus()
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault()
        firstElement.focus()
      }
    },
    focusInitialElement(): void {
      const modal = this.$refs.modal as HTMLElement | undefined

      if (!modal) {
        return
      }

      const firstFocusableElement = modal.querySelector<HTMLElement>(focusableSelector)
      ;(firstFocusableElement || modal).focus()
    },
    handleAfterLeave(): void {
      unlockBody()
      this.modalStore.finishClosing(this.id as Parameters<typeof closeModal>[0])

      if (!this.modalStore.openModalIds.length) {
        this.focusedElement?.focus()
      }
      this.focusedElement = null
    },
  },
})

export type { ModalPosition, ModalWidth }
</script>

<style lang="scss" module src="./Modal.module.scss"></style>
