var app = angular.module('firstApp', ['ngSanitize']);

// see: https://docs.angularjs.org/guide/directive
app.directive('myCustomer', function() {
  return {
    restrict: 'E',
    scope: {
      customerInfo: '='
    },
    template: 'Name: {{customerInfo.name}} Address: {{customerInfo.address}}'
  };
});

app.controller('MainCtrl', function ($scope) {
  $scope.naomi = { name: 'Naomi', address: '1600 Amphitheatre' };
  $scope.igor = { name: 'Igor', address: '123 Somewhere' };
});