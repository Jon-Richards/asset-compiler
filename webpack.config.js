const Path = require('path');
const Pathfinder = require('./app/utils/pathfinder.js');
const Cmd = require('commander');
const Webpack = require('webpack');
const BabelPreset_Env = require('babel-preset-env');
const BabelPreset_React = require('babel-preset-react');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const Config = require(Path.resolve(process.cwd(), 'compiler-config.js'));

module.exports = {    
  entry: '', // populated by ./compilers/js_compiler.js

  output: '', // populated by ./compilers/js_compiler.js

  mode: 'none', // populated by ./compilers/js_compiler.js
  
  devtool: '', // populated by ./compilers/js_compiler.js

  stats: 'verbose',

  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.css', '.scss', '.sass']
  },
  
  plugins: [
    new MiniCSSExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    }),
    new Webpack.HotModuleReplacementPlugin()
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
          // At the time of this writing, MiniCSSExtractPlugin doesn't
          // support hot module replacement.  If the compiler-config uses
          // HMR, use style-loader instead.
          //
          // Cmd.devserver is inherited from index.js
          {
            loader: Cmd.devserver && Config.devServer.useHotModuleReplacement ? Pathfinder.process_to_localModule('style-loader')
                                                                              : MiniCSSExtractPlugin.loader,
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
  }, // end module

} // end config