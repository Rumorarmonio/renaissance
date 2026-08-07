<template>
  <header :class="$style.header">
    <div class="container">
      <nav
        :class="$style.navigation"
        aria-label="Основная навигация"
      >
        <a
          v-for="item in navigation"
          :key="item.href"
          class="text-0px-h5"
          :href="item.href"
          >{{ item.label }}</a
        >
      </nav>
      <BaseSearch
        :class="$style.search"
        input-id="catalog-search"
        label=""
        placeholder="Поиск по названию картины"
        :value="search"
        @input="$emit('input', $event)"
        @submit="$emit('submit', $event)"
      />
    </div>
  </header>
</template>

<script lang="ts">
import Vue from 'vue'
import BaseSearch from '@/components/UI/BaseSearch/BaseSearch.vue'
import { navigation } from '@/data/navigation'

export default Vue.extend({
  name: 'SiteHeader',
  components: { BaseSearch },
  props: {
    search: {
      type: String,
      default: '',
    },
  },
  data: () => ({
    navigation,
  }),
})
</script>

<style lang="scss" module src="./SiteHeader.module.scss"></style>
