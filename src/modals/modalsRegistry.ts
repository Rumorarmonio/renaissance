import type { Component } from 'vue'
import ModalCenter from '@/components/Demo/ModalCenter.vue'
import ModalLeft from '@/components/Demo/ModalLeft.vue'
import ModalRight from '@/components/Demo/ModalRight.vue'
import StatusMessageModal from '@/components/Demo/StatusMessageModal.vue'
import type { ModalBaseProps } from '@/modals/types'

export type ModalDefinition = ModalBaseProps & {
  id: string
  component: Component
}

export const modals = [
  { id: 'demoLeft', position: 'left', width: 'medium', component: ModalLeft },
  { id: 'demoCenter', position: 'center', width: 'thin', component: ModalCenter },
  { id: 'demoRight', position: 'right', width: 'wide', component: ModalRight },
  {
    id: 'statusMessage',
    position: 'center',
    width: 'thin',
    component: StatusMessageModal,
    noPadding: true,
    noCloseButton: true,
  },
] as const

export type ModalId = (typeof modals)[number]['id']
