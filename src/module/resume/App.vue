<template>
	<div class="main" v-if="noLowIe" v-show="go">
		<div class="menu">
			<a href="/" title="返回主页">
				<i class="iconfont pull-right">&#xe60a;</i>
			</a>
		</div>
		<div class="container col-md-8 my-container">
			<nav-bar></nav-bar>
			<router-view></router-view>
		</div>
		<bg></bg>
	</div>
	<div :class="{hack:!noLowIe}" v-else>
		<bg></bg>
		您的浏览器版本太低，请更新
	</div>
</template>

<script>
import Bg from "components/index/Bg";
import NavBar from "components/resume/NavBar";
export default {
    name: "app",
    props: ["go", "noLowIe"],
    components: {
        Bg,
        NavBar
    }
};
</script>

<style lang="scss">
@import url("../../common/css/bootstrap.min.css");
@import url("../../common/css/common.css");
@import url("//cdn.webfont.youziku.com/webfonts/nomal/91608/46931/58148752f629d8107cfe8864.css");
.menu {
    overflow: hidden;
    padding: 15px 0;
    i {
        color: #fff;
        font-size: 30px;
        margin-right: 5%;
    }
}

.my-container {
    float: none;
    margin-bottom: 50px;
    border-radius: 10px;
    background-color: rgba(0, 0, 0, 0.6);
}
</style>