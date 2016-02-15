'use strict';

angular.module('controller.header', [])

  .controller('HeaderCtrl', function ($scope, $rootScope) {
    $scope.nav = {
      navItems: [
        {
          state: 'root.contact',
          text: 'home'
        },
        {
          state: 'root.contact.add',
          text: 'add'
        }
      ]
    };
  });