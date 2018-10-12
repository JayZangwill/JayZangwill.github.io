<template>
  <div class="experience">
    <h3>项目经验</h3>
    <div class="list">
      <h4>比心小程序</h4>
      <p>相关技术：mpvue，scss，pug等</p>
      <p>说明：1000万用户使用的约玩APP</p>
    </div>
    <div class="list">
      <h4> <a href="https://github.com/JayZangwill/bank-card">银行卡管理系统</a></h4>
      <p>相关技术：bootstrap、jquery、node、mongodb等。</p>
      <p>说明：在校期间完成的项目，一个人独立完成从前端到数据库的开发，负责前端页面、服务端交互、数据库处理等工作。</p>
    </div>
    <div class="list">
      <h4> <a href="https://github.com/JayZangwill/lightings">开源框架lightings</a></h4>
      <p>相关技术：javascript，promise等。</p>
      <p>说明：一个基于Promise的ajax库，支持模板渲染。</p>
    </div>
    <p class="list">更多精彩请<a href="/download" @click="download">下载简历</a>或移步<a href="https://github.com/JayZangwill">GitHub</a></p>
  </div>
</template>

<script>
  export default {
    name: 'experience',
    data() {
      return {
        canDownload: false
      }
    },
    methods: {
      download(e) {
        if (!this.canDownload) {
          e.preventDefault();
          this.$emit('show');
        }
      }
    }
  }

</script>

<style lang="scss" scoped>
  @import '../../common/css/colors.scss';

  .list {
    margin-top: 20px;
  }

  h4 {
    color: $pureWhite;
    font-weight: normal;

  }

  a {
    color: $pureWhite;
    position: relative;
    border-bottom: 1px dotted $white;
    transition: color 0.2s linear;

    &:hover {
      border-bottom: none;
    }
  }

  p {
    line-height: 30px;
  }

</style>
