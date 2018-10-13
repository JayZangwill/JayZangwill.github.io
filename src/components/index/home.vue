<template>
  <div class="home">
    <div class="avatar-wrap">
      <router-link to="/" class="avatar">
        <img src="../../assets/img/touxiang.jpg" alt="avatar">
      </router-link>
    </div>
    <h3>Jay Zangwill</h3>
    <div class="links-wrap">
      <a target="_blank" class="iconfont" href="https://github.com/JayZangwill">&#xf1b4;</a>
      <a target="_blank" class="iconfont" href="https://jayzangwill.github.io/blog/">&#xe60e;</a>
      <a class="iconfont" href="resume.html">&#xe601;</a>
    </div>
    <ul class="article-wrap">
      <template v-if="articles.length">
        <li v-for="(item, i) in articles" :key="i"><a :href="item.href">{{item.title}}</a><time>{{item.time}}</time></li>
      </template>
      <li v-else class="iconfont loading">&#xe623;</li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'home',
    data() {
      return {
        articles: []
      }
    },
    created() {
      this.$axios.get('/article').then(res => {
        this.articles = res.data.result
      })
    }
  }

</script>

<style lang="scss">
  @import '../../common/css/colors.scss';

  .home {
    .avatar-wrap {
      margin: 120px auto 0;
      border: 1px solid $white;
      border-radius: 50%;
      width: 140px;
      height: 140px;
      text-align: center;
      animation: scale 1s linear infinite alternate;

      &:hover {
        animation: none;
      }

      @keyframes scale {
        0% {
          transform: scale(1);
        }

        100% {
          transform: scale(1.05)
        }
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

    h3 {
      margin-top: 40px;
      color: $pureWhite;
      font-size: 30px;
      text-align: center;
      font-weight: normal;

      @media screen and (max-width: 1000px) {
        margin-top: 20px;
      }
    }

    .links-wrap {
      margin-top: 50px;
      text-align: center;

      @media screen and (max-width: 1000px) {
        margin-top: 30px;
      }

      a {
        display: inline-block;
        border: 1px solid $white;
        border-radius: 50%;
        width: 50px;
        background: rgba($pureWhite, 0.2);
        font-size: 32px;
        line-height: 50px;
        transition: background-color 0.1s linear;

        &:hover {
          color: $pureWhite;
          background-color: rgba($pureWhite, 0.3);
        }

        +a {
          margin-left: 50px;
        }
      }
    }

    .article-wrap {
      overflow: hidden;
      margin: 50px auto 0;
      padding: 5px 0 5px 10px;
      border-radius: 5px;
      width: 1000px;
      box-sizing: border-box;
      background: rgba(#fff, 0.2);

      @media screen and (max-width: 1000px) {
        margin: 30px auto 0;
        width: 95%;
      }

      li {
        width: 100%;
        padding: 0 15px 0 5px;
        box-sizing: border-box;
        font-size: 0;
        transition: background-color 0.3s linear;

        &:hover {
          background-color: rgba($pureWhite, 0.2);
        }

        +li {
          border-top: 1px solid rgba($pureWhite, 0.9);
        }
      }

      .loading {
        padding: 0;
        font-size: 30px;
        color: $pureWhite;
        text-align: center;
        line-height: 60px;
        animation: loading 0.8s linear infinite;

        @keyframes loading {
          0% {
            transform: rotate(0)
          }

          100% {
            transform: rotate(365deg)
          }
        }

        &:hover {
          background: none;
        }
      }

      a {
        overflow: hidden;
        display: inline-block;
        width: 70%;
        font-size: 20px;
        line-height: 40px;
        text-overflow: ellipsis;
        word-wrap: normal;
        white-space: nowrap;

        &:hover {
          color: $pureWhite;
        }
      }

      time {
        float: right;
        font-size: 14px;
        line-height: 40px;
      }
    }
  }

</style>
