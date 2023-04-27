import Vue from 'vue'
import Toast from 'vue-toastification'

// Toast Notification Component Styles
import '@core/scss/vue/libs/toastification.scss'

// 에러핸들링
Vue.config.errorHandler = e => {
  console.error(e)
  if (Vue.$toast) {
    Vue.$toast.error(e.message)
  }

  // 성공시

  Vue.use(Toast, {
    position: 'top-center',
    hideProgressBar: true,
    closeOnClick: false,
    closeButton: false,
    icon: true,
    timeout: 3000,
    transition: 'Vue-Toastification__fade',
  })
}
