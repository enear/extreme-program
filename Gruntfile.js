/**
 * Created by GoncaloAssuncao on 21/03/2016.
 */
/**
 * Created by Gonçalo Assunção on 11/03/2016.
 */


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
          'public/build/main.css': 'public/css/styles.scss'
        }
      }
    },
    watch: {
      js: {
        files: 'public/**/*.js',
        tasks: ['concat', 'express:dev'],
        options: {
          spawn: false
        }
      },
      sass: {
        files: 'public/css/*.scss',
        tasks: ['sass', 'express:dev'],
        options: {
          spawn: false
        }
    },
      express: {
        files: ['app.js', 'Gruntfile.js', 'config/*.js', 'routes/*.js', 'api/**/*', 'public/**/*'], 
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
  }//,
    // copy: {
    //   main: {
    //     files: [
    //       {expand: false, src: ['bower_components/bootstrap/dist/css/bootstrap.min.css'], dest: 'public/build/bootstrap.min.css'}
    //     ]
    //   }
    // }
  });


  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.registerTask('default', [/*'concat', */'sass',/*'copy',*/ 'express:dev', 'watch']);
};
