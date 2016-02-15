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
  .controller('EditContactCtrl', function ($rootScope, $scope, $stateParams, global, $state) {
    var contactId = $stateParams.contactId;
    $scope.contactId = contactId;
    $scope.currentContact = global.contactList[global.contactMapIdIndex[contactId]];
    $scope.tmpContact = angular.copy($scope.currentContact);

    $scope.isDisableButton = false;
    $scope.saveEdit = function() {
      angular.extend($scope.currentContact, $scope.tmpContact);
      $scope.isDisableButton = true;
      $scope.currentContact.edit().then(function success(isSuccess) {
        $state.go('root.contact', {isEditSuccess: isSuccess})
      });
    }
  });