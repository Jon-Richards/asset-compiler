#!/usr/bin/env node

const Path = require('path');
const Webpack = require('webpack');
const WebpackConfig = require( Path.join(process.cwd(), 'webpack.config.js') ); // TODO - Implement more secure way of finding project root.

/**
 * Instantiates Webpack, applies the
 * config and runs a build.
 *
 * For callback configuration options, see: 
 * https://github.com/webpack/docs/wiki/node.js-api
 * 
 * @param {string} input Path to the entry file that Webpack should use.
 * @param {string} output Path to the file that Webpack should export.
 * @param {boolean} If Webpack should also create a map file for the result.
 */
function build_js(input, output, createSource) {
  let _config = WebpackConfig;
  
  // Augment the config object with this function's parameters.
  _config.entry = input;
  _config.output = {
    path: Path.dirname(output),
    filename: Path.basename(output)
  }
  if (createSource) _config.devtool = 'source-map';

  // Run Webpack with the new config.
  let _wp = Webpack(_config);
  _wp.run((err, status) => {
    console.log(status.toString({
      assets: true,
      chunks: false,
      timings: false,
      version: false,
      hash: false,
      modules: true,
      errorDetails: true,
      colors: true,
    }));
  });
}

module.exports = {
  build: build_js
}