<template>
    <div class="loading" v-if="!go">
        <div class="outer"></div>
        <div class="inner"></div>
        <p>马上加载完，真的...</p>
    </div>
</template>
<script>
export default {
    name: "loading",
    props: ["go"]
};
</script>

<style scoped lang='scss'>
.outer {
    border: 5px solid #fff;
    border-right-color: rgba(255, 255, 255, 0);
    border-left-color: rgba(255, 255, 255, 0);
    border-radius: 50%;
    width: 50px;
    height: 50px;
    box-sizing: content-box;
    animation: round 1s linear infinite;
}

.inner {
    position: relative;
    top: -50px;
    border: 5px solid #fff;
    border-right-color: rgba(255, 255, 255, 0);
    border-left-color: rgba(255, 255, 255, 0);
    border-radius: 50%;
    width: 30px;
    height: 30px;
    box-sizing: content-box;
    animation: round2 1s linear infinite;
}

.loading {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    z-index: 2;
    width: 100%;
    height: 100%;
    background: #000;
    p {
        color: #fff;
        font-size: 21px;
    }

    @keyframes round {
        0% {
            transform: rotate(0);
        }
        100% {
            transform: rotate(360deg);
        }
    }

    @keyframes round2 {
        0% {
            transform: rotate(0);
        }
        100% {
            transform: rotate(-360deg);
        }
    }
}
</style>
