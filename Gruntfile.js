/*
 * grunt-jekyll-ghpages
 * https://github.com/rudasn/grunt-jekyll-ghpages
 *
 * Copyright (c) 2014 Nicolas Rudas
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Configuration to be run (and then tested).
    jekyll_ghpages: {
      options: {
        pkg: grunt.file.readJSON('package.json'),
      },
    },

  });

  grunt.loadTasks('tasks');

  grunt.registerTask('default', ['jekyll_ghpages']);


};
