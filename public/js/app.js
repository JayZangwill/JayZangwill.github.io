var home = angular.module("home", ["ui.router"]);
home.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/home/home");
    $stateProvider.state("home", {
        url: "/home",
        views: {
            "": {
                templateUrl: "tpls/navbar.html"
            },
            "headImg":{
                templateUrl:"tpls/headImg.html"
            },
            "footer":{
                templateUrl:"tpls/footer.html"
            }
        }
    }).state("home.say",{
        url:"/say",
        templateUrl:"tpls/say.html"
    }).state("home.about",{
        url:"/about",
        templateUrl:"tpls/about.html"
    }).state("home.home",{
        url:"/home",
        templateUrl:"tpls/homeText.html"
    }).state("clear",{
        url:"/clear",
        templateUrl:"tpls/clear.html"
    }).state("system",{
        url:"/system",
        templateUrl:"tpls/system.html"
    }).state("css3-1",{
        url:"/css3(1)",
        templateUrl:"tpls/css3(1).html"
    }).state("css3-2",{
        url:"/css3(2)",
        templateUrl:"tpls/css3(2).html"
    })
});