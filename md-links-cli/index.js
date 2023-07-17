#!/usr/bin/env node
// CommonJS Modules require/module.exports 
const fs = require('fs')
const path = require('path')
const chalk = require("chalk")

//console.log(process.argv);
const mdLinks = (givenPath, options) => {
  // mdLinks debe retornar una promesa
  return new Promise((resolve, reject) => {
    // Verify if path is absolute, if relative, make it absolute
    let absolutePath;
    if (path.isAbsolute(givenPath)) {
      absolutePath = givenPath;
      console.log(true, absolutePath)
    } else {
      absolutePath = path.resolve(givenPath);
      console.log(false, absolutePath)
    }

    let mdFilesArray = [];
    // get file extension
    if (path.extname(absolutePath) === '.md') {
      mdFilesArray.push(absolutePath);
      console.log(chalk.greenBright('extension is .MD'));
    } else { 
      console.log(chalk.redBright('File extension is not .MD'));
    }

    console.log(mdFilesArray);

    // mdLinks should check if the path exists. if it doesn't exists, reject Promise
    /* if (fs.existsSync(absolutePath)) {
      console.log(chalk.greenBright('Path exists!!!', absolutePath));
    } else {
      console.log(chalk.red('ERROR path is not valid', absolutePath));
    } */

    // resolve devolver un array con el archivo

  });
}

module.exports = mdLinks 