var app = angular.module('firstApp', ['ngSanitize']);

// see: https://thinkster.io/a-better-way-to-learn-angularjs/basic-directive-functionality
// restrict is default to 'AE'
app.directive("entering", function(){
  return function(scope, element) {
    element.bind("mouseenter", function(){
      console.log("Mouse has entered the div");
    })
  }
});

app.directive("leaving", function(){
  return function(scope, element) {
    element.bind("mouseleave", function(){
      console.log("Mouse has left the div");
    })
  }
});

app.controller('MainCtrl', function ($scope) {

});