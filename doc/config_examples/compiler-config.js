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
    // {
    //   input: Path.resolve(__dirname, 'src', 'javascript', 'vanilla', 'app.js'),
    //   output: Path.resolve(__dirname, 'prod', 'assets', 'js', 'app.js'),
    //   sourcemap: true
    // }
    {
      input: Path.resolve(__dirname, 'src', 'javascript', 'typescript', 'app.tsx'),
      output: Path.resolve(__dirname, 'prod', 'assets', 'js', 'app.js'),
      sourcemap: true
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
    hostname: 'localhost',
    
    /** The port on which the server should listen for requests. */
    port: 3000,
    
    /** The server's public directory, used as the base directory for the domain. */
    publicDir: Path.resolve( __dirname, 'prod'),
    
    /**
     * The path at which compiled assets can be resolved relative to publicDir.
     * (Webpack's public path property: https://webpack.js.org/guides/public-path/)
     */
    publicPath: '/assets/js/',
    
    /** Array of uri's and the corresponding file to serve.  (Accepts wildcards.) */
    routes: [
      {
        uri: '/',
        file: Path.resolve(__dirname, 'prod', 'index.html')
      }
    ],
    
    /**
     * Hot module replacement requires that a specific JavaScript input/output pair be specified.
     */
    useHotModuleReplacement: true,
    hotModuleBuild: {
      input: Path.resolve(__dirname, 'src', 'javascript', 'typescript', 'app.tsx'),
      output: Path.resolve(__dirname, 'prod', 'assets', 'js', 'app.js'),
      sourcemap: true
    }
  }
}