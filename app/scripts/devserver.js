#!/usr/bin/env node

const Path = require('path');
const Express = require('express');
const Webpack = require('webpack');
const WebpackDevMiddleware = require('webpack-dev-middleware');
const WebpackHotMiddleware = require('webpack-hot-middleware');
const Config = require( Path.resolve( process.cwd(), 'compiler-config.js' ) );
const CompleteWebpackConfig = require('./../utils/complete_webpack_config');
const Echo = require('./../utils/echo.js');
const Pathfinder = require('./../utils/pathfinder.js');



/**
 * Configures Webpack Hot Middleware.
 * 
 * @param {object} webpack A configured webpack instance.
 */
function configureHotMiddleware (webpack) {
  return WebpackHotMiddleware( webpack, {
    publicPath: Config.devServer.publicPath,
    path: '/__webpack_hmr',
    overlay: false
  });
}


/**
 * Configures Webpack Dev Middleware.
 * 
 * @param {object} webpack A configured webpack instance.
 */
function configureDevMiddleware (webpack) {
  let _middleware = WebpackDevMiddleware( webpack, {
    publicPath: Config.devServer.publicPath,
    writeToDisk: false,
    logTime: true,
    noInfo: true
  });

  // Clean up the console output when an HMR build occurs.
  _middleware.waitUntilValid( (stats) => {
    Echo( stats.toString( {
      timings: false,
      colors: true, 
      hash: false,
      version: false,
      modules: false,
      children: false
    } ) );
  } );

  return _middleware;
}


/**
 * Returns a webpack configuration object for hot module replacement.
 * 
 * @param {object} hmrSettings Hot module replacement settings from the compiler-config file.
 * 
 * @returns A complete webpack configuration object for hot module replacement.
 */
function configureWebpackForHMR (hmrSettings) {
  hmrSettings.input = [
    Pathfinder.process_to_localModule('webpack-hot-middleware') + '/client?path=/__webpack_hmr&timeout=20000',
    hmrSettings.input
  ]

  let _config = CompleteWebpackConfig(hmrSettings);
  
  return _config;
}


/** 
 * Configures the server based on the settings in compiler-config and
 * begins listening for requests.
 */
module.exports = () => {
  let _settings = Config.devServer;
  let _server = Express();

  // Add additional middleware if useHotModuleReplacement is true.
  if (_settings.useHotModuleReplacement) {
    let _webpack = Webpack( configureWebpackForHMR(_settings.hotModuleBuild) );
    _server.use( configureDevMiddleware( _webpack ) );
    _server.use( configureHotMiddleware( _webpack ) );
  }
  
  // Directory from which the server is publicly accessible.
  _server.use( Express.static( _settings.publicDir ) );

  // Add routes.
  for(var r = 0; r < _settings.routes.length; r++) {
    let _route = _settings.routes[r];
    _server.get(_route.uri, (req, res) => {
      res.sendFile(_route.file);
    });
  }

  // Listen for requests
  _server.listen(_settings.port, _settings.hostname, () => {
    Echo('Listening on port ' + _settings.port, 'yellow');
    Echo('WARNING: The dev server compiles its output to memory, not actual files. ' + 
         'If you wish to compile to files, please run a normal JavaScript build.', 
         'yellow');
    Echo('Visit http://' + _settings.hostname + ':' + _settings.port, 'green');
  });
}