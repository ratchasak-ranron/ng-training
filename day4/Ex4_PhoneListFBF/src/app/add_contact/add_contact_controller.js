'use strict';

angular.module('controller.contact.add', [])
  .config(['$stateProvider', function($stateProvider){
    $stateProvider.state('root.contact.add', {
      url: '/add',
      views: {
        'contact_action@root.contact': {
          templateUrl: 'app/add_contact/add_contact.html',
          controller: 'AddContactCtrl',
          resolve: {
            contactList: function (global) {
              return global.contactListPromise;
            }
          }
        }
      }
    });
  }])
  .controller('AddContactCtrl', function ($rootScope, $scope, global, Contact, $state) {
    $scope.currentContact = {
      name: '',
      email: '',
      phone: '',
      url: '',
      notes: ''
    };

    $scope.isDisableButton = false;
    $scope.addContact = function() {
      var contact = new Contact(0, $scope.currentContact.name, $scope.currentContact.email, $scope.currentContact.phone, $scope.currentContact.url, $scope.currentContact.notes);

      $scope.isDisableButton = true;
      contact.add().then(function success(newId) {
        contact.id = newId;
        global.contactList.push(contact);
        global.contactMapIdIndex[newId] = global.contactList.length - 1;
        $state.go('root.contact', {isEditSuccess: true})
      });
    }
  });