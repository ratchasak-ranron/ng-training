'use strict';

angular.module('controller.home', [])
  .config(['$stateProvider', function($stateProvider){
    $stateProvider.state('home', {
      url: '/',
      views: {
        'container': {
          templateUrl: 'app/home/home.html',
          controller: 'HomeCtrl'
        }
      }
    });
  }])
  .controller('HomeCtrl', function ($rootScope, $scope) {
    $scope.hello = 'Hello World';
  });