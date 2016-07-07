( function () {
  'use strict';

  /**
   * @ngdoc function
   * @name vivaApp.factory:adsFactory
   * @description
   * # adsFactory
   * Controller of the vivaApp
   */
  angular.module( 'vivaApp' )
    .factory( 'AdsFactory', AdsFactory );

  AdsFactory.$inject = [ '$http' ];

  function AdsFactory( $http ) {
    var urlBase = 'http://spotippos.vivareal.com/properties',
      factory = {
        getById: getById,
        getAll: getAll
      };

    return factory;

    function getById( id ) {
      return $http.get( urlBase + '/' + id );
    };

    function getAll() {
      return $http.get( urlBase + '?ax=1&ay=1&bx=20&by=20' );
    };
  };
} )();