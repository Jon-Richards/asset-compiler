#!/usr/bin/env node

const Webpack = require('webpack');
const CompleteWebpackConfig = require('./../utils/complete_webpack_config');

/**
 * Instantiates Webpack, applies the
 * config and runs a build.
 *
 * For callback configuration options, see: 
 * https://github.com/webpack/docs/wiki/node.js-api
 * 
 * @param {string} input Path to the entry file that Webpack should use.
 * @param {string} output Path to the file that Webpack should export.
 * @param {boolean} createSourceMap If Webpack should also create a map file for the result.
 */
function build_js(input, output, createSourceMap) {

  let _wp_config = CompleteWebpackConfig(input, output, createSourceMap);

  // Run Webpack with the new config.
  let _wp = Webpack(_wp_config);
  _wp.run((err, status) => {
    console.log(status.toString({
      assets: true,
      chunks: false,
      modules: false,
      timings: false,
      version: false,
      hash: false,
      errorDetails: true,
      colors: true,
      children: false
    }));
  });
}


module.exports = {
  build: build_js
}