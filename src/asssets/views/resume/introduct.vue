<template>
	<div class="col-md-12 text-center">
		<div class="photo">
			<img src="../../img/tt.jpg" alt="我的帅照">
		</div>
		<div class="info">
			<div class="row">
				<div class="col-md-6 text-center">
					姓名：张杰
				</div>
				<div class="col-md-6 text-center">
					学校：安阳工学院
				</div>
			</div>
			<div class="row">
				<div class="col-md-6 text-center">
					专业：网络工程 本科
				</div>
				<div class="col-md-6 text-center">
					毕业时间：2018.6
				</div>
			</div>
			<div class="row">
				<div class="col-md-6 text-center">
					手机：17839191579
				</div>
				<div class="col-md-6 text-center">
					邮箱：jayzangwill@gmail.com
				</div>
			</div>
			<div class="row">
				<div class="col-md-12 text-center">
					求职意向：前端工程师
				</div>
			</div>
		</div>
		<div class="divi"></div>
		<div class="introduct">
			<h2 class="text-center">简单介绍</h2>
			<p>开源项目：
				<a href="https://github.com/henanjs">河南前端交流群</a>
				维护者之一，开源项目
				<a href="https://github.com/JayZangwill/lightings">lightings</a>
				拥有者，
				<a href="https://github.com/InfoTechLab/InfoTechLab.github.io">安阳工学院信息技术实验室主页</a>
				维护者之一。擅长数据交互和团队合作，注重代码的规范性和性能优化。常用昵称
				<a href="https://www.baidu.com/s?ie=UTF-8&wd=Jayzangwill">Jay Zangwill</a>
				行走于各大网站行走于各大网站： 
				<a href="https://github.com/JayZangwill">github</a>、
				<a href="https://www.zhihu.com/people/zhang-jie-24-34-16/activities">知乎</a>&&
				<a href="https://zhuanlan.zhihu.com/jayzangwill">知乎专栏</a>、
				<a href="https://gold.xitu.io/user/580638362e958a0055ecba7f">掘金</a>、
				<a href="https://segmentfault.com/u/jayzangwill">segmentfault</a>等等。</p>
			<p>另外，还有
				<a href="http://www.jayzangwill.cn/">个人主页</a>、
				<a href="https://jayzangwill.github.io/blog/">博客</a>可供参观。</p>
		</div>
	</div>
</template>
<style scoped lang="scss">
	$white:#fff;
	$coffee:#B4531E;
	
	.photo {
		overflow: hidden;
		
		margin: 20px 0;
		img {
			border-radius: 50%;
		}
	}
	
	.info {
		font-size: 20px;
		
		color: $white;
		
		-webkit-user-select: text;
		-moz-user-select: text;
		-ms-user-select: text;
		user-select: text;
	}
	
	.row {
		margin: 10px 0;
	}
	
	.introduct {
		margin: 20px 0;
		
		font-size: 18px;
		text-align: left;
		
		color: $white;
		p {
			text-indent: 40px;
			a {
				&:link,
				&:visited {
					color: $coffee;
				}
				&:hover {
					text-decoration: none;
					
					color: lighten($coffee, 20%);
				}
			}
			span {
				color: $coffee;
			}
		}
	}
	
	.divi {
		border: 1px solid $white;
		width: 100%;
	}
</style>