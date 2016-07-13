'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function ( grunt ) {

  // Import Rupture
  var rupture = require( 'rupture' );

  // Time how long tasks take. Can help when optimizing build times
  require( 'time-grunt' )( grunt );


  // Automatically load required Grunt tasks
  require( 'jit-grunt' )( grunt, {
    stylus: 'stylus'
  } );

  // Configurable paths for the application
  var appConfig = {
    app: require( './bower.json' )
      .appPath || 'app',
    dist: 'dist'
  };

  // Define the configuration for all the tasks
  grunt.initConfig( {

    // Project settings
    yeoman: appConfig,

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      bower: {
        files: [ 'bower.json' ],
        tasks: [ 'wiredep' ]
      },
      js: {
        files: [ '<%= yeoman.app %>/scripts/{,*/}*.js' ],
        tasks: [ 'newer:jshint:all', 'newer:jscs:all' ],
        options: {
          livereload: '<%= connect.options.livereload %>'
        }
      },
      styles: {
        files: [ '<%= yeoman.app %>/styles/{,*/}*.styl' ],
        tasks: [ 'newer:copy:styles', 'stylus' ]
      },
      gruntfile: {
        files: [ 'Gruntfile.js' ]
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= yeoman.app %>/{,*/}*.html',
          '.tmp/styles/{,*/}*.css',
          '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },

    // The actual server
    connect: {
      options: {
        port: 9000,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: 'localhost',
        livereload: 35729
      },
      livereload: {
        options: {
          open: true,
          middleware: function ( connect ) {
            return [
              connect.static( '.tmp' ),
              connect()
              .use(
                '/bower_components',
                connect.static( './bower_components' )
              ),
              connect()
              .use(
                '/app/styles',
                connect.static( './app/styles' )
              ),
              connect.static( appConfig.app )
            ];
          }
        }
      }
    },

    // Cleans server folders
    clean: {
      server: '.tmp'
    },

    // Compile stylus
    stylus: {
      compile: {
        options: {
          use: [ rupture ],
          import: [
            'nib/*'
          ]
        },
        files: {
          '.tmp/styles/main.css': './app/styles/*.styl'
        }
      }
    },

    // Automatically inject Bower components into the app
    wiredep: {
      app: {
        src: [ '<%= yeoman.app %>/index.html' ],
        ignorePath: /\.\.\//
      }
    },

    // Copy stuff
    copy: {
      styles: {
        expand: true,
        cwd: '<%= yeoman.app %>/styles',
        dest: '.tmp/styles/',
        src: '{,*/}*.css'
      }
    },

    // Run concurrent taks
    concurrent: {
      server: [
        'stylus',
      ]
    }
  } );

  grunt.registerTask( 'serve', 'Compile then start a connect web server', function ( target ) {
    grunt.task.run( [
      'clean:server',
      'wiredep',
      'concurrent:server',
      'connect:livereload',
      'watch'
    ] );
  } );

  grunt.registerTask( 'default', [
    'serve'
  ] );
};