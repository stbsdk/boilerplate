/**
 * Develop tasks
 */

'use strict';

var path        = require('path'),
    runner      = require('runner'),
    tools       = require('@runner/tools'),
    logger      = require('@runner/logger'),
    webpack     = require('webpack'),
    css         = require('./css'),
    resolutions = ['480', '576', '720', '1080'],
    source      = 'src',
    target      = 'build/develop';


// add system task "status"
// to get all tasks running state
// require('node-runner/lib/status');

Object.assign(runner.tasks,
    // activate popup notifications on errors
    require('@runner/generator-notify')(),

    require('@runner/generator-repl')({
        runner: runner
    }),

    require('@runner/generator-eslint')({
        watch: [
            path.join(source, 'js', '**', '*.js'),
            path.join('tasks', '**', '*.js')
        ]
    }),

    require('@runner/generator-gettext')({
        // add languages to translate
        languages: [/*'fr'*/],
        source: path.join(source, 'lang'),
        target: path.join(target, 'lang'),
        jsData: [path.join(source, 'js')]
    }),

    require('@runner/generator-static')({
        open: path.join(target)
    }),

    require('@runner/generator-livereload')({
        watch: [
            path.join(target, '**', '*'),
            '!' + path.join(target, '**', '*.map')
        ]
    }),

    require('@runner/generator-pug')({
        source: path.join(source, 'pug', 'main.pug'),
        target: path.join(target, 'index.html'),
        options: {
            pretty: true
        },
        variables: {
            develop: true,
            package: require('../package')
        }
    }),

    require('@runner/generator-webpack')({
        mode: 'development',
        entry: path.resolve(path.join(source, 'js', 'main.js')),
        output: {
            filename: 'main.js',
            path: path.resolve(target)
        },
        resolve: {
            alias: {
                'app:metrics': path.resolve(path.join(source, 'js', 'metrics.js')),
                'app:config': path.resolve(path.join(source, 'js', 'config.js'))
            }
        },
        watchOptions: {
            // delay rebuilding after the first change (in ms)
            aggregateTimeout: 50
        },
        devtool: 'source-map',
        plugins: [
            // global constants
            new webpack.DefinePlugin({
                DEVELOP: true,
                LIVERELOAD: {
                    port: 35729
                }
            }),
            new webpack.optimize.OccurrenceOrderPlugin()
        ]
    })
);

resolutions.forEach(function ( resolution ) {
    Object.assign(runner.tasks,
        require('@runner/generator-sass')({
            file: path.join(source, 'sass', 'develop.' + resolution + '.scss'),
            outFile: path.join(target, 'css', 'develop.app.' + resolution + '.css'),
            sourceMap: path.join(target, 'css', 'develop.app.' + resolution + '.map')
        }, {
            suffix: ':' + resolution
        }),

        css({
            resolution: resolution,
            outFile: path.join(target, 'css', 'develop.sdk.' + resolution + '.css'),
            mode: 'develop'
        }, {
            suffix: ':' + resolution
        })
    );
});


// main tasks
runner.task('init', function ( done ) {
    tools.mkdir(
        [
            path.join(target, 'lang'),
            path.join(target, 'css')
        ],
        logger.wrap('init'),
        done
    );
});


runner.task('copy', function ( done ) {
    tools.copy(
        {
            source: path.join(source, 'img'),
            target: path.join(target, 'img')
        },
        logger.wrap('copy'),
        done
    );
});

runner.task('sass:build', runner.parallel('sass:build:480', 'sass:build:576', 'sass:build:720', 'sass:build:1080'));

runner.task('css:build', runner.parallel('css:build:480', 'css:build:576', 'css:build:720', 'css:build:1080'));

runner.task('build', runner.parallel('pug:build', 'sass:build', 'css:build', 'webpack:build', 'gettext:build', 'copy'));

/* eslint-disable-next-line no-unused-vars */
runner.task('watch', function ( done ) {
    runner.watch(path.join(source, 'pug', '**', '*.pug'), 'pug:build');
    runner.watch(path.join(source, 'sass', '**', '*.scss'), 'sass:build');
    runner.watch(path.join(source, 'img', '**', '*'), 'copy');
    runner.watch(path.resolve('package*json'), 'css:build');
    runner.run('eslint:watch');
    runner.run('webpack:watch');
});

runner.task('serve', runner.parallel('static:start', 'livereload:start', 'repl:start', 'notify:start'));

runner.task('default', runner.serial('build', runner.parallel('watch', 'serve')));
