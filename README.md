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
* [Further Reading](#further-reading)

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
      sourcemap: true,
      html: {
        // for a complete list of options,
        // see: https://github.com/jantimon/html-webpack-plugin
        filename: '<path relative to output directory / file_name.html'
      }
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

### Dev Server

The compiler ships with a simple [Express server](https://www.npmjs.com/package/express) for quickly testing your work, it also supports [hot module replacement](https://webpack.js.org/concepts/hot-module-replacement/).  **Not to be used as a production implementation.**  
Configuration is as follows:
```javascript
// in compiler-config.js
module.exports = {
  // [...] CSS amd JavaScript configurations

    devServer: {
      // The host name used by server when listening for requests.
      hostname: 'localhost',
      
      // The port on which the server should listen for requests.
      port: 3000,
      
      // The server's public directory, used as the base directory for the domain.
      publicDir: Path.resolve( __dirname, 'prod'),
      
      // The path at which compiled assets can be resolved relative to publicDir.
      // (Webpack's public path property: https://webpack.js.org/guides/public-path/)
      publicPath: '/assets/js/',
      
      // Array of uri's and the corresponding file to serve.  (Accepts wildcards.)
      routes: [
        {
          uri: '/',
          file: Path.resolve(__dirname, 'prod', 'index.html')
        }
      ],
      
      // Hot module replacement requires that a specific JavaScript input/output pair be specified.
      useHotModuleReplacement: true,
      hotModuleBuild: {
        input: Path.resolve(__dirname, 'src', 'javascript', 'typescript', 'app.tsx'),
        output: Path.resolve(__dirname, 'prod', 'assets', 'js', 'app.js'),
        sourcemap: true
      }
    }
  }
```

---

## Usage

```javascript
const Compiler = require('@jon-richards/asset-compiler');

Compiler.all(); // Builds all supported asset types

Compiler.css(); // Builds CSS

Compiler.js(); // Builds JavasScript or TypeScript

Compiler.ts(); // Builds JavaScript or TypeScript (syntactic sugar)

Compiler.devserver(); // Spin up the dev server.
```
### Package.json
> The package will add the command `$ asset-compiler` to the project.  If you install the package globally, the command will be added to your path.
```json
"scripts" : {
  "build"    : "asset-compiler",
  "build:js" : "asset-compiler --js",
  "build:css" : "asset-compiler --css",
  "devserver" : "asset-compiler --devserver"
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

`-d --devserver`  
Run the dev server.

---

## Documentation

### Internal Docs
[https://github.com/Jon-Richards/asset-compiler/tree/master/doc](https://github.com/Jon-Richards/asset-compiler/tree/master/doc)

### Github
[https://github.com/Jon-Richards/asset-compiler](https://github.com/Jon-Richards/asset-compiler)

---

## Further Reading

### Images and Fonts

The compiler supports the following image file extensions and will place them in a `img/` directory adjascent to the output path for JavaScript builds:
* '.jpg'
* '.png'
* '.gif'
* .'svg'

The following font formats are also supported.  These will be placed in a `font/` directory adjascent to the JavaScript output directory.:
* '.otf'
* '.ttf'
* '.woff'

> Note that .svg is only supported for images.  This is because not all browsers support .svg as a format for webfonts.  The supported font formats are supported across all modern browsers.

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

### Generating HTML

When running a JavaScript build, an optional `html` property can
be included in each build node.  The `html` property is an array of object literals representing settings for an html file that will automatically link to the resulting JavaScript and CSS output of the build node. See the example configuration below:

```javascript
js: [
  {
    input: Path.resolve(__dirname, 'src', 'javascript', 'typescript', 'app.tsx'),
    output: Path.resolve(__dirname, 'prod', 'assets', 'js', 'app.js'),
    sourcemap: true,
    html: [
      {
        filename: './../../index.html',
        template: Path.resolve(__dirname, 'src', 'html', 'index.hbs'),
        minify: { collapseWhitespace: true }
      },
      {...} // additional HTML files
    ]
  }
],
```

The example above will generate a file, `index.html` in the project's `/prod` directory.  The html file will be generated from a [handlebars](https://www.npmjs.com/package/handlebars-loader) template, `index.hbs`.  Other supported templating engines are [EJS](http://ejs.co/) and raw HTML, but [handlebars](https://handlebarsjs.com/) is the recommended method.

> NOTE: If the build sets Webpack's `publicpath` property, (as it does when the devserver's settings are active.) the generated HTML will link to assets relative to the public path.  This allows Hot Module Replacement to work with generated HTML.

> For more information, see the following documentation:  
> [WenPack-HTML-Plugin](https://github.com/jantimon/html-webpack-plugin)  
> [Handlbars-Loader](https://www.npmjs.com/package/handlebars-loader)  
> [Handlebars Templating Engine](https://handlebarsjs.com/)