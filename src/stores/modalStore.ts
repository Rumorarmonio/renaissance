import { defineStore } from 'pinia'
import type { ModalId } from '@/modals/modalsRegistry'
import type { ModalParams, ModalParamsFor } from '@/modals/types'

export type ModalState = {
  isOpen: boolean
  isClosing: boolean
  closeDisabled: boolean
  params?: ModalParams
}

type ModalsState = Partial<Record<ModalId, ModalState>>

export const useModalStore = defineStore('modals', {
  state: (): { byId: ModalsState } => ({ byId: {} }),
  getters: {
    openModalIds(state): ModalId[] {
      return Object.keys(state.byId).filter((id) => state.byId[id as ModalId]?.isOpen) as ModalId[]
    },
  },
  actions: {
    openModal<T extends ModalId>(modalId: T, params?: ModalParamsFor<T>): void {
      this.byId = {
        ...this.byId,
        [modalId]: {
          isOpen: true,
          isClosing: false,
          closeDisabled: false,
          params,
        },
      }
    },
    closeModal(modalId: ModalId): void {
      const currentState = this.byId[modalId]

      if (
        !currentState ||
        !currentState.isOpen ||
        currentState.isClosing ||
        currentState.closeDisabled
      ) {
        return
      }

      currentState.isOpen = false
      currentState.isClosing = true
    },
    closeAllModals(): void {
      this.openModalIds.forEach((modalId) => this.closeModal(modalId))
    },
    finishClosing(modalId: ModalId): void {
      const currentState = this.byId[modalId]

      if (!currentState || !currentState.isClosing) {
        return
      }

      const remainingModals = { ...this.byId }
      delete remainingModals[modalId]
      this.byId = remainingModals
    },
    getParams<T extends ModalId>(modalId: T): ModalParamsFor<T> | undefined {
      return this.byId[modalId]?.params as ModalParamsFor<T> | undefined
    },
  },
})
