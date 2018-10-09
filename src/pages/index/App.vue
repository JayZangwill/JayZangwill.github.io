<template>
  <main id="app">
    <my-nav :content="nav"></my-nav>
    <router-view class="main"></router-view>
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
        },{
          link: 'say',
          content: '&#xe771;<p>留言板</p>'
        },{
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
    min-height: 100%;
    height: 1px;
  }

  .main {
    min-height: 100%;
    background: url('../../assets/img/bg.jpg') no-repeat top center / cover;
  }

</style>
