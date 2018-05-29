import Vue from "vue";
import App from "./App";
import Loading from "components/index/Loading";
/* eslint-disable no-new */
let vm = new Vue({
  el: "#app",
  data: {
    noLowIe: true,
    myAudio: "",
    go: false,
    first: true
  },
  components: {
    App,
    Loading
  },
  template: `<div id="app"><app :my-audio="myAudio" :go="go"></app><loading :go="go"></loading></div>`,
  created() {
    let ie = this.noLowIe;
    if (ie) {
      //加载资源部分
      let myAudio = this.myAudio = new Audio(),
        homeImg = new Image(),
        imgP,
        audioP;
      myAudio.src = "/static/hp.mp3";
      homeImg.src = "/static/home.png";
      myAudio.setAttribute("loop", "true");
      myAudio.setAttribute("autoplay", "true");
      myAudio.pause();
      //检查资源是否全部加载完毕
      imgP = new Promise(resolve => homeImg.onload = () => resolve());
      audioP = new Promise(resolve => myAudio.oncanplaythrough = () => resolve());
      Promise.all([imgP, audioP]).then(() => {
        this.go = true;
        if (this.first) {
          myAudio.play();
          this.first = false;
        }
      });
    }
    this.noLowIe = navigator.appVersion.search((/MSIE [678]/i)) === -1;
  }
});
