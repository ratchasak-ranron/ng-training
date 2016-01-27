'use strict';

angular.module('directives.contact', [])

  .directive('contact', function () {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'app/components/directives/contact/contact.html'
    }
  });