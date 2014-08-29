'use strict';

module.exports = function(grunt) {
	// Force use of Unix newlines
	grunt.util.linefeed = '\n';

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		clean: {
			dist: ['dist', 'docs/dist']
		},
		less: {
			core: {
				src: 'less/<%= pkg.name %>.less',
				dest: 'dist/css/<%= pkg.name %>.css'
			}
		},
		copy: {
			js: {
				src: 'js/*',
				dest: 'dist/'
			},
			docs: {
				src: 'dist/*/*',
				dest: 'docs/'
			}
		},
		cssmin: {
			core: {
				src: 'dist/css/<%= pkg.name %>.css',
				dest: 'dist/css/<%= pkg.name %>.min.css'
			},
			docs: {
				src: [
					'docs/assets/css/src/docs.css',
					'docs/assets/css/src/pygments-manni.css'
				],
				dest: 'docs/assets/css/docs.min.css'
			}
		},
		uglify: {
			core: {
				src: 'dist/js/<%= pkg.name %>.js',
				dest: 'dist/js/<%= pkg.name %>.min.js'
			},
			docs: {
				src: 'docs/assets/js/src/docs.js',
				dest: 'docs/assets/js/docs.min.js'
			}
		},
		usebanner: {
			options: {
				banner: '/*!\n' +
					' * Bootstrap-submenu v<%= pkg.version %> (<%= pkg.homepage %>)\n' +
					' * Copyright <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
					' * Licensed under <%= pkg.license.type %> (<%= pkg.license.url %>)\n' +
					' */\n'
			},
			dist: 'dist/*/*'
		}
	});

	// These plugins provide necessary tasks.
	require('load-grunt-tasks')(grunt, {
		scope: 'devDependencies'
	});

	grunt.registerTask('default', ['clean', 'less', 'copy:js', 'cssmin', 'uglify', 'usebanner', 'copy:docs']);
};
