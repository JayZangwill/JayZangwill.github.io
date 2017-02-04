<template>
	<header>
		<img src="/static/home.png" alt="head">
		<transition-group appear v-on:appear="customAppearHook">
			<h1 key="one">路途遥远</h1>
			<h2 key="two">勿忘初心</h2>
			<h3 key="three">方得始终</h3>
			<p key="p">欢迎来到Zangwill世界</p>
		</transition-group>
	</header>
</template>
<style scoped lang="scss">
	@mixin h($left, $top) {
		position: absolute;
		color: #fff;
		opacity: 0;
		left: $left;
		top: $top;
	}
	
	header {
		height: 400px;
		overflow: hidden;
		position: relative;
		box-shadow: 7px 7px 7px;
		img {
			width: 100%;
			position: absolute;
		}
		@for $i from 1 through 3 {
			h#{$i} {
				@include h(12%+$i*3, 5%+$i*15);
			}
		}
		p {
			@include h(18%, 70%);
		}
	}
	
	@media (max-width: 711px) {
		header img {
			width: 711px;
		}
	}
</style>
<script>
	export default {
		name: 'NavBar',
		data() {
			return {
				links: [{
					href: "home.html",
					info: "首页"
				}, {
					href: "say.html",
					info: "甜言蜜语"
				}, {
					href: "about.html",
					info: "关于我"
				}]
			}
		},
		methods: {
			customAppearHook(el,done) {
				Velocity(el, {
					opacity: 1
				}, {
					duration: 3000
				}, {
					complete: done
				});
			}
		}
	}
</script>