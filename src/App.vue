<template>
  <main :class="$style.app">
    <section :class="$style.section">
      <h1>Шрифт: Merriweather</h1>
      <h2>H1 — 24px bold, int. 36</h2>
      <h3>H2 — 18px regular, int. 27</h3>
      <h4>H3 — 16px bold, int. 24</h4>
      <h4>H4 — 14px bold, int. 21</h4>
      <h5>H5 — 14px regular, int. 21</h5>
      <h6>H6 — 14px light, int. 21</h6>
    </section>

    <section :class="$style.section">
      <h2>Кнопки</h2>
      <div :class="$style.buttons">
        <BaseButton>Нормал</BaseButton>
        <BaseButton disabled>
          Disable
        </BaseButton>
        <BaseButton in-cart>
          В корзине
        </BaseButton>
      </div>
    </section>

    <section :class="$style.section">
      <h2>Поиск</h2>
      <BaseSearch v-model="search" />
    </section>
  </main>
</template>

<script lang="ts">
import Vue from 'vue'
import BaseButton from './components/BaseButton.vue'
import BaseSearch from './components/BaseSearch.vue'

export default Vue.extend({
  components: { BaseButton, BaseSearch },
  data: () => ({
    search: '',
  }),
})
</script>

<style lang="scss" module src="./App.module.scss"></style>
