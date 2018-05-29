<template>
    <div class="main" v-if="noLowIe" v-show="go">
        <nav-bar></nav-bar>
        <head-img></head-img>
        <router-view></router-view>
        <my-footer></my-footer>
    </div>
    <div :class="{hack:!noLowIe}" v-else>
        <bg></bg>
        您的浏览器版本太低，请更新
    </div>
</template>

<script>
import Bg from "components/index/Bg";
import NavBar from "components/home/NavBar";
import HeadImg from "components/home/HeadImg";
import MyFooter from "components/home/Footer";
export default {
    name: "app",
    props: ["go", "noLowIe"],
    components: {
        NavBar,
        Bg,
        HeadImg,
        MyFooter
    }
};
</script>

<style lang="scss">
@import url("../../common/css/common.css");
@import url("../../common/css/bootstrap.min.css");
body {
    padding-top: 50px;
}
#app {
    position: relative;
    padding-bottom: 60px;
    min-height: 100%;
}
</style>
