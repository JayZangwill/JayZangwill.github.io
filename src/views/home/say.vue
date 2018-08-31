<template>
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <div id="SOHUCS"></div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "say",
    mounted() {
        (function() {
            var appid = "cytASohTI";
            var conf = "prod_4a8ed26681d02bdc291288b15f5256de";
            var width =
                window.innerWidth || document.documentElement.clientWidth;
            if (width < 960) {
                window.document.write('<script id="changyan_mobile_js" charset="utf-8" type="text/javascript" src="//changyan.sohu.com/upload/mobile/wap-js/changyan_mobile.js?client_id=' + appid + '&conf=' + conf + '"><\/script>');
            } else {
                var loadJs = function(d, a) {
                    var c =
                        document.getElementsByTagName("head")[0] ||
                        document.head ||
                        document.documentElement;
                    var b = document.createElement("script");
                    b.setAttribute("type", "text/javascript");
                    b.setAttribute("charset", "UTF-8");
                    b.setAttribute("src", d);
                    if (typeof a === "function") {
                        if (window.attachEvent) {
                            b.onreadystatechange = function() {
                                var e = b.readyState;
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
                    function() {
                        window.changyan.api.config({
                            appid: appid,
                            conf: conf
                        });
                    }
                );
            }
        })();
    }
};
</script>
