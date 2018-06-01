const Path = require('path');
const Pathfinder = require('./utils/pathfinder.js');
const Config = require(Path.resolve(process.cwd(), 'compiler-config.js'));
const BabelPreset_Env = require('babel-preset-env');
const BabelPreset_React = require('babel-preset-react');

module.exports = {
  mode: Config.environment,
  stats: 'verbose',

  /*
   * Overwritten by the JS compiler.
   * SEE compiler-config.js
   */
  // devtool: 'source-map',
  // entry: './src/javascript/typescript/app.ts',
  // output: {
  //   path: Path.resolve(__dirname, 'prod', 'assets', 'js'),
  //   filename: 'app.js'
  // },
  
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  },
  
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: Pathfinder.process_to_localModule('ts-loader')
      },
      { 
        test: /\.jsx?/,
        use: {          loader: Pathfinder.process_to_localModule('babel-loader'),
          options: {
            presets: [
              BabelPreset_Env,
              BabelPreset_React
            ]
          }
        } 
      }
    ]
  },
  
}