<template>
  <div class="home">
    <router-link to="/" class="avatar">
      <img src="../../assets/img/touxiang.jpg" alt="avatar">
    </router-link>
  </div>
</template>

<script>
  export default {
    name: 'home'
  }

</script>

<style lang="scss">
  .home {
    overflow: hidden;

    .avatar {
      display: block;
      margin-top: 1rem;
      text-align: center;

      img {
        border-radius: 50%;
      }
    }
  }

</style>
