<template>
  <div class="col-md-12 text-center">
    <div class="info">
      <div class="row">
        <div class="col-md-12 text-center">
          姓名：张杰
        </div>
      </div>
      <div class="row">
        <div class="col-md-6 text-center">
          专业：网络工程 本科
        </div>
        <div class="col-md-6 text-center">
          毕业时间：2018.7
        </div>
      </div>
      <div class="row">
        <div class="col-md-6 text-center">
          手机：17839191579
        </div>
        <div class="col-md-6 text-center email">
          邮箱：
          <a href="mailto:jayzangwill@gmail.com">jayzangwill@gmail.com</a>
        </div>
      </div>
    </div>
    <div class="divi"></div>
    <div class="introduct">
      <h2 class="text-center">关于我</h2>
      <p>在15年（也就是在我大二上学期的时候）一次偶然的机会加入了学校的信息技术实验室，在学长的“蛊惑”下跳入了前端的坑。并因此对前端产生了浓厚的兴趣（因为当时学了C语言，对着黑框框调代码实在太枯燥，入了前端坑仿佛发现了新大陆），在不断地学习，不断地卧槽，原来
        HTML、CSS、JS 还可以这么玩，渐渐加深了自己对前端的热爱。
      </p>
      <p>对新技术抱有激情，渴望在技术上有所建树，希望自己做的东西能被大家喜欢。</p>
      <p>另外，还有
        <a href="https://github.com/JayZangwill">github</a>和
        <a href="https://jayzangwill.github.io/blog/">博客</a>、
        <a href="https://www.jayzangwill.cn/">主页</a>可供参观。
      </p>
      <p><a href="https://www.jayzangwill.cn/download">简历下载</a></p>
    </div>
  </div>
</template>
<style scoped lang="scss">
  $white: #fff;
  $coffee: #b4531e;

  .photo {
    overflow: hidden;

    margin: 20px 0;

    img {
      border-radius: 50%;
    }
  }

  .info {
    font-size: 20px;

    color: $white;

    -webkit-user-select: text;
    -moz-user-select: text;
    -ms-user-select: text;
    user-select: text;
  }

  .row {
    margin: 10px 0;
  }

  .email {
    a {

      &:link,
      &:visited {
        color: $coffee;
      }

      &:hover {
        text-decoration: none;
        color: lighten($coffee, 20%);
      }
    }
  }

  .introduct {
    margin: 20px 0;

    font-size: 18px;
    text-align: left;

    color: $white;

    p {
      text-indent: 40px;

      a {

        &:link,
        &:visited {
          color: $coffee;
        }

        &:hover {
          text-decoration: none;
          color: lighten($coffee, 20%);
        }
      }

      span {
        color: $coffee;
      }
    }
  }

  .divi {
    border: 1px solid $white;
    width: 100%;
  }

</style>
