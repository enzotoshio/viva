( function () {
  'use strict';
  angular.module( 'vivaApp' )
    .filter( 'startFrom', function () {
      return function ( input, vm ) {
        var page = vm.currentPage * vm.pageSize,
          items = input.length,
          totalPages = vm.totalPages;

        if ( items <= 0 ) {
          return;
        }

        totalPages = items / vm.pageSize;

        if ( totalPages < 1 ) {
          totalPages = 1;
        }

        vm.totalPages = totalPages;

        return input.slice( page );
      }
    } );
} )();