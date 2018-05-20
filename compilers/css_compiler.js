#!/usr/bin/env node

const Path = require('path');
const Sass = require('node-sass');
const Fs = require('fs');
const Pathfinder = require('../utils/pathfinder.js');
const Echo = require('./../utils/echo.js');

/**
 * Starts a SASS build using dynamic input, output and
 * source map options.
 * 
 * @param {string} input Path to the .scss file to build.
 * @param {string} output Path for the resulting file.
 * @param {boolean} createSource True = create a source map by the same name as the file it represents.
 */
function render_css( input, output, createSource ) {
  // Render CSS
  let _result = Sass.renderSync({
    file: input,
    outputStyle: 'compressed',
    outFile: output,
    sourceMap: createSource
  });

  write_css(output, _result);
}
  
/**
 * Writes a given node-sass output object to a css file
 * as well as a map file.
 * 
 * @param {string} dest Where to write the css file.
 * @param {object} css The node-sass output object used for the css file and its map file.
 */
function write_css(dest, css) {
  Pathfinder.make_if_none(dest, () => {
    // Write the CSS file
    Fs.writeFile(dest, css.css, (err) => {
      err ? Echo(err + '\r\n', 'red')
          : Echo('CSS compiled to ' + dest, 'green');
    });
    
    // Write sourcemap
    if ( css.hasOwnProperty('map') ) {
      Fs.writeFile(dest + '.map', css.map, (err) => {
        err ? Echo(err + '\r\n', 'red')
            : Echo('CSS map compiled to ' + dest + '.map', 'green');
      });
    }
  });
}

module.exports = {
  build: render_css
}