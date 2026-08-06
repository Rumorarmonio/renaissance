<template>
  <div>
    <Modal
      v-for="modal in modals"
      :id="modal.id"
      :key="modal.id"
      :header="modalHeader(modal.id, modal.header)"
      :no-close-button="modal.noCloseButton"
      :no-padding="modal.noPadding"
      :position="modal.position"
      :width="modal.width"
    >
      <component
        :is="modal.component"
        v-if="isModalOpen(modal.id)"
      />
    </Modal>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Modal from '@/components/UI/Modal/Modal.vue'
import { modals } from '@/modals/modalsRegistry'
import { useModalStore } from '@/stores/modalStore'

export default Vue.extend({
  name: 'ModalsHost',
  components: { Modal },
  data: () => ({
    modals,
    modalStore: useModalStore(),
  }),
  methods: {
    modalHeader(modalId: string, fallback?: string): string | undefined {
      if (modalId === 'productDetails') {
        return this.modalStore.getParams('productDetails')?.product.title || fallback
      }

      return fallback
    },
    isModalOpen(modalId: string): boolean {
      return Boolean(this.modalStore.byId[modalId as keyof typeof this.modalStore.byId]?.isOpen)
    },
  },
})
</script>
