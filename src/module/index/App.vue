<template>
  <div class="main" v-if="noLowIe">
    <audio-switch :myAudio="myAudio"></audio-switch>
    <div class="content-wrap">
      <clock v-show="go"></clock>
      <div class="btns" v-if="go">
        <!--继续将获得的myAudio往子组件传:myAudio是子组件对应的prop变量名，如果这里去掉一个o子组件里的prop的这个也要去掉o-->
        <name></name>
        <links></links>
      </div>
        <my-footer></my-footer>
    </div>
    <bg></bg>
    <my-video></my-video>
  </div>
  <div :class="{hack:!noLowIe}" v-else>
    <bg></bg>
    您的浏览器版本太低，请更新
  </div>
</template>

<script>
import Clock from "components/index/Clock";
import Name from "components/index/Name";
import Bg from "components/index/Bg";
import Links from "components/index/Links";
import Video from "components/index/Video";
import AudioSwitch from "components/index/AudioSwitch";
import MyFooter from "components/index/Footer";
export default {
    name: "app",
    props: ["my-audio", "go"],
    data() {
        return {
            noLowIe: true
        };
    },
    components: {
        Clock,
        Name,
        Bg,
        Links,
        "my-video": Video,
        "my-audio": Audio,
        AudioSwitch,
        MyFooter
    },
    created() {
        this.noLowIe = navigator.appVersion.search(/MSIE [678]/i) === -1;
    }
};
</script>

<style lang="scss">
@import url("../../common/css/common.css");
@import url("//cdn.webfont.youziku.com/webfonts/nomal/91608/46931/58148752f629d8107cfe8864.css");
body {
    min-height: 100%;
}

#app {
    min-height: 100%;
    height: 1px;
}

.main {
    position: relative;
    min-height: 100%;
    .content-wrap {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 100%;
        transform: translate(-50%, -50%);
        @media screen and (max-height:600px) {
            transform: translate(-50%, -40%);
        }
    }
}
</style>
