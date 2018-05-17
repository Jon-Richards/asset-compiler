#!/usr/bin/env node

/**
 * Utility methods for resolving paths between packages.
 */

const Path = require('path');

/**
 * Returns a relative path from the process's current working directory
 * to a module in this package's node_modules directory.
 * 
 * @param {string} module directory of the desired node module
 */
function process_to_localModule (module) {
  return Path.resolve(Path.relative(process.cwd(), Path.resolve(__dirname, '..', 'node_modules', module) ) )
}

module.exports = {
  process_to_localModule: process_to_localModule
}