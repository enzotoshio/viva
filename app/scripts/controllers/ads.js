'use strict';

/**
 * @ngdoc function
 * @name vivaApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the vivaApp
 */
angular.module( 'vivaApp' )
  .controller( 'AdsCtrl', [ '$scope', '$window', '$http', 'AdsFactory',
    function ( $scope, $window, $http, AdsFactory ) {
      $scope.getAdsById = function () {
        var id = $scope.filter.id;
        AdsFactory.getById( id )
          .then( function successCallback( response ) {
            $scope.ads = [];
            $scope.ads.push( response.data );
          }, function errorCallback() {
            return;
          } );
      };
    }
  ] );