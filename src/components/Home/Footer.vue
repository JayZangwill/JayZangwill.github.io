<template>
	<footer>
		<div class="container">
			<div class="row">
				<div class="col-md-6 col-md-offset-3">
					<a href="http://www.miitbeian.gov.cn">桂ICP备16009800号&nbsp;&nbsp;&nbsp;</a>
					<a href="https://github.com/JayZangwill/JayZangwill.github.io" title="帮我点星"><i class="iconfont">&#xe735;</i>代码地址</a>
				</div>
			</div>
		</div>
	</footer>
</template>
<style scoped lang="scss">
	footer {
		background-color: #883f17;
		text-align: center;
		color: #fff;
		.iconfont {
			font-size: 35px;
		}
		a {
			&:link,
			&:visited {
				color: #333;
			}
			&:hover {
				color: #fff;
				text-decoration: none;
			}
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
		}
	}
</script>