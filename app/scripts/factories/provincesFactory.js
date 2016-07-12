( function () {
  'use strict';

  /**
   * @ngdoc function
   * @name vivaApp.factory:provincesFactory
   * @description
   * # provincesFactory
   * Controller of the vivaApp
   */
  angular.module( 'vivaApp' )
    .factory( 'ProvincesFactory', ProvincesFactory );

  ProvincesFactory.$inject = [ '$http' ];

  function ProvincesFactory( $http ) {
    var urlBase = 'https://raw.githubusercontent.com/VivaReal/code-challenge/master/provinces.json',
      factory = {
        getAll: getAll
      };

    return factory;

    function getAll() {
      return $http.get( urlBase );
    }
  };
} )();