#!/usr/bin/env node

const Webpack = require('webpack');
const CompleteWebpackConfig = require('./../utils/complete_webpack_config');

/**
 * Instantiates Webpack, applies the
 * config and runs a build.
 *
 * For callback configuration options, see: 
 * https://github.com/webpack/docs/wiki/node.js-api
 * 
 * @param configNode The JS node from the compiler-config file for which
 *                   this build is being run.
 */
function build_js(configNode) {

  let _wp_config = CompleteWebpackConfig(configNode);

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