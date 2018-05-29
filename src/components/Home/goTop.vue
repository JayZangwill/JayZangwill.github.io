<template>
	<div>
		<div @click="goTop" v-show="show" class="toTop"></div>
	</div>
</template>
<style lang="scss">
.toTop {
    position: fixed;
    z-index: 2;
    height: 36px;
    width: 36px;
    right: 10px;
    bottom: 10px;
    background: {
        image: url(../../assets/img/top.png);
        repeat: no-repeat;
        position: 0px 0px;
    }
    cursor: pointer;
    transition: opacity 1s linear;
    &:hover {
        background-position: -38px 0px;
    }
}
</style>
<script>
export default {
    name: "goTop",
    data() {
        return {
            show: false
        };
    },
    created: function() {
        let scrollTop;
        window.addEventListener("scroll", () => {
            scrollTop =
                document.documentElement && document.documentElement.scrollTop
                    ? document.documentElement.scrollTop
                    : document.body.scrollTop;
            scrollTop >= 200 ? (this.show = true) : (this.show = false);
        });
    },
    methods: {
        goTop() {
            $("body,html").animate(
                {
                    scrollTop: 0
                },
                500
            );
            return false;
        }
    }
};
</script>
