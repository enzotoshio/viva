'use strict';

/**
 * @ngdoc function
 * @name vivaApp.factory:adsFactory
 * @description
 * # adsFactory
 * Controller of the vivaApp
 */
angular.module( 'vivaApp' )
  .factory( 'AdsFactory', [ '$http', function ( $http ) {

    var urlBase = 'http://spotippos.vivareal.com/properties';
    var adsFactory = {};

    adsFactory.getById = function ( id ) {
      return $http.get( urlBase + '/' + id );
    };

    adsFactory.getBySize = function ( min, max ) {
      return $http.get( urlBase + '?ax=' + min + '&ay=' + min + '&bx=' + max + '&by=' + max );
    };

    return adsFactory;
  } ] );