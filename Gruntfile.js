module.exports = function(grunt) {
	var files = [
		'css/**'
		];

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		sass: {
			dist: {
				options: {
					outputStyle: 'compressed',
					sourceMap: true
				},
				files: {
					'css/main.css': 'css/main.scss'
				}
			},
			dev: {
				options: {
					style: 'expanded',
					sourceMap: true
				},
				files: {
					'css/main.css': 'css/main.scss'
				}
			}
		},
		watch: {
			compile: {
				files: [
					'css/*.scss',
					'css/partials/*.scss'
				],
				tasks: ['sass:dev']
			},
			livereload: {
				options: {
					livereload: true
				},
				files: [
					'css/main.css'
				]
			},
		}
	});
	// grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-sass');
	// grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.registerTask('default',['watch']);
};