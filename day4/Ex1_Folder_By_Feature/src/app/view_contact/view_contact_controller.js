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
  .controller('ViewContactCtrl', function ($rootScope, $scope, $stateParams, global, $state) {
    var contactId = $stateParams.contactId;

    $scope.currentContact = global.contactList[global.contactMapIdIndex[contactId]];
    $scope.removeContact = function (contact) {
      if(confirm('Are you sure ?')) {
        contact.delete().then(function success(isSuccess) {
          delete global.contactList[global.contactMapIdIndex[contactId]];
          $state.go('root.contact', {isEditSuccess: true})
        });
      }
    };
  });