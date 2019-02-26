const path = require('path');
const extractCss = require('mini-css-extract-plugin');
const updateHtml = require('html-webpack-plugin');
const cleanAssetDist = require('clean-webpack-plugin');
// const webpack = require('webpack'); <-- For HotModuleReplacement(HMR) in Dev Server
// const reloadServer = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true'; <-- For HotModuleReplacement(HMR) in Middleware Server

module.exports = {
  mode: 'development',
  entry: {
    // app: ['./src/index.js', reloadServer] <-- For Hot Middleware Server (Only one entry point)
    app: './src/index.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
    // publicPath: '/' <-- For Middleware Server
  },
  //Online for development
  devtool: 'inline-source-map',
  // devServer: { <-- For Web Dev Server (Not compile any files, just in memory)
  //   contentBase: './dist',
  //   port: 3000
  //   hot: true <-- For HotModuleReplacement(HMR) in Dev Server
  // },
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
          process.env.NODE_ENV == 'production' ? 'style-loader' : extractCss.loader,
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/'
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
      filename: 'main.html',
      template: './src/index.pug'
    })
    // new webpack.HotModuleReplacementPlugin(), // For HotModuleReplacement(HMR) in Dev Server/Middleware server
    // new webpack.NoEmitOnErrorsPlugin() // For HotModuleReplacement(HMR) in Middleware server
  ]
};
