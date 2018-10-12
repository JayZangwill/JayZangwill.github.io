<template>
  <div class="say">
    <div id="SOHUCS"></div>
  </div>
</template>
<script>
  export default {
    name: 'say',
    mounted() {
      const appid = "cytASohTI";
      const conf = "prod_4a8ed26681d02bdc291288b15f5256de";
      const loadJs = function (d, a) {
        const c =
          document.getElementsByTagName("head")[0] ||
          document.head ||
          document.documentElement;
        const b = document.createElement("script");
        b.setAttribute("type", "text/javascript");
        b.setAttribute("charset", "UTF-8");
        b.setAttribute("src", d);
        if (typeof a === "function") {
          if (window.attachEvent) {
            b.onreadystatechange = function () {
              const e = b.readyState;
              if (e === "loaded" || e === "complete") {
                b.onreadystatechange = null;
                a();
              }
            };
          } else {
            b.onload = a;
          }
        }
        c.appendChild(b);
      };
      loadJs(
        "//changyan.sohu.com/upload/changyan.js",
        function () {
          window.changyan.api.config({
            appid,
            conf
          });
        }
      );
    }
  }

</script>

<style lang="scss">
  #SOHUCS {
    margin-top: 120px !important;
    width: 100% !important;
    box-sizing: border-box !important;
    padding: 0 10px !important;
  }

  #SOHUCS #SOHU_MAIN .section-newslist-w .title-name-w {
    color: #fff !important;
  }

  #SOHUCS #SOHU_MAIN .module-cmt-box .post-wrap-w div.post-wrap-main {
    background: none !important;
  }

</style>
