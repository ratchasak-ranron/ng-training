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

app.controller('MainCtrl', function ($scope, $location) {
  $scope.path = $location.path();
});

app.controller('RouteBCtrl', function ($scope, $routeParams, $location) {
  $scope.id = $routeParams.id;
  $scope.path = $location.path();
});

app.controller('RouteCCtrl', function ($scope, $location) {
  $scope.path = $location.path();
});

app.controller('RouteDCtrl', function ($scope, $routeParams, $location) {
  $scope.id = $routeParams.id;
  $scope.path = $location.path();
});