'use strict';

var grunt = require('grunt');

exports.todo_server = {
  setUp: function(done) {
    done();
  },

  scripts: function(test) {
    test.expect(1);

    var actual = grunt.file.read('server/index.html');
    var expected = grunt.file.read('test/expected/scripts.html');

    test.equal(actual, expected, 'the extracted todos should match');
    test.done();
  }
};
