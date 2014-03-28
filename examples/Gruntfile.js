var extend = require('extend'),
    jgh = require('grunt-jekyll-ghpages');

module.exports = function(grunt) {
  grunt.initConfig(extend(jgh.config, {
    pkg: grunt.file.readJSON('package.json'),
    // ...
  });

  require('load-grunt-tasks')(grunt);

  grunt.registerTask('default', ['jekyll_ghpages_dev',]);
  grunt.registerTask('serve', ['jekyll_ghpages_serve',]);
  grunt.registerTask('deploy', ['jekyll_ghpages_deploy',]);
};
