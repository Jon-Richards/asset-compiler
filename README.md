# @jon-richards/asset-compiler v0.1.x
A preconfigured solution for bundling CSS and JavaScript.

### Calibrated for:
* TypeScript
* ES6
* React
* SCSS

---

## Table of Contents
* [Installation](#installation)
* [Configuration](#configuration)
* [Usage](#usage)

---

## Installation
```
$ npm install --save-dev @jon-richards/asset-compiler
```

## Configuration

### Compiler Config
The `compiler-config.js` file should be placed in the project root and should adhere to the following structure:
```javascript
module.exports = {
  environment: 'production', // or 'development' for faster builds
  js: [
    {
      input: '<path to entry JavaScript or TypeScript file>',
      output: '<path to the directory in which the resulting file is placed>',
      sourcemap: true
    },
    {...} // another input/output node
  ],
  css: [
    {
      input: '<path to entry CSS or SCSS file>',
      output: '<path to the directory in which resulting file is placed',
      sourcemap: true
    },
    {...} // another input/output node
  ]
}
```
> A sample `compiler-config.js` file can be found here:  
[https://raw.githubusercontent.com/Jon-Richards/asset-compiler/master/config_examples/compiler-config.js](https://raw.githubusercontent.com/Jon-Richards/asset-compiler/master/config_examples/compiler-config.js)

### Webpack

The asset-compiler ships with a Webpack installation set up to process JavaScript, TypeScript and React for both formats including the necessary loaders.  If you'd like to use your own Webpack configuration however, simply place your own `webpack.config.js` file in the project root and install any relevant dependancies at the project level.

> A sample `webpack.config.js` file can be found here:  
[https://raw.githubusercontent.com/Jon-Richards/asset-compiler/master/config_examples/webpack.config.js](https://raw.githubusercontent.com/Jon-Richards/asset-compiler/master/config_examples/webpack.config.js)

### TypeScript
Although the asset-compiler ships with the TypeScript compiler as a dependency, you still need to place a `tsconfig.json` file at your project root and install any third party types, e.g. [@types/react] at the project level.  This approach provides the following benefits:
1. The asset-compiler and your IDE will both evaluate TypeScript using the same `tsconfig.json` file, guaranteeing they follow the same rules.
2. Any type definitions relevant to the project can be packaged within.

> A sample `tsconfig.json` file can be found here:  
[https://raw.githubusercontent.com/Jon-Richards/asset-compiler/master/config_examples/tsconfig.json](https://raw.githubusercontent.com/Jon-Richards/asset-compiler/master/config_examples/tsconfig.json)

---

## Usage

```javascript
const Compiler = require('@jon-richards/asset-compiler');

Compiler.all(); // Builds all supported asset types.

Compiler.css(); // Builds CSS

Compiler.js(); // Builds JavasScript / TypeScript

Compiler.ts(); // Builds JavaScript / TypeScript (syntactic sugar)
```
### Package.json
> The package will add the command `$ asset-compiler` to the project.  If you install the package globally, the command will be added to your path.
```json
"scripts" : {
  "build"    : "asset-compiler",
  "build:js" : "asset-compiler --js",
  "build:css" : "asset-compiler --css"
}
```

### CLI

```
$ node ./node_modules/.bin/asset-compiler --<asset type> --watch=<path to watch>
```

### Options
`-c --css`  
Compile SCSS or SASS to CSS.

`-j -js`  
Compile JavaScript or TypeScript CommonJS.

`--watch=<directory name>`  
Watch the specified directory for changes and re-run the script if one is detected.  
```javascript
$ node ./node_modules/.bin/asset-compiler -c --watch='./dev/assets/css';
```

---

## Github

[https://github.com/Jon-Richards/asset-compiler](https://github.com/Jon-Richards/asset-compiler)
