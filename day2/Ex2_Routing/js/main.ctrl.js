var app = angular.module('contactApp', ['ngRoute']);

//ng-route config
app.config(function ($routeProvider, $locationProvider){
  $routeProvider
    .when('/routeA', {
      templateUrl: 'route-a.html',
    })
    .when('/routeB/:id', {
      templateUrl: 'route-b.html',
      controller: 'RouteBCtrl'
    })
    .when('/routeC', {
      templateUrl: 'route-c.html',
      controller: 'RouteCCtrl'
    })
    .when('/routeD/:id', {
      templateUrl: 'route-d.html',
      controller: 'RouteDCtrl'
    })
    .otherwise({redirectTo: '/routeA'});
});

app.controller('MainCtrl', function ($scope, $rootScope) {

});

app.controller('RouteBCtrl', function ($scope, $routeParams) {
  $scope.id = $routeParams.id;
});

app.controller('RouteCCtrl', function ($scope, $rootScope) {

});

app.controller('RouteDCtrl', function ($scope, $routeParams) {
  $scope.id = $routeParams.id;
});