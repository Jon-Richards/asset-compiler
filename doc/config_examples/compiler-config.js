const Path = require('path');

module.exports = {
  /**
   * Tells Webpack which environment to compile as:
   * 'development' or 'production' (minified code).
   */
  environment: 'development',
  
  /**
   * JS compilation is done via Webpack.  You can include CSS as modules in
   * your JS and Webpack will output a CSS file with the same name as the input
   * file that imports it.
   */
  js: [
    {
      input: Path.resolve(__dirname, 'src', 'javascript', 'typescript', 'app.tsx'),
      output: Path.resolve(__dirname, 'prod', 'assets', 'js', 'app.js'),
      sourcemap: true,
      /**
       * (Optional) Renders an html file in the output directory that links to the
       * generated JavaScript.  To change html output path, prepend the desired
       * path relative to the "output" property above. (Links will be auto-corrected.)
       * 
       * NOTE: If the build sets webpack's publicpath property (as it does when
       * using the devserver) assets linked in the html file will be relative
       * to the public path, NOT the directory in which the html file is placed.
       * 
       * Supported templating engines:
       *  *  Handlebars (recommended): https://www.npmjs.com/package/handlebars-loader
       *  *  EJS: https://github.com/jantimon/html-webpack-plugin
       *  *  Raw HTML
       */
      html: [
         { // See https://github.com/jantimon/html-webpack-plugin for a complete options list.
          filename: './../../index.html',
          // minify: { collapseWhitespace: true },
          template: Path.resolve(__dirname, 'src', 'html', 'index.hbs')
        }
      ]
    }
  ],
  
  /**
   * Built via a standalone CSS compiler (very fast, but has no direct interaction with Javascript).
   */
  css: [
    {
      input: Path.resolve(__dirname, 'src', 'css', 'app.scss'),
      output: Path.resolve(__dirname, 'prod', 'assets', 'css', 'app.css'),
      sourcemap: true
    }
  ],

   /**
   * Settings for the local dev server.
   */
  devServer: {
    /** The host name used by server when listening for requests. */
    hostname: 'localhost', // under development - use 'localhost' for now.
    /** The port on which the server should listen for requests. */
    port: 3000,
    /**
     * Webpack's public path property.  Essentially the path at which
     * compiled assets can be resolved, relative to root domain.
     */
    publicPath: '/assets/js/',
    /** The server's public directory, used as the base directory for the domain. */
    publicDir: Path.resolve( __dirname, 'prod'),
    /** Array of uri's and the corresponding file to serve.  (Accepts wildcards.) */
    routes: [
      {
        uri: '/*',
        file: Path.resolve(__dirname, 'prod', 'index.html')
      }
    ],
    /** Hot module replacement requires that a specific JavaScript input/output pair be specified. */
    useHotModuleReplacement: true,
    hotModuleBuild: {
      input: Path.resolve(__dirname, 'src', 'javascript', 'typescript', 'app.tsx'),
      output: Path.resolve(__dirname, 'prod', 'assets', 'js', 'app.js'),
      sourcemap: true
    }
  }
}