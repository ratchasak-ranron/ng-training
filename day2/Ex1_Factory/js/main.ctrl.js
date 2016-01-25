var app = angular.module('firstApp', ['ngSanitize']);

// Factory as a Constant
app.factory('ContactConstant', function(){
  return {
    DEFAULT_MONEY: 500
  };
});

// Factory as a Class
app.factory('Contact', function(ContactConstant) {
  function Contact(myName, myEmail, myPhone, myMoney) {
    // Public variable
    this.name = myName;
    this.email = myEmail;
    this.phone = myPhone;

    if(myMoney != undefined) {
      this.money = myMoney;
    } else {
      this.money = ContactConstant.DEFAULT_MONEY;
    }
  }

  Contact.prototype.checkMoney = function checkNameLength() {
    return this.money >= 5000;

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

  Contact.prototype.getMoney = function getMoney() {
    return this.money;
  };

  return Contact;
});

// Factory as a Singleton/Config
app.factory('contactContainer', function(ContactConstant, Contact) {
  this.contactList = [];

  return this;
});

app.controller('MainCtrl', function ($scope, $rootScope, Contact, contactContainer) {
  contactContainer.contactList = [
    new Contact('New', 'Ratchsak@gmail.com', '0866058855', 10000),
    new Contact('New', 'Ratchsak@gmail.com', '0866058855'),
    new Contact('New', 'Ratchsak@gmail.com', '0866058855', 10000)
  ];

  $scope.contactContainer = contactContainer;
});