( function () {
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

  AdsCtrl.$inject = [ '$scope', '$window', '$http', 'AdsFactory', 'ProvincesFactory' ];

  function AdsCtrl( $scope, $window, $http, AdsFactory, ProvincesFactory ) {
    var vm = this;
    vm.advs = [];
    vm.filter = {};
    vm.currentPage = 0;
    vm.pageSize = 5;
    vm.totalPages = 1;

    vm.getAdsById = getAdsById;
    vm.getAds = getAds;
    vm.adFilter = adFilter;
    vm.parseLists = parseLists;
    vm.removeDuplicity = removeDuplicity;
    vm.parsePrice = parsePrice;

    vm.getAds();

    function parsePrice( price ) {
      price = +price;

      return price.toLocaleString( 'de-DE' );
    }

    function getAdsById() {
      var id = vm.filter.id;

      vm.advs = [];

      if ( !id ) {
        vm.getAds();
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

      ProvincesFactory.getAll()
        .then( function successCallback( response ) {
          Q.all( AdsFactory.getByLocation( response.data ) )
            .then( function ( response ) {
              var parsedList = vm.parseLists( response );
              vm.loading = false;
              vm.advs = parsedList;
              $scope.$apply();
            } );
        }, function errorCallback() {
          return;
        } );
    };

    function parseLists( response ) {
      var list = [];

      angular.forEach( response, function ( listFragment ) {
        list = list.concat( listFragment.data.properties )
      } );

      return vm.removeDuplicity( list );
    };

    function adFilter( ad ) {
      var area = vm.filter.area,
        beds = vm.filter.beds,
        baths = vm.filter.baths,
        min = vm.filter.min,
        max = vm.filter.max,
        price = parseInt( ad.price ),
        areaCondition = !area || ad.squareMeters == area,
        bedsCondition = !beds || ad.beds == beds,
        bathsCondition = !baths || ad.baths == baths,
        maxPriceCondition = max > 0 ? price <= max : true,
        minPriceCondition = price >= ( min || 0 ),
        priceCondition = ( !min && !max ) || minPriceCondition && maxPriceCondition;

      return areaCondition && bedsCondition && bathsCondition && priceCondition;
    }
  };
} )();