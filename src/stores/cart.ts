import { defineStore } from 'pinia'

const storageKey = 'banki-shop-cart'

const readProductIds = (): string[] => {
  if (typeof window === 'undefined') {
    return []
  }

  try {
    const stored = window.localStorage.getItem(storageKey)
    const productIds = stored ? JSON.parse(stored) : []

    return Array.isArray(productIds) ? productIds : []
  } catch {
    return []
  }
}

const saveProductIds = (productIds: string[]): void => {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(storageKey, JSON.stringify(productIds))
  }
}

export const useCartStore = defineStore('cart', {
  state: () => ({
    productIds: readProductIds(),
    processingIds: [] as string[],
  }),
  actions: {
    buyProduct(productId: string): void {
      if (this.productIds.includes(productId)) {
        this.removeProduct(productId)
        return
      }

      if (this.processingIds.includes(productId)) {
        return
      }

      this.processingIds.push(productId)

      window.setTimeout(() => {
        this.processingIds = this.processingIds.filter((id) => id !== productId)
        this.productIds = [...this.productIds, productId]
        saveProductIds(this.productIds)
      }, 2000)
    },
    removeProduct(productId: string): void {
      this.productIds = this.productIds.filter((id) => id !== productId)
      saveProductIds(this.productIds)
    },
  },
})
