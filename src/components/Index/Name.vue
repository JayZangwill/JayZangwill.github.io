<template>
	<div class="name-wrap">
		<h1>{{msg}}</h1>
	</div>
</template>

<script>
export default {
    name: "name",
    data() {
        return {
            msg: "Jay Zangwill"
        };
    }
};
</script>

<style scoped lang="scss">
.name-wrap {
    width: 320px;
    margin: 0 auto;
    text-align: center;
    h1 {
        margin: 0;
        font-family: "SnellRoundhand6b559e215165d8";
        font-size: 40px;
        color: #fff;
        cursor: pointer;
    }
}
</style>
