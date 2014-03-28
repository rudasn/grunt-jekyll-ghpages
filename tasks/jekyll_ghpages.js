/*
 * grunt-jekyll-ghpages
 * https://github.com/rudasn/grunt-jekyll-ghpages
 *
 * Copyright (c) 2014 Nicolas Rudas
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerTask('jekyll_ghpages', 'The best Grunt plugin ever.', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options(),
      pkg = options.pkg;

    var config = {
        useminPrepare: {
          options: {
            dest: pkg.build_dir,
            root: pkg.build_dir,
            assetsDirs: pkg.assets_dir,
          },
          html: pkg.build_dir + '/**/*.html'
        },
        /**
         *  runs concat, uglify and cssmin on resources in referenced files
         */
        usemin: {
          options: {
            dest: pkg.build_dir,
            assetsDirs: [
              pkg.build_dir,
              pkg.build_dir + '/' + pkg.assets_dir + '/**/*'
            ],
            prefix: pkg.baseurl,
          },
          html: pkg.build_dir  + '/**/*.html',
          css: pkg.build_dir + pkg.assets.css + '**.min.css'
        },
        imagemin: {
            options: {cache: false},
            dynamic: {
                files: [{
                    expand: true,
                    cwd: '.' + pkg.assets.images,
                    src: ['**/*.{png,jpg,gif}'],
                    dest: pkg.build_dir + pkg.assets.images
                }]
            }
        },
        shell: {
            jekyllServe: {
                command: "jekyll serve --baseurl ''"
            },
            jekyllBuild: {
                command: "jekyll build"
            }
        },
        convert: {
            config: {
                files: [{
                    src: ['package.json'],
                    dest: '_config.yml'
                }]
            }
        },
        watch: {
            config: {
                files: [ 'package.json' ],
                tasks: [
                  'convert:config',
                  'shell:jekyllServe',
                ],
                options: {
                    interrupt: true,
                }
            },
            css: {
                files: [
                    '.' + pkg.assets.css + '**/*.css',
                ],
                tasks: [ 'shell:jekyllServe'],
                options: {
                  interrupt: true,
                },
            },
            js: {
                files: [
                    'gruntfile.js',
                    '.' + pkg.assets.js + '**/*.js',
                ],
                tasks: [
                  'jshint',
                  'shell:jekyllServe',
                ],
                options: {
                  interrupt: true,
                },
            },
            images: {
                files: [
                    '.' + pkg.assets.images + '**/*.{png,jpg,gif,jpeg}',
                ],
                tasks: ['imagemin', 'shell:jekyllServe'],
                options: {
                  interrupt: true,
                },
            },
            jekyll: {
                files: [
                    // '_config.yml',
                    '**/*.markdown',
                    '**/*.html',
                    '!' + pkg.build_dir + '/**/*.html',
                    '!' + pkg.build_dir + '/**/*.markdown',
                ],
                tasks: ['shell:jekyllServe',],
                options: {
                    interrupt: true,
                    atBegin: true,
                }
            }
        },
        connect: {
          serve: {
            options: {
              appName: pkg.name,
              port: 9001,
              base: pkg.serve_dir,
              keepalive: true
            }
          }
        },
        'gh-pages': {
          options: {
            base: pkg.build_dir,
            tag: pkg.version
          },
          src: ['**']
        },
        rev: {
          options: {
            algorithm: 'md5',
            length: 8
          },
          images: {
            src: [
              pkg.build_dir + pkg.assets.images + '**/*.{jpg,png,gif,jpeg}'
            ]
          },
          css: {
            src: [
              pkg.build_dir + pkg.assets.css + pkg.name + '.min.css',
            ],
          },
          js: {
            src: [
              pkg.build_dir + pkg.assets.js + pkg.name + '.min.js',
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
            cwd: pkg.build_dir,
            src: ['**/*.html'],
            dest: pkg.build_dir
          }
        },
        jshint: {
          all: [
            'gruntfile.js',
            'package.json',
            '.' + pkg.assets.js + '**/*.js',
          ]
        },
        csslint: {
          all: [
            '.' + pkg.assets.css  + '**/*.css',
          ]
        },
        copy: {
          serve: {
            src: pkg.build_dir + '/**',
            dest: '.tmp/',
          },
        },
        rename: {
          serve: {
            src: '.tmp/' + pkg.build_dir,
            dest: pkg.serve_dir + pkg.baseurl
          },
        },
        clean: {
          serve: pkg.serve_dir,
          grunt: '.grunt',
          tmp: '.tmp',
        }
    };

    grunt.config(config);
    // grunt.task.run('bar', 'baz');

    grunt.log.writeln(JSON.stringify(config ,null, ' '));
  });


  grunt.loadNpmTasks('grunt-rev');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-usemin');
  grunt.loadNpmTasks('grunt-rename');
  grunt.loadNpmTasks('grunt-convert');
  grunt.loadNpmTasks('grunt-gh-pages');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-csslint');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.registerTask('jekyll_ghpages_dev', [
                     'lint',
                     'build',
                     'watch',
  ]);
  grunt.registerTask('deploy', [
                     'static',
                     'gh-pages',
                     'clean:grunt',
                     'clean:tmp',
  ]);
  grunt.registerTask('serve', [
                     'clean:serve',
                     'static',
                     'copy:serve',
                     'rename:serve',
                     'clean:grunt',
                     'clean:tmp',
                     'connect:serve',
  ]);
  grunt.registerTask('build', [
                     'convert:config',
                     'shell:jekyllBuild',
  ]);
  grunt.registerTask('config', [
                     'convert:config',
  ]);
  grunt.registerTask('lint', [
                     'jshint',
                     'csslint',
  ]);
  grunt.registerTask('static', [
                     'lint',
                     'build',
                     'imagemin',
                     'useminPrepare',
                     'concat',
                     'uglify',
                     'cssmin',
                     'rev',
                     'usemin',
                     'htmlmin',
                     'clean:grunt',
                     'clean:tmp',
  ]);

};
