var app = angular.module('contactApp', []);

app.controller('MainCtrl', function ($scope, $rootScope) {
    // 01_ngChange
    $scope.counter = 0;
    $scope.change = function() {
      $scope.counter++;
    };
});