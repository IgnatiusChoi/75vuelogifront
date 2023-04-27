import Vue from 'vue'
import {
  ToastPlugin, ModalPlugin, BootstrapVue, BootstrapVueIcons,
} from 'bootstrap-vue'
import VueCompositionAPI from '@vue/composition-api'

import Vuex from 'vuex'

import router from './router'
import store from './store'
import App from './App.vue'

// Global Components
import './global-components'

// 3rd party plugins
import '@/libs/portal-vue'
// 안내문 전역으로 사용가능
import '@/libs/toastification'
import '@/libs/sweet-alerts'

// v필터
import { formatDate } from './utils/filters'

// BSV Plugin Registration
Vue.use(ToastPlugin)
Vue.use(ModalPlugin)
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)

Vue.use(ToastPlugin) // alert창
Vue.use(ModalPlugin) // 모달

// Composition API
Vue.use(VueCompositionAPI)
// 필터등록
Vue.filter('formatDate', formatDate)
// import core styles
require('@core/scss/core.scss')

// import assets styles
require('@/assets/scss/style.scss')

Vue.config.productionTip = false

new Vue({
  router,
  store,
  Vuex,
  render: h => h(App),
}).$mount('#app')
