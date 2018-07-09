#!/usr/bin/env node

const Cmd = require('commander');
const Builder = require('./../index.js');

Cmd
  .option('-j, --js', 'Build Javascript')
  .option('-c, --css', 'Build CSS')
  .option('-d, --devserver', 'Run the dev server')
  .option('--watch <directory>', 'Watch')
  .parse(process.argv);

let opts = [];
if (Cmd.js) opts.push('js');
if (Cmd.css) opts.push('css');
if (Cmd.devserver) opts.push('devserver');

if (opts.length > 0) {
  for (var i = 0; i < opts.length; i++) {
    Builder[opts[i]]();
  }
} else {
  Builder.all();
}