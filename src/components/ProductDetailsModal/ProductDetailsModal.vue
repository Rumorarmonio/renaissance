<template>
  <div
    v-if="product"
    :class="$style.details"
  >
    <Slider :options="sliderOptions">
      <SwiperSlide
        v-for="(image, index) in images"
        :key="`${product.id}-${index}`"
      >
        <img
          :class="$style.image"
          :src="image"
          :alt="`${product.title}, изображение ${index + 1}`"
        >
      </SwiperSlide>
    </Slider>

    <div :class="$style.info">
      <p :class="$style.artist">{{ product.artist }}</p>
      <p :class="$style.description">{{ product.description }}</p>
      <div :class="$style.footer">
        <div :class="$style.prices">
          <del v-if="product.oldPrice">{{ product.oldPrice }}</del>
          <strong>{{ product.price }}</strong>
        </div>
        <BaseButton
          v-if="!product.sold"
          :disabled="processing"
          :in-cart="inCart"
          @click="buy"
        >
          {{ inCart ? 'В корзине' : processing ? 'Обработка' : 'Купить' }}
        </BaseButton>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { SwiperSlide } from 'vue-awesome-swiper'
import BaseButton from '@/components/UI/BaseButton/BaseButton.vue'
import Slider from '@/components/UI/Slider/Slider.vue'
import type { Product } from '@/data/products'
import type { ProductDetailsModalParams } from '@/modals/types'
import { useCartStore } from '@/stores/cart'
import { useModalStore } from '@/stores/modalStore'

export default Vue.extend({
  name: 'ProductDetailsModal',
  components: { BaseButton, Slider, SwiperSlide },
  data: () => ({
    cart: useCartStore(),
    modalStore: useModalStore(),
    sliderOptions: {
      pagination: { el: '.swiper-pagination', clickable: true },
    },
  }),
  computed: {
    product(): Product | null {
      return (this.modalStore.getParams('productDetails') as ProductDetailsModalParams | undefined)?.product || null
    },
    images(): string[] {
      return this.product?.images?.length ? this.product.images : this.product ? [this.product.image] : []
    },
    inCart(): boolean {
      return Boolean(this.product && this.cart.productIds.includes(this.product.id))
    },
    processing(): boolean {
      return Boolean(this.product && this.cart.processingIds.includes(this.product.id))
    },
  },
  methods: {
    buy(): void {
      if (this.product) {
        this.cart.buyProduct(this.product.id)
      }
    },
  },
})
</script>

<style lang="scss" module src="./ProductDetailsModal.module.scss"></style>
