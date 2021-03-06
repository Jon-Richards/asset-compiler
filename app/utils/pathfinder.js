#!/usr/bin/env node

/**
 * Utility methods for handling path related issues, e.g. creating directories
 * where none exist or resolving paths between modules.
 */

const Path = require('path');
const Mkdirp = require('mkdirp');
const Echo = require('./echo.js');

/**
 * Returns a relative path from the process's current working directory
 * to a module in this package's node_modules directory.
 * 
 * @param {string} module directory of the desired node module
 * 
 * @returns A relative path from the process's current working directory to the
 *          given module in asset-compiler's node_modules directory.
 */
function process_to_localModule (module) {
  return Path.resolve(Path.relative(process.cwd(), Path.resolve(__dirname, '..', '..', 'node_modules', module) ) )
}

/**
 * Creates a new directory at the specified path if none exists.
 * Basically just a wrapper for Mkdirp for the sake of consistency
 * among utilities.
 * 
 * @param {string} path Path to which to create the directory.
 * @param {function} callback Callback functuon
 * 
 * @return Callback function
 */
function make_if_none (path, callback) {
  Mkdirp(Path.dirname(path), function (err) {
    if (err) {
      Echo(err, 'red');
      return false;
    } else {
      callback(err);
    }
  });
}

module.exports = {
  process_to_localModule: process_to_localModule,
  make_if_none: make_if_none
}