const Path = require('path');
const Pathfinder = require('./utils/pathfinder.js');
const Config = require(Path.resolve(process.cwd(), 'compiler-config.js'));

module.exports = {
  mode: 'production',
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
        // loader: 'ts-loader' },
        // loader: Path.resolve(Path.relative(process.cwd(), Path.resolve(__dirname, 'node_modules', 'ts-loader') ) )
        loader: Pathfinder.process_to_localModule('ts-loader')
      },
      { 
        test: /\.jsx?/,
        use: {
          // loader: 'babel-loader',
          loader: Pathfinder.process_to_localModule('babel-loader'),
          options: {
            presets: [
              // 'env',
              Pathfinder.process_to_localModule('babel-preset-env'),
              // 'react'
              Pathfinder.process_to_localModule('babel-preset-react')
            ]
          }
        } 
      }
    ]
  },
  
}