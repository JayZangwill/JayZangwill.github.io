<template>
    <div>
        <div class="container artic">
            <h1>文章精选
                <a class="pull-right" target="_blank" href="https://github.com/JayZangwill/blog" title="更多文章">更多文章>></a>
            </h1>
            <div class="divi"></div>
            <div class="row">
                <div class="col-md-6">
                    <div class="thumbnail">
                        <img src="../../assets/img/box.png" alt="css盒模型与定位">
                        <div class="caption">
                            <h3 class="text-center">css盒模型与定位</h3>
                            <p>说到css的盒子模型和定位相信大家一定都听说过，因为它们是css中的基础，同时也是难点，这篇文章的作用在于基础知识的扫盲。
                                <p class="text-center">
                                    <a target="_blank" href="https://jayzangwill.github.io/blog/2016/12/15/CSS%20box%20model%20and%20location/#more" class="btn btn-primary" role="button">阅读全文</a>
                                </p>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="thumbnail">
                        <img src="../../assets/img/js.png" alt="javscript的数据类型">
                        <div class="caption">
                            <h3 class="text-center">javscript的数据类型</h3>
                            <p>之前学到javascript的数据类型时遇到了一些困惑，因为之前和一些大神交流和自己百度+谷歌查到的还有在红宝书上看到的答案不一样，最近通过查阅了一些资料终于把自己的困惑解决了，现在来写一些笔记记录记录</p>
                            <p class="text-center">
                                <a target="_blank" href="https://jayzangwill.github.io/blog/2016/11/07/Javscript%20data%20type/#more" class="btn btn-primary" role="button">阅读全文</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <div class="thumbnail">
                        <img src="../../assets/img/css3.png" alt="css3(1)">
                        <div class="caption">
                            <h3 class="text-center">学习css3(1)</h3>
                            <p>自从css3问世以后，以前很多只能用js写的特效现在用几行简简单单的css代码就能搞定了，让我们一起来探索css3的世界吧</p>
                            <p class="text-center">
                                <router-link to="/css1" class="btn btn-primary">阅读全文</router-link>
                            </p>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="thumbnail">
                        <img src="../../assets/img/css3.png" alt="css3(2)">
                        <div class="caption">
                            <h3 class="text-center">学习css3(2)</h3>
                            <p>这次我们来研究研究如何用css实现3d翻转的效果</p>
                            <br>
                            <p class="text-center">
                                <router-link to="/css2" class="btn btn-primary">阅读全文</router-link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <go-top></go-top>
    </div>
</template>

<style scoped lang="scss">
h1 {
    a {
        margin-top: 20px;
        font-size: 20px;
    }
}

.artic {
    margin-top: 30px;
}

.thumbnail {
    box-shadow: 5px 5px 5px gray;
}

.breadcrumb {
    margin-top: 20px;
    background-color: #ddd;
}

.divi {
    margin: 10px auto;
    border: 1px solid gray;
}
</style>
<script>
import goTop from "components/Home/goTop";
export default {
    name: "homeText",
    data() {
        return {
            show: false
        };
    },
    components: {
        goTop
    }
};
</script>
