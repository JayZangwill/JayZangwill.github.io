<template>
	<div id="app" v-if="noLowIe">
		<div class="menu">
			<a href="/" title="返回主页"><i class="iconfont pull-right">&#xe60a;</i></a>
		</div>
		<div class="container col-md-8 my-container">
			<nav-bar></nav-bar>
			<router-view></router-view>
		</div>
		<bg></bg>
	</div>
	<div :class="{hack:!noLowIe}" v-else>
		<bg></bg>
		您的浏览器版本太低，请更新
	</div>
</template>

<script>
	import Bg from 'components/Index/Bg';
	import NavBar from 'components/Resume/NavBar';
	export default {
		name: 'app',
		data() {
			return {
				noLowIe: true
			}
		},
		components: {
			Bg,
			NavBar
		},
		created() {
			this.noLowIe = navigator.appVersion.search((/MSIE [678]/i)) === -1;
		}
	}
</script>

<style lang="scss">
	@import url("../../asssets/css/bootstrap.min.css");
	@import url("../../common/css/common.css");
	@import url("http://cdn.webfont.youziku.com/webfonts/nomal/91608/46931/58148752f629d8107cfe8864.css");
	$hundred:100;
	.menu{
		overflow: hidden;
		padding: 15px 0;
		i{
			color:#fff;
			font-size: 30px;
			margin-right: 5%;
		}
	}
	.loading {
		position: absolute;
		width: $hundred*1%;
		height: $hundred*1%;
		background: #000;
		text-align: center;
		img {
			width: $hundred*2px;
			height: $hundred*2px;
			margin-top: 15%;
		}
		p {
			color: #fff;
		}
	}
	
	.my-container {
		float: none;
		margin-bottom: 50px;
		border-radius: 10px;
		background-color: rgba(0, 0, 0, 0.6);
	}
</style>