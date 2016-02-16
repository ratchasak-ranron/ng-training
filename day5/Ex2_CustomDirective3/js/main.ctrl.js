var app = angular.module('firstApp', ['ngSanitize']);

// see: https://thinkster.io/a-better-way-to-learn-angularjs/advanced-directive-functionality
// restrict is default to 'AE'
app.directive("entering", function(){
  return function(scope, element, attrs) {
    element.bind("mouseenter", function(){
      element.addClass(attrs.entering);
    })
  }
});

app.directive("leaving", function(){
    return function(scope, element, attrs) {
      element.bind("mouseleave", function(){
        element.removeClass(attrs.entering);
      })
    }
  });

app.controller('MainCtrl', function ($scope) {

});