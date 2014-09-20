'use strict';

module.exports = function(grunt) {
	// Force use of Unix newlines
	grunt.util.linefeed = '\n';

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		clean: {
			dist: 'dist'
		},
		less: {
			core: {
				options: {
					sourceMap: true,
					outputSourceFiles: true,
					sourceMapURL: '<%= pkg.name %>.css.map',
					sourceMapFilename: 'dist/css/<%= pkg.name %>.css.map'
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
				src: 'dist/css/<%= pkg.name %>.css',
				dest: 'dist/css/<%= pkg.name %>.min.css'
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
				strict: true,
				globalstrict: true
			},
			core: {
				options: {
					jquery: true,
					globals: {
						console: true
					}
				},
				src: 'js/*'
			},
			grunt: {
				options: {
					node: true
				},
				src: 'Gruntfile.js'
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
				].join('\n').concat('\n')
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
		'symlink'
	]);
};
