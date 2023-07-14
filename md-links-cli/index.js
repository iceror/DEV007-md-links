#!/usr/bin/env node
const chalk = require("chalk")

console.log(chalk.magenta('init chalk'));
console.log(chalk.red('hello'));
// CommonJS Modules require/module.exports 
module.exports = () => {
  // ...
};
