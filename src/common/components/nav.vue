<template>
  <nav>
    <div
      class="link-wrap"
      :class="{show:isShow}"
    >
      <router-link
        v-for="(item,i) in content"
        :key="i"
        :to="item.link"
        class="iconfont link"
        active-class="actived"
        v-html="item.content"
      />
    </div>
    <a
      href="javascript:;"
      class="iconfont control"
      :class="{hide:isShow}"
      @click="toggle"
    >&#xe617;</a>
  </nav>
</template>

<script>
  export default {
    name: 'MyNav',
    props: ['content'],
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

<style lang="scss" scoped>
  @import '../../common/css/colors.scss';

  nav {
    position: absolute;
    width: 100%;
    box-sizing: border-box;
    background: rgba(#000, 0.5);
    font-size: 0;
    text-align: center;

    .link-wrap {
      overflow: hidden;
      padding-top: 0;
      height: 0;
      transition: all 0.3s linear;

      &.show {
        padding-top: 15px;
        height: 100px;
      }
    }

    .link {
      display: inline-block;
      width: 33.33%;
      font-size: 30px;
      line-height: 40px;
      transition: color 0.2s linear;

      @media screen and (max-width: 1000px) {
        font-size: 25px;
      }

      &:hover {
        color: $pureWhite;
      }

      /deep/ p {
        font-size: 20px;
      }
    }

    .router-link-exact-active {
      color: $pureWhite;
    }

    .control {
      position: absolute;
      left: 50%;
      bottom: -40px;
      width: 100%;
      color: $pureWhite;
      font-size: 30px;
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
