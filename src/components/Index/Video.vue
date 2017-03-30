<template>
	<div v-if="pc" class="video">
		<video loop autoplay>
			<source src="/static/home.mp4" type="video/mp4">
		</video>
	</div>
</template>
<style scoped>
	video {
		position: fixed;
		right: 0;
		bottom: 0;
		z-index: -100;
		
		width: auto;
		min-width: 100%;
		height: auto;
		min-height: 100%;
		
		object-fit: cover;
	}
</style>
<script>
	export default {
		name: 'Video',
		data() {
			return {
				pc: true
			}
		},
		created() {
			var userAgentInfo = navigator.userAgent,
				/*返回用户代理头的字符串表示(就是包括浏览器版本信息等的字符串)*/
				Agents = ["Android", "iPhone",
					"SymbianOS", "Windows Phone",
					"iPad", "iPod"
				];
			for(var v = 0; v < Agents.length; v++) {
				if(userAgentInfo.indexOf(Agents[v]) > 0) { /*如果返回的信息里有上面的字符串*/
					this.pc = false;
					break;
				}
			}
		}
	}
</script>