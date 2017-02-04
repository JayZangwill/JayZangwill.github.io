<template>
	<div class="container">
		<h3 @click="toggleDuoshuoComments('#comment-box');">看不到评论框的话点我</h3>
		<hr/>
		<div class="row">
			<div class="col-md-12">
				<div id="comment-box"></div>
				<!-- 多说评论框 start -->
				<div class="ds-thread" data-thread-key="jayz" data-title="留言板" data-url="http://jayz.coding.io/say.html"></div>
			</div>
		</div>
	</div>
</template>
<style scoped>
	h3{
		cursor: pointer;
	}
</style>
<script>
	export default {
		name: 'say',
		methods: {
			toggleDuoshuoComments: function(container) {
				var el = document.createElement('div'); //该div不需要设置class="ds-thread"
				el.setAttribute('data-thread-key', 'jayz'); //必选参数
				el.setAttribute('data-url', 'http://jayz.coding.io/say.html'); //必选参数
				DUOSHUO.EmbedThread(el);
				$(container).append(el);
			}
		}
	}
</script>