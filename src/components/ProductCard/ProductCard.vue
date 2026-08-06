<template>
  <article :class="[$style.card, { [$style.sold]: product.sold }]">
    <button
      :class="$style.imageButton"
      type="button"
      @click="$emit('details', product.id)"
    >
      <img
        :class="$style.image"
        :src="product.image"
        :alt="`${product.title}, ${product.artist}`"
      />
    </button>
    <div :class="$style.content">
      <h2 :class="[$style.title, 'text-0px-h2']">
        <button
          :class="$style.titleButton"
          type="button"
          @click="$emit('details', product.id)"
        >
          {{ product.title }}
        </button>
      </h2>
      <p :class="[$style.artist, 'text-0px-h2']">
        {{ product.artist }}
      </p>

      <div
        v-if="product.sold"
        :class="[$style.soldLabel, 'text-0px-h3']"
      >
        {{ product.price }}
      </div>
      <div
        v-else
        :class="$style.purchase"
      >
        <div :class="$style.prices">
          <del
            v-if="product.oldPrice"
            :class="[$style.oldPrice, 'text-0px-h6']"
          >
            {{ product.oldPrice }}
          </del>
          <strong :class="[$style.price, 'text-0px-h3']">{{ product.price }}</strong>
        </div>
        <BaseButton
          :disabled="processing"
          :in-cart="inCart"
          @click="$emit('buy', product.id)"
        >
          {{ inCart ? 'В корзине' : processing ? 'Обработка' : 'Купить' }}
        </BaseButton>
      </div>
    </div>
  </article>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { Product } from '@/data/products'
import BaseButton from '@/components/UI/BaseButton/BaseButton.vue'

export default Vue.extend({
  name: 'ProductCard',
  components: { BaseButton },
  props: {
    product: {
      type: Object as PropType<Product>,
      required: true,
    },
    inCart: Boolean,
    processing: Boolean,
  },
})
</script>

<style lang="scss" module src="./ProductCard.module.scss"></style>
