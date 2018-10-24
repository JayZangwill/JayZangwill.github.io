<template>
  <div id="app">
    <main>
      <p class="iconfont tip">&#xe603;</p>
      <p class="explanation">啊哦，是404耶，请尝试访问这个链接吧<a href="https://www.jayzangwill.cn/">https://www.jayzangwill.cn</a></p>
    </main>
    <footer>
      <a href="http://www.miitbeian.gov.cn">桂ICP备16009800号</a>
    </footer>
  </div>
</template>

<script>
  export default {
    name: 'noFound'
  }

</script>

<style lang="scss">
  @import '../../common/css/colors.scss';
  @import '../../common/css/common.scss';

  #app {
    overflow: hidden;
    position: relative;
    padding-bottom: 60px;
    min-height: 100%;
    box-sizing: border-box;
    background: url('../../assets/img/bg.jpg') no-repeat top center / cover;

    main {
      position: absolute;
      top: 40%;
      left: 50%;
      width: 100%;
      text-align: center;
      transform: translate(-50%, -50%);
    }

    .tip {
      font-size: 100px;
      color: $pureWhite;
      text-align: center;
    }

    .explanation {
      margin-top: 30px;
      a:hover{
        color: $pureWhite;
      }
    }

    footer {
      position: absolute;
      bottom: 0;
      width: 100%;
      text-align: center;
      line-height: 50px;

      a:hover {
        color: $pureWhite;
      }
    }
  }

</style>
