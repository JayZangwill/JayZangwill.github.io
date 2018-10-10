<template>
  <main id="app">
    <my-nav :content="nav"></my-nav>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <footer>
      <a href="http://www.miitbeian.gov.cn">桂ICP备16009800号</a>
    </footer>
  </main>
</template>

<script>
  import myNav from '@/common/components/nav'
  export default {
    name: 'app',
    data() {
      return {
        isShow: false,
        nav: [{
          link: '/',
          content: '&#xe60d;<p>首页</p>'
        }, {
          link: 'say',
          content: '&#xe771;<p>留言板</p>'
        }, {
          link: 'about',
          content: '&#xe600;<p>关于我</p>'
        }]
      }
    },
    components: {
      myNav
    },
    methods: {
      toggle() {
        this.isShow = !this.isShow
      }
    }
  }

</script>

<style lang="scss">
  @import '../../common/css/common.scss';

  #app {
    position: relative;
    padding-bottom: 60px;
    min-height: 100%;
    box-sizing: border-box;
    background: url('../../assets/img/bg.jpg') no-repeat top center / cover;
    footer {
      position: absolute;
      bottom: 0;
      width: 100%;
      text-align: center;
      line-height: 50px;
      a:hover {
        color: #fff;
      }
    }
  }

</style>
