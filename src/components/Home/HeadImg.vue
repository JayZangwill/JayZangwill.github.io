<template>
    <header>
        <img src="/static/home.png" alt="head">
        <div class="words">
            <h1>路途遥远</h1>
            <h2>勿忘初心</h2>
            <h3>方得始终</h3>
            <p>欢迎来到Zangwill世界</p>
        </div>
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
        opacity: 0;
        transition: opacity 3s linear;
    }
    @for $i from 1 through 3 {
        h#{$i} {
            @include h(12%+$i*3, 5%+$i*15);
        }
    }
    p {
        @include h(18%, 70%);
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
    mounted() {
        setTimeout(() => {
            document.querySelector(".words").style.opacity = 1;
        }, 1000);
    }
};
</script>
