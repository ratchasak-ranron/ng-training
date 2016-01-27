'use strict';

angular.module('controller.contact.add', [])
  .config(['$stateProvider', function($stateProvider){
    $stateProvider.state('root.contact.add', {
      url: '/add',
      views: {
        'contact_action@root.contact': {
          templateUrl: 'app/add_contact/add_contact.html',
          controller: 'AddContactCtrl'
        }
      }
    });
  }])
  .controller('AddContactCtrl', function ($rootScope, $scope) {

  });