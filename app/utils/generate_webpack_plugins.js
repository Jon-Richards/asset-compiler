#!/usr/bin/env node

/**
 * Conditionally generates plugins for the Webpack
 * configuration based on the settings in the compiler-config
 * file.
 */



const Webpack = require('webpack');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');



/**
 * Instantiates Webpack plugins based on settings from the compiler-config.
 * 
 * @param {object} configNode The input node from compiler-config for which the current
 *                           build is being run.
 */
function generateConfig (configNode) {
  let _plugins = [];

  // CSS
  _plugins.push( new MiniCSSExtractPlugin() );

  // HTML
  if ( configNode.hasOwnProperty('html') ) {
    for (var i = 0; i < configNode.html.length; i++ ) {
      _plugins.push( new HtmlWebpackPlugin(configNode.html[i]) );
    }
  }

  // HMR
  _plugins.push( new Webpack.HotModuleReplacementPlugin() );

  return _plugins;
}


module.exports = generateConfig;