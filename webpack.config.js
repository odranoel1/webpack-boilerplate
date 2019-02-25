const path = require('path');
const extractCss = require('mini-css-extract-plugin');
const updateHtml = require('html-webpack-plugin');
const cleanAssetDist = require('clean-webpack-plugin');
const webpack = require('webpack');
// const reloadServer = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true';

module.exports = {
  mode: 'development',
  entry: {
    // app: ['./src/index.js', reloadServer]
    app: './src/index.js'
    // print: './src/print.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  //Online for development
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    hot: true //Active Hot Module in dev server
  },
  module: {
    rules: [
      {
        test: /\.pug$/,
        use: [
          'pug-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: [
          // 'style-loader',
          process.env.NODE_ENV == 'production' ? 'style-loader' : extractCss.loader,
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  },
  plugins: [
    new extractCss({
        filename: "[name].css",
        chunkFilename: "[id].css"
    }),
    // new cleanAssetDist([
    //   'dist/*'
    // ]),
    new updateHtml({
      template: './src/test.pug'
    }),
    new webpack.HotModuleReplacementPlugin(), //Active Hot Module in dev server & middleware server
    new webpack.NoEmitOnErrorsPlugin()
  ]
};
