var app = angular.module('contactApp', []);

app.controller('MainCtrl', function ($scope, $rootScope, fooFactory, fooValue, fooService, fooConstant) {
    // 01_factory
    $scope.fooFactory = fooFactory;

    // 02_value
    $scope.fooValue = fooValue;

    // 03_service
    $scope.fooService = fooService;

    // 04_constant
    $scope.fooConstant = fooConstant;
});

//========================================================

// 01_factory
app.factory('fooFactory', function() {
  var thisIsPrivate = "Private";
  function getPrivate() {
    return thisIsPrivate;
  }
  
  return {
    variable: "This is public",
    getPrivate: getPrivate
  };
});

//========================================================

// 02_value
app.value('fooValue', 'A simple value');

//========================================================

// 03_service
app.service('fooService', function() {
  var thisIsPrivate = "Private";
  this.variable = "This is public";
  this.getPrivate = function() {
    return thisIsPrivate;
  };
});

// This is the same as the service.
app.factory('fooService2', function() {
  return new Foobar();
});


function Foobar() {
  var thisIsPrivate = "Private";
  this.variable = "This is public";
  this.getPrivate = function() {
    return thisIsPrivate;
  };
}

// Or even this
app.service('fooService3', Foobar);

//========================================================

// 04_constant
app.constant('fooConstant', {
  config1: true,
  config2: "Default config2"
});