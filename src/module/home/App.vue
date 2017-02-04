<template>
	<div id="app" v-if="noLowIe">
			<nav-bar></nav-bar>
			<head-img></head-img>
			<router-view></router-view>
			<my-footer></my-footer>
	</div>
	<div :class="{hack:!noLowIe}" v-else>
		<bg></bg>
		您的浏览器版本太低，请更新
	</div>
</template>

<script>
	import Bg from 'components/Index/Bg';
	import NavBar from 'components/Home/NavBar';
	import HeadImg from 'components/Home/HeadImg';
	import MyFooter from 'components/Home/Footer';
	export default {
		name: 'app',
		data(){
			return {
				noLowIe:true
			}
		},
		components: {
			NavBar,
			Bg,
			HeadImg,
			MyFooter
		},
		created() {
			this.noLowIe = navigator.appVersion.search((/MSIE [678]/i)) === -1;
		}
	}
</script>

<style lang="scss">
	@import url("../../asssets/css/bootstrap.min.css");
	@import url("../../common/css/common.css");
	body{
		padding-top: 50px;
	}
</style>