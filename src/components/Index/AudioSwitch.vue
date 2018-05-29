<template>
	<div class="sound-switch">
		<a href="javascript:;" title="音乐暂停">
			<i @click="soundSwitch('pause',1,$event)" class="iconfont music-disable">&#xe638;</i>
		</a>
		<a href="javascript:;" title="音乐播放">
			<i @click="soundSwitch('play',0,$event)" class="iconfont music">&#xe612;</i>
		</a>
	</div>
</template>
<style scoped lang="scss">
.sound-switch {
    position: absolute;
    z-index: 1;
    top: 20px;
    right: 10%;
    width: 30px;
    .music,
    .music-disable {
        display: block;
        position: absolute;
        font-size: 30px;
        color: #fff;
        transition: all 0.5s ease-in-out;
        &:hover {
            color: #b4531e;
        }
    }
    .music {
        z-index: -2;
        opacity: 0;
    }
}
</style>
<script>
export default {
    name: "name",
    props: ["myAudio"],
    methods: {
        soundSwitch(sw, count, e) {
            e.target.style.cssText = "z-index:-2;opacity:0;";
            //sw=play||pause
            this.myAudio[sw]();
            this.$el.getElementsByTagName("i")[count].style.cssText =
                "z-index:0;opacity:1;";
        }
    }
};
</script>
