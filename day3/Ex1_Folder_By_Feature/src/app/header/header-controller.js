'use strict';

angular.module('controller.header', [])

  .controller('HeaderCtrl', function ($scope, $rootScope) {
    $scope.nav = {
      navItems: [
        {
          link: '',
          text: 'home'
        },
        {
          link: '/add',
          text: 'add'
        }
      ],
      selectedIndex: 0,
      navClick: function ($index) {
        $scope.nav.selectedIndex = $index;
      }
    };
  });