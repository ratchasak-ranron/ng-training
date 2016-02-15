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