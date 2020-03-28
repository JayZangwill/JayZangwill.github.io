<template>
  <div class="introduct">
    <h3>张杰</h3>
    <p class="introducts">
      一个爱美的前端，完美主义者
    </p>
    <p class="content">
      掌门一对一前端工程师
    </p>
    <a href="mailto:jayzangwill@163.com">jayzangwill@163.com</a>
    <a
      v-if="canDownload"
      href="/download"
      @click="download"
    >简历下载</a>
    <a
      v-else
      href="javascript:;"
      @click="download"
    >简历下载</a>
  </div>
</template>

<script>
  export default {
    name: 'Introduct',
    data() {
      return {
        canDownload: false
      };
    },
    methods: {
      download(e) {
        if (!this.canDownload) {
          e.preventDefault();
          this.$emit('show');
        }
      }
    }
  };

</script>

<style lang="scss" scoped>
  @import '../../common/css/colors.scss';

  .introducts {
    margin-top: 10px;
  }

  p {
    line-height: 30px;
  }

  .content {
    color: $pureWhite;
  }

  a {
    display: block;
    line-height: 30px;
    transition: color 0.2s linear;

    &:hover {
      color: $pureWhite;
    }
  }

</style>
