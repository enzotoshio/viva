describe( 'Viva Real - Spotipos Page', function () {
  var EC = protractor.ExpectedConditions;

  beforeEach( function () {
    browser.get( 'http://localhost:9000/' );
  } );

  it( 'should have a title', function () {
    expect( browser.getTitle() )
      .toEqual( 'Viva Real' );
  } );

  it( 'should have at least 1 ad and less than 6', function () {
    browser.driver.wait( EC.invisibilityOf( element( by.css( '.spinner-box' ) ) ) )
      .then( function () {
        var list = element.all( by.css( '.ad-box' ) );

        expect( list.count() )
          .toBeGreaterThan( 0 );

        expect( list.count() )
          .toBeLessThan( 6 );
      } );
  } );

  function fillField( fieldId, value ) {
    element( by.id( fieldId ) )
      .click()
      .then( function () {
        element( by.id( fieldId ) )
          .sendKeys( value );
      } );

    element( by.css( '.sidebar' ) )
      .click();
  };

  function cleanField( fieldId ) {
    element( by.id( fieldId ) )
      .click()
      .then( function () {
        element( by.id( fieldId ) )
          .sendKeys( '' );
      } );

    element( by.css( '.sidebar' ) )
      .click();
  };

  function verifyMaximunValueFilter( inputId, resultElementClass, value ) {
    browser.driver.wait( EC.invisibilityOf( element( by.css( '.spinner-box' ) ) ) )
      .then( function () {
        fillField( inputId, value );

        var ad = element( by.css( resultElementClass ) );

        expect( ad )
          .not
          .toBeGreaterThan( value );
      } );
  };

  it( 'should retrieve at least 1 ad with the typed id', function () {
    var searchValue = 2;

    fillField( 'idInput', searchValue );

    browser.driver.wait( EC.invisibilityOf( element( by.css( '.spinner-box' ) ) ) )
      .then( function () {
        var list = element.all( by.css( '.ad-box' ) ),
          idElement = element( by.css( '.id-box .text' ) );

        expect( list.count() )
          .toBe( 1 );

        expect( idElement.getText() )
          .toBe( 'ID. ' + searchValue );
      } );
  } );

  it( 'should clean id field and retrieve all ads from all provinces', function () {
    fillField( 'idInput', 2 );
    cleanField( 'idInput' );

    browser.driver.wait( EC.invisibilityOf( element( by.css( '.spinner-box' ) ) ) )
      .then( function () {
        var list = element.all( by.css( '.ad-box' ) );

        expect( list.count() )
          .toBeGreaterThan( 0 );

        expect( list.count() )
          .toBeLessThan( 6 );
      } );
  } );

  it( 'should filter by area', function () {
    verifyMaximunValueFilter( 'areaInput', '.area-value', 100 );
  } );

  it( 'should filter by beds', function () {
    verifyMaximunValueFilter( 'bedsInput', '.beds-value', 2 );
  } );

  it( 'should filter by baths', function () {
    verifyMaximunValueFilter( 'bathsInput', '.baths-value', 2 );
  } );

  it( 'should filter by min / max price', function ( done ) {
    var minValue = 1000000,
      maxValue = 1100000;

    browser.driver.wait( EC.invisibilityOf( element( by.css( '.spinner-box' ) ) ) )
      .then( function () {
        fillField( 'minValueInput', minValue );
        fillField( 'maxValueInput', maxValue );

        var ad = element( by.css( '.ad-price' ) ),
          price = ad.getText()
          .then( function ( text ) {
            return text.split( ',' )[ 0 ].match( /[0-9]*(?=\.|$)/g )
              .join( '' );
          } );

        expect( price )
          .toBeGreaterThan( minValue - 1 );

        expect( price )
          .toBeLessThan( maxValue + 1 );

        done();
      } );
  } );
} );