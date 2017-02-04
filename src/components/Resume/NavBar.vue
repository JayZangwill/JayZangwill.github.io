<template>
	<div class="nav">
		<ul>
			<li v-for="link in links">
				<router-link active-class="actived" :to="link.href"><i class="iconfont" v-html="link.icon"></i><br><span>{{link.info}}</span></router-link>
			</li>
		</ul>
	</div>
</template>
<style scoped lang="scss">
	.nav {
		$height: 100px;
		width: 90%;
		li {
			display: inline-block;
			width: 31%;
			height: $height;
			line-height: $height/2;
			text-align: center;
			&:nth-child(2) {
				margin: 0 1.15%;
			}
			a {
				display: block;
				font-size: 20px;
				height: 100%;
				text-decoration: none;
				transition: all ease-in .4s;
				border-radius: 0 0 10px 10px;
				span{
					@media screen and (max-width:768px){
						display:none;
					}
				}
				.iconfont{
					font-size: 25px;
					@media screen and (max-width:768px){
						font-size: 30px;
						line-height: 100px;
					}
				}
				&:hover {
					background-color: #b4531e;
				}
				&:link,
				&:visited {
					color: darken(#fff, 30%);
				}
				&:hover {
					color: #fff;
				}
			}
		}
	}
	
	.actived {
		background-color: #b4531e;
		&:link,
		&:visited,
		&:hover {
			color: #fff !important;
		}
	}
</style>
<script>
	export default {
		name: 'NavBar',
		data() {
			return {
				links: [{
					href: "/introduct",
					icon:"&#xe630;",
					info: "个人简介"
				}, {
					href: "/skills",
					icon:"&#xe651;",
					info: "技能"
				}, {
					href: "/experience",
					icon:"&#xe600;",
					info: "项目经验"
				}]
			}
		}
	}
</script>