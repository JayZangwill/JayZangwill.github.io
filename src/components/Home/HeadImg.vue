<template>
	<header>
		<img src="/static/home.png" alt="head">
		<transition name="fade">
			<div class="words" v-show="show">
				<h1>路途遥远</h1>
				<h2>勿忘初心</h2>
				<h3>方得始终</h3>
			</div>
		</transition>
	</header>
</template>
<style scoped lang="scss">
@mixin h($left, $top) {
    position: absolute;
    color: #fff;
    left: $left;
    top: $top;
}

header {
    height: 400px;
    overflow: hidden;
    position: relative;
    box-shadow: 7px 7px 7px;
    img {
        width: 100%;
        position: absolute;
    }
	.words {
		height: 400px;
	}
    .fade-enter-active {
        transition: all 1s;
    }
    .fade-enter {
        opacity: 0;
		transform: translateX(-10px);
    }
    @for $i from 1 through 3 {
        h#{$i} {
            @include h(12% + $i * 3, 5% + $i * 15);
        }
    }
}

@media (max-width: 711px) {
    header img {
        width: 711px;
    }
}
</style>
<script>
export default {
    data() {
        return {
            show: false
        };
    },
    mounted() {
        setTimeout(() => {
            this.show = true;
        }, 1500);
    }
};
</script>
