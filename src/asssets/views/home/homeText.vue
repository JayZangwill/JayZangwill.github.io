<template>
	<div>
		<div class="container artic">
			<h1>文章精选<a class="pull-right" target="_blank" href="https://github.com/JayZangwill/blog" title="更多文章">更多文章>></a></h1>
			<div class="divi"></div>
			<div class="row">
				<div class="col-md-6">
					<div class="thumbnail">
						<img src="../../img/box.png" alt="css盒模型与定位">
						<div class="caption">
							<h3 class="text-center">css盒模型与定位</h3>
							<p>说到css的盒子模型和定位相信大家一定都听说过，因为它们是css中的基础，同时也是难点，这篇文章的作用在于基础知识的扫盲。
								<p class="text-center">
									<a target="_blank" href="https://jayzangwill.github.io/blog/2016/12/15/css%E7%9B%92%E6%A8%A1%E5%9E%8B%E4%B8%8E%E5%AE%9A%E4%BD%8D/#more" class="btn btn-primary" role="button">阅读全文</a>
								</p>
						</div>
					</div>
				</div>
				<div class="col-md-6">
					<div class="thumbnail">
						<img src="../../img/js.png" alt="javscript的数据类型">
						<div class="caption">
							<h3 class="text-center">javscript的数据类型</h3>
							<p>之前学到javascript的数据类型时遇到了一些困惑，因为之前和一些大神交流和自己百度+谷歌查到的还有在红宝书上看到的答案不一样，最近通过查阅了一些资料终于把自己的困惑解决了，现在来写一些笔记记录记录</p>
							<p class="text-center">
								<a target="_blank" href="https://jayzangwill.github.io/blog/2016/11/07/javscript%E7%9A%84%E6%95%B0%E6%8D%AE%E7%B1%BB%E5%9E%8B/#more" class="btn btn-primary" role="button">阅读全文</a>
							</p>
						</div>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-md-6">
					<div class="thumbnail">
						<img src="../../img/css3.png" alt="css3(1)">
						<div class="caption">
							<h3 class="text-center">学习css3(1)</h3>
							<p>自从css3问世以后，以前很多只能用js写的特效现在用几行简简单单的css代码就能搞定了，让我们一起来探索css3的世界吧</p>
							<p class="text-center">
								<router-link to="/css1" class="btn btn-primary">阅读全文</router-link>
							</p>
						</div>
					</div>
				</div>
				<div class="col-md-6">
					<div class="thumbnail">
						<img src="../../img/css3.png" alt="css3(2)">
						<div class="caption">
							<h3 class="text-center">学习css3(2)</h3>
							<p>这次我们来研究研究如何用css实现3d翻转的效果</p>
							<br>
							<p class="text-center">
								<router-link to="/css2" class="btn btn-primary">阅读全文</router-link>
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
<go-top></go-top>
	</div>
</template>

<style scoped lang="scss">
	h1 {
		a {
			margin-top: 20px;
			
			font-size: 20px;
		}
	}
	
	.artic {
		margin-top: 30px;
	}
	
	.thumbnail {
		-webkit-box-shadow: 5px 5px 5px gray;
		-moz-box-shadow: 5px 5px 5px gray;
		box-shadow: 5px 5px 5px gray;
	}
	
	.breadcrumb {
		margin-top: 20px;
		
		background-color: #ddd;
	}
	
	.divi {
		margin: 10px auto;
		border: 1px solid gray;
	}
</style>
<script>
import goTop from 'components/Home/goTop';
	export default {
		name: 'homeText',
		data() {
			return {
				show: false
			}
		},
		components:{
			goTop
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