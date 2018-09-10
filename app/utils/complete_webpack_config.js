#!/usr/bin/env node

/**
 * Finds the the webpack.config.js file being used by the project
 * and completes it with the settings from compiler-config.js
 */


 
const Path = require('path');
const Fs = require('fs');
const Echo = require('./echo.js');
const Config = require( Path.resolve( process.cwd(), 'compiler-config.js' ) );
const GeneratePlugins = require('./generate_webpack_plugins');



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
 * @param {object} configNode The JS node for which this build
 *                            is being run.
 * 
 * @returns A valid Webpack configuration object.
 */
module.exports = (configNode) => {
  let _input = configNode.input;
  let _output = configNode.output;
  let _createSourceMap = configNode.sourcemap;
  
  // Determine if we should use the default webpack config or one in the project root.
  let _wp_config_path = resolveWebpackConfig();
  Echo('Using webpack.config.js in ' + _wp_config_path);
  let _wp_config = require(_wp_config_path);
  
  // Webpack accepts key:value pairs as its entry.  Using this format establishes the key as
  // the "chunk" name, which Webpack can then use for outputs in various plugins, loaders, etc.
  let _chunkname = String(Path.basename(_output)).replace(/\.[^/.]+$/, '');
  _wp_config.entry = {
    [_chunkname]: _input
  };
  
  // Configure the output values.
  _wp_config.output = {
    path: Path.dirname(_output),
    filename: Path.basename(_output)
  }

  // Set public path (if one is defined.)
  // SEE https://webpack.js.org/guides/public-path/
  let _publicPath = getPublicPath(Config);
  if (_publicPath) _wp_config.output.publicPath = _publicPath;

  // Set the environment.
  _wp_config.mode = Config.environment;

  // Set source map options.
  _wp_config.devtool = _createSourceMap ? 'source-map' : '';

  // Instantiate relevant plugins for this build.
  _wp_config.plugins = GeneratePlugins(configNode);

  return _wp_config;
}