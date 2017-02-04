<template>
	<div class="bg-img">
		<img src="/static/home.png" alt="主页图片">
	</div>
</template>
<style scoped lang="scss">
.bg-img {
	position: fixed;
	right: 0;
	bottom: 0;
	min-width: 100%;
	min-height: 100%;
	width: auto;
	height: auto;
	background-color: #000;
	z-index: -200;
	img{
		min-width: 100%;
		min-height: 100%;
	}
}
</style>