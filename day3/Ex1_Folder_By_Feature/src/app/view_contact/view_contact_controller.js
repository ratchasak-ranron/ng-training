'use strict';

angular.module('controller.contact.view', [])
  .config(['$stateProvider', function($stateProvider){
    $stateProvider.state('root.contact.view', {
      url: '/view/:contactId',
      views: {
        'contact_action@root.contact': {
          templateUrl: 'app/view_contact/view_contact.html',
          controller: 'ViewContactCtrl'
        }
      }
    });
  }])
  .controller('ViewContactCtrl', function ($rootScope, $scope, $stateParams, global) {
    var contactId = $stateParams.contactId;

    $scope.currentContact = global.contactList[global.contactMapIdIndex[contactId]];
    $scope.removeContact = function (contact) {

    };
  });