let gulp = require('gulp'),
    browserSync = require('browser-sync'),
    webpack = require('webpack'),
    webpackDevMiddleware = require('webpack-dev-middleware'),
    hotMiddleware = require('webpack-hot-middleware'),
    config = require('./webpack.config.js'),
    browser = browserSync.create(),
    bundler = webpack(config);

function startServer() {
  let config = {
    notify: false,
    logLevel: "debug",
    server: { baseDir: 'dist/' },
    middleware: [
      webpackDevMiddleware(bundler, { /* options */ }),
      hotMiddleware(bundler)
    ]
  }

  browser.init(config);
  gulp.watch('src/pug/*.pug').on('change', () => browser.reload());
}

startServer();
