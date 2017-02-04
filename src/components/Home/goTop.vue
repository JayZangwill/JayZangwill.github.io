<template>
	<div>
		<transition @before-enter="beforeEnter" @enter="enter" @leave="leave">
			<div @click="goTop" v-if="show" class="toTop"></div>
		</transition>
	</div>
</template>
<style lang="scss">
	.toTop {
		position: fixed;
		height: 36px;
		width: 36px;
		right: 10px;
		bottom: 10px;
		background: {
			image: url(../../asssets/img/top.png);
			repeat: no-repeat;
			position: 0px 0px;
		}
		cursor: pointer;
		transition: background-position 0.1s;
		&:hover {
			background-position: -38px 0px;
		}
	}
</style>
<script>
	export default {
		name: "goTop",
		data() {
			return {
				show: false
			}
		},
		created: function() {
			var scrollTop,
				self = this;
			window.addEventListener('scroll',
				function() {
					scrollTop = document.documentElement && document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop;
					scrollTop >= 200 ? self.show = true : self.show = false;
				});
		},
		methods: {
			goTop: function() {
				$('body,html').animate({
					scrollTop: 0
				}, 500);
				return false;
			},
			beforeEnter: function(el) {
				el.style.opacity = 0;
			},
			enter: function(el, done) {
				Velocity(el, {
					opacity: 1
				}, {
					duration: 500
				});
				done();
			},
			leave: function(el, done) {
				Velocity(el, {
					opacity: 0
				}, {
					duration: 500
				});
			}
		}
	}
</script>