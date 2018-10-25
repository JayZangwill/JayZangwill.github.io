<template>
  <div id="app">
    <main>
      <p class="explanation">没事别用ie浏览器，试试以下浏览器吧：</p>
      <ul class="browser">
        <li>
          <a href="https://www.sogou.com/web?query=chrome">
            <img src="../../assets/img/chrome.png" alt="chrome">
            <p>谷歌浏览器</p>
          </a>
        </li>
        <li>
          <a href="https://www.sogou.com/web?query=firefox">
            <img src="../../assets/img/firefox.png" alt="firefox">
            <p>火狐浏览器</p>
          </a>
        </li>
        <li>
          <a href="https://www.sogou.com/web?query=搜狗浏览器">
            <img src="../../assets/img/sogou.png" alt="sogou">
            <p>搜狗浏览器</p>
          </a>
        </li>
        <li>
          <a href="https://www.sogou.com/web?query=qq览器">
            <img src="../../assets/img/qq.png" alt="qq">
            <p>qq浏览器</p>
          </a>
        </li>
      </ul>
    </main>
    <footer>
      <a href="http://www.miitbeian.gov.cn">桂ICP备16009800号</a>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'noFound'
};
</script>

<style lang="scss">
@import '../../common/css/colors.scss';
@import '../../common/css/common.scss';

#app {
  overflow: hidden;
  position: relative;
  padding-bottom: 60px;
  min-height: 100%;
  box-sizing: border-box;
  background: url('../../assets/img/bg.jpg') no-repeat top center / cover;

  main {
    position: absolute;
    top: 40%;
    left: 50%;
    width: 100%;
    text-align: center;
    transform: translate(-50%, -50%);
  }

  .browser {
    margin-top: 30px;
    color: unset;
    font-size: 30px;

    li {
      display: inline-block;

      + li {
        margin-left: 40px;
      }
    }

    a {
      display: block;

      &:hover {
        color: #fff;

        img {
          transform: rotate(365deg);
        }
      }
    }

    img {
      border-radius: 50%;
      width: 50px;
      transition: transform 0.3s linear;
    }

    p {
      font-size: 16px;
    }
  }

  .explanation {
    color: #fff;
    font-size: 24px;
  }

  footer {
    position: absolute;
    bottom: 0;
    width: 100%;
    text-align: center;
    line-height: 50px;

    a:hover {
      color: $pureWhite;
    }
  }
}
</style>
