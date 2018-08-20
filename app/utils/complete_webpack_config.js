#!/usr/bin/env node

/**
 * Finds the the webpack.config.js file being used by the project
 * and completes it with the settings from compiler-config.js
 */


const Path = require('path');
const Fs = require('fs');
const Echo = require('./echo.js');
const Config = require( Path.resolve( process.cwd(), 'compiler-config.js' ) );


/**
 * Checks the process's current working directory for a webpack.config file.
 * If one is found, returns its path.  If one is not found, return the path
 * to the webpack.config.js file that ships with asset-compiler.
 * 
 * @returns Path to a webpack.config.js file.
 */
function resolveWebpackConfig () {
  let _config = 'undefined';
  
  if ( Fs.existsSync( Path.resolve( process.cwd(), 'webpack.config.js') ) ) {
    _config = Path.resolve( process.cwd(), 'webpack.config.js' );
  } else {
    _config = Path.resolve(__dirname, '..', '..', 'webpack.config.js');
  }
  
  return _config;
}


/**
 * Searches a given compiler-config object for a public path setting
 * and returns it if one is fonud.  Else returns an empty string. 
 * 
 * @param {object} config Configuration being used by the project.
 * 
 * @returns {string} The value of the config object's publicPath property
 *                   if one was found.  Else returns an empty string. 
 */
function getPublicPath (config) {
  if (config.hasOwnProperty('devServer')) {
    if (config.devServer.hasOwnProperty('publicPath')) {
      return config.devServer.publicPath;
    }
  }

  return '';
}


/**
 * Imports the webpack.config.js being used by the project
 * and applies the properties defined in compiler-config.js.
 * 
 * @param {string} input Path to the entry file that Webpack should use.
 * @param {string} output Path to the file that Webpack should export.
 * @param {boolean} createSourceMap If Webpack should also create a map file for the result.
 * 
 * @returns A valid Webpack configuration object.
 */
module.exports = (input, output, createSourceMap) => {
  // Determine if we should use the default webpack config or one in the project root.
  let _wp_config_path = resolveWebpackConfig();
  Echo('Using webpack.config.js in ' + _wp_config_path);
  let _wp_config = require(_wp_config_path);
  
  // Webpack accepts key:value pairs as its entry.  Using this format establishes the key as
  // the "chunk" name, which Webpack can then use for outputs in various plugins, loaders, etc.
  let _chunkname = String(Path.basename(output)).replace(/\.[^/.]+$/, '');
  _wp_config.entry = {
    [_chunkname]: input
  };
  
  // Configure the output values.
  _wp_config.output = {
    path: Path.dirname(output),
    filename: Path.basename(output)
  }

  // Additional checks against the compiler-config file.
  let _publicPath = getPublicPath(Config); // SEE https://webpack.js.org/guides/public-path/
  if (_publicPath) _wp_config.output.publicPath = _publicPath;
  _wp_config.mode = Config.environment;
  _wp_config.devtool = createSourceMap ? 'source-map' : '';

  return _wp_config;
}