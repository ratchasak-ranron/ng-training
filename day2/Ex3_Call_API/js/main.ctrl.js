var app = angular.module('firstApp', ['ngSanitize']);

app.controller('MainCtrl', function ($scope, $rootScope, Contact, contactContainer, contactApiManager) {
  // Contact List
  $scope.listContact = function() {
    contactApiManager.list().then(function(data) {
      $scope.isLoadingContactList = false;
      contactContainer.contactList = [];
      var contactList = data;
      for(var key in contactList) {
        var contact = contactList[key];
        contactContainer.contactList.push(
          new Contact(contact.id, contact.name, contact.email, contact.phone, contact.url, contact.notes)
        )
      }
      $scope.contactContainer = contactContainer;
    });
  };
  $scope.isLoadingContactList = true;
  $scope.listContact();

  // Get Contact
  $scope.aContact = null;
  $scope.isLoadingContact = false;
  $scope.errorContact = null;
  $scope.getContact = function() {
    $scope.isLoadingContact = true;
    $scope.errorContact = null;
    contactApiManager.get($scope.contactId).then(function(contact) {
      $scope.isLoadingContact = false;
      $scope.aContact = contact;
    }, function error(msg) {
      $scope.isLoadingContact = false;
      $scope.errorContact = msg;
    });
  };

  // Add contact
  $scope.addMessage = null;
  $scope.addContact = function() {
    var contact = new Contact(null, $scope.addName, $scope.addEmail, $scope.addPhone, $scope.addUrl, $scope.addNotes);
    $scope.addMessage = null;
    contactApiManager.add(contact).then(function(msg) {
      $scope.addMessage = msg;
      $scope.listContact();
    }, function error(msg) {
      $scope.addMessage = msg;
    });
  };

  // Update contact
  $scope.prepareUpdate = function(contact) {
    $scope.updateId = contact.id;
    $scope.updateName = contact.name;
    $scope.updateEmail = contact.email;
    $scope.updatePhone = contact.phone;
    $scope.updateUrl = contact.url;
    $scope.updateNotes = contact.notes;
  };
  $scope.updateMessage = null;
  $scope.updateContact = function() {
    var contact = new Contact($scope.updateId, $scope.updateName, $scope.updateEmail, $scope.updatePhone, $scope.updateUrl, $scope.updateNotes);
    $scope.updateMessage = null;
    contactApiManager.edit(contact).then(function(msg) {
      $scope.updateMessage = msg;
      $scope.listContact();
    }, function error(msg) {
      $scope.updateMessage = msg;
    });
  };

  // Delete contact
  $scope.deleteContact = function(contact) {
    if(!confirm('Sure ?')) return;
    contactApiManager.delete(contact).then(function(msg) {
      alert('Deleted !');
      $scope.listContact();
    }, function error(msg) {
      alert('Cannot Delete');
    });
  };
});


// API Manager
app.value('API_PATH', 'http://ng-training.ratchasak.me/api.php');
app.factory('contactApiManager', function($http, $q, API_PATH, Contact) {
  var apiPath = API_PATH;

  this.list = function() {
    var defer = $q.defer();

    $http({
      url: apiPath + '/contact?transform=1',
      method: "GET"
    }).then(function successCallback(response) {
      // this callback will be called asynchronously
      // when the response is available
      defer.resolve(response.data.contact);
    }, function errorCallback(response) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
      defer.reject('Cannot get contact list');
    });

    return defer.promise;
  };

  this.get = function(id) {
    var defer = $q.defer();

    $http({
      url: apiPath + '/contact/' + id,
      method: "GET"
    }).then(function successCallback(response) {
      // this callback will be called asynchronously
      // when the response is available
      var contactData = response.data;
      var objContact = new Contact(contactData.id, contactData.name, contactData.email,
        contactData.phone, contactData.url, contactData.notes);
      defer.resolve(objContact);
    }, function errorCallback(response) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
      defer.reject(response.data);
    });

    return defer.promise;
  };

  this.add = function(contact) {
    var defer = $q.defer();

    $http({
      url: apiPath + '/contact',
      method: "POST",
      data: {
        name: contact.name,
        email: contact.email,
        phone: contact.phone,
        url: contact.url,
        notes: contact.notes
      }
    }).then(function successCallback(response) {
      // this callback will be called asynchronously
      // when the response is available
      defer.resolve('Success!');
    }, function errorCallback(response) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
      defer.reject('Cannot get contact list');
    });

    return defer.promise;
  };

  this.edit = function(contact) {
    var defer = $q.defer();

    $http({
      url: apiPath + '/contact/' + contact.id,
      method: "PUT",
      data: {
        name: contact.name,
        email: contact.email,
        phone: contact.phone,
        url: contact.url,
        notes: contact.notes
      }
    }).then(function successCallback(response) {
      // this callback will be called asynchronously
      // when the response is available
      defer.resolve('Success!');
    }, function errorCallback(response) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
      defer.reject('Cannot get contact list');
    });

    return defer.promise;
  };

  this.delete = function(contact) {
    var defer = $q.defer();

    $http({
      url: apiPath + '/contact/' + contact.id,
      method: "DELETE"
    }).then(function successCallback(response) {
      // this callback will be called asynchronously
      // when the response is available
      defer.resolve('Success!');
    }, function errorCallback(response) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
      defer.reject('Cannot get contact list');
    });

    return defer.promise;
  };

  return this;
});


// Factory as a Constant
app.factory('ContactConstant', function(){
  return {
    DEFAULT_MONEY: 500
  };
});

// Factory as a Class/Model
app.factory('Contact', function(ContactConstant) {
  function Contact(id, name, email, phone, url, notes) {
    // Public variable
    this.id = id;
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.url = url;
    this.notes = notes;
  }

  Contact.prototype.getId = function getName() {
    return this.id;
  };

  Contact.prototype.getName = function getName() {
    return this.name;
  };

  Contact.prototype.getEmail = function getEmail() {
    return this.email;
  };

  Contact.prototype.getPhone = function getPhone() {
    return this.phone;
  };

  Contact.prototype.getUrl = function getMoney() {
    return this.url;
  };

  Contact.prototype.getNotes = function getMoney() {
    return this.notes;
  };

  return Contact;
});

// Factory as a Singleton/Config (Like Static Class)
app.factory('contactContainer', function() {
  this.contactList = [];

  return this;
});