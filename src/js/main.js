/**
 * Main application entry point.
 */

'use strict';

var app    = require('stb-app'),
    router = require('spa-router');


// global application configuration
app.config = require('./config');


// all resources are loaded
app.once('load', function () {
    // set pages
    router.init([
        require('./pages/init'),
        require('./pages/main')
    ]);
});


// everything is ready
app.once('done', function () {
    // go to the main page when necessary
    router.navigate('pageMain');
});
