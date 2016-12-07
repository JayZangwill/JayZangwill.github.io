var home = angular.module("home", ["ui.router"]);
home.config(["$stateProvider", "$urlRouterProvider", function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/home");
    $stateProvider.state("home", {
        url: "/home",
        views: {
            "": {
                templateUrl: "tpls/homeText.html"
            }
        }
    }).state("say", {
        url: "/say",
        views: {
            "": {
                templateUrl: "tpls/say.html"
            }
        }
    }).state("about", {
        url: "/about",
        views: {
            "": {
                templateUrl: "tpls/about.html"
            }
        }
    }).state("clear", {
        url: "/clear",
        templateUrl: "tpls/clear.html"
    }).state("system", {
        url: "/system",
        templateUrl: "tpls/system.html"
    }).state("css3-1", {
        url: "/css3-1",
        templateUrl: "tpls/css3(1).html"
    }).state("css3-2", {
        url: "/css3-2",
        templateUrl: "tpls/css3(2).html"
    });
}]);
home.controller("topCtrl",["$scope",function($scope){
	$(function () {
    $(".toTop").hide();
    $(window).scroll(function () {
        if ($(window).scrollTop() > 200) {
            $(".toTop").fadeIn("slow");
        } else {
            $(".toTop").fadeOut("slow");
        }
    });
    $(".toTop").click(function () {
        $('body,html').animate({
            scrollTop: 0
        }, 500);
        return false;
    });
});
}]);