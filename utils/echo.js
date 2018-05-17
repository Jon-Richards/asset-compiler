#!/usr/bin/env node

const Colors = require('colors');

/**
 * Prints a formatted message to the console.
 * 
 * @param {string} message Message to log to the console.
 * @param {string} color Color in which to display the message.
 */
function echo(message, color) {
  let _c = color === undefined ? 'white' : color;
  let _d = new Date();
  console.log( _d.toLocaleTimeString() + ' - ' + Colors[_c](message) );
}

module.exports = echo;