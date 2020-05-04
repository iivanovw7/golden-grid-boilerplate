/**
 * POSTCSS configuration
 * @module postcss.config
 */
const postcssImport = require('postcss-import');
const postcssUrl = require('postcss-url');
const postcssSimpleVars = require('postcss-simple-vars');
const postcssMixins = require('postcss-mixins');
const postcssFunctions = require('postcss-functions');
const postcssFlexBugsFixes = require('postcss-flexbugs-fixes');
const postcssCssNano = require('cssnano');
const postcssAutoPrefixer = require('autoprefixer');
const postcssAdvancedVariables = require('postcss-advanced-variables');
const postcssModulesValues = require('postcss-modules-values');
const postcssExtended = require('postcss-extend');
const postcssNested = require('postcss-nested');
const postcssFailOnWarning = require('postcss-fail-on-warn');
const postcssPresetEnv = require('postcss-preset-env');
const postcssReporter = require('postcss-reporter');

const functions = require('./src/styles/functions');
const mixins = require('./src/styles/mixins');
const settings = require('./src/styles/settings');

module.exports = ({ file }) => ({
  parser: file.extname === '.sass' ? 'sugarss' : 'postcss-scss',
  minimize: true,
  plugins: [
    postcssImport,
    postcssUrl,
    postcssSimpleVars({
      variables: settings.defaults
    }),
    postcssMixins({
      mixins
    }),
    postcssFunctions({
      functions
    }),
    postcssFlexBugsFixes,
    postcssAdvancedVariables,
    postcssModulesValues,
    postcssExtended,
    postcssNested,
    postcssAutoPrefixer,
    postcssFailOnWarning,
    postcssPresetEnv({
      browsers: 'last 2 versions',
      stage: 0
    }),
    postcssCssNano({
      preset: 'default'
    }),
    postcssReporter({
      clearReportedMessages: false
    })
  ]
});
