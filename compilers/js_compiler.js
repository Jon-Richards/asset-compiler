#!/usr/bin/env node

const Path = require('path');
const Fs = require('fs');
const Echo = require('./../utils/echo.js');
const Webpack = require('webpack');

/**
 * Checks the process's current working directory for a webpack.config file.
 * If one is found, returns its path.  If one is not found, return the path
 * to the webpack.config.js file located in this package.
 * 
 * @returns Path to a webpack.config.js file.
 */
function resolveConfig () {
  let _config = '';
  if ( Fs.existsSync( Path.resolve( process.cwd(), 'webpack.config.js') ) ) {
    _config = Path.resolve( process.cwd(), 'webpack.config.js' );
  } else {
    _config = Path.resolve(__dirname, '..', 'webpack.config.js');
  }
  return _config;
}
const configPath = resolveConfig();
const WebpackConfig = require( configPath );

/**
 * Instantiates Webpack, applies the
 * config and runs a build.
 *
 * For callback configuration options, see: 
 * https://github.com/webpack/docs/wiki/node.js-api
 * 
 * @param {string} input Path to the entry file that Webpack should use.
 * @param {string} output Path to the file that Webpack should export.
 * @param {boolean} createSource If Webpack should also create a map file for the result.
 */
function build_js(input, output, createSource) {
  let _config =  WebpackConfig;
  Echo('Using webpack.config.js in ' + Path.resolve(configPath, '..'));
  
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
      modules: false,
      timings: false,
      version: false,
      hash: false,
      errorDetails: true,
      colors: true,
    }));
  });
}

module.exports = {
  build: build_js
}