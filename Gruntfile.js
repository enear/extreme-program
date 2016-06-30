module.exports = function(grunt){
  grunt.initConfig({
    // concat: {
    //   dist: {
    //     src: ['public/**/*.js', '!public/build/*', '!public/build/**/*.js'],
    //     dest: 'public/build/main.js'
    //   }
    // },
    sass: {
      dist: {
        files: {
          'app/public/css/styles.css': 'app/scss/styles.scss'
        },
        options: {
          sourcemap: 'none'
        }
      }
    },
    browserify: {
        dev: {
            options: {
                debug: true,
                transform: ['reactify']
            },
            files: {
                'app/public/js/app.js': 'app/components/app.jsx',
                'app/public/js/signin.js': 'app/components/signin.jsx'
            }
        }
    },
    watch: {
      browserify: {
        files: ['app/**/*.jsx','app/**/*.js', 'Gruntfile.js'],
        tasks: ['browserify:dev', 'express:dev'],
        options: {
          spawn: false
        }
      },
      sass: {
        files: 'app/scss/**/*.scss',
        tasks: ['sass', 'express:dev'],
        options: {
          spawn: false
        }
    },
      express: {
        files: ['app.js', 'Gruntfile.js', 'config/*.js', 'routes/*.js', 'api/**/*', 'app/public/**/*'],
        tasks: ['express:dev'],
        options: {
          spawn: false
        }
      }
    },
    express: {
      options: {

      },
      dev: {
        options: {
          script: 'app.js'
        }
      }
  },
    copy: {
      main: {
        files: [
          {expand: false, src: ['bower_components/bootstrap/dist/css/bootstrap.min.css'], dest: 'app/public/css/libraries/bootstrap.min.css'},
          {expand: false, src: ['bower_components/jquery/dist/jquery.min.js'], dest: 'app/public/js/libraries/jquery.min.js'},
          {expand: false, src: ['bower_components/bootstrap/dist/js/bootstrap.min.js'], dest: 'app/public/js/libraries/bootstrap.min.js'}
        ]
      }
    }
  });


  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.registerTask('default', [/*'concat', */'sass','copy', 'browserify:dev', 'express:dev', 'watch']);
};
