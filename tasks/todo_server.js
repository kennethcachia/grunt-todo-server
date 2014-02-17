/*
 * grunt-todo-server
 * https://github.com/kennethcachia/grunt-todo-server
 *
 * Copyright (c) 2014 Kenneth Cachia
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  grunt.registerTask('todo_server_start', 'Grunt todo server - Start server', function () {
    var connect = require('connect');
    var middleware = [connect.static('server')];
    var app = connect.apply(null, middleware);
    var http = require('http');
    var server = http.createServer(app);
    var open = require('open');

    var port = 9000;
    var hostname = 'localhost';
    var protocol = 'http';

    server.listen(port, hostname);

    server.on('listening', function () {
      var address = server.address();
      var hostname = hostname || address.address || 'localhost';
      var target = protocol + '://' + hostname + ':' + address.port;

      grunt.log.writeln('Started todo_server on ' + target);
      open(target);
    });

    server.on('error', function (err) {
      if (err.code === 'EADDRINUSE') {
        grunt.fatal('Port ' + port + ' is already in use by another process');
      } else {
        grunt.fatal(err);
      }
    });

    this.async();
    app.listen(port);
  });


  grunt.registerMultiTask('todo_server_extract', 'Grunt todo server - Extract todos', function () {
    var regex = /(TODO):(.*)/ig;
    var src = this.data.src;

    var match;
    var raw;
    var todos = {};
    var key;

    src.forEach(function (filename) {
      grunt.log.write('\nProcessing ' + filename + ' - ');

      key = todos[filename] = [];
      raw = grunt.file.read(filename);

      while ((match = regex.exec(raw)) !== null) {
        key.push({
          raw: match[0],
          prefix: match[1].toLowerCase(),
          comment: match[2]
        });
      }

      grunt.log.ok();
    });

    // Generate todos
    var output = 'var TODO_DATA = ' + JSON.stringify(todos) + ';';
    grunt.file.write('server/todos.js', output);

    // Copy static files
    grunt.file.copy('static/index.html', 'server/index.html');
    grunt.file.copy('static/scripts.min.js', 'server/scripts.min.js');
  });
};
