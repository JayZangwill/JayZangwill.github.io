import Vue from 'vue'
import Router from 'vue-router'
import introduct from '@/components/resume/introduct.vue'
import experience from '@/components/resume/experience.vue'
import skills from '@/components/resume/skills.vue'
import work from '@/components/resume/work.vue'

Vue.use(Router)

export const router = new Router({
  routes: [{
    path: '/',
    name: 'introduct',
    component: introduct,
  }, {
    path: '/experience',
    component: experience,
  }, {
    path: '/skills',
    component: skills
  }, {
    path: '/work',
    component: work
  }, {
    path: '*',
    redirect: {
      name: 'introduct'
    }
  }]
})
