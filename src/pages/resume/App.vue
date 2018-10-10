<template>
  <main id="app">
    <div class="avatar-wrap">
      <router-link to="/" class="avatar">
        <img src="../../assets/img/touxiang.jpg" alt="avatar">
      </router-link>
    </div>
    <router-view></router-view>
  </main>
</template>

<script>
  export default {
    name: 'app',
    data() {
      return {}
    }
  }

</script>

<style lang="scss">
  @import '../../common/css/common.scss';
  $white: rgba(#fff, 0.6);

  #app {
    overflow: hidden;
    padding-bottom: 60px;
    min-height: 100%;
    box-sizing: border-box;
    background: url('../../assets/img/bg.jpg') no-repeat top center / cover;

    .avatar-wrap {
      margin: 120px auto 0;
      border: 1px solid $white;
      border-radius: 50%;
      width: 140px;
      height: 140px;
      background: rgba(#fff, 0.2);
      text-align: center;

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
  }

</style>
