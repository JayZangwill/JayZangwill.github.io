import Vue from 'vue'
import App from './App.vue'
import {
  getSize
} from '@/common/utils'
import {
  router
} from './router'

Vue.config.productionTip = false

getSize()
window.addEventListener('resize', getSize)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
