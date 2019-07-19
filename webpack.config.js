const path = require('path');
const extractCss = require('mini-css-extract-plugin');
const updateHtml = require('html-webpack-plugin');
const cleanAssetDist = require('clean-webpack-plugin');
const minifyCSS = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

//Hot Module Replacement -- Middleware
const webpack = require('webpack');
const hmr = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000';

module.exports = {
  mode: 'development',
  entry: {
    main: ['./src/js/main.js', hmr],
    vendor: ['./src/js/vendor.js', hmr],
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'assets/[name].[hash].js',
    publicPath: '/'
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 9000,
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
          'style-loader' , //3.Inject styles in DOM
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
      filename: 'perro.html',
      template: './src/pug/index.pug'
    }),
    new updateHtml({
      filename: 'nana.html',
      template: './src/pug/about.pug'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],
  optimization: { //Only in mode production
    minimizer: [
      new minifyCSS(),
      new TerserPlugin(),
    ],
    splitChunks: { //Extraer dependencias dentro de js
      chunks: 'all'
    },
    runtimeChunk: 'single' //Separate runtime
  }
};
