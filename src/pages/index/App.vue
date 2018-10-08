<template>
  <main id="app">
    <nav>
      <div class="link-wrap" :class="{show:isShow}">
        <router-link to="/" class="iconfont link">&#xe60d;<p>首页</p>
        </router-link>
        <router-link to="/say" class="iconfont link">&#xe771;<p>留言板</p>
        </router-link>
        <router-link to="/about" class="iconfont link">&#xe600;<p>关于我</p>
        </router-link>
      </div>
      <a href="javascript:;" class="iconfont control" :class="{hide:isShow}" @click="toggle">&#xe617;</a>
    </nav>
    <router-view class="main"></router-view>
  </main>
</template>

<script>
  export default {
    name: 'app',
    data() {
      return {
        isShow: false
      }
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
    font-size: 0;
  }

  .main {
    min-height: 100%;
    background: url('../../assets/img/bg.jpg') no-repeat top center / cover;
  }

  nav {
    position: relative;
    box-sizing: border-box;
    background: #000;
    font-size: 0;
    text-align: center;

    .link-wrap {
      overflow: hidden;
      padding-top: 0;
      height: 0;
      transition: all 0.3s linear;

      &.show {
        padding-top: 0.05rem;
        height: 0.5rem;
      }
    }

    .link {
      display: inline-block;
      color: #fff;
      opacity: 0.6;
      font-size: 0.14rem;
      line-height: 0.2rem;

      // @media screen and (max-width: 768px) {
      //   font-size: 0.rem;
      // }
      +.link {
        margin-left: 1rem;
      }

      p {
        font-size: 0.1rem;
      }
    }

    .control {
      position: absolute;
      left: 50%;
      bottom: -0.2rem;
      width: 100%;
      color: #fff;
      font-size: 0.16rem;
      transform: translateX(-50%);
      animation: move 0.5s linear infinite alternate;

      @keyframes move {
        0% {
          transform: translateX(-50%);
        }

        100% {
          transform: translate(-50%, -20%);
        }
      }

      &.hide {
        animation: hideMove 0.5s linear infinite alternate;

        @keyframes hideMove {
          0% {
            transform: translateX(-50%) rotate(180deg);
          }

          100% {
            transform: translate(-50%, -20%) rotate(180deg);
          }
        }
      }
    }
  }

</style>
