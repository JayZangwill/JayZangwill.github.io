var home = angular.module("home", ["ui.router"]);
home.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/home");
    $stateProvider.state("home", {
        url: "/home",
        views: {
            "": {
                templateUrl: "tpls/homeText.html"
            }
        }
    }).state("say",{
        url:"/say",
        views:{
            "":{
                templateUrl:"tpls/say.html"
            }
        }
    }).state("about",{
        url:"/about",
        views:{
            "":{
                templateUrl:"tpls/about.html"
            }
        }
    }).state("clear",{
        url:"/clear",
        templateUrl:"tpls/clear.html"
    }).state("system",{
        url:"/system",
        templateUrl:"tpls/system.html"
    }).state("css3-1",{
        url:"/css3-1",
        templateUrl:"tpls/css3(1).html"
    }).state("css3-2",{
        url:"/css3-2",
        templateUrl:"tpls/css3(2).html"
    })
});
