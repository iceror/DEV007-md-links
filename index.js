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
    let absolutePath = pathIsAbsolute(givenPath);

    // mdLinks should check if the path exists. if it doesn't exists, reject Promise
    let existingPath = pathExists(absolutePath);

    if (!existingPath) {
      reject(chalk.bgRed('ERROR path does not exist '))
    }
    // check if path is directory 
    let directoryPath = pathIsDirectory(existingPath);
    // check if path is file
    let filePath = pathIsFile(existingPath);

    let mdFilesArray;
    if (filePath) {
      mdFilesArray = getFileExtension(filePath);
      readMdFiles(mdFilesArray)
    } else if (directoryPath) {
      getFilesInDirectory(directoryPath);
    }



    console.log('INSIDE CLOG', directoryPath, filePath);

    // resolve devolver un array con el archivo

  });
}

function pathIsAbsolute(givenPath) {
  let absolutePath;
  if (path.isAbsolute(givenPath)) {
    absolutePath = givenPath;
    console.log('Absolute path', chalk.underline(absolutePath))
  } else {
    absolutePath = path.resolve(givenPath);
    console.log('Relative path', chalk.underline(absolutePath))
  }
  return absolutePath
}

function pathExists(absolutePath) {
  let existingPath;
  if (fs.existsSync(absolutePath)) {
    existingPath = absolutePath;
    console.log(chalk.bgGreen('Path exists!', chalk.underline(absolutePath)));
  } else {
    //console.log((chalk.bgRed('ERROR path does not exist!', chalk.strikethrough(absolutePath))));
    return false
  }
  return existingPath;
}

function pathIsDirectory(existingPath) {
  let stats = fs.statSync(existingPath);
  if (stats.isDirectory()) {
    let directoryPath = existingPath;
    console.log(chalk.green('Path is directory:', directoryPath));
    return directoryPath
  }
}

function getFilesInDirectory(directoryPath) {
  // read files inside directory
  const filesInDirectory = fs.readdirSync(directoryPath)
  console.log('Found this files in directory: ', filesInDirectory);

  // if it finds more directories, read files 
  filesInDirectory.map((file => {
    let fileExtension = getFileExtension(file);
    if(!fileExtension){
      // let notMdFile = pathIsFile(file)
      console.log('not md');
    }
    // getFilesInDirectory(file)
  })) 
  // iterate inside filesInDirectory and get .md files 
}

function pathIsFile(existingPath) {
  let stats = fs.statSync(existingPath);
  if (stats.isFile()) {
    let filePath = existingPath;
    console.log(chalk.redBright('Path is not directory:', filePath));
    //función para obtener extensión
    // getFileExtension(filePath);
    return filePath;
  }
}

function getFileExtension(filePath) {
  let mdFilesArray = [];
  if (path.extname(filePath) === '.md') {
    mdFilesArray.push(filePath);
    console.log(chalk.greenBright('File extension is .MD'));
    console.log(mdFilesArray);
    return mdFilesArray
  } else {
    console.log(chalk.redBright('File extension is not .MD', filePath));
  }
}

function readMdFiles(mdFilesArray) {
  mdFilesArray.forEach((mdFile) => {
    console.log(fs.readFileSync(mdFile, { encoding: 'utf8', flag: 'r' }))
  })
}


module.exports = mdLinks 