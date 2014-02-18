'use strict';

var grunt = require('grunt');

exports.todo_server = {
  setUp: function(done) {
    done();
  },

  extract: function(test) {
    test.expect(1);

    var actual = grunt.file.read('todo_server/todos.js');
    var expected = grunt.file.read('test/expected/extracted.js');

    test.equal(actual, expected, 'the extracted todos should match');
    test.done();
  }
};
