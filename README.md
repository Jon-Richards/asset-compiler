# @jon-richards/asset-compiler v0.1.x
Provides an easy install solution for bundling CSS and JavaScript.

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

---

## Usage

### Via Package.json
```json
"scripts" : {
  "build"    : "node ./node_modules/@jon-richards/asset-compiler",
  "build:js" : "node ./node_modules/@jon-richards/asset-compiler '--js'",
  "build:css" : "node ./node_modules/@jon-richards/asset-compiler '--css'"
}
```

### Options
`-c --css`  
Compile SCSS or SASS to CSS.

`-j -js`  
Compile JavaScript or TypeScript CommonJS.

`--watch=<directory name>`  
Watch the specified directory for changes and re-run the script if one is detected.

---
