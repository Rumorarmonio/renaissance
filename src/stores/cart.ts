import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    productIds: [] as string[],
  }),
})
