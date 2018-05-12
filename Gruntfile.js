let pug_plugin_ng = require('pug-plugin-ng');
const pug = require('pug');
const fs = require('fs');

const locales = {
  en: require('./locales/en.json')
};

/**
 * Setup the Pug options
 */
const locale = grunt.option('locale');
const pugOptions = {
  pretty: true,
  doctype: 'html',
  plugins: [pug_plugin_ng],
  t: (key) => locales[locale][key] || key // Accessible in pug as #{t('something.cool.here')}!
};

/**
 * Main Grunt Export
 * @param {Object} grunt
 */
module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({
    watch: {
      pug: {
        files: ['**/*.pug'],
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

  /**
   * Custom task to compile and add translations via pug
   */
  grunt.registerTask('compilePugWithTranslations', function (arg1, arg2) {
    const file = arg2;
    const locale = arg1;
    const html = pug.renderFile(file, pugOptions);
    fs.writeFile(file.replace('.pug', '.html'), html, () => { });
  });

  /**
   * A 'hacky' solution so that we only modify the changed file
   */
  grunt.event.on('watch', function (action, filepath) {
    const locale = grunt.option('locale');
    grunt.task.run(`compilePugWithTranslations:${locale}:${filepath}`);
  });


  // Default task(s).
  grunt.registerTask('default', ['watch:pug']);

};