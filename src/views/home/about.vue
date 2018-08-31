<template>
	<div class="container">
		<h1>关于我</h1>
		<div class="divi"></div>
		<div class="row">
			<div class="col-md-10">
				<article>
					<p>一张坏坏的笑脸，连两道浓浓的眉毛也泛起柔柔的涟漪，一副放荡不羁的笑意，色而不淫的页面设计，风流而不下流的代码风格，帅气中又带着一抹温柔专注的半仙。</p>
					<p>常用昵称Jay Zangwill穿梭于各大网站，喜欢探索未知，特别喜欢睡觉。</p>
				</article>
			</div>
			<div class="col-md-2">
				<h3 class="data-title">资料卡</h3>
				<p>昵称：Jay Zangwill</p>
				<p>爱好：web前端，乒乓球，台球，看动漫，cosplay，装X等</p>
				<p>履历：</p>
				<ul class="experience">
					<li>2017.5~2018.4 搜狗搜索事业部前端重构师（实习生）</li>
					<li>2018.5~今 鱼泡泡技术部前端开发工程师</li>
				</ul>
				<div class="text-center">
					<img src="../../assets/img/touxiang.jpg" alt="头像">
				</div>
			</div>
		</div>
	</div>
</template>
<style lang="scss" scoped>
article {
    font-size: 20px;
}

article p {
    text-indent: 25px;
}

.col-md-2 p {
    margin-bottom: 0;
    padding-top: 10px;
    font-size: 15px;
}

.col-md-10 {
    border-right: dotted 1px black;
}

.data-title {
    margin: 0;
}

.experience {
    padding-left: 0;
    font-size: 15px;
    li + li {
        padding-top: 5px;
    }
}
</style>
