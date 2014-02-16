/*
 * grunt-todo-server
 * https://github.com/kennethcachia/grunt-todo-server
 *
 * Copyright (c) 2014 Kenneth Cachia
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  grunt.registerMultiTask('todo_server', 'Grunt todo server.', function() {
    var regex = /(TODO):(.*)/ig;
    var src = this.data.src;

    var match;
    var raw;
    var todos = {};
    var key;

    src.forEach(function (filename) {
      grunt.log.writeln('Processing: ' + filename);

      key = todos[filename] = [];
      raw = grunt.file.read(filename);

      while ((match = regex.exec(raw)) !== null) {
        key.push({
          raw: match[0],
          prefix: match[1],
          comment: match[2]
        });
      }
    });

    grunt.file.write('server/index.html', JSON.stringify(todos));
  });
};
