<template>
    <div class="links">
        <ul>
            <li v-for="link in links">
                <a :href="link.href" :title="link.title">{{link.info}}</a>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: "Links",
    data() {
        return {
            links: [
                {
                    href: "resume.html",
                    title: "我的简历",
                    info: "resume"
                },
                {
                    href: "home.html",
                    title: "进入主页",
                    info: "my home"
                },
                {
                    href: "https://JayZangwill.github.io/blog",
                    title: "我的博客",
                    info: "my blog"
                },
                {
                    href: "https://github.com/JayZangwill",
                    title: "github",
                    info: "my github"
                }
            ]
        };
    }
};
</script>

<style scoped lang="scss">
.links {
    margin: 0 auto;
    padding-bottom: 15px;
    width: 320px;
    text-align: center;
    ul {
        margin: 0;
        padding-left: 0;
    }
    a {
        font-family: "SnellRoundhand6b559e215165d8";
        font-size: 30px;
        &:link {
            color: #fff;
        }
        &:visited {
            color: #fff;
        }
        &:hover {
            color: #b4531e;
        }
    }
    li {
        margin-top: 5px;
    }
}
</style>