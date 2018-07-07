# @jon-richards/asset-compiler v1.0.x
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
* [Documentation](#documentation)
* [Further-Reading](#further-reading)

---

## Installation
```
$ npm install --save-dev @jon-richards/asset-compiler
```

## Configuration

### Directory Structure
```
project root
    |
    |- package.json
    |
    |- compiler-config.js
    |
    |- tsconfig.json (if using TypeScript)
    |
    |- webpack.config.js (optional)
```

### Compiler Config

The `compiler-config.js` file should live in your project's root directory.  It tells the asset-compiler which files to use as entry points, where the resulting compilation should be placed, and handles other miscellaneous settings. The `compiler-config.js` file should adhere to the following structure:
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
[https://raw.githubusercontent.com/Jon-Richards/asset-compiler/master/doc/config_examples/compiler-config.js](https://raw.githubusercontent.com/Jon-Richards/asset-compiler/master/doc/config_examples/compiler-config.js)

### Webpack

The asset-compiler ships with a Webpack installation set up to process JavaScript, TypeScript and React for both formats including the necessary loaders.  If you'd like to use your own Webpack configuration however, simply place your own `webpack.config.js` file in the project root and install any relevant loaders, plugins, etc at the project level.

> Official Webpack documetation:  
[https://webpack.js.org/concepts/](https://webpack.js.org/concepts/)

> A sample `webpack.config.js` file can be found here:  
[https://raw.githubusercontent.com/Jon-Richards/asset-compiler/master/doc/config_examples/webpack.config.js](https://raw.githubusercontent.com/Jon-Richards/asset-compiler/master/doc/config_examples/webpack.config.js)

### TypeScript
Although the asset-compiler ships with the TypeScript compiler as a dependency, you still need to place a `tsconfig.json` file at your project root and install any third party types, e.g. [@types/react](https://www.npmjs.com/package/@types/react) at the project level.  This approach provides the following benefits:
1. The asset-compiler and your IDE will both evaluate TypeScript using the same `tsconfig.json` file, guaranteeing they follow the same rules.
2. Any type definitions relevant to the project can be packaged within.

> Official TypeScript documentation:  
[https://www.typescriptlang.org/docs/home.html](https://www.typescriptlang.org/docs/home.html)

> A sample `tsconfig.json` file can be found here:  
[https://raw.githubusercontent.com/Jon-Richards/asset-compiler/master/doc/config_examples/tsconfig.json](https://raw.githubusercontent.com/Jon-Richards/asset-compiler/master/doc/config_examples/tsconfig.json)

---

## Usage

```javascript
const Compiler = require('@jon-richards/asset-compiler');

Compiler.all(); // Builds all supported asset types

Compiler.css(); // Builds CSS

Compiler.js(); // Builds JavasScript or TypeScript

Compiler.ts(); // Builds JavaScript or TypeScript (syntactic sugar)
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
$ ./node_modules/.bin/asset-compiler --<asset type> --watch=<path to watch>
```

### Options
`-c --css`  
Compile SCSS or SASS to CSS.

`-j -js`  
Compile JavaScript or TypeScript CommonJS.

`--watch=<directory name>`  
Watch the specified directory for changes and re-run the script if one is detected.  
```javascript
$ ./node_modules/.bin/asset-compiler -c --watch='./dev/assets/css';
```

---

## Documentation

### Internal Docs
[https://github.com/Jon-Richards/asset-compiler/tree/master/doc](https://github.com/Jon-Richards/asset-compiler/tree/master/doc)

### Github
[https://github.com/Jon-Richards/asset-compiler](https://github.com/Jon-Richards/asset-compiler)

---

## Further-Reading

### CSS Modules

> This is an **optional** feature.  The asset compiler ships with an independant solution for compiling SCSS.  If you'd like to import your CSS via your JS however, read on...

The Webpack installation ships with support for CSS modules, which in turn support SASS as well.  CSS files will be written based on the output file that references them.  

So if `app.js` imports a few css modules, `app.css` will be exported as a sibling of `app.js` and will contain the combined output of all css modules that were included.

#### Naming Conventions
By default, class names follow `[.scss file name]__[class name] [etc.]` format.  
So a .scss file named `"styles.scss"` with the following:
```scss
// SCSS
.button--red {
  background-color: #f00000;
  &:hover {
    background-color: #ff0000;
  }
}
```

Will render as:
```scss
.styles__button--red {
  background-color: #f00000;
}
.styles__button--red:hover {
  background-color: #ff0000;
}
```

This approach allows the following advantages:
1. Rendered style names are predictable, which comes in handy when writing advanced selectors, dynamic classes with SASS, or complex display logic for stateful components.
2. Webpack effectively does the namespacing for you.  CSS classes within each file can be named concisely, e.g. ".button".
3. You can still leverage the cascade if you choose to.
4. Only the SCSS modules that you import will be included in the rendered CSS file, resulting in lighter files.
