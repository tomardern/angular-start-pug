let pug_plugin_ng = require('pug-plugin-ng');
const pug = require('pug');

const locales = {
  en: require('./locales/en.json')
};




/**
 * Main Grunt Export
 * @param {Object} grunt
 */
module.exports = function (grunt) {

  /**
   * Setup the Pug options
   */
  const pugOptions = {
    pretty: true,
    doctype: 'html',
    plugins: [pug_plugin_ng],
    t: (key) => locales[grunt.option('locale')][key] || key // Accessible in pug as #{t('something.cool.here')}!
  };

  // Project configuration.
  grunt.initConfig({
    concurrent: {
      dev: {
        tasks: ['exec:ngServe', 'watch:pug'],
        options: {
          logConcurrentOutput: true
        }
      }
    },
    exec: {
      ngServe: 'ng serve'
    },
    compileAllPugWithTranslations: {
      files: ['src/**/*.pug']
    },
    watch: {
      pug: {
        files: ['src/**/*.pug'],
        tasks: [], // No 'tasks' as this is then picked up by grunt.event.on('watch') so we only change one file
        options: {
          atBegin: true,
          spawn: false
        },
      },
    },
  });

  // Load the plugin that provides the "watch" task.
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-concurrent');


  /**
   * Custom task to compile all pugs with translations
   */
  grunt.registerMultiTask('compileAllPugWithTranslations', function () {
    this.files.forEach((files) => {
      files.src.forEach((file) => {
        grunt.task.run(`compilePugWithTranslations:${file}`);
      });
    });
  });

  /**
   * Custom task to compile and add translations via pug
   */
  grunt.registerTask('compilePugWithTranslations', function (arg1) {
    const file = arg1;
    const html = pug.renderFile(file, pugOptions);
    grunt.file.write(file.replace('.pug', '.html'), html);
  });

  /**
   * A 'hacky' solution so that we only modify the changed file
   */
  grunt.event.on('watch', function (action, filepath) {
    grunt.task.run(`compilePugWithTranslations:${filepath}`);
  });


  // Default task(s).
  grunt.registerTask('default', ['compileAllPugWithTranslations', 'concurrent:dev']);

};