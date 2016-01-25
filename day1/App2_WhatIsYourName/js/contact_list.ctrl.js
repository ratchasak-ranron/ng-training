var app = angular.module('helloworldApp', []);

app.controller('MainCtrl', function ($scope, $rootScope) {
	$rootScope.name = "All";

	$scope.$watch('name', function(newValue, oldValue) {
	  $rootScope.name = newValue;
	});
});