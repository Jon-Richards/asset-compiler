#!/usr/bin/env node

const Path = require('path');
const Express = require('express');
const Webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const Config = require( Path.resolve( process.cwd(), 'compiler-config.js' ) );
const CompleteWebpackConfig = require('./utils/complete_webpack_config');
const Echo = require('./utils/echo.js');

module.exports = () => {
  let _settings = Config.devServer;
  if (_settings.useHotModuleReplacement == true) {
    let _wp_config = CompleteWebpackConfig(_settings.entry, _settings.output, _settings.sourcemap);
    let _webpack = Webpack(_wp_config);
  }
  
  let _server = Express();

  _server.get('/', (req, res) => {
    res.send('howdy!');
  });

  _server.listen(_settings.port, _settings.hostname, () => {
    Echo('Listening on port ' + _settings.port, 'yellow');
    Echo('Visit http://' + _settings.hostname + ':' + _settings.port, 'green');
  });
}