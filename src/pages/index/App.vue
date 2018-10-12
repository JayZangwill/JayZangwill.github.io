<template>
  <transition name="fade">
    <main v-show="loadEnd" id="app">
      <my-nav :content="nav"></my-nav>
      <a class="back-old" href="./old/">返回旧版</a>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
      <footer>
        <a href="http://www.miitbeian.gov.cn">桂ICP备16009800号</a>
      </footer>
      <img style="display:none" src="../../assets/img/bg.jpg" alt="bg" @load="loadEnd=true">
    </main>
  </transition>
</template>

<script>
  import myNav from '@/common/components/nav'
  export default {
    name: 'app',
    data() {
      return {
        loadEnd: false,
        nav: [{
          link: '/',
          content: '&#xe60d;<p>首页</p>'
        }, {
          link: 'say',
          content: '&#xe671;<p>留言板</p>'
        }, {
          link: 'about',
          content: '&#xe659;<p>关于我</p>'
        }]
      }
    },
    components: {
      myNav
    }
  }

</script>

<style lang="scss">
  @import '../../common/css/colors.scss';
  @import '../../common/css/common.scss';

  #app {
    position: relative;
    padding-bottom: 60px;
    min-height: 100%;
    box-sizing: border-box;
    background: url('../../assets/img/bg.jpg') no-repeat top center / cover;

    .back-old {
      float: right;
      margin: 50px 30px 0 0;
      color: $pureWhite;
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

  .fade-enter-active {
    transition: opacity 0.7s linear;
  }

  .fade-enter {
    opacity: 0;
  }

</style>
