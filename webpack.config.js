const path = require('path');
const extractCss = require('mini-css-extract-plugin');
const updateHtml = require('html-webpack-plugin');
const cleanAssetDist = require('clean-webpack-plugin');
// <-- For HotModuleReplacement(HMR) in Dev Server
const webpack = require('webpack');
// const reloadServer = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true'; <-- For HotModuleReplacement(HMR) in Middleware Server

module.exports = {
  mode: 'development',
  entry: {
    // app: ['./src/main.js', reloadServer] <-- For Hot Middleware Server (Only one entry point)
    app: './src/main.js',
    index: './src/pug/index.pug'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].bundle.js',
    // publicPath: '/' <-- For Middleware Server
  },
  //Online for development
  devtool: 'inline-source-map',
  //<-- For Web Dev Server (Not compile any files, just in memory)
  devServer: {
    contentBase: './dist',
    port: 9000,
    // <-- For HotModuleReplacement(HMR) in Dev Server
    hot: true
  },
  module: {
    rules: [
      {
        test: /\.pug$/,
        use: [
          {
            loader: 'pug-loader',
            options: {
              pretty: true
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          // 'style-loader',
          'css-hot-loader',
          process.env.NODE_ENV == 'production' ? 'style-loader' : extractCss.loader,
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        // use: ['file-loader']
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'assets/img/'
            }
          }
        ]
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'assets/fonts/'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new extractCss({
        filename: "[name].css",
        chunkFilename: "[id].css"
    }),
    new cleanAssetDist(['dist/*']),
    new updateHtml({
      // filename: 'main.html', <-- Doesn't work with server
      template: './src/pug/index.pug'
    })
    // new webpack.HotModuleReplacementPlugin(), // For HotModuleReplacement(HMR) in Dev Server/Middleware server
    // new webpack.NoEmitOnErrorsPlugin() // For HotModuleReplacement(HMR) in Middleware server
  ]
};
