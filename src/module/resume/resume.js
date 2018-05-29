// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import VueRouter from "vue-router";
import routes from "../../routers/resumeRouter.js";
import App from "./App";
import Loading from "components/index/Loading";
/* eslint-disable no-new */
Vue.use(VueRouter);
let router = new VueRouter({
  routes
});
let vm = new Vue({
  el: "#app",
  router,
  data: {
    noLowIe: true,
    go: false
  },
  template: `<div id="app"><app :noLowIe="noLowIe" :go="go"></app><loading :go="go"></loading></div>`,
  components: {
    App,
    Loading
  },
  created() {
    let ie = this.noLowIe;
    if (ie) {
      //加载资源部分
      let homeImg = new Image();
      homeImg.src = "/static/home.png";
      new Promise(resolve => (homeImg.onload = () => resolve())).then(() => {
        this.go = true;
      });
    }
    this.noLowIe = navigator.appVersion.search(/MSIE [678]/i) === -1;
  }
});
