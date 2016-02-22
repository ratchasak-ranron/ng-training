var app = angular.module('fbfApp', [
  // vendors
  'ui.router',

  // components
  'global',
  'app.config',
  'templates',
  'utils',

  // Directives
  'directives.contact',

  // controller
  'controller.main',
  'controller.header',
  'controller.contact',
  'controller.contact.add',
  'controller.contact.edit',
  'controller.contact.view',

  // services
  'service.contact'
]);

app.config(['$stateProvider', function($stateProvider){
  $stateProvider
    .state('root',{
      url: '',
      abstract: true,
      data: {

      },
      views: {
        'container': {
          templateUrl: 'app/layout/layout.html'
        },
        'header@root': {
          templateUrl: 'app/header/header.html',
          controller: 'HeaderCtrl'
        }
      }
    })
}]);

app.run(['$rootScope', '$state', '$stateParams', '$location',
  function ($rootScope, $state, $stateParams, $location) {
    // For Debugging UI-Router
    $rootScope.$on('$stateChangeStart',function(event, toState, toParams, fromState, fromParams){
      console.debug('$stateChangeStart to '+toState.to+'- fired when the transition begins. toState,toParams : \n',toState, toParams);
    });
    $rootScope.$on('$stateChangeError',function(event, toState, toParams, fromState, fromParams, error){
      console.debug('$stateChangeError - fired when an error occurs during transition.');
      console.debug(arguments);
    });
    $rootScope.$on('$stateChangeSuccess',function(event, toState, toParams, fromState, fromParams){
      console.debug('$stateChangeSuccess to '+toState.name+'- fired once the state transition is complete.');
    });
    $rootScope.$on('$viewContentLoaded',function(event){
      console.debug('$viewContentLoaded - fired after dom rendered',event);
    });
    $rootScope.$on('$stateNotFound',function(event, unfoundState, fromState, fromParams){
      console.debug('$stateNotFound '+unfoundState.to+'  - fired when a state cannot be found by its name.');
      console.debug(unfoundState, fromState, fromParams);
    });

  }]);
'use strict';

angular.module('global', [])
  .factory('GlobalConstant', [ function () {
    return {
    };
  }])
  .factory("global", function ($rootScope, APP_CONFIG, ContactService) {
    $rootScope.global = this;
    $rootScope.APP_CONFIG = APP_CONFIG;

    this.contactService = new ContactService(this);

    var global = this;
    this.contactListPromise = null;
    this.contactList = null;

    _loadContactData();

    /**
     * Get initial data
     * @private
     */
    function _loadContactData() {
      // get initial product
      global.contactListPromise = global.contactService.getContactList();
      global.contactListPromise.then(
        function success(data){
          global.contactList = data.contactList;
          global.contactMapIdIndex = data.mapIdIndex;
        }, function error(data) {
          console.error('Getting initial data error');
        }
      );
    }

    return this;
  });
'use strict';

angular.module('utils', [])
  .factory("Utils", function (rfc4122) {
    this.guid = function guid() {
      return rfc4122.v4();
    };

    this.isNumericString = function isNumeric(num) {
      return /^\d+$/.test(num);
    };

    this.isSafari = function isSafari() {
      var ua = navigator.userAgent.toLowerCase();
      if (ua.indexOf('safari') != -1) {
        return ua.indexOf('chrome') <= -1;
      }
      return false;
    };

    this.isFireFox = function isFireFox() {
      return navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
    };

    return this;
  });
'use strict';

angular.module('directives.contact', [])

  .directive('contact', function () {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'app/components/directives/contact/contact.html'
    }
  });
'use strict';

angular.module('service.contact', [])

/**
 * Contact Service
 */
  .value('API_PATH', 'http://ng-training.ratchasak.me/api.php')

  .factory('ContactConstant', [ function () {
    return {
      STATUS_SUCCESS: 1
    };
  }])
  .factory('ContactService', function ($q, contactApiManager, Contact) {
    function ContactService(global) {
      this.global = global;
    }

    ContactService.prototype.getContactList = function() {
      var defer = $q.defer();

      contactApiManager.list().then(function(data) {
        var contactList = [];
        var mapIdIndex = {};
        for(var i = 0; i < data.length; i++) {
          var contact = data[i];
          contact = new Contact(contact.id, contact.name, contact.email, contact.phone, contact.url, contact.notes);
          contactList.push(contact);
          mapIdIndex[contact.getId()] = i;
        }
        defer.resolve({contactList: contactList, mapIdIndex: mapIdIndex});
      }, function error(msg) {
        defer.reject(msg);
      });

      return defer.promise;
    };

    return ContactService;
  })

  // Factory as a Class/Model
  .factory('Contact', function(ContactConstant, API_PATH, $q, $http) {
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

    Contact.prototype.get = function get() {
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

    Contact.prototype.edit = function edit() {
      var defer = $q.defer();

      $http({
        url: apiPath + '/contact/' + this.id,
        method: "PUT",
        data: {
          name: this.name,
          email: this.email,
          phone: this.phone,
          url: this.url,
          notes: this.notes
        }
      }).then(function successCallback(response) {
        defer.resolve(response.data);
      }, function errorCallback(response) {
        defer.reject();
      });

      return defer.promise;
    };

    Contact.prototype.add = function add() {
      var defer = $q.defer();

      $http({
        url: apiPath + '/contact',
        method: "POST",
        data: {
          name: this.name,
          email: this.email,
          phone: this.phone,
          url: this.url,
          notes: this.notes
        }
      }).then(function successCallback(response) {
        defer.resolve(response.data); // return new ID
      }, function errorCallback(response) {
        defer.reject('Cannot get contact list');
      });

      return defer.promise;
    };

    Contact.prototype.delete = function contact_delete() {
      var defer = $q.defer();

      $http({
        url: apiPath + '/contact/' + this.id,
        method: "DELETE"
      }).then(function successCallback(response) {
        defer.resolve(response.data); // is successful
      }, function errorCallback(response) {
        defer.reject();
      });

      return defer.promise;
    };

    return Contact;
  })

  // API Manager
  .factory('contactApiManager', function($http, $q, API_PATH) {
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

    return this;
  });
'use strict';

angular.module('controller.header', [])

  .controller('HeaderCtrl', function ($scope, $rootScope) {
    $scope.nav = {
      navItems: [
        {
          state: 'root.contact',
          text: 'home'
        },
        {
          state: 'root.contact.add',
          text: 'add'
        }
      ]
    };
  });
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
      },
      params: {
        isEditSuccess: false
      }
    });
  }])

  .controller('ContactCtrl', function ($scope, $rootScope) {
  })

  .controller('ListContactCtrl', function ($scope, global) {
    $scope.contacts = global.contactList;
  })

  .controller('NotSelectContactCtrl', function ($scope, $rootScope, $stateParams) {
    $scope.isEditSucess = $stateParams.isEditSuccess;
  });
'use strict';

angular.module('controller.main', [])

  .controller('MainCtrl', function ($scope) {

  });