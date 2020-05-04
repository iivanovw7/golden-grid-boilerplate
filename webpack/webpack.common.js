/**
 * Webpack common config, used both in production and development bundling
 * @module webpack/webpack.common.js
 */
const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const DashboardPlugin = require('webpack-dashboard/plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const args = require('minimist')(process.argv.slice(2));
const helpers = require('./helpers');
const Locals = require('../src/config/locals');
const Styles = require('../src/styles/settings');

const env = dotenv.config().parsed;

/**
 * Processes every env variable to create object with process variables
 *  to be used in webpack.DefinePlugin
 * @type {{}}
 */
const envKeys = Object.keys(env).reduce((prev, next) => {
  // eslint-disable-next-line no-param-reassign
  prev[`process.env.${next}`] = JSON.stringify(env[next]);
  return prev;
}, {});

// Create HtmlWebpackPlugin instances to concat them into plugins array in webpack config
const htmlPlugins = helpers.generateHtmlPlugins('../src/views', args.mode);

module.exports = {
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|^(?!.*\.(spec|test)\.js$).*\.test$)/,
        use: ['babel-loader']
      },
      {
        test: /\.pug$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              minimize: args.mode === 'production'
            }
          },
          {
            loader: 'pug-html-loader',
            options: {
              // options to pass to the compiler same as: https://pugjs.org/api/reference.html
              data: Object.assign(Locals, Styles)
            }
          }
        ]
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              minimize: args.mode === 'production'
            }
          }
        ]
      },
      {
        test: /\.(sa|sc|c|s|pc)ss$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              url: false
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              config: {
                path: 'postcss.config.js'
              }
            }
          }
        ]
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-sprite-loader'
          },
          {
            loader: 'svgo-loader'
          }
        ]
      },
      {
        test: /\.(woff|eot|ttf|otf)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 1000, // if less than 10 kb, adds base64 encoded image to css
            name: 'assets/fonts/[hash].[ext]' // if more than 10 kb falls to file-loader
          }
        }
      },
      {
        test: /\.(png|jpg|jpeg|gif|ico)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1000, // if less than 10 kb, adds base64 encoded image to css
              name: 'assets/img/[name].[ext]' // if more than 10 kb falls to file-loader
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx', 'css']
  },
  entry: './src/app.js',
  node: {
    fs: 'empty'
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new DashboardPlugin(),
    new MiniCssExtractPlugin({
      filename: 'assets/css/[name].bundle.css',
      chunkFilename: 'assets/css/chunk-[id].css',
      ignoreOrder: true // Enable to remove warnings about conflicting order
    }),
    new SpriteLoaderPlugin(),
    new webpack.DefinePlugin(envKeys)
    // HtmlWebPackPlugin instances are now injected dynamically
  ].concat(htmlPlugins),
  output: {
    filename: 'assets/js/[name].bundle.js',
    path: path.resolve(__dirname, '../dist')
  }
};
