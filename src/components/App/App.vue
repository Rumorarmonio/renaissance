<template>
  <main :class="$style.app">
    <SiteHeader
      :search="search"
      @input="search = $event"
      @submit="search = $event"
    />

    <section
      id="catalog"
      :class="$style.catalog"
    >
      <div class="container">
        <h1 :class="[$style.heading, 'text-0px-h1']">
          Картины эпохи Возрождения
        </h1>
        <section :class="$style.modalDemo" aria-labelledby="modal-demo-title">
          <h2 id="modal-demo-title" :class="$style.modalDemoTitle">Демонстрация модальных окон</h2>
          <div :class="$style.modalButtons">
            <button
              v-for="button in modalButtons"
              :key="button.label"
              :class="$style.modalButton"
              type="button"
              @click="button.action"
            >
              {{ button.label }}
            </button>
          </div>
        </section>
        <div
          v-if="filteredProducts.length"
          :class="$style.grid"
        >
          <ProductCard
            v-for="product in filteredProducts"
            :key="product.id"
            :in-cart="cart.productIds.includes(product.id)"
            :processing="cart.processingIds.includes(product.id)"
            :product="product"
            @buy="buyProduct"
          />
        </div>
        <p
          v-else
          :class="[$style.empty, 'text-0px-h2']"
        >
          По вашему запросу ничего не найдено.
        </p>
      </div>
    </section>

    <SiteFooter />
    <ModalsHost />
  </main>
</template>

<script lang="ts">
import Vue from 'vue'
import ProductCard from '../ProductCard/ProductCard.vue'
import SiteFooter from '../SiteFooter/SiteFooter.vue'
import SiteHeader from '../SiteHeader/SiteHeader.vue'
import ModalsHost from '../../modals/ModalsHost.vue'
import { openErrorModal, openModal, openStatusModal, openSuccessModal } from '../../modals/modalActions'
import { products, Product } from '../../data/products'
import { useCartStore } from '../../stores/cart'

export default Vue.extend({
  components: { ModalsHost, ProductCard, SiteFooter, SiteHeader },
  data: () => ({
    search: '',
    cart: useCartStore(),
    products,
    modalButtons: [
      { label: 'Открыть левую', action: () => openModal('demoLeft') },
      { label: 'Открыть центральную', action: () => openModal('demoCenter') },
      { label: 'Открыть правую', action: () => openModal('demoRight') },
      { label: 'Success', action: () => openSuccessModal({ message: 'Операция выполнена успешно.' }) },
      { label: 'Error', action: () => openErrorModal({ message: 'Не удалось выполнить операцию.' }) },
      { label: 'Neutral', action: () => openStatusModal({ variant: 'neutral', title: 'Информация', message: 'Это нейтральное информационное сообщение.' }) },
    ],
  }),
  computed: {
    filteredProducts(): Product[] {
      const query = this.search.trim().toLocaleLowerCase()

      if (!query) {
        return this.products
      }

      return this.products.filter((product) =>
        `${product.title} ${product.artist}`.toLocaleLowerCase().includes(query),
      )
    },
  },
  methods: {
    buyProduct(productId: string): void {
      this.cart.buyProduct(productId)
    },
  },
})
</script>

<style lang="scss" module src="./App.module.scss"></style>
