'use strict';

angular.module('controller.contact', [])
  .config(['$stateProvider', function($stateProvider){
    $stateProvider.state('root.contact', {
      url: '',
      views: {
        'container@root': {
          templateUrl: 'app/contact/contact.html',
          controller: 'ContactCtrl'
        },
        'contact_list@root.contact': {
          templateUrl: 'app/contact/list_contact.html',
          controller: 'ListContactCtrl',
          resolve: {
            contactList: function (global) {
              return global.contactListPromise;
            }
          }
        },
        'contact_action@root.contact': {
          templateUrl: 'app/contact/not_select_contact.html',
          controller: 'NotSelectContactCtrl'
        }
      }
    });
  }])

  .controller('ContactCtrl', function ($scope, $rootScope) {
  })

  .controller('ListContactCtrl', function ($scope, global) {
    $scope.contacts = global.contactList;
  })

  .controller('NotSelectContactCtrl', function ($scope, $rootScope) {
  });