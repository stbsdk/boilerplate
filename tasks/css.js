/**
 * Tasks generator for CSS
 */

'use strict';

var fs     = require('fs'),
    path   = require('path'),
    runner = require('runner'),
    tools  = require('runner-tools'),
    logger = require('runner-logger'),
    async  = require('cjs-async'),
    name   = 'css',
    log    = logger.wrap(name);


function build ( config, done ) {
    var modules  = ['stb-app'],
        packageData;

    delete require.cache[require.resolve('../package')];
    packageData = require('../package');

    Object.keys(packageData.dependencies || {}).concat(Object.keys(packageData.devDependencies || {})).forEach(function ( moduleName ) {
        if ( moduleName.indexOf('stb-component-') === 0 ) {
            modules.push(moduleName);
        }
    });

    async.parallel(modules.map(function ( moduleName ) {
        return function ( ready ) {
            fs.readFile(path.join('node_modules', moduleName, 'css', config.mode + '.' + config.resolution + '.css'), ready);
        };
    }), function ( error, results ) {
        if ( !error ) {
            tools.write(
                [
                    {
                        name: config.outFile,
                        data: results.join('\n')
                    }
                ],
                log,
                done
            );
        }
    });
}


function clear ( config, done ) {
    tools.unlink([config.outFile], done);
}


function generator ( config, options ) {
    // sanitize
    options = Object.assign(generator.options, options || {});

    runner.task(options.prefix + 'config' + options.suffix, function () {
        log.inspect(config, log);
    });

    runner.task(options.prefix + 'build' + options.suffix, function ( done ) {
        build(config, done);
    });

    runner.task(options.prefix + 'clear' + options.suffix, function ( done ) {
        clear(config, done);
    });
}


//defaults
generator.options = {
    prefix: name + ':',
    suffix: ''
};


// export main actions
generator.methods = {
    build: build
};

// public
module.exports = generator;