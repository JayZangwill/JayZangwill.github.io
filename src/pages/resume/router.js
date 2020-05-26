import Vue from 'vue'
import Router from 'vue-router'
import introduct from '@/components/resume/introduct';

Vue.use(Router)

export const router = new Router({
  routes: [{
    path: '/',
    name: 'introduct',
    component: introduct,
  }, {
    path: '/experience',
    component: () => import(
     /* webpackPrefetch: true */
     /* webpackChunkName: "experience" */
    '@/components/resume/experience.vue'
  ),
  }, {
    path: '/skills',
    component: () => import(
      /* webpackPrefetch: true */
      /* webpackChunkName: "skill" */
     '@/components/resume/skills.vue'
    ),
  }, {
    path: '/work',
    component: () => import(
       /* webpackPrefetch: true */
       /* webpackChunkName: "work" */
      '@/components/resume/work.vue'
    ),
  }, {
    path: '*',
    redirect: {
      name: 'introduct'
    }
  }]
})
