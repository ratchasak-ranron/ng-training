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