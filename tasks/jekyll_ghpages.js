/*
 * grunt-jekyll-ghpages
 * https://github.com/rudasn/grunt-jekyll-ghpages
 *
 * Copyright (c) 2014 Nicolas Rudas
 * Licensed under the MIT license.
 */

'use strict';

function JekyllPages(grunt) {
  grunt.registerTask('jekyll_ghpages', '', function(task) {
      task || (task = 'dev');
      task = 'jekyll_ghpages_' + task;

      grunt.task.run(task);
    });

  grunt.registerTask('jekyll_ghpages_dev', [
                     'jekyll_ghpages_lint',
                     'jekyll_ghpages_build',
                     'watch:jekyll_ghpages_config',
                     'watch:jekyll_ghpages_images',
                     'watch:jekyll_ghpages_css',
                     'watch:jekyll_ghpages_js',
                     'watch:jekyll_ghpages_jekyll',
  ]);
  grunt.registerTask('jekyll_ghpages_deploy', [
                     'jekyll_ghpages_static',
                     'gh-pages:jekyll_ghpages',
                     'clean:jekyll_ghpages_grunt',
                     'clean:jekyll_ghpages_tmp',
  ]);
  grunt.registerTask('jekyll_ghpages_serve', [
                     'clean:jekyll_ghpages_serve',
                     'jekyll_ghpages_static',
                     'copy:jekyll_ghpages_serve',
                     'rename:jekyll_ghpages_serve',
                     'clean:jekyll_ghpages_grunt',
                     'clean:jekyll_ghpages_tmp',
                     'connect:jekyll_ghpages_serve',
  ]);
  grunt.registerTask('jekyll_ghpages_build', [
                     'convert:jekyll_ghpages_config',
                     'shell:jekyll_ghpages_build',
  ]);
  grunt.registerTask('jekyll_ghpages_config', [
                     'convert:jekyll_ghpages_config',
  ]);
  grunt.registerTask('jekyll_ghpages_lint', [
                     'jshint:jekyll_ghpages_all',
                     'csslint:jekyll_ghpages_all',
  ]);
  grunt.registerTask('jekyll_ghpages_static', [
                     'jekyll_ghpages_lint',
                     'jekyll_ghpages_build',
                     'imagemin',
                     'useminPrepare',
                     'concat',
                     'uglify',
                     'cssmin',
                     'rev:jekyll_ghpages_images',
                     'rev:jekyll_ghpages_css',
                     'rev:jekyll_ghpages_js',
                     'usemin',
                     'htmlmin',
                     'clean:jekyll_ghpages_grunt',
                     'clean:jekyll_ghpages_tmp',
  ]);
};

JekyllPages.config = {
  useminPrepare: {
    options: {
      dest: '<%= pkg.build_dir %>',
      root: '<%= pkg.build_dir %>',
      assetsDirs: '<%= pkg.assets_dir %>',
    },
    html: '<%= pkg.build_dir %>/**/*.html'
  },
  usemin: {
    options: {
      dest: '<%= pkg.build_dir %>',
      assetsDirs: [
        '<%= pkg.build_dir %>',
        '<%= pkg.build_dir %>/<%= pkg.assets_dir %>/**/*'
      ],
      prefix: '<%= pkg.baseurl %>',
    },
    html: '<%= pkg.build_dir %>/**/*.html',
    css: '<%= pkg.build_dir %><%= pkg.assets.css %>**.min.css'
  },
  imagemin: {
    options: {cache: false},
    dynamic: {
        files: [{
            expand: true,
            cwd: '.<%=  pkg.assets.images %>',
            src: ['**/*.{png,jpg,gif}'],
            dest: '<%= pkg.build_dir %><%=  pkg.assets.images %>'
        }]
    }
  },
  shell: {
      jekyll_ghpages_serve: {
          command: "jekyll serve --baseurl ''"
      },
      jekyll_ghpages_build: {
          command: "jekyll build"
      }
  },
  convert: {
      jekyll_ghpages_config: {
        files: [{
            src: ['package.json'],
            dest: '_config.yml'
        }]
      }
  },
  watch: {
      jekyll_ghpages_config: {
          files: [ 'package.json' ],
          tasks: [
            'convert:config',
            'shell:jekyllServe',
          ],
          options: {
              interrupt: true,
          }
      },
      jekyll_ghpages_css: {
          files: [
              '.<%=  pkg.assets.css %>**/*.css',
          ],
          tasks: [ 'shell:jekyllServe'],
          options: {
            interrupt: true,
          },
      },
      jekyll_ghpages_js: {
          files: [
              'gruntfile.js',
              '.<%= pkg.assets.js %>**/*.js',
          ],
          tasks: [
            'jshint',
            'shell:jekyllServe',
          ],
          options: {
            interrupt: true,
          },
      },
      jekyll_ghpages_images: {
          files: [
              '.<%=  pkg.assets.images %>**/*.{png,jpg,gif,jpeg}',
          ],
          tasks: ['imagemin', 'shell:jekyllServe'],
          options: {
            interrupt: true,
          },
      },
      jekyll_ghpages_jekyll: {
          files: [
              // '_config.yml',
              '**/*.markdown',
              '**/*.html',
              '!<%= pkg.build_dir %>/**/*.html',
              '!<%= pkg.build_dir %>/**/*.markdown',
          ],
          tasks: ['shell:jekyllServe',],
          options: {
              interrupt: true,
              atBegin: true,
          }
      }
  },
  connect: {
    jekyll_ghpages_serve: {
      options: {
        appName: '<%= pkg.name %>',
        port: 9001,
        base: '<%= pkg.serve_dir %>',
        keepalive: true
      }
    }
  },
  'gh-pages': {
    jekyll_ghpages: {
      options: {
        base: '<%= pkg.build_dir %>',
        tag: '<%= pkg.version %>'
      },
      src: ['**']
    }
  },
  rev: {
    options: {
      algorithm: 'md5',
      length: 8
    },
    jekyll_ghpages_images: {
      src: [
        '<%= pkg.build_dir %><%= pkg.assets.images %>**/*.{jpg,png,gif,jpeg}'
      ]
    },
    jekyll_ghpages_css: {
      src: [
        '<%= pkg.build_dir %><%= pkg.assets.css %><%= pkg.name %>.min.css',
      ],
    },
    jekyll_ghpages_js: {
      src: [
        '<%= pkg.build_dir %><%= pkg.assets.js %><%= pkg.name %>.min.js',
      ]
    }
  },
  htmlmin: {
    options: {
      removeComments: true,
      collapseWhitespace: true,
      removeEmptyAttributes: true,
      caseSensitive: true
    },
    files: {
      expand: true,
      cwd: '<%= pkg.build_dir %>',
      src: ['**/*.html'],
      dest: '<%= pkg.build_dir %>'
    }
  },
  jshint: {
    jekyll_ghpages_all: [
      'gruntfile.js',
      'package.json',
      '.<%=  pkg.assets.js %>**/*.js',
    ]
  },
  csslint: {
    jekyll_ghpages_all: [
      '.<%=  pkg.assets.css %>**/*.css',
    ]
  },
  copy: {
    jekyll_ghpages_serve: {
      src: '<%= pkg.build_dir %>/**',
      dest: '.tmp/',
    },
  },
  rename: {
    jekyll_ghpages_serve: {
      src: '.tmp/<%= pkg.build_dir %>',
      dest: '<%= pkg.serve_dir %><%= pkg.baseurl %>'
    },
  },
  clean: {
    jekyll_ghpages_serve: '<%= pkg.serve_dir %>',
    jekyll_ghpages_grunt: '.grunt',
    jekyll_ghpages_tmp: '.tmp',
  }
}

module.exports = JekyllPages;
