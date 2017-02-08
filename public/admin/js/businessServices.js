'use strict';

/* Business Services */
/*
var ulboraCmsAdminServices = angular.module('ulboraCmsAdminServices', ['ngResource', 'ngCookies']);

ulboraCmsAdminServices.factory('Challenge', ['$resource',
    function($resource) {
        return $resource(siteUrl + "/user/getChallenge", {}, {
            getChallenge: {method: 'GET', params: {languageCode: "en_US"}, isArray: false}
        });
    }]);

ulboraCmsAdminServices.factory('Login', ['$resource',
    function($resource) {
        return $resource(siteUrl + "public/login", {}, {
        });
    }]);

ulboraCmsAdminServices.factory('ArticleValues', ['$resource', 'getToken',
    function($resource, getToken) {
        return $resource(siteUrl + "article/values", {}, {
            getValues: {method: 'GET', params: {languageCode: "en_US"}, isArray: false, headers: {Authorization: 'Basic ' + getToken()}}
        });
    }]);


ulboraCmsAdminServices.factory('ArticleList', ['$resource', 'getToken',
    function($resource, getToken) {
        return $resource(siteUrl + "article/list", {}, {
            getArticleList: {method: 'POST', isArray: true, headers: {Authorization: 'Basic ' + getToken()}}
        });
    }]);

*/
//---business logic services only------------------------------------------------------------------
var meanCmsAdminBusinessServices = angular.module('meanCmsAdminBusinessServices', ['ngResource', 'ngCookies']);

meanCmsAdminBusinessServices.factory('checkCreds', ['$cookies', function($cookies) {
    return function() {
        var returnVal = false;
        var ulboraCreds = $cookies.ulboraCreds;
        if (ulboraCreds !== undefined && ulboraCreds !== "") {
            returnVal = true;
        }
        return returnVal;
    };

}]);

meanCmsAdminBusinessServices.factory('getToken', ['$cookies', function($cookies) {
    return function() {
        var returnVal = "";
        var ulboraCreds = $cookies.ulboraCreds;
        if (ulboraCreds !== undefined && ulboraCreds !== "") {
            returnVal = btoa(ulboraCreds);
        }
        return returnVal;
    };

}]);

meanCmsAdminBusinessServices.factory('getUsername', ['$cookies', function($cookies) {
    return function() {
        var returnVal = "";
        var ulboraUsername = $cookies.ulboraUsername;
        if (ulboraUsername !== undefined && ulboraUsername !== "") {
            returnVal = ulboraUsername;
        }
        return returnVal;
    };

}]);



meanCmsAdminBusinessServices.factory('setCreds', ['$cookies', function($cookies) {
    return function(un, pw) {
        var token = un.concat(":", pw);
        $cookies.ulboraCreds = token;
        $cookies.ulboraUsername = un;
    };

}]);

meanCmsAdminBusinessServices.factory('deleteCreds', ['$cookies', function($cookies) {
    return function() {
        $cookies.ulboraCreds = "";
        $cookies.ulboraUsername = "";
    };
}]);

meanCmsAdminBusinessServices.factory('Page', function() {
    var title = 'default';
    return {
        title: function() {
            return title;
        },
        setTitle: function(newTitle) {
            title = newTitle;
        }
    };
});

meanCmsAdminBusinessServices.factory('DateUtil', function() {
    return {
        stringifyDate: function(dateLong) {
            var theDate = new Date(dateLong);
            var month = theDate.getMonth();
            month++;
            var day = theDate.getDate();
            var year = theDate.getFullYear();
            var dateStr = month + "/" + day + "/" + year;
            return dateStr;
        }
    };
});