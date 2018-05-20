#!/usr/bin/env node

const Cmd = require('commander');
const Builder = require('./../index.js');

Cmd
  .option('--watch <directory>', 'Watch')
  .parse(process.argv);

Builder.build_js();