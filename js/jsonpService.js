(function () {
    var serviceModule = angular.module("doubanApp.service",[]);

    serviceModule.service("jsonpService",["$window",function ($window) {
        this.jsonp = function (url,jsonpKey,fn,params) {
            var queryString = "?";
            for(key in params){
                queryString += key + "=" + params[key] + "&"
            }
            //生成函数名
            var funName = "myCallBack_"+new Date().getTime();
            //queryString = "?callback=myCallBack_15721243210000
            queryString  += jsonpKey + "=" + funName;
            url += queryString;

            //创建script标签
            var scriptNode = $window.document.createElement("script");
            scriptNode.src = url;
            //将创建好的标签追加到页面
            $window.document.body.appendChild(scriptNode);
            //window["myCallBack_15721243210000"] = function(){}
            $window[funName] = function (result) {
                /*
                    数据请求完成后,删除标签
                */
                $window.document.body.removeChild(scriptNode);
                fn(result);
            }
        }
    }])
})();