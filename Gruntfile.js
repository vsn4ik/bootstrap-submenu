/*!
 * Bootstrap-submenu's Gruntfile
 * http://vsn4ik.github.io/bootstrap-submenu
 * Copyright 2014-2015 Vasily A. (https://github.com/vsn4ik)
 * Licensed under the MIT license
 */

'use strict';

module.exports = function(grunt) {
  // Force use of Unix newlines
  grunt.util.linefeed = '\n';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    year: grunt.template.today('yyyy'),
    clean: {
      dist: [
        'dist',
        '*-dist.zip'
      ],
      docs: '_gh_pages/*'
    },
    less: {
      options: {
        paths: ['node_modules']
      },
      core: {
        options: {
          sourceMap: true,
          sourceMapURL: '<%= pkg.name %>.css.map',
          outputSourceFiles: true
        },
        src: 'less/<%= pkg.name %>.less',
        dest: 'dist/css/<%= pkg.name %>.css'
      },
      docs: {
        src: 'docs/assets/less/docs.less',
        dest: 'docs/assets/css/docs.css'
      }
    },
    copy: {
      core: {
        src: 'js/*',
        dest: 'dist/'
      },
      assets: {
        files: [{
          expand: true,
          src: 'dist/**',
          dest: '_gh_pages/'
        }, {
          expand: true,
          cwd: 'docs',
          src: 'assets/**',
          dest: '_gh_pages'
        }, {
          expand: true,
          cwd: 'node_modules/bootstrap/dist',
          src: '**',
          dest: '_gh_pages/vendor/bootstrap'
        }, {
          expand: true,
          cwd: 'node_modules/highlight.js/styles',
          src: '*',
          dest: '_gh_pages/vendor/highlight.js/css'
        }, {
          expand: true,
          cwd: 'node_modules/jquery/dist',
          src: '*.{js,map}',
          dest: '_gh_pages/vendor/jquery/js'
        }, {
          expand: true,
          cwd: 'node_modules/octicons/build/font',
          src: ['*', '!*.scss'],
          dest: '_gh_pages/vendor/octicons/css'
        }]
      }
    },
    cssmin: {
      core: {
        options: {
          compatibility: 'ie8'
        },
        expand: true,
        src: 'dist/css/*.css',
        ext: '.min.css'
      }
    },
    jshint: {
      options: {
        curly: true,
        globalstrict: true,
        latedef: true,
        node: true,
        noempty: true,
        strict: true,
        unused: true,
        boss: true
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
      grunt: 'Gruntfile.js',
      docs: {
        options: {
          jquery: true,
          browser: true,
          globals: {
            hljs: true
          }
        },
        src: 'docs/assets/js/'
      }
    },
    jscs: {
      options: {
        config: 'js/.jscsrc'
      },
      core: 'js/',
      grunt: 'Gruntfile.js',
      docs: {
        src: 'docs/assets/js/'
      }
    },
    uglify: {
      core: {
        options: {
          report: 'none'
        },
        expand: true,
        src: 'dist/js/*.js',
        ext: '.min.js'
      }
    },
    usebanner: {
      options: {
        banner: [
          '/*!',
          ' * <%= pkg.name.charAt(0).toUpperCase() + pkg.name.slice(1) %> v<%= pkg.version %> (<%= pkg.homepage %>)',
          ' * Copyright 2014-<%= year %> <%= pkg.author.name %> (<%= pkg.author.url %>)',
          ' * Licensed under the <%= pkg.license %> license',
          ' */'
        ].join('\n') + '\n'
      },
      dist: 'dist/*/*.{css,js}'
    },
    ejs: {
      docs: {
        options: {
          pkg: '<%= pkg %>',
          year: '<%= year %>'
        },
        expand: true,
        cwd: 'docs',
        src: 'index.html',
        dest: '_gh_pages/'
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
    'less:core',
    'cssmin',
    'jshint',
    'jscs',
    'copy:core',
    'uglify',
    'usebanner'
  ]);

  grunt.registerTask('prep-release', [
    'default',
    'ejs',
    'less:docs',
    'copy:assets',
    'compress'
  ]);
};
