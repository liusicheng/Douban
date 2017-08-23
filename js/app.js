(function () {
    var app = angular.module("doubanApp",["ngRoute","doubanApp.in_theaters","doubanApp.coming_soon","doubanApp.top"]);
    //配置路由
    app.config(["$routeProvider",function ($routeProvider) {
        $routeProvider
            .when("/",{templateUrl:"module/in_theaters/in_theaters.html",controller:"TheatersController"})
            .when("/in_theaters",{templateUrl:"module/in_theaters/in_theaters.html",controller:"TheatersController"})
            .when("/coming_soon",{templateUrl:"module/coming_soon/coming_soon.html",controller:"ComingSoonController"})
            .when("/top250",{templateUrl:"module/top250/top250.html",controller:"TopController"})
            .otherwise({redirectTo:"/"})
    }])
})();