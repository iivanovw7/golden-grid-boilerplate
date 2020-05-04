/**
 * Webpack common config, used both in production bundling
 * @module webpack/webpack.prod.js
 */
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const WebpackAssetsManifest = require('webpack-assets-manifest');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const ManifestPlugin = require('webpack-manifest-plugin');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',
  plugins: [
    new WebpackAssetsManifest({
      output: path.join(__dirname, '../dist/assets-manifest.json'),
      merge: true
    }),
    new ImageminPlugin({
      disable: false,
      pngquant: {
        quality: '95-100'
      }
    }),
    new webpack.DefinePlugin({
      CONFIG: JSON.stringify('production')
    }),
    new ManifestPlugin({
      fileName: 'assets-manifest.json'
    }),
    (exports.sw = new SWPrecacheWebpackPlugin({
      // By default, a cache-busting query parameter is appended to requests
      // used to populate the caches, to ensure the responses are fresh.
      // If a URL is already hashed by Webpack, then there is no concern
      // about it being stale, and the cache-busting can be skipped.
      dontCacheBustUrlsMatching: /\.\w{8}\./,
      filename: 'service-worker.js',
      logger(message) {
        if (message.indexOf('Total precache size is') === 0) {
          // This message occurs for every build and is a bit too noisy.
          return;
        }
        console.log(message);
      },
      minify: true, // minify and uglify the script
      navigateFallback: '/index.html',
      staticFileGlobsIgnorePatterns: [/\.map$/, /assets-manifest\.json$/]
    }))
  ],
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            // get the name. E.g. node_modules/packageName/not/this/part.js
            // or node_modules/packageName
            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];

            // npm package names are URL-safe, but some servers don't like @ symbols
            return `npm.${packageName.replace('@', '')}`;
          }
        }
      }
    }
  }
});
