/*!
 * Bootstrap-submenu's Gruntfile
 * http://vsn4ik.github.io/bootstrap-submenu
 * Copyright 2014 Vasily A. (https://github.com/vsn4ik)
 * Licensed under MIT (https://github.com/vsn4ik/bootstrap-submenu/blob/master/LICENSE)
 */

'use strict';

module.exports = function(grunt) {
  // Force use of Unix newlines
  grunt.util.linefeed = '\n';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: {
      dist: ['dist', '*-dist.zip']
    },
    less: {
      core: {
        options: {
          sourceMap: true,
          outputSourceFiles: true,
          sourceMapURL: '<%= pkg.name %>.css.map',
          sourceMapFilename: '<%= less.core.dest %>.map'
        },
        src: 'less/<%= pkg.name %>.less',
        dest: 'dist/css/<%= pkg.name %>.css'
      }
    },
    copy: {
      js: {
        src: 'js/*',
        dest: 'dist/'
      }
    },
    cssmin: {
      core: {
        expand: true,
        src: 'dist/css/*.css',
        ext: '.min.css'
      },
      docs: {
        src: [
          'docs/assets/css/src/pygments-manni.css',
          'docs/assets/css/src/docs.css'
        ],
        dest: 'docs/assets/css/docs.min.css'
      }
    },
    jshint: {
      options: {
        curly: true,
        globalstrict: true,
        latedef: true,
        node: true,
        noempty: true,
        strict: true
      },
      core: {
        options: {
          devel: true,
          jquery: true,
          globals: {
            define: true
          }
        },
        src: 'js/'
      },
      grunt: {
        src: 'Gruntfile.js'
      },
      docs: {
        options: {
          jquery: true
        },
        src: 'docs/assets/js/src/'
      }
    },
    uglify: {
      core: {
        expand: true,
        src: 'dist/js/*.js',
        ext: '.min.js'
      },
      docs: {
        src: 'docs/assets/js/src/docs.js',
        dest: 'docs/assets/js/docs.min.js'
      }
    },
    usebanner: {
      options: {
        banner: [
          '/*!',
          ' * Bootstrap-submenu v<%= pkg.version %> (<%= pkg.homepage %>)',
          ' * Copyright <%= grunt.template.today("yyyy") %> <%= pkg.author.name %> (<%= pkg.author.url %>)',
          ' * Licensed under <%= pkg.license.type %> (<%= pkg.license.url %>)',
          ' */'
        ].join('\n') + '\n'
      },
      dist: 'dist/*/*.{css,js}'
    },
    symlink: {
      docs: {
        options: {
          overwrite: true
        },
        src: 'dist',
        dest: 'docs/dist'
      }
    },
    compress: {
      dist: {
        options: {
          archive: '<%= compress.dist.dest %>.zip'
        },
        expand: true,
        cwd: 'dist',
        src: '**',
        dest: '<%= pkg.name %>-<%= pkg.version %>-dist'
      }
    }
  });

  // These plugins provide necessary tasks.
  require('load-grunt-tasks')(grunt, {
    scope: 'devDependencies'
  });

  grunt.registerTask('default', [
    'clean',
    'less',
    'copy',
    'cssmin',
    'jshint',
    'uglify',
    'usebanner',
    'symlink',
    'compress'
  ]);
};
