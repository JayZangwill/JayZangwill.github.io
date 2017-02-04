<template>
	<div class="name-wrap">
		<h1 title="点我" @click="show=!show">{{msg}}</h1>
		<transition v-on:before-enter="beforeEnter" v-on:enter="enter" v-on:leave="leave" v-bind:css="false">
			<p class="introduct" v-if="show">
				{{introduct}}
			</p>
		</transition>
	</div>
</template>

<style scoped lang="scss">
	.name-wrap {
		position: relative;
	}
	
	.introduct {
		position: absolute;
		top: 0;
		left: 0;
		color: #fff;
		width: 320px;
		text-indent: 32px;
		background: rgb(180, 83, 30);
		border-radius: 10px;
		z-index: -1;
		padding:0 10px;
	}
</style>

<script>
	export default {
		name: 'name',
		data() {
			return {
				msg: 'Jay Zangwill',
				introduct: "一张坏坏的笑脸，连两道浓浓的眉毛也泛起柔柔的涟漪，一副放荡不羁的笑意，色而不淫的页面设计，风流而不下流的代码风格，帅气中又带着一抹温柔和专注的半仙",
				show: false
			}
		},
		methods: {
			beforeEnter: function(el) {
				el.style.opacity = 0;
			},
			enter: function(el, done) {
				Velocity(el, {
					opacity: .7,
					top: "-105%"
				}, {
					duration: 1000
				}, {
					complete: done
				});
			},
			leave: function(el, done) {
				Velocity(el, {
					opacity: 0,
					top: "0%"
				}, {
					duration: 1000
				}, {
					complete: done
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.name-wrap {
		width: 320px;
		margin: 0 auto;
		text-align: center;
		h1 {
			font-family: 'SnellRoundhand6b559e215165d8';
			font-size: 40px;
			color: #fff;
			cursor: pointer;
		}
	}
</style>