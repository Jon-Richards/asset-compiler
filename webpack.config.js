const Pathfinder = require('./utils/pathfinder.js');
const BabelPreset_Env = require('babel-preset-env');
const BabelPreset_React = require('babel-preset-react');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    
  entry: '', // populated by ./compilers/js_compiler.js
  
  output: '', // populated by ./compilers/js_compiler.js
  
  devtool: '', // populated by ./compilers/js_compiler.js

  mode: 'none', // populated by ./compilers/js_compiler.js
  
  stats: 'verbose',

  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.css', '.scss', '.sass']
  },
  
  plugins: [
    new MiniCSSExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    })
  ], // end plugins

  module: {
    rules: [

      /**
       * Typescript Handling
       */
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: Pathfinder.process_to_localModule('ts-loader'),
            options: {}
          }
        ]
      },

      /**
       * JSX Handling
       */
      { 
        test: /\.jsx?/,
        use: [
          {
            loader: Pathfinder.process_to_localModule('babel-loader'),
            options: {
              presets: [
                BabelPreset_Env,
                BabelPreset_React
              ]
            }
          }
        ]
      },

      /**
       * CSS Handling
       */
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCSSExtractPlugin.loader,
            options: {}
          },
          {
            loader: Pathfinder.process_to_localModule('css-loader'),
            options: {
              modules: true,
              localIdentName:'[name]__[local]'
            } 
          },
          {
            loader: Pathfinder.process_to_localModule('sass-loader'),
            options: {}
          }
        ]
      }
    ]
  } // end module
} // end config