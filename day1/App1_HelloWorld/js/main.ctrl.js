var app = angular.module('helloworldApp', []);

app.controller('MainCtrl', function ($scope, $rootScope) {
  $scope.txtHello = "Hello World";

  $rootScope.title = "Hello A";
  $scope.title = "Hello B"
});