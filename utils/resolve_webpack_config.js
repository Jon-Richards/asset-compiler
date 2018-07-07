#!/usr/bin/env node

const Fs = require('fs');
const Path = require('path');

/**
 * Checks the process's current working directory for a webpack.config file.
 * If one is found, returns its path.  If one is not found, return the path
 * to the webpack.config.js file that ships with asset-compiler.
 * 
 * @returns Path to a webpack.config.js file.
 */
module.exports = () => {
  let _config = 'undefined';
  
  if ( Fs.existsSync( Path.resolve( process.cwd(), 'webpack.config.js') ) ) {
    _config = Path.resolve( process.cwd(), 'webpack.config.js' );
  } else {
    _config = Path.resolve(__dirname, '..', 'webpack.config.js');
  }
  
  return _config;
}