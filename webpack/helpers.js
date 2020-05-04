/**
 * Webpack helpers module
 * @module webpack/helpers
 */
const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');

/**
 * Generates array of HtmlWebpackPlugin instances on each html file inside dir
 *
 * @param {string} templateDir - html files path
 * @param {string} mode - current application build mode
 * @return {HtmlWebpackPlugin[]} - returns plugin instances
 */
function generateHtmlPlugins(templateDir, mode) {
  // Read files in template directory
  const templateFiles = fs.readdirSync(path.resolve(__dirname, templateDir));
  return templateFiles.map((item) => {
    // Split names and extension
    const parts = item.split('.');
    const name = parts[0];
    const extension = parts[1];

    // Create new HTMLWebpackPlugin with options
    return new HtmlWebpackPlugin({
      filename: `${name}.html`,
      template: path.resolve(__dirname, `${templateDir}/${name}.${extension}`),
      inject: true,
      minify: mode === 'production'
    });
  });
}

module.exports = { generateHtmlPlugins };
