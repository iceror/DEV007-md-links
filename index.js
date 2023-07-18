#!/usr/bin/env node
// CommonJS Modules require/module.exports 
const fs = require('fs')
const path = require('path')
const chalk = require("chalk")

//console.log(process.argv);
const mdLinks = (givenPath, options) => {
  // mdLinks debe retornar una promesa
  return new Promise((resolve, reject) => {
    // Verify if path is absolute. if relative, make it absolute
    let absolutePath;
    if (path.isAbsolute(givenPath)) {
      absolutePath = givenPath;
      console.log(true, absolutePath)
    } else {
      absolutePath = path.resolve(givenPath);
      console.log(false, absolutePath)
    }

    // mdLinks should check if the path exists. if it doesn't exists, reject Promise
    let existingPath
    if (fs.existsSync(absolutePath)) {
      existingPath = absolutePath
      console.log(chalk.greenBright('Path exists!', absolutePath));
    } else {
      reject(chalk.red('ERROR path does not exist!', absolutePath));
    }

    // check if path is directory 
    let stats = fs.statSync(existingPath)
    if (stats.isDirectory()) {
      let directoryPath = existingPath
      console.log(chalk.bgGreenBright('Path is directory', directoryPath));
      // read files inside directory
      const filesInDirectory = fs.readdirSync(directoryPath)
      console.log(filesInDirectory);
      // if it finds more directories, read files 
      
    } else {
      existingPath
      console.log(chalk.bgRedBright('Path is not directory', existingPath));
    }

    let mdFilesArray = [];
    // get file extension
    if (path.extname(existingPath) === '.md') {
      mdFilesArray.push(absolutePath);
      console.log(chalk.greenBright('extension is .MD'));
    } else {
      console.log(chalk.redBright('File extension is not .MD'));
    }

    console.log(mdFilesArray);
    // resolve devolver un array con el archivo

  });
}

module.exports = mdLinks 