<template>
  <footer :class="$style.footer">
    <div class="container">
      <nav
        :class="$style.navigation"
        aria-label="Дополнительная навигация"
      >
        <a
          v-for="item in navigation"
          :key="item.href"
          class="text-0px-h5"
          :href="item.href"
        >{{ item.label }}</a>
      </nav>
      <div
        id="contacts"
        :class="$style.contact"
      >
        <a
          class="text-0px-h5"
          href="tel:+78125555555"
        >
          <Icon
            height="16"
            name="phone"
            width="16"
          />
          <span>+7 (812) 555-55-55</span>
        </a>
        <address class="text-0px-h5">
          <Icon
            height="16"
            name="placemark"
            width="16"
          />
          <span>г. Санкт-Петербург, ул. Ефимова, 3</span>
        </address>
      </div>
    </div>
  </footer>
</template>

<script lang="ts">
import Vue from 'vue'
import Icon from '../UI/Icon/Icon.vue'

export default Vue.extend({
  name: 'SiteFooter',
  components: { Icon },
  data: () => ({
    navigation: [
      { label: 'Каталог', href: '#catalog' },
      { label: 'Доставка', href: '#delivery' },
      { label: 'Оплата', href: '#payment' },
      { label: 'Контакты', href: '#contacts' },
      { label: 'О компании', href: '#about' },
    ],
  }),
})
</script>

<style lang="scss" module src="./SiteFooter.module.scss"></style>
