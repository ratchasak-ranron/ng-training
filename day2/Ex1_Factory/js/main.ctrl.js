var app = angular.module('firstApp', ['ngSanitize']);

// Factory as a Constant
app.factory('ContactConstant', function(){
  return {
    DEFAULT_MONEY: 500
  };
});

// Factory as a Class
app.factory('Contact', function(ContactConstant) {
  function Contact(myName, myEmail, myPhone, url, notes) {
    // Public variable
    this.name = myName;
    this.email = myEmail;
    this.phone = myPhone;
    this.url = url;
    this.notes = notes;

    //if(myMoney != undefined) {
    //  this.money = myMoney;
    //} else {
    //  this.money = ContactConstant.DEFAULT_MONEY;
    //}
  }

  //Contact.prototype.checkMoney = function checkNameLength() {
  //  return this.money >= 5000;
  //};

  Contact.prototype.getName = function getName() {
    return this.name;
  };

  Contact.prototype.setName = function setName(name) {
    this.name = name;
  };

  Contact.prototype.getEmail = function getEmail() {
    return this.email;
  };

  Contact.prototype.getPhone = function getPhone() {
    return this.phone;
  };

  //Contact.prototype.getMoney = function getMoney() {
  //  return this.money;
  //};

  Contact.prototype.getUrl = function getUrl() {
    return this.url;
  };

  Contact.prototype.getUrlLink = function getUrlLink() {
    return '<a href="'+ this.url + '">My Profile</a>';
  };

  Contact.prototype.getNotes = function getNotes() {
    return this.phone;
  };

  return Contact;
});

// Factory as a Singleton/Config
app.factory('contactContainer', function(ContactConstant, Contact) {
  // Private variable
  var privateVar = 555;

  // Public variable
  this.contactList = [];

  // Static method
  this.getPrivateVar = function() {
    return privateVar;
  };

  this.setPrivateVar = function(value) {
    privateVar = value;
  };

  return this;
});

app.controller('MainCtrl', function ($scope, $rootScope, Contact, contactContainer) {
  contactContainer.contactList = [
    new Contact('New', 'Ratchsak@gmail.com', '0866058855', 'www.google.com', 'Hi'),
    new Contact('New2', 'Ratchsak@gmail.com', '0866058855', 'www.google.com', 'Hi'),
    new Contact('New3', 'Ratchsak@gmail.com', '0866058855', 'www.google.com', 'Hi')
  ];

  $scope.contactContainer = contactContainer;
});

app.controller('SecondCtrl', function ($scope, $rootScope, Contact, contactContainer) {
  $scope.contactContainer = contactContainer;
});