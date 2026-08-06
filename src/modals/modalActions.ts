import { useModalStore } from '@/stores/modalStore'
import type { ModalId } from '@/modals/modalsRegistry'
import type { ModalParamsFor, StatusMessageModalParams } from '@/modals/types'

export function openModal<T extends ModalId>(modalId: T, params?: ModalParamsFor<T>): void {
  useModalStore().openModal(modalId, params)
}

export function closeModal(modalId: ModalId): void {
  useModalStore().closeModal(modalId)
}

export function openStatusModal(params: StatusMessageModalParams): void {
  openModal('statusMessage', params)
}

export function openSuccessModal(params?: Omit<StatusMessageModalParams, 'variant'>): void {
  openModal('statusMessage', Object.assign({ variant: 'success' as const }, params || {}))
}

export function openErrorModal(params?: Omit<StatusMessageModalParams, 'variant'>): void {
  openModal('statusMessage', Object.assign({ variant: 'error' as const }, params || {}))
}
