<template>
  <div class="about">
    <h3>关于我</h3>
    <p>一名不懂设计却爱美，但写代码从来“没有bug”的前端。</p>
    <p>没什么特别爱好，就是特别爱睡觉，在增肥道路上持续前行~</p>
    <p>话不多，爱发骚，骚起来就没你什么事的那种。</p>
    <p>常用昵称Jay Zangwill行走于各大网站；<a href="https://www.jayzangwill.cn/">Jay Zangwill</a>唯一指定官方网站！</p>
    <p>座右铭：一张坏坏的笑脸，连两道浓浓的眉毛也泛起柔柔的涟漪，一副放荡不羁的笑意，色而不淫的页面设计，风流而不下流的代码风格，帅气中又带着一抹温柔专注的半仙。</p>
    <p>可以通过<a href="mailto:359390851@qq.com">359390851@qq.com</a>联系到我</p>
    <p>额，好像没什么说的了，没事就用微信扫扫下面二维码吧</p>
    <div class="qr-code">
      <img
        src="../../assets/img/qr_code.jpg"
        alt="pay for me"
      >
    </div>
  </div>
</template>

<script>
  export default {
    name: 'About'
  }

</script>

<style lang="scss" scoped>
  @import '../../common/css/colors.scss';

  .about {
    margin: 120px auto 0;
    width: 1000px;

    @media screen and (max-width: 1000px) {
      margin-top: 60px;
      width: 90%;
    }

    h3 {
      font-size: 30px;
      color: rgba($pureWhite, 0.8);
    }

    p {
      margin-top: 10px;
      font-size: 20px;
      text-indent: 2em;

      a {
        border-bottom: dotted 1px rgba(255, 255, 255, 0.35);
        transition: all 0.2s linear;

        &:hover {
          color: $pureWhite;
          border-bottom: none;
        }
      }
    }

    .qr-code {
      margin-top: 30px;

      img {
        width: 200px;
      }

      text-align: center;
    }
  }

</style>
