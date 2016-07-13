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
        getByLocation: getByLocation
      };

    return factory;

    function getById( id ) {
      return $http.get( urlBase + '/' + id );
    };

    function getByLocation( places ) {
      var calls = [];

      angular.forEach( places, function ( place ) {
        var bottomRight = place.boundaries.bottomRight,
          topLeft = place.boundaries.upperLeft;

        calls.push( $http.get( urlBase + '?ax=' + topLeft.x + '&ay=' + bottomRight.y + '&bx=' + bottomRight.x + '&by=' + topLeft.y ) );
      } );

      return calls;
    };
  };
} )();