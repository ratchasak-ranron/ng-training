var app = angular.module('firstApp', ['ngSanitize']);

app.controller('MainCtrl', function ($scope, $http, Contact, contactApiManager) {
  $scope.contactList = [];

  $scope.response = 'no response right now';

  contactApiManager.list().then(function(contactList) {
    $scope.contactList = contactList;
  });

  $scope.response = 'after request';
});

app.value('API_PATH', 'http://ng-training.ratchasak.me/api.php');
app.factory('contactApiManager', function($http, $q, API_PATH, Contact) {
  var apiPath = API_PATH;

  this.list = function () {
    var defer = $q.defer();

    $http({
      url: apiPath + '/contact?transform=1',
      method: "GET"
    }).then(function successCallback(response) {
      var contacts = response.data.contact;
      var contactList = [];
      for(var i = 0; i < contacts.length; i++) {
        var data = contacts[i];
        var contact = new Contact(data.id, data.name, data.email, data.url, data.notes);
        contactList.push(contact);
      }
      defer.resolve(contactList);
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

app.factory('Contact', function(API_PATH, $q, $http) {
  var apiPath = API_PATH;

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