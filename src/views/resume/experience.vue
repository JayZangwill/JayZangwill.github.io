<template>
  <div class="experience-content">
    <h3 class="text-center">公司项目</h3>

    <h4>搜狗移动搜索结果页大改版</h4>
    <p>
      <strong>涉及技术：</strong>html，scss，gulp 等。</p>
    <p>
      <strong>项目描述：</strong>由于移动结果页种类繁多，规范不统一，所以我们对近 500 个结果页模块模板的 html、css 代码进行重构，同时由原来的彩色版改为黑色版。</p>
    <p>
      <strong>责任描述：</strong>使用内部组件，对原有代码进行更换，及 css 优化，同时对组件有不合理的地方提出修改建议。</p>

    <h4>安阳益和热力公司信息管理系统</h4>
    <p>
      <strong>涉及技术：</strong>javascript、jquery、bootstrap、java、MySQL、git等技术。</p>
    <p>
      <strong>项目描述：</strong>该项目主要是完成一个能实时查到基站数据和工作人员工作轨迹的一个系统。</p>
    <p>
      <strong>责任描述：</strong>负责项目的前端界面、登陆页面及相关登陆逻辑、整个项目的报表部分、用户管理页面及相关逻辑、与后端进行交互以及最后的测试工作。</p>
    <p>
      <strong>个人收获：</strong>了解了bootstrapTable、bootstrapvalidator、bootstrapDatepicker等多种框架的使用，了解了整个项目的流程和前后端数据的交互方法（ajax、jsonp等），自我学习能力得到提升、解决问题的方法得到丰富。</p>

    <h3 class="text-center">组织项目</h3>

    <h4>安阳工学院信息技术实验室主页
      <a href="https://infotechlab.github.io/">在线预览</a> &
      <a href="https://github.com/InfoTechLab/InfoTechLab.github.io">源码</a>
    </h4>
    <p>
      <strong>涉及技术：</strong>html、css、javascript、响应式、grunt、git</p>
    <p>
      <strong>项目描述：</strong>目的是为了宣传实验室及招纳新生</p>
    <p>
      <strong>责任描述：</strong>通过手写响应式完成整个项目的开发。</p>
    <p>
      <strong>个人收获：</strong>加深了css布局的能力、对响应式原理的理解。</p>

    <h3 class="text-center">个人项目</h3>

    <h4>基于node+mongodb搭建的银行卡管理系统
      <a href="http://www.jayzangwill.cn/bank-card/index.html">在线预览</a> &
      <a href="https://github.com/JayZangwill/bank-card">源码</a>
    </h4>
    <p>
      <strong>涉及技术：</strong>javascript、bootstrap、jquery、node、mongodb等。</p>
    <p>
      <strong>项目描述：</strong>该项目需要完成用户的登陆、注册、取款、存款、查询余额功能。</p>
    <p>
      <strong>责任描述：</strong>一个人独立完成从前端到数据库的开发，负责前端页面、服务端交互、数据库处理等工作。</p>
    <p>
      <strong>个人收获：</strong>第一次个人独立开发一个完整的系统，了解了node和数据库交互以及如何搭建node服务器，了解了mongodb的增删改查和一些基本概念，加深了对前后端数据交互的理解。</p>

    <h4>基于自己封装的jQuery搭建的弹幕系统
      <a href="http://www.jayzangwill.cn/Barrage/index.html">在线预览</a> &
      <a href="https://github.com/JayZangwill/Barrage">源码</a>
    </h4>
    <p>
      <strong>涉及技术：</strong>html、css、javscript、jQuery、面向对象</p>
    <p>
      <strong>责任描述：</strong>通过面向对象方式封装jQuery，并应用于弹幕系统上。</p>
    <p>
      <strong>个人收获：</strong>加强了面向对象封装插件能力，加深了对jQuery的了解</p>

    <h4>开源框架lightings
      <a href="https://github.com/JayZangwill/lightings">源码</a>
    </h4>
    <p>
      <strong>涉及技术：</strong>javascript、promise、面向对象、库的封装、glup、git</p>
    <p>
      <strong>项目描述：</strong>为了封装出更高效、更轻量级的ajax库</p>
    <p>
      <strong>责任描述：</strong>完成整个库的项目架构、编写、日常维护。目前已发布于
      <a href="https://www.npmjs.com/package/lightings">npm</a>上</p>
    <p>
      <strong>个人收获：</strong>增强了代码封装能力，加深了对ajax、promise的理解，并了解了如何将项目发送到npm上。</p>

    <h4>基于vue搭建的个人主页
      <a href="http://www.jayzangwill.cn/">在线预览</a> &
      <a href="https://github.com/JayZangwill/JayZangwill.github.io/tree/home">源码</a>
    </h4>
  </div>
</template>
<style scoped lang="scss">
  .experience-content {
    margin: 15px 0;

    color: #fff;

    p {
      font-size: 16px;
      text-indent: 2em;
    }

    a {

      &:link,
      &:visited {
        color: #b4531e;
      }

      &:hover {
        text-decoration: none;

        color: lighten(#b4531e, 20%);
      }
    }
  }

</style>
