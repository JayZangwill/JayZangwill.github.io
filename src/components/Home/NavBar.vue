<template>
	<nav class="navbar navbar-inverse navbar-fixed-top">
		<div class="container">
			<div class="navbar-header">
				<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#links" aria-expanded="false">
					<span class="sr-only">Mr·Zangwill</span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
				</button>
				<a class="navbar-brand" href="home.html">Mr·Zangwill</a>
			</div>
			<div class="collapse navbar-collapse" id="links">
				<ul class="nav navbar-nav">
					<li v-for="link in links">
						<router-link active-class="actived" :to="link.href">{{link.info}}</router-link>
					</li>
				</ul>
				<div class="pull-right" id="github17">
					<a id="githubLink" href="https://github.com/JayZangwill" title="我的github">
						<i class="iconfont">&#xe735;</i>
					</a>
				</div>
			</div>
		</div>
	</nav>
</template>
<style scoped lang="scss">
body {
    padding-top: 50px;
    min-width: 320px;
    background-color: #ebebeb;
    font-family: arial "microsoft yahei", sans-serif;
}

#links {
    height: 50px;
}

#githubLink {
    .iconfont {
        font-size: 35px;
    }
    &:link,
    &:visited {
        color: #333;
    }
    &:hover {
        color: #fff;
        text-decoration: none;
    }
}
.actived {
    background-color: #d2691e;
}
</style>
<script>
export default {
    name: "NavBar",
    data() {
        return {
            links: [
                {
                    href: "/home",
                    info: "首页"
                },
                {
                    href: "/say",
                    info: "甜言蜜语"
                },
                {
                    href: "/about",
                    info: "关于我"
                }
            ]
        };
    }
};
</script>
