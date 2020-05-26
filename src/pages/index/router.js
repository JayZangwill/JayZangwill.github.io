import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/index/home.vue';

Vue.use(Router)

export const router = new Router({
  routes: [{
    path: '/',
    name: 'home',
    component: home,
  }, {
    path: '/about',
    component: () => import(
      /* webpackPrefetch: true */
      /* webpackChunkName: "about" */
      '@/components/index/about.vue'
    ),
  }, {
    path: '/say',
    component: () => import(
      /* webpackPrefetch: true */
      /* webpackChunkName: "say" */
      '@/components/index/say.vue'
    )
  }, {
    path: '*',
    redirect: {
      name: 'home'
    }
  }]
})
