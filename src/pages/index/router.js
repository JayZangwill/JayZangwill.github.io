import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/index/home.vue'
import about from '@/components/index/about.vue'
import say from '@/components/index/say.vue'

Vue.use(Router)

export const router = new Router({
  routes: [{
    path: '/',
    name: 'home',
    component: home,
  }, {
    path: '/about',
    component: about,
  }, {
    path: '/say',
    component: say
  }, {
    path: '*',
    redirect: {
      name: 'home'
    }
  }]
})
