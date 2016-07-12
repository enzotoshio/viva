( function () {
  'use strict';
  angular.module( 'vivaApp' )
    .filter( 'startFrom', startFrom );

  function startFrom() {
    var fm = this;

    fm.filter = filter;
    fm.calculatePagination = calculatePagination;

    return fm.filter;

    function filter( input, vm ) {
      var page = vm.currentPage * vm.pageSize;


      fm.calculatePagination( input, vm );

      return input.slice( page );
    }

    function calculatePagination( input, vm ) {
      var items = input.length,
        totalPages = vm.totalPages;

      if ( items <= 0 ) {
        return;
      }

      totalPages = Math.ceil( items / vm.pageSize );

      if ( totalPages < 1 ) {
        totalPages = 1;
      }

      vm.totalPages = totalPages;
    }
  };
} )();