/*
 * grunt-todo-server
 * https://github.com/kennethcachia/grunt-todo-server
 *
 * Copyright (c) 2014 Kenneth Cachia
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>',
      ],
      options: {
        jshintrc: '.jshintrc',
      }
    },

    clean: {
      output: ['server']
    },

    todo_server: {
      js: {
        src: ['test/fixtures/scripts.js']
      }
    },

    nodeunit: {
      tests: ['test/*.js']
    }
  });


  grunt.loadTasks('tasks');

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  grunt.registerTask('test', ['clean', 'todo_server', 'nodeunit']);
  grunt.registerTask('reset', ['clean']);
  grunt.registerTask('default', ['todo_server']);
};
