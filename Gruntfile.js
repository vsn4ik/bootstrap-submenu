module.exports = function (grunt) {
	'use strict';

	// Force use of Unix newlines
	grunt.util.linefeed = '\n';

	grunt.initConfig({

		clean: {
			dist: ['dist']
		},

		copy: {
			js: {
				src: 'js/*',
				dest: 'dist/'
			}
		},

		less: {
			compileCore: {
				files: {
					'dist/css/bootstrap-submenu.css': 'less/bootstrap-submenu.less'
				}
			},
			minify: {
				options: {
					cleancss: true
				},
				files: {
					'dist/css/bootstrap-submenu.min.css': 'dist/css/bootstrap-submenu.css'
				}
			}
		}
	});

	// These plugins provide necessary tasks.
	require('load-grunt-tasks')(grunt, { scope: 'devDependencies' });

	grunt.registerTask('dist', ['clean', 'copy', 'less']);
};
