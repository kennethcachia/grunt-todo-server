/*
 * grunt-todo-server
 * https://github.com/kennethcachia/grunt-todo-server
 *
 * Copyright (c) 2014 Kenneth Cachia
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  grunt.registerMultiTask('todo_server', 'Grunt todo server', function () {
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
