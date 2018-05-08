let pug_plugin_ng = require('pug-plugin-ng');
const pug = require('pug');

const strings = require('../locales/en.json');

const opts = {
  pretty: true,
  doctype: 'html',
  plugins: [pug_plugin_ng]
};



// Compile template.pug, and render a set of data
console.log(pug.renderFile('locales/woop.pug', Object.assign(opts, {
  t: (key) => strings[key]
})));