<template>
	<div class="skill">
		<div class="row">
			<div class="col-md-12 describe">
				<h3>个人技能</h3>
				<h4 class="sub-title">Code：</h4>
				<ul>
					<li>熟练使用 HTML 、DIV + CSS 布局（包括 flex 布局），能写出符合 W3C 标准且富有语义化的结构。能够独立解决大部分浏览器、移动端兼容问题。</li>
					<li>热衷于研究原生 JavaScript 熟悉 ES5/ES6 ，熟悉其原型、闭包、继承，且了解一些JavaScript的坑点。日常使用 SCSS 、ES5/ES6 进行开发。</li>
					<li>熟练使用 jQuery ，并阅读过其部分源码，了解其无 new 操作、链式调用、对象扩展等原理。</li>
					<li>熟悉 Vue 框架了解其双向数据绑定原理，能够熟练使用vue、vue-router、vuex、axios进行页面开发。实习期间，主动推动 Vue 在团队内部的使用。另外，自己用vue + webpack搭建了自己的
						<a href="http://www.jayzangwill.cn/">个人主页</a>。</li>
					<li>玩过node + express + mongodb 曾利用node + express + mongodb + 自己的前端技能搭建出
						<a href="http://www.jayzangwill.cn/bank-card/">银行卡管理系统</a>。</li>
					<li>玩过微信小程序，在实习期间完成了清华入学助手（可在微信上搜到）小程序的静态页面和交互效果，了解小程序的一些坑点。</li>
					<li>基础知识扎实，熟悉 HTTP 协议、常见状态码、浏览器缓存机制，了解 JavaScript 一些设计模式。</li>
				</ul>
			</div>
		</div>
		<div class="row">
			<div class="col-md-12 describe">
				<h4>Tools</h4>
				<ul>
					<li>熟练使用 gulp 、webpack ，并能独立配置一些常用的配置，为了平时个人开发方便，自己为自己定制了
						<a href="https://github.com/JayZangwill/myTools/tree/master/gulp">gulp</a> 和
						<a href="https://github.com/JayZangwill/vue-multipage">webpack</a> 的配置。同时能够使用 Git&GitHub 或 SVN 进行团队合作。</li>
					<li>能够熟练使用 PS 还原设计稿和切图。</li>
				</ul>
			</div>
		</div>
		<div class="row">
			<div class="col-md-12 describe">
				<h4>Design：</h4>
				<ul>
					<li>因实习期间和设计师交流频繁，所以在不自觉中培养了自己的审美能力，能够对产品的 UI 与 UE 设计提出自己的想法，细节强迫症和代码洁癖。</li>
					<li>注重代码的规范性（代码那么乱以后怎么维护），追求简洁且高性能的代码（页面打开那么慢给谁看）。</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<style scoped lang="scss">
.sub-title {
    margin-left: 10px;
}

.describe {
    margin-bottom: 25px;
    color: #fff;
    li {
        list-style-type: circle;
        font-size: 16px;
        a {
            &:link,
            &:visited {
                color: #b4531e;
            }
            &:hover {
                text-decoration: none;
                color: lighten(#b4531e, 20%);
            }
        }
    }
}
</style>