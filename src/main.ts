import Vue from 'vue'
import { createPinia, PiniaVuePlugin } from 'pinia'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
import './styles/main.scss'

import App from './components/App/App.vue'

Vue.use(PiniaVuePlugin)
Vue.component('Swiper', Swiper)
Vue.component('SwiperSlide', SwiperSlide)

const pinia = createPinia()

new Vue({
  pinia,
  render: (h) => h(App),
}).$mount('#app')
