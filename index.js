const { pathIsAbsolute,
  pathExists,
  pathIsDirectory,
  getFilesInDirectory,
  pathIsFile,
  getFileExtension } = require('./path-utils');
const { readMdFiles, getLinks } = require('./read-md');
const validateLinks = require('./validator');
const stats = require('./stats')
const chalk = require("chalk");

const mdLinks = (givenPath, options) => {
  // mdLinks debe retornar una promesa
  return new Promise((resolve, reject) => {
    // Verify if path is absolute. if relative, make it absolute
    let absolutePath = pathIsAbsolute(givenPath);
    console.log('Path is ansolute: ', chalk.underline(absolutePath));

    // mdLinks should check if the path exists. if it doesn't exists, reject Promise
    let existingPath = pathExists(absolutePath);

    if (!existingPath) {
      reject(chalk.bgRed('ERROR path does not exist!'))
    } else {
      console.log(chalk.bgGreen('Path exists!', chalk.underline(absolutePath)));
    }
    // check if path is directory 
    let directoryPath = pathIsDirectory(existingPath);
    // check if path is file
    let filePath = pathIsFile(existingPath);

    let mdFilesArray = [];
    let contentArray = [];
    if (filePath) {
      const mdFile = getFileExtension(filePath);
      if (mdFile === true) {
        mdFilesArray.push(mdFile);
        contentArray = readMdFiles(mdFilesArray);
      } else {
        reject(chalk.bgRedBright('File is not .md'))
      }
    } else if (directoryPath) {
      console.log(chalk.green('Path is directory:', directoryPath));
      mdFilesArray = getFilesInDirectory(directoryPath);
      contentArray = readMdFiles(mdFilesArray)
    }

    // resolve devolver un array con el archivo
    const links = getLinks(contentArray);

    if (options.validate === true) {
      validateLinks(links).then((result) => {
        console.log('All validations complete!', result);
      }).catch((error) => {
        console.log(error);
      });
    } else {
      console.log('Links:', links);
    }

    if (options.stats === true) {
      stats()
    }
  });
}

// truncar el texto a 50 caracteres 

module.exports = mdLinks 
