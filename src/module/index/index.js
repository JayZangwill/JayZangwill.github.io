import Vue from 'vue';
import Velocity from 'velocity-animate';
import App from './App';
/* eslint-disable no-new */
var vm = new Vue({
	el: '#app',
	data: {
		noLowIe: true,
		myAudio: "",
		go: false,
		first:true
	},
	template: '<App :myAudio="myAudio" :go="go"></App>',
	components: {
		App
	},
	methods: {
		loading() {
			var ie = this.noLowIe;
			if(ie) {
				//加载资源部分
				var myAudio = this.myAudio = new Audio(),
					homeImg = new Image(),
					count = 0,
					self = this;
				myAudio.src = "/static/hp.mp3";
				homeImg.src = "/static/home.png";
				myAudio.setAttribute("loop","true");
				myAudio.setAttribute("autoplay","true");
				//检查资源是否全部加载完毕
				homeImg.onload = function() {
					count++;
					if(count === 2) {
						self.go = true;
						myAudio.play();
					}
				};
				myAudio.oncanplaythrough = function() {
					if(self.first) {
						count++;
						myAudio.pause();
						if(count === 2) {
							self.go = true;
							myAudio.play();
						}
						self.first=false;
					}
				};
			}
		},
		isLowIe(){
			this.noLowIe = navigator.appVersion.search((/MSIE [678]/i)) === -1;
		}
	}
});
vm.isLowIe();
vm.loading();