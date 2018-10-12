<template>
  <transition name="end">
    <main v-show="loadEnd" id="app">
      <div class="avatar-wrap">
        <router-link to="/" class="avatar">
          <img src="../../assets/img/touxiang.jpg" alt="avatar">
        </router-link>
        <transition name="fade">
          <p v-if="show" class="tip">主人说现在暂时还不想找工作，所以我不让你下载主人的简历！</p>
        </transition>
      </div>
      <transition :name="direction">
        <router-view class="main" @show="open"></router-view>
      </transition>
      <a v-show="pre.length" href="javascript:;" class="iconfont pre-page" @click="toPre">&#xe617;</a>
      <a v-show="next.length" href="javascript:;" class="iconfont next-page" @click="toNext">&#xe617;</a>
      <img style="display:none" src="../../assets/img/bg.jpg" alt="bg" @load="loadEnd=true">
    </main>
  </transition>
</template>

<script>
  export default {
    name: 'app',
    data() {
      return {
        show: false,
        loadEnd: false,
        direction: '',
        pre: [],
        cur: '/',
        next: ['/experience', '/skills', '/work']
      }
    },
    created() {
      window.addEventListener('popstate', this.initRoute);
      this.initRoute();
    },
    beforeDestroy() {
      window.removeEventListener('popstate', this.initRoute);
    },
    methods: {
      open() {
        this.show = true;
        setTimeout(() => {
          this.show = false
        }, 3000)
      },
      initRoute() {
        switch (this.$route.path) {
          case '/experience':
            this.pre = ['/'];
            this.cur = '/experience';
            this.next = ['/skills', '/work'];
            break;
          case '/skills':
            this.pre = ['/', '/experience'];
            this.cur = '/skills';
            this.next = ['/work'];
            break;
          case '/work':
            this.pre = ['/', '/experience', '/skills'];
            this.cur = '/work';
            this.next = [];
        }
      },
      toPre() {
        this.next.unshift(this.cur);
        this.cur = this.pre.pop();
        this.$router.push(this.cur);
        this.direction = 'right';
      },
      toNext() {
        this.pre.push(this.cur);
        this.cur = this.next.shift();
        this.$router.push(this.cur);
        this.direction = 'left';
      }
    }
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

    .main {
      margin: auto;
      text-align: center;
      width: 1000px;

      @media screen and (max-width: 1000px) {
        width: 80%;
      }

      h3 {
        margin-top: 40px;
        color: $pureWhite;
        font-size: 30px;
        font-weight: normal;

        @media screen and (max-width: 1000px) {
          margin-top: 20px;
        }
      }
    }

    .avatar-wrap {
      position: relative;
      margin: 120px auto 0;
      border: 1px solid $white;
      border-radius: 50%;
      width: 140px;
      height: 140px;
      background: rgba($pureWhite, 0.2);
      text-align: center;

      .tip {
        position: absolute;
        top: -100px;
        right: 20px;
        padding: 10px 20px;
        border-radius: 30px 30px 0;
        width: 160px;
        color: #000;
        background: rgba($pureWhite, 0.8);
        transition: all 0.3s linear;

        @media screen and (min-width: 1000px) {
          top: -20px;
          right: 160px;
        }
      }

      .fade-enter-active,
      .fade-leave-active {
        transition: all 0.5s linear;
      }

      .fade-enter,
      .fade-leave-to {
        opacity: 0;

        @media screen and (min-width: 1000px) {
          right: 130px;
        }
      }

      .end-enter-active {
        transition: opacity 0.7s linear;
      }

      .end-enter {
        opacity: 0;
      }

      .avatar {
        display: inline-block;
        margin-top: 10px;
        width: 120px;
        text-align: center;

        img {
          width: 100%;
          border-radius: 50%;
        }
      }
    }

    .left-leave-active,
    .left-enter-active,
    .right-leave-active,
    .right-enter-active {
      position: absolute;
      right: 0;
      left: 0;
      transition: all 0.4s ease-out;
    }

    .left-leave-to,
    .right-enter {
      transform: translateX(-100%);
    }

    .right-enter-to,
    .left-enter-to {
      transform: translateX(0);
    }

    .right-leave-to,
    .left-enter {
      transform: translateX(100%);
    }

    .pre-page,
    .next-page {
      position: absolute;
      top: 50%;
      font-size: 35px;
      color: $pureWhite;
    }

    .pre-page {
      left: 10px;
      transform: translateY(-50%) rotate(90deg);
      animation: moveLeft 0.5s linear infinite alternate;

      @keyframes moveLeft {
        0% {
          left: 10px;
        }

        100% {
          left: 5px;
        }
      }
    }

    .next-page {
      right: 10px;
      transform: translateY(-50%) rotate(-90deg);
      animation: moveRight 0.5s linear infinite alternate;

      @keyframes moveRight {
        0% {
          right: 10px;
        }

        100% {
          right: 5px;
        }
      }
    }
  }

</style>
