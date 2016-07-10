( function() {
  'use strict';

  /**
   * @ngdoc function
   * @name vivaApp.controller:MainCtrl
   * @description
   * # MainCtrl
   * Controller of the vivaApp
   */
  angular.module( 'vivaApp' )
    .controller( 'AdsCtrl', AdsCtrl );

  AdsCtrl.$inject = [ '$scope', '$window', '$http', 'AdsFactory' ];

  function AdsCtrl( $scope, $window, $http, AdsFactory ) {
    var vm = this;
    vm.advs = [];
    vm.filter = {};

    vm.getAdsById = getAdsById;
    vm.getAds = getAds;
    vm.adFilter = adFilter;
    vm.parseLists = parseLists;
    vm.removeDuplicity = removeDuplicity;

    function getAdsById() {
      var id = vm.filter.id;

      vm.advs = [];

      if ( !id ) {
        return;
      }

      vm.loading = true;

      AdsFactory.getById( id )
        .then( function successCallback( response ) {
          var isResposeEmpty = Object.keys( response.data )
            .length <= 0;

          vm.loading = false;

          if ( !isResposeEmpty ) {
            vm.advs.push( response.data );
          }
        }, function errorCallback() {
          return;
        } );
    };

    function removeDuplicity( a ) {
      var seen = {};
      var out = [];
      var len = a.length;

      for ( var i = 0; i < len; i++ ) {
        var item = a[ i ],
          key = JSON.stringify( item );
        if ( !seen[ key ] ) {
          seen[ key ] = true;
          out[ out.length ] = item;
        }
      }
      return out;
    };

    function getAds() {
      vm.advs = [];
      vm.loading = true;

      $http.get( 'https://raw.githubusercontent.com/VivaReal/code-challenge/master/provinces.json' ).then( function( response ) {
        Q.all( AdsFactory.getByLocation( response.data ) )
          .then( function( response ) {
            var parsedList = vm.parseLists( response );
            vm.loading = false;
            vm.advs = parsedList;
            $scope.$apply();
          } );
      } );
    };

    function parseLists( response ) {
      var list = [];

      angular.forEach( response, function( listFragment ) {
        list = list.concat( listFragment.data.properties )
      } );

      return vm.removeDuplicity( list );
    };

    function adFilter( ad ) {
      debugger
      var area = vm.filter.area,
        beds = vm.filter.beds,
        baths = vm.filter.baths,
        min = vm.filter.min,
        max = vm.filter.max,
        areaCondition = area === undefined || ad.squareMeters == area,
        bedsCondition = beds === undefined || ad.beds == beds,
        bathsCondition = baths === undefined || ad.baths == baths,
        priceCondition = ( min === undefined && max === undefined ) || parseInt( ad.price ) >= ( min || 0 ) && parseInt( ad.price ) <= ( max || min );
      return areaCondition && bedsCondition && bathsCondition && priceCondition;
    }
  };
} )();