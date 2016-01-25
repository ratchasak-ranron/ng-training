var app = angular.module('contactApp', []);

app.controller('MainCtrl', function ($scope, $rootScope) {
    // 03_ngInit
    $scope.list = [['a', 'b'], ['c', 'd']];

    // 05_ngSwitch
    $scope.items = ['settings', 'home', 'other'];
    $scope.selection = $scope.items[0];

    // 06_bindHtml
    $scope.myHTML =
     'I am an <code>HTML</code>string with ' +
     '<a href="#">links!</a> and other <em>stuff</em>';

    // 07_ngInclude
    $scope.templates =
    [ { name: 'template1.html', url: 'template1.html'},
      { name: 'template2.html', url: 'template2.html'} ];
    $scope.template = $scope.templates[0];
});