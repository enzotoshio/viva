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

  AdsCtrl.$inject = [ '$window', '$http', 'AdsFactory' ];

  function AdsCtrl( $window, $http, AdsFactory ) {
    var vm = this;
    vm.advs = [];

    vm.getAdsById = getAdsById;
    vm.getAds = getAds;
    vm.adFilter = adFilter;

    function getAdsById() {
      var id = vm.filter.id;
      AdsFactory.getById( id )
        .then( function successCallback( response ) {
          var isResposeEmpty = Object.keys( response.data )
            .length <= 0;

          vm.advs = [];

          if ( !isResposeEmpty ) {
            vm.advs.push( response.data );
          }
        }, function errorCallback() {
          return;
        } );
    };

    function getAds() {
      AdsFactory.getAll()
        .then( function successCallback( response ) {
          vm.advs = response.data.properties;
        }, function errorCallback() {
          return;
        } );
    };

    function adFilter( ad ) {
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