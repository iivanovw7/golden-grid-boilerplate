/**
 * Webpack common config, used both in development bundling
 * @module webpack/webpack.dev.js
 */
const merge = require('webpack-merge');
const webpack = require('webpack');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  plugins: [
    new webpack.DefinePlugin({
      CONFIG: JSON.stringify('development')
    })
  ],
  devServer: {
    historyApiFallback: true,
    contentBase: './',
    port: 4448,
    hot: true
  }
});
