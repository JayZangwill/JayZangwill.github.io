<template>
  <div class="nav">
    <ul>
      <li v-for="(link,i) in links" :key="i">
        <router-link active-class="actived" :to="link.href">
          <i class="iconfont" v-html="link.icon"></i><br>
          <span>{{link.info}}</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>
<style scoped lang="scss">
  .nav {
    $height: 100px;
    width: 90%;

    li {
      display: inline-block;

      width: 24%;
      height: $height;

      text-align: center;
      line-height: $height/2;

      +li {
        margin-left: 1.15%;
      }

      a {
        display: block;
        border-radius: 0 0 10px 10px;
        height: 100%;
        font-size: 20px;
        text-decoration: none;
        transition: all ease-in 0.4s;

        span {
          @media screen and (max-width: 768px) {
            display: none;
          }
        }

        .iconfont {
          font-size: 25px;

          @media screen and (max-width: 768px) {
            font-size: 30px;
            line-height: 100px;
          }
        }

        &:hover {
          background-color: #b4531e;
        }

        &:link,
        &:visited {
          color: darken(#fff, 30%);
        }

        &:hover {
          color: #fff;
        }
      }
    }
  }

  .actived {
    background-color: #b4531e;

    &:link,
    &:visited,
    &:hover {
      color: #fff !important;
    }
  }

</style>
<script>
  export default {
    name: "NavBar",
    data() {
      return {
        links: [{
            href: "/introduct",
            icon: "&#xe630;",
            info: "个人简介"
          },
          {
            href: "/work",
            icon: "&#xe60e;",
            info: "工作经历"
          },
          {
            href: "/skills",
            icon: "&#xe651;",
            info: "技能"
          },
          {
            href: "/experience",
            icon: "&#xe600;",
            info: "项目经验"
          }
        ]
      };
    }
  };

</script>
