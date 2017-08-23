(function () {
    var theaters  = angular.module("doubanApp.in_theaters",["doubanApp.service"]);
    theaters.controller("TheatersController",["$scope","$http","$route","$routeParams","jsonpService",function ($scope,$http,$route,$routeParams,jsonpService) {
        /*
            https://api.douban.com/v2/movie/in_theaters
            angular发送ajax请求
         */
        /*
            此处请求服务的json数据,服务端是webstorm自动开启的,webstorm将整个WebCode目录部署到了服务端
            此处不要使用相对路径,应该使用绝对路径

            url中第一个/ 代表的是localhost,服务端的地址,接着是服务端的文件目录
         */
        /*
        请求本地的json文件
        $http.get("/WebCode/Angular_05/Douban/module/in_theaters/data.json").then(function (result) {
            $scope.list = result.data.subjects;
        })
        */
        /*
            以跨域的方式请求豆瓣服务器的数据,使用自定义的跨域服务
         */
        $scope.isLoading = true;

        //当前页(默认是第一页,用于控制页面跳转) 获取路由参数page的值赋值给当前页
        $scope.currentPage = parseInt($routeParams.page) || 1;

        //根据当前是第几页,请求对应的数据
        requestMovieData(($scope.currentPage - 1) * 5);

        /*
            通过$scope监听路由的改变事件,防止用户手动输入无意义的页码值
            $routeChangeStart:路由还没跳转,将要跳转
         */
        $scope.$on("$routeChangeStart",function (event,next,current) {
            //current:路由当前的值
            //next:路由将要变化的值
            //用户手动输入的参数获取到的是字符串,需要转为整数
            var page = parseInt(next.params.page);
            if (page < 1){
                $route.updateParams({page:1})
            }else if(page > $scope.totalPage){
                $route.updateParams({page:$scope.totalPage})
            }
        })

        //翻页时会调用此方法
        $scope.go = function (page) {
            if(page < 1 || page > $scope.totalPage) return;
            //更新当前页
            $scope.currentPage = page;
            //要翻页时,显示加载动画
            $scope.isLoading = true;

            //更新路由值,会导致页面的url变为 #/in_theaters?page=x,控制器代码重新执行
            $route.updateParams({page:page})
        }

        //请求电影数据的方法,根据start的值,请求数据
        function requestMovieData(start) {
            jsonpService.jsonp(" https://api.douban.com/v2/movie/in_theaters","callback",function (result) {
                //将请求的数据绑定到作用域
                $scope.list = result.subjects;

                $scope.totalPage = Math.ceil(result.total / 5);
                $scope.total = result.total;

                //数据加载完成,隐藏加载动画
                $scope.isLoading = false;
                //因为当前的函数内部不是angular的环境,需要手动刷新页面
                $scope.$apply();
            },{start:start,count:5})
        }

    }])
})();