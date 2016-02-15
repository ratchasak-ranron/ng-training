'use strict';

var config = angular.module('app.config', []);

config.factory('APP_CONFIG_LOCAL', function($window) {
  this.APP_NAME = 'My App - Local';
  return this;
});

config.factory('APP_CONFIG_INTERNAL', function($window) {
  this.APP_NAME = 'My App - INTERNAL';
  return this;
});

config.factory('APP_CONFIG_STAGING', function($window) {
  this.APP_NAME = 'My App - Staging';
  return this;
});

config.factory('APP_CONFIG_PROD', function($window) {
  this.APP_NAME = 'My App - PRODUCTION';
  return this;
});

config.factory('APP_CONFIG', function(APP_CONFIG_LOCAL, APP_CONFIG_INTERNAL, APP_CONFIG_STAGING, APP_CONFIG_PROD) {
  this.ENV_LOCAL    = 'local';
  this.ENV_INTERNAL = 'internal';
  this.ENV_STAGING  = 'uat';
  this.ENV_PROD     = 'production';

  this.ENV = '@@EnvironmentName';

  switch(this.ENV) {
    case this.ENV_LOCAL:
      angular.extend(this, APP_CONFIG_LOCAL);
      break;
    case this.ENV_INTERNAL:
      angular.extend(this, APP_CONFIG_INTERNAL);
      break;
    case this.ENV_STAGING:
      angular.extend(this, APP_CONFIG_STAGING);
      break;
    case this.ENV_PROD:
      angular.extend(this, APP_CONFIG_PROD);
      //console.log = function() {}; // disable console log
      break;
  }
  return this;
});

config.constant("APP_CONSTANT", {
  APP_PHASE_NO: 2,
  GA_TRACKING_ID: 'UA-69350587-2'
});