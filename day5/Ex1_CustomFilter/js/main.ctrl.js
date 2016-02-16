var app = angular.module('firstApp', ['ngSanitize']);

// Reverse Filter
app.filter('reverse', function() {
  return function(input, uppercase) {
    input = input || '';
    var out = "";
    for (var i = 0; i < input.length; i++) {
      out = input.charAt(i) + out;
    }
    // conditional based on optional argument
    if (uppercase) {
      out = out.toUpperCase();
    }
    return out;
  };
});
// Decoration Filter
app.value('decoration', {symbol: '*'});
app.filter('decorate', ['decoration', function(decoration) {

  function decorateFilter(input) {
    return decoration.symbol + input + decoration.symbol;
  }
  decorateFilter.$stateful = true;

  return decorateFilter;
}]);

app.controller('MainCtrl', function ($scope, reverseFilter, decoration) {
  $scope.greeting = 'hello';
  $scope.filteredGreeting = reverseFilter($scope.greeting);

  $scope.greeting2 = 'hello';
  $scope.decoration = decoration;
});