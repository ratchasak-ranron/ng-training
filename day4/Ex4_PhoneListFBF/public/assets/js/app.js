var app = angular.module('myApp', [
  // vendors
  'ui.router',

  // shared
  'templates',

  // controller
  'controller.main',
  'controller.header'
]);

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
  $urlRouterProvider.otherwise('/');
}]);

app.config(['$stateProvider', function($stateProvider){
  $stateProvider
    .state('root',{
      url: '',
      abstract: true,
      data: {

      },
      views: {
        'container@': {
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

angular.module('controller.main', [])

  .controller('MainCtrl', function ($scope) {

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