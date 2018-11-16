const path = require('path');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = merge(baseWebpackConfig, {
  mode: 'development',
  output: {
    filename: "js/[name].[hash:16].js",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'template/index.html',
      inject: 'body',
      minify: {
        html5: true
      },
      hash: false
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      host: "''"
    })
  ],
  devServer: {
    port: '3000',
    contentBase: path.join(__dirname, '../template'),
    compress: true,
    historyApiFallback: true,
    hot: true,
    https: false,
    noInfo: true,
    open: true,
    proxy: {
      '/login': {
        target: 'http://xbeta.club/login',
        changeOrigin: true,
        pathRewrite: {
          '^/login': '/'
        }
      }
    }
  }
});