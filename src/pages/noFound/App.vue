<template>
  <div id="app">
    <main>
      <p class="iconfont tip">&#xe603;</p>
      <p class="explanation">啊哦，是404耶，请尝试访问这个链接吧<a href="https://www.jayzangwill.cn/">https://www.jayzangwill.cn</a></p>
    </main>
    <footer>
      <a href="http://www.beian.miit.gov.cn">桂ICP备16009800号</a>
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
      position: relative;
      font-size: 100px;
      color: $pureWhite;
      text-align: center;

      &::before {
        position: absolute;
        left: 50%;
        transform: translateX(-49.5%);
        clip: rect(0, 4000px, 0, 0);
        animation: flash1 infinite linear 2s alternate-reverse;
        text-shadow: -1px 0 rgba(blue, 0.5);
        content: '\e603';

        @keyframes flash1 {
          @for $i from 0 through 20 {
            #{percentage(($i * 5) / 100)} {
              clip: rect(random(100)+px 4000px random(100)+px 0);
            }
          }
        }

        @media screen and (max-width: 1000px) {
          width: 100%;
          transform: translateX(-49.8%);
        }
      }

      &::after {
        position: absolute;
        left: 50%;
        transform: translateX(-50.5%);
        clip: rect(0, 4000px, 0, 0);
        animation: flash infinite linear 2s alternate-reverse;
        text-shadow: -1px 0 rgba(red, 0.5);
        content: '\e603';

        @keyframes flash {
          @for $i from 0 through 20 {
            #{percentage(($i * 5) / 100)} {
              clip: rect(random(100)+px 4000px random(100)+px 0);
            }
          }
        }

        @media screen and (max-width: 1000px) {
          width: 100%;
          transform: translateX(-50.2%);
        }
      }
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
