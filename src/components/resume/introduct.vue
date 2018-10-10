<template>
  <div class="introduct">
    <h3>张杰</h3>
    <p class="introducts">一个爱美的前端，完美主义者</p>
    <p class="content">鱼泡泡前端工程师</p>
    <a href="mailto:jayzangwill@gmail.com">jayzangwill@gmail.com</a>
    <a href="/download">简历下载</a>
  </div>
</template>

<script>
  export default {
    name: 'introduct'
  }

</script>

<style lang="scss" scoped>
  .introduct {
    margin: auto;
    width: 1000px;
    text-align: center;

    @media screen and (max-width: 998px) {
      width: 90%;
    }

    h3 {
      margin-top: 40px;
      color: #fff;
      font-size: 30px;
      font-weight: normal;

      @media screen and (max-width: 1000px) {
        margin-top: 20px;
      }
    }

    .introducts {
      margin-top: 10px;
    }

    p {
      line-height: 30px;
    }

    .content {
      color: #fff;
    }

    a {
      display: block;
      line-height: 30px;
      transition: color 0.2s linear;

      &:hover {
        color: #fff;
      }
    }
  }

</style>
