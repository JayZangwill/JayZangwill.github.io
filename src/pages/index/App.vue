<template>
  <transition name="fade">
    <main v-show="loadEnd" id="app">
      <my-nav :content="nav"></my-nav>
      <header>
        <div class="weather" v-if="weather">
          <span>{{weather.basic.location}}</span>
          <span>{{weather.now.cond_txt}}</span>
          <span>{{weather.now.tmp}}℃</span>
          <span>{{weather.now.wind_dir}}</span>
        </div>
        <a class="back-old" href="./old/">返回旧版</a>
      </header>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
      <footer>
        <p class="visitors">自本站开启统计以来累计被访问<span>{{visits}}</span>次，您是第<span>{{num}}</span>个访客</p>
        <a href="http://www.miitbeian.gov.cn">桂ICP备16009800号</a>
      </footer>
      <img style="display:none" src="../../assets/img/bg.jpg" alt="bg" @load="loadEnd=true">
    </main>
  </transition>
</template>

<script>
import myNav from '@/common/components/nav';
export default {
  name: 'app',
  data() {
    return {
      loadEnd: false,
      nav: [
        {
          link: '/',
          content: '&#xe60d;<p>首页</p>'
        },
        {
          link: 'say',
          content: '&#xe671;<p>留言板</p>'
        },
        {
          link: 'about',
          content: '&#xe659;<p>关于我</p>'
        }
      ],
      weather: '',
      num: '',
      visits: ''
    };
  },
  created() {
    this.$axios
      .get('https://free-api.heweather.com/s6/weather/now', {
        params: {
          location: 'auto_ip',
          key: '4b56b1e5ddd942f892a0baa4c13a3b01'
        }
      })
      .then(res => {
        this.weather = res.data.HeWeather6[0];
      });
    this.$axios.get('/ip').then(res => {
      const data = res.data.result;
      this.num = data.num;
      this.visits = data.visits;
    });
  },
  components: {
    myNav
  }
};
</script>

<style lang="scss">
@import '../../common/css/colors.scss';
@import '../../common/css/common.scss';

#app {
  position: relative;
  padding-bottom: 120px;
  min-height: 100%;
  box-sizing: border-box;
  background: url('../../assets/img/bg.jpg') no-repeat top center / cover;

  header {
    display: flex;
    margin-top: 50px;
    padding: 0 20px;
    justify-content: space-between;

    .weather {
      span + span {
        margin-left: 10px;
      }
    }

    .back-old,
    .weather {
      color: $pureWhite;
    }
  }

  footer {
    position: absolute;
    bottom: 10px;
    width: 100%;
    text-align: center;
    line-height: 30px;

    p {
      padding: 0 10px;
      color: #fff;
      span {
        margin: 0 5px;
        font-size: 25px;
        color: #fd0042;
      }
    }

    a:hover {
      color: $pureWhite;
    }
  }
}

.fade-enter-active {
  transition: opacity 0.7s linear;
}

.fade-enter {
  opacity: 0;
}
</style>
