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
    <button
      slot="button-prev"
      class="swiper-button-prev"
      type="button"
      aria-label="Предыдущее изображение"
    />
    <button
      slot="button-next"
      class="swiper-button-next"
      type="button"
      aria-label="Следующее изображение"
    />
  </Swiper>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import type { SwiperOptions } from 'swiper'
import { Swiper } from 'vue-awesome-swiper'

export default Vue.extend({
  name: 'Slider',
  components: { Swiper },
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
        effect: 'fade',
        fadeEffect: { crossFade: true },
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
