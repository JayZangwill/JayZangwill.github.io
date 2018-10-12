<template>
  <div class="experience">
    <h3>工作经历</h3>
    <div class="list">
      <h4>搜狗搜索事业部前端重构实习生</h4>
      <time>2017年5月~2018年4月</time>
      <p>完成了：<a href="https://english.sogou.com/">搜狗英文PC版首页</a>和搜狗搜索<a href="https://m.sogou.com/web/searchList.jsp?uID=0o3bDxypCD0A4I0w&v=5&from=index&w=1274&t=1539250180120&s_t=1539250186145&s_from=index&pg=webSearchList&keyword=%E7%8E%8B%E8%80%85%E8%8D%A3%E8%80%80&suguuid=1efa5449-6728-41bd-a4a7-54e401eca5d8&sugsuv=AAHBG0%2FFIQAAAAqWGijfOAUAZAM%3D&sugtime=1539250186147&sugclass=%25E6%25B8%25B8%25E6%2588%258F&wm=3206">各类结果页</a>等</p>
      <p>相关技术：html，scss，gulp，js等</p>
    </div>
    <div class="list">
      <h4>上海鱼泡泡信息科技有限公司前端开发工程师</h4>
      <time>2018年5月~今</time>
      <p>完成了：<a href="https://www.yitantech.cn/">比心</a>、鱼耳各类活动页、<a href="javascript:;">比心小程序<img src="../../assets/img/bixin.jpg"
            alt="bixin qr code"></a>等</p>
      <p>相关技术：scss，js，vue等</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'experience'
  }

</script>

<style lang="scss" scoped>
  .list {
    margin-top: 20px;
  }

  h4 {
    color: #fff;
    font-weight: normal;
  }

  time {
    display: block;
    margin-top: 10px;
  }

  p {
    line-height: 30px;

    a {
      position: relative;
      border-bottom: 1px dotted rgba(#fff, 0.6);
      transition: color 0.2s linear;

      &:hover {
        color: #fff;
        border-bottom: none;

        img {
          display: block;
        }
      }

      img {
        display: none;
        position: absolute;
        top: -150px;
        left: -80px;
        width: 150px;
        height: auto;
      }
    }
  }

</style>
