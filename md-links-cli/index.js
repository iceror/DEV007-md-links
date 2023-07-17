#!/usr/bin/env node
// CommonJS Modules require/module.exports 

const fs = require('fs')
const chalk = require("chalk")
console.log(chalk.magenta('init chalk'));
console.log(chalk.red('hello'));

const mdLinks = (path, options) => {
  // mdLinks debe retornar una promesa
  return new Promise((resolve, reject) => {
    // mdLinks should check if the path exists. if it doesn't exists, reject Promise
    if (fs.existsSync(path)) {
      console.log('The path exists!');
    } else {
      reject('ERROR path is not valid');
    }
  });
}

module.exports = mdLinks 