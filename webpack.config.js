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
    extensions: [
      '.js', 
      '.jsx', 
      '.ts', 
      '.tsx', 
      '.css', 
      '.scss', 
      '.sass', 
      '.html', 
      '.hbs', 
      '.handlebars', 
      '.ejs',
      '.png',
      '.jpg',
      '.gif',
      '.svg',
      '.otf',
      '.ttf',
      '.woff'
    ]
  },

  plugins: [], // populated by ./compilers/js_compiler.js

  module: {
    rules: [

      /**
       * Typescript Handling
       */
      {
        test: /\.tsx$/,
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
        test: /\.jsx$/,
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
       * HTML Handling
       */
      {
        test: /\.html$/,
        use: [
          {
            loader: Pathfinder.process_to_localModule('html-loader'),
            options: {
              interpolate: true
            }
          }
        ]
      },
      {
        test: /\.(hbs|handlebars)$/,
        use: [
          {
            loader: Pathfinder.process_to_localModule('handlebars-loader'),
            options: {}
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
      },
      /**
       * Image Handling
       */
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: Pathfinder.process_to_localModule('file-loader'),
            options: {
              name: '../img/[name].[ext]?[hash]'
            }
          }
        ]
      },
      /**
       * Font Handling
       */
      {
        test: /\.(ttf|otf|woff)$/,
        use: [
          {
            loader: Pathfinder.process_to_localModule('file-loader'),
            options: {
              name: '../font/[name].[ext]?[hash]'
            }
          }
        ]
      }
    ]
  }, // end module

} // end config