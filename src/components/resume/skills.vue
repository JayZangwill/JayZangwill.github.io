<template>
  <div class="skills">
    <h3>技术栈</h3>
    <div class="skill-wrap">
      <div class="wrap">
        <p class="height"><span>HTML</span></p>
        <p class="height"><span>CSS</span></p>
        <p class="height"><span>SCSS</span></p>
        <p class="height"><span>JavaScript</span></p>
      </div>
      <div class="wrap">
        <p><span>Vue</span></p>
        <p><span>JQuery</span></p>
        <p><span>Bootstrap</span></p>
      </div>
      <div class="wrap">
        <p class="low"><span>webpack</span></p>
        <p class="low"><span>gulp</span></p>
        <p class="low"><span>Git</span></p>
        <p class="low"><span>Node</span></p>
        <p class="low"><span>PhotoShop</span></p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'skills'
  }

</script>

<style lang="scss" scoped>
  .skill-wrap {
    margin-top: 10px;

    p {
      display: inline-block;
      padding: 5px;
      font-size: 16px;
      border-radius: 5px;
      background: rgba(#000, 0.6);

      +p {
        margin-left: 5px;
      }
    }

    .wrap+.wrap {
      margin-top: 10px;
    }

    .height {
      span {
        color: #fff;
        background-image: -webkit-linear-gradient(left, #cddc39, #ff9800 25%, #cddc39 50%, #ff9800 75%, #cddc39);
        -webkit-text-fill-color: transparent;
        -webkit-background-clip: text;
        background-size: 200% 100%;

        animation: move 2s infinite linear;

        @keyframes move {
          0% {
            background-position: 0 0
          }

          to {
            background-position: -100% 0
          }
        }
      }
    }

    .low {
      background: rgba(#000, 0.3);
    }
  }

</style>
