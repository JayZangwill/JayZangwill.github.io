import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import {
  router
} from './router'

Vue.config.productionTip = false

axios.interceptors.response.use(({data}) => data.status === 200 ? Promise.resolve(data.result) : Promise.reject(data.message))

Vue.prototype.$axios = axios

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
