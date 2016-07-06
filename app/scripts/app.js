'use strict';

/**
 * @ngdoc overview
 * @name vivaApp
 * @description
 * # vivaApp
 *
 * Main module of the application.
 */
angular
  .module('vivaApp', [
    'ngRoute'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/ads.html',
        controller: 'AdsCtrl',
        controllerAs: 'ads'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
