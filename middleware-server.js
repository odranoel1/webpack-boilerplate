const http = require('http');
const express = require('express');

// require('console-stamp')(console, "HH:MM:ss.l");

const app = express();

// app.use(require('morgan')('short'));

// ************************************
// This is the real meat of the server
// ************************************

// Step 1: Create & configure a webpack compiler
const webpack = require('webpack');
const config = require('./webpack.config.js');
const compiler = webpack(config);

// Step 2: Attach the dev middleware to the compiler & the server
// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
const webpackDevMiddleware = require('webpack-dev-middleware');
app.use(webpackDevMiddleware(compiler, {
  logLevel: 'warn', publicPath: config.output.publicPath
}));

// Step 3: Attach the hot middleware to the compiler & the server
const webpackHotMiddleware = require('webpack-hot-middleware');
app.use(webpackHotMiddleware(compiler, {
  log: console.log, path: '/__webpack_hmr', heartbeat: 10 * 1000
}));

// Do anything you like with the rest of your express application.
app.get("/", function(req, res) {
  res.sendFile(__dirname + '/dist/index.html');
});

// Serve the files on port 3000.
// app.listen(3000, function () {
//   console.log('Example app listening on port 3000!\n');
// });

if (require.main === module) {
  var server = http.createServer(app);
  server.listen(process.env.PORT || 3000, function() {
    console.log("Listening on %j", server.address());
  });
}
