var app = angular.module('firstApp', ['ngSanitize']);

// see: https://thinkster.io/a-better-way-to-learn-angularjs/directive-restrictions
// let's change the restrict
// A - Attribute
// E - Element
// C - Class
// M - Comment
app.directive("welcome", function() {
  return {
    restrict: "E",
    link: function(){
      alert("Howdy!");
    }
  }
});

app.directive("goodbye", function() {
  return {
    restrict: "A",
    link: function(){
      alert("See ya later!");
    }
  }
});

app.directive("bye", function() {
  return {
    restrict: "A",
    link: function(){
      alert("Bye!");
    }
  }
});

app.controller('MainCtrl', function ($scope) {

});