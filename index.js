/**
 * Main SDK entry point.
 */

'use strict';

// redefinition of plugin option example
// require('stb-plugin-ssh/config').release.host = '192.168.1.20';

// activate gettext languages
// require('spa-plugin-gettext/config').default.languages = ['ru', 'fr'];

// load default plugins
// and run default tasks
module.exports = require('stbsdk/default');

// redefinition of default task example
// module.exports.runner.task('default', module.exports.runner.serial('build'));
