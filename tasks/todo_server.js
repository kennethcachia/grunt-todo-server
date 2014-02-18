/*
 * grunt-todo-server
 * https://github.com/kennethcachia/grunt-todo-server
 *
 * Copyright (c) 2014 Kenneth Cachia
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  /**
   * Start server and serve
   * static files and todo data
   */
  grunt.registerTask('todo_server_start', 'Grunt todo server - Start server', function () {

    var options = this.options({
      port: 9000,
      hostname: 'localhost',
      open: false,
      output: 'todo_server'
    });

    var connect = require('connect');
    var middleware = [connect.static(options.output)];
    var app = connect.apply(null, middleware);
    var http = require('http');
    var server = http.createServer(app);
    var open = require('open');

    server.listen(options.port, options.hostname);

    server.on('error', function (e) {
      if (e.code === 'EADDRINUSE') {
        grunt.fatal('Port ' + options.port + ' is already in use by another process');
      } else {
        grunt.fatal(e);
      }
    });

    server.on('listening', function () {
      var address = server.address();
      var hostname = options.hostname || address.address || 'localhost';
      var target = 'http://' + options.hostname + ':' + address.port;

      grunt.log.writeln('Started todo_server on ' + target);

      if (options.open) {
        open(target);
      }
    });

    this.async();
  });


  /**
   * Extract todo data
   * from all files
   */
  grunt.registerMultiTask('todo_server_extract', 'Grunt todo server - Extract todos', function () {

    var options = this.options({
      output: 'todo_server'
    });

    var regex = /(TODO):(.*)/ig;
    var todos = {};
    var filename;
    var match;
    var raw;
    var key;


    this.filesSrc.forEach(function (filename) {

      if (grunt.file.exists(filename)) {
        grunt.log.write('Processing "' + filename + '" - ');

        key = todos[filename] = [];
        raw = grunt.file.read(filename);

        while ((match = regex.exec(raw)) !== null) {
          if (match[2]) {
            match[2] = match[2].replace(/\*\/|-->/, '');
            match[2] = match[2].trim();
          }

          key.push({
            raw: match[0],
            prefix: match[1].toLowerCase(),
            comment: match[2]
          });
        }

        if (key.length === 0) {
          delete todos[filename];
        }

        grunt.log.ok();

      } else {
        grunt.log.warn('Skipping "' + filename + '" - File not found');
      }
    });

    // Generate todo data
    var output = 'var TODO_DATA = ' + JSON.stringify(todos) + ';';
    grunt.file.write(options.output + '/todos.js', output);

    // Get path to /static
    var path = require('path');
    var base = path.join.bind(null, __dirname);

    // Copy static files
    grunt.file.copy(base('static/index.html'), options.output + '/index.html');
    grunt.file.copy(base('static/scripts.min.js'), options.output + '/scripts.min.js');
    grunt.file.copy(base('static/normalize.css'), options.output + '/normalize.css');
    grunt.file.copy(base('static/themes/default.css'), options.output + '/theme.css');
  });
};
