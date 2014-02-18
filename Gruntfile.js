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
        'static/src/*.js'
      ]
    },

    uglify: {
      options: {
        banner: '/* grunt-todo-server\n   <%= pkg.homepage %>\n   v<%=pkg.version %> */\n\n'
      },
      staticJs: {
        src: 'static/src/*.js',
        dest: 'static/scripts.min.js'
      }
    },

    clean: {
      output: ['server']
    },

    todo_server_start: {
      options: {}
    },

    todo_server_extract: {
      js: {
        src: ['test/fixtures/scripts.js']
      }
    },

    nodeunit: {
      tests: ['test/*.js']
    },

    watch: {
      staticFiles: {
        files: ['static/src/*.js'],
        tasks: ['jshint:staticJs', 'uglify:staticJs', 'test']
      },
      task: {
        files: ['tasks/todo_server.js'],
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
