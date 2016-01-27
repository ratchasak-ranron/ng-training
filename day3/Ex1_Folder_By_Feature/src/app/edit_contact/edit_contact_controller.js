'use strict';

angular.module('controller.contact.edit', [])
  .config(['$stateProvider', function($stateProvider){
    $stateProvider.state('root.contact.edit', {
      url: '/edit/:contactId',
      views: {
        'contact_action@root.contact': {
          templateUrl: 'app/edit_contact/edit_contact.html',
          controller: 'EditContactCtrl'
        }
      }
    });
  }])
  .controller('EditContactCtrl', function ($rootScope, $scope, $stateParams, global) {
    var contactId = $stateParams.contactId;
    $scope.currentContact = global.contactList[global.contactMapIdIndex[contactId]];
  });