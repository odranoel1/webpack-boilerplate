const path = require('path');
const extractCss = require('mini-css-extract-plugin');
const updateHtml = require('html-webpack-plugin');
const cleanAssetDist = require('clean-webpack-plugin');
const minifyCSS = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  entry: {
    // main: './src/main.js',
    main: './src/js/main.js',
    vendor: './src/js/vendor.js',
    // index: './src/pug/index.pug' // <--IMPORTANT For reload pug
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'assets/[name].js',
  },
  //Online for development
  devtool: 'inline-source-map',
  //<-- Dev Server (Not compile any files, just in memory)
  devServer: {
    contentBase: './dist',
    port: 9000,
    // <-- HotModuleReplacement(HMR) in Dev Server
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
          'css-hot-loader',
          'style-loader' , //4.Inject styles in DOM
          extractCss.loader, //3.Extract css from js
          'css-loader', //2.Turn css into js
          'sass-loader' //1.Turn sass into css
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
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
        filename: "assets/[name].css",
        chunkFilename: "[id].css"
    }),
    new cleanAssetDist(['dist/*']),
    new updateHtml({
      // filename: 'main.html', <-- Doesn't work with server
      template: './src/pug/index.pug'
    })
  ],
  optimization: { //Only in mode production
    minimizer: [
      new minifyCSS(), new TerserPlugin()
    ]
  }
};
