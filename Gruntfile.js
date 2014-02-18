/*
 * grunt-todo-server
 * https://github.com/kennethcachia/grunt-todo-server
 *
 * Copyright (c) 2014 Kenneth Cachia
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      options: {
        jshintrc: '.jshintrc',
      },
      task: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      staticJs: [
        'tasks/static/src/*.js'
      ]
    },

    uglify: {
      options: {
        banner: '/* grunt-todo-server\n   <%= pkg.homepage %>\n   v<%=pkg.version %> */\n\n'
      },
      staticJs: {
        src: 'tasks/static/src/*.js',
        dest: 'tasks/static/scripts.min.js'
      }
    },

    clean: {
      output: ['server']
    },

    todo_server_start: {
      options: {}
    },

    todo_server_extract: {
      all: {
        src: [
          'test/fixtures/scripts.js',
          'test/fixtures/styles.css',
          'test/fixtures/markup.html'
        ]
      }
    },

    nodeunit: {
      tests: ['test/*.js']
    },

    watch: {
      staticFiles: {
        files: [
          'tasks/static/src/*.js',
          'tasks/static/themes/*.css',
          'tasks/static/*.html'
        ],
        tasks: ['jshint:staticJs', 'uglify:staticJs', 'test']
      },
      task: {
        files: ['tasks/todo_server.js'],
        tasks: ['test']
      },
      tests: {
        files: ['test/*.*'],
        tasks: ['test']
      }
    }
  });


  grunt.loadTasks('tasks');

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['jshint:task', 'reset', 'todo_server_extract']);
  grunt.registerTask('start', ['todo_server_start']);

  grunt.registerTask('test', ['default', 'nodeunit']);
  grunt.registerTask('reset', ['clean']);
  grunt.registerTask('dev', ['watch']);
};
