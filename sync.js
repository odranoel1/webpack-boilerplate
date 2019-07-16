let gulp = require('gulp');
let browserSync = require('browser-sync');
let webpack = require('webpack');
let webpackDevMiddleware = require('webpack-dev-middleware');
let hotMiddleware = require('webpack-hot-middleware');
let config = require('./webpack.config.js');

let browser = browserSync.create();
let bundler = webpack(config);

function server() {

    let config = {
        server: {
          baseDir: 'dist/'
        },
        middleware: [
            webpackDevMiddleware(bundler, { /* options */ }),
            hotMiddleware(bundler)
        ],
    }

    browser.init(config)

    gulp.watch('src/pug/*.pug').on('change', () => browser.reload())
}

server();
