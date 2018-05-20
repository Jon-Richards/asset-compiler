#!/usr/bin/env node

const Cmd = require('commander');
const Builder = require('./../index.js');

Cmd
  .option('-j, --js', 'Build Javascript')
  .option('-c, --css', 'Build CSS')
  .option('--watch <directory>', 'Watch')
  .parse(process.argv);

Builder.all();