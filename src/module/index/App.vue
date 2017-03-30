<template>
	<div id="app" v-if="noLowIe">
			<clock v-show="go"></clock>
			<!--加载图片和时钟的显示由父组件传进来的go决定-->
		<div :class="{loading:!go}" v-if="!go">
			<img src="../../asssets/img/timg.gif" alt="loading">
			<p>加载中 ......</p>
		</div>
		<div v-else>
			<!--继续将获得的myAudio往子组件传:myAudio是子组件对应的prop变量名，如果这里去掉一个o子组件里的prop的这个也要去掉o-->
			<audio-switch :myAudio="myAudio"></audio-switch>
			<bg></bg>
			<name></name>
			<links></links>
			<my-video></my-video>
		</div>
	</div>
	<div :class="{hack:!noLowIe}" v-else>
		<bg></bg>
		您的浏览器版本太低，请更新
	</div>
</template>

<script>
	import Clock from 'components/Index/Clock';
	import Name from 'components/Index/Name';
	import Bg from 'components/Index/Bg';
	import Links from 'components/Index/Links';
	import Video from 'components/Index/Video';
	import AudioSwitch from 'components/Index/AudioSwitch';
	export default {
		name: 'app',
		props: ["myAudio", "go"],
		data(){
			return {
				noLowIe:true
			}
		},
		components: {
			Clock,
			Name,
			Bg,
			Links,
			"my-video": Video,
			"my-audio": Audio,
			AudioSwitch
		},
		created(){
			this.noLowIe = navigator.appVersion.search((/MSIE [678]/i)) === -1;
		}
	}
</script>

<style lang="scss">
	@import url("../../common/css/common.css");
	@import url("http://cdn.webfont.youziku.com/webfonts/nomal/91608/46931/58148752f629d8107cfe8864.css");
	.loading{
		position: absolute;
		width: 100%;
		height: 100%;
		background: #000;
		text-align: center;
		img{
			width:200px;
			height: 200px;
			margin-top: 15%;
		}
		p{
			color: #fff;
		}
	}
</style>