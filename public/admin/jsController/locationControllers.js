'use strict';

/* Location Controllers */

var meanCmsLocationControllers = angular.module('meanCmsLocationControllers', []);

meanCmsLocationControllers.controller('LocationsCtrl', ['$scope', 'checkCreds', '$location', 'LocationList', '$http', 'getToken',
    function LocationsCtrl($scope, checkCreds, $location, LocationList, $http, getToken) {
        if (checkCreds() !== true) {
            $location.path('/loginForm');
        }
        $http.defaults.headers.common['Authorization'] = 'Basic ' + getToken();
        LocationList.getLocationList({},
            function success(response) {
                //alert($scope.challenge.question);
                console.log("Success:" + JSON.stringify(response));
                $scope.locationList = response;
            },
            function error(errorResponse) {
                console.log("Error:" + JSON.stringify(errorResponse));
                //$location.path('/loginFailedForm');
            }
        );
        $scope.locationActiveClass = "active";
    }
]);
meanCmsLocationControllers.controller('DeleteLocationCtrl', ['$scope', 'Location', '$location', '$route', '$http', 'getToken',
    function DeleteLocationCtrl($scope, Location, $location, $route, $http, getToken) {
        $scope.deleteLocation = function(id, name) {
            var doDelete = confirm("Delete " + name);
            if (doDelete === true) {
                $http.defaults.headers.common['Authorization'] = 'Basic ' + getToken();
                Location.delete({ id: id },
                    function success(response) {
                        //alert($scope.challenge.question);
                        console.log("Success:" + JSON.stringify(response));
                        if (response.success === true) {
                            $location.path('/locations');
                        } else {
                            alert("Failed");
                        }
                        $route.reload();
                    },
                    function error(errorResponse) {
                        console.log("Error:" + JSON.stringify(errorResponse));
                        alert("Failed");
                    }
                );
            }
        };
    }
]);
meanCmsLocationControllers.controller('LocationAddCtrl', ['$scope', 'Location', '$location', '$http', 'getToken',
    function LocationAddCtrl($scope, Location, $location, $http, getToken) {
        $scope.submit = function() {
            var menu = false;
            if ($scope.menu === "true") {
                menu = true;
            }

            var postData = {
                "name": $scope.name,
                "menu": menu
            };
            console.log("json request:" + JSON.stringify(postData));
            $http.defaults.headers.common['Authorization'] = 'Basic ' + getToken();
            Location.save({}, postData,
                function success(response) {
                    console.log("Success:" + JSON.stringify(response));
                    if (response.success === true) {
                        // set cookie
                        //setCreds($scope.username, $scope.password);
                        //$location.path('/');
                        console.log("Success:" + JSON.stringify(response));
                        $location.path('/locations');
                    } else {
                        //$location.path('/loginFailedForm');
                        console.log("Failed:" + JSON.stringify(response));
                    }
                },
                function error(errorResponse) {
                    console.log("Error:" + JSON.stringify(errorResponse));
                    //$location.path('/loginFailedForm');
                    $location.path('/locations');
                }
            );
            //$location.path('/articles');
        };
    }
]);
meanCmsLocationControllers.controller('NewLocationCtrl', ['$scope', 'checkCreds', '$location', '$http', 'getToken',
    function NewLocationCtrl($scope, checkCreds, $location, $http, getToken) {
        if (checkCreds() !== true) {
            $location.path('/loginForm');
        }
        $http.defaults.headers.common['Authorization'] = 'Basic ' + getToken();
        $scope.menu = "false";
        $scope.newLocationActiveClass = "active";
    }
]);
meanCmsLocationControllers.controller('LocationCtrl', ['$scope', 'checkCreds', '$location', "Location", '$routeParams', '$http', 'getToken',
    function LocationCtrl($scope, checkCreds, $location, Location, $routeParams, $http, getToken) {
        if (checkCreds() !== true) {
            $location.path('/loginForm');
        }
        $http.defaults.headers.common['Authorization'] = 'Basic ' + getToken();
        var locationId = $routeParams.a;
        Location.get({ id: locationId },
            function success(response) {
                //alert($scope.challenge.question);
                console.log("Success:" + JSON.stringify(response));
                $scope.name = response.name;
                $scope.id = response._id;
                if (response.menu) {
                    $scope.menu = "true";
                } else {
                    $scope.menu = "false";
                }
                //$scope.articleList = response.usageList.articleList;
                //$scope.productList = response.usageList.productList;
                $scope.articleList = response.articleList;
                $scope.productList = response.productList;
                var artCnt = $scope.articleList.length;
                var prodCnt = $scope.productList.length;
                var totCnt = artCnt + prodCnt;
                var locationList = [totCnt];
                var cnt = 0;
                for (var cnt1 = 0; cnt1 < $scope.articleList.length; cnt1++, cnt++) {
                    var art = {
                        "name": $scope.articleList[cnt1],
                        "type": "Article"
                    }
                    locationList[cnt] = art;
                }
                for (var cnt2 = 0; cnt2 < $scope.productList.length; cnt2++, cnt++) {
                    var prod = {
                        "name": $scope.productList[cnt2],
                        "type": "Product"
                    }
                    locationList[cnt] = prod;
                }
                $scope.locationList = locationList;
            },
            function error(errorResponse) {
                console.log("Error:" + JSON.stringify(errorResponse));
                //$location.path('/loginFailedForm');
            }
        );
        $scope.locationActiveClass = "active";
    }
]);
meanCmsLocationControllers.controller('LocationEditCtrl', ['$scope', 'Location', '$location', '$http', 'getToken',
    function LocationEditCtrl($scope, Location, $location, $http, getToken) {
        $scope.submit = function() {
            var menu = false;
            if ($scope.menu === "true") {
                menu = true;
            }
            var putData = {
                "id": $scope.id,
                "name": $scope.name,
                "menu": menu
            };
            console.log("json request:" + JSON.stringify(putData));
            $http.defaults.headers.common['Authorization'] = 'Basic ' + getToken();
            Location.update({}, putData,
                function success(response) {
                    console.log("Success:" + JSON.stringify(response));
                    if (response.success === true) {
                        // set cookie
                        //setCreds($scope.username, $scope.password);
                        //$location.path('/');
                        console.log("Success:" + JSON.stringify(response));
                        $location.path('/locations');
                    } else {
                        //$location.path('/loginFailedForm');
                        console.log("Failed:" + JSON.stringify(response));
                    }
                },
                function error(errorResponse) {
                    console.log("Error:" + JSON.stringify(errorResponse));
                    //$location.path('/loginFailedForm');
                    $location.path('/locations');
                }
            );
            //$location.path('/articles');
        };
    }
]);