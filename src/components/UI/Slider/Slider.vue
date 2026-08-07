<template>
  <Swiper
    :class="$style.slider"
    :options="swiperOptions"
  >
    <slot />
    <div
      slot="pagination"
      class="swiper-pagination"
    />
    <BaseButton
      slot="button-prev"
      :class="[$style.navigationButton, 'swiper-button-prev']"
      aria-label="Предыдущее изображение"
    />
    <BaseButton
      slot="button-next"
      :class="[$style.navigationButton, 'swiper-button-next']"
      aria-label="Следующее изображение"
    />
  </Swiper>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import type { SwiperOptions } from 'swiper'
import { Swiper } from 'vue-awesome-swiper'
import BaseButton from '../BaseButton/BaseButton.vue'

export default Vue.extend({
  name: 'Slider',
  components: { BaseButton, Swiper },
  props: {
    options: {
      type: Object as PropType<SwiperOptions>,
      default: () => ({}),
    },
  },
  computed: {
    swiperOptions(): SwiperOptions {
      return {
        watchOverflow: true,
        slidesPerView: 1,
        spaceBetween: 16,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        ...this.options,
      }
    },
  },
})
</script>

<style lang="scss" module src="./Slider.module.scss"></style>
