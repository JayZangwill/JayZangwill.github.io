// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import $ from 'jquery';
import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from '../../routers/routers.js';
import Velocity from 'velocity-animate';
import App from './App';
/* eslint-disable no-new */
window.jQuery=window.$=$;
Vue.use(VueRouter);
let router = new VueRouter({
  routes
});
let vm = new Vue({
	el: '#app',
	router,
	data: {
		noLowIe: true,
	},
	template: '<App />',
	components: {
		App
	}
});