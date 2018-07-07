#!/usr/bin/env node

const Path = require('path');
const Echo = require('./../utils/echo.js');
const Webpack = require('webpack');
const ResolveWPConfig = require('./../utils/resolve_webpack_config.js');
const Config = require( Path.resolve( process.cwd(), 'compiler-config.js' ) );

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
  let _wp_config_path = ResolveWPConfig();
  let _wp_config = require( _wp_config_path );
  Echo('Using webpack.config.js in ' + _wp_config_path);

  /**
   * Augment the config object with parameters from this function
   * as well as the overall compiler-configuration
   */

  // Webpack accepts key:value pairs as its entry.  Using this format establishes the key as
  // the "chunk" name, which Webpack can then use for outputs in various plugins, loaders, etc.
   let _chunkname = String(Path.basename(output)).replace(/\.[^/.]+$/, '');
  _wp_config.entry = {
    [_chunkname]: input
  };
  _wp_config.output = {
    path: Path.dirname(output),
    filename: Path.basename(output)
  }
  _wp_config.mode = Config.environment;
  _wp_config.devtool = createSourceMap ? 'source-map' : '';

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