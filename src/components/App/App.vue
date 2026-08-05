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
  </main>
</template>

<script lang="ts">
import Vue from 'vue'
import ProductCard from '../ProductCard/ProductCard.vue'
import SiteFooter from '../SiteFooter/SiteFooter.vue'
import SiteHeader from '../SiteHeader/SiteHeader.vue'
import { products, Product } from '../../data/products'
import { useCartStore } from '../../stores/cart'

export default Vue.extend({
  components: { ProductCard, SiteFooter, SiteHeader },
  data: () => ({
    search: '',
    cart: useCartStore(),
    products,
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
