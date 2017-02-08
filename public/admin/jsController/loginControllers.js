'use strict';

/* Login Controllers */
var meanCmsLoginControllers = angular.module('meanCmsLoginControllers', []);

meanCmsLoginControllers.controller('LoginFailedFormCtrl', ['$scope',
    function LoginFailedFormCtrl($scope) {
        $scope.loginFailMessage = "Đăng nhập không thành công";
    }
]);
meanCmsLoginControllers.controller('LoginFormCtrl', ['$scope',
    function LoginFormCtrl($scope) {
        //$scope.message = "hello";
        //$scope.uploadArticleActiveClass = "active";
    }
]);
meanCmsLoginControllers.controller('LogOutCtrl', ['$scope', 'deleteCreds', '$location', '$http',
    function LogOutCtrl($scope, deleteCreds, $location, $http) {
        var doLogOut = confirm("Log Out?");
        if (doLogOut === true) {
            deleteCreds();
            $http.defaults.headers.common['Authorization'] = 'Basic ';
            $location.path('/loginForm');
        } else {
            $location.path('/');
        }
        //$scope.message = "hello";
        //$scope.uploadArticleActiveClass = "active";
    }
]);
meanCmsLoginControllers.controller('LoginCtrl', ['$scope', 'Login', '$location', 'setCreds', '$http', 'getToken',
    function LoginCtrl($scope, Login, $location, setCreds, $http, getToken) {
        $scope.submit = function() {
            var postDate = {
                "username": $scope.username,
                "password": $scope.password
            };
            Login.save({}, postDate,
                function success(response) {
                    console.log("Success :" + JSON.stringify(response));
                    if (response.success === true) {
                        // set cookie
                        setCreds($scope.username, $scope.password);
                        $http.defaults.headers.common['Authorization'] = 'Basic ' + getToken();
                        $location.path('/');
                    } else {
                        $location.path('/loginFailedForm');
                    }
                },
                function error(errorResponse) {
                    console.log("Error:" + JSON.stringify(errorResponse));
                    $location.path('/loginFailedForm');
                }
            );
        };
    }
]);