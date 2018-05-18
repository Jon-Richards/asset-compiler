const Path = require('path');

module.exports = {
  environment: 'dev',
  js: [
    // {
    //   input: Path.resolve(__dirname, 'src', 'javascript', 'vanilla', 'app.js'),
    //   output: Path.resolve(__dirname, 'prod', 'assets', 'js', 'app.js'),
    //   sourcemap: true
    // }
    {
      input: Path.resolve(__dirname, 'src', 'javascript', 'typescript', 'app.tsx'),
      output: Path.resolve(__dirname, 'prod', 'assets', 'js', 'app-ts.js'),
      sourcemap: true
    }
  ],
  css: [
    {
      input: Path.resolve(__dirname, 'src', 'css', 'app.scss'),
      output: Path.resolve(__dirname, 'prod', 'assets', 'css', 'app.css'),
      sourcemap: true
    }
  ]
}