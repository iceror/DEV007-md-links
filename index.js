const { pathIsAbsolute,
  pathExists,
  pathIsDirectory,
  getFilesInDirectory,
  pathIsFile,
  getFileExtension } = require('./path-utils');
const { readMdFiles, getLinks } = require('./read-md');
const validateLinks = require('./validator');
const { stats, brokenLinks } = require('./stats')
const chalk = require("chalk");

const mdLinks = (givenPath, options) => {
  // mdLinks should return a promise
  return new Promise((resolve, reject) => {
    // Verify if path is absolute. if relative, make it absolute
    let absolutePath = pathIsAbsolute(givenPath);
    console.log('Absolute path: ', chalk.underline(absolutePath));

    // mdLinks should check if the path exists. if it doesn't exists, reject Promise
    let existingPath = pathExists(absolutePath);

    if (!existingPath) {
      reject('ERROR path does not exist!')
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
      if (mdFile) {
        mdFilesArray.push(mdFile);
        contentArray = readMdFiles(mdFilesArray);
      } else {
        reject('File is not .md');
      }
    } else if (directoryPath) {
      console.log(chalk.green('Path is directory:', directoryPath));
      mdFilesArray = getFilesInDirectory(directoryPath);
      contentArray = readMdFiles(mdFilesArray);
    }

    const links = getLinks(contentArray);
    if (links.length === 0) {
      reject('ERROR no links found');
    }

    if (options.stats === true && options.validate === true) {
      resolve(validateLinks(links).then((result) => {
        stats(result);
        brokenLinks(result);
      }).catch((error) => {
        console.log(error);
      }));
    } else if (options.validate === true) {
      validateLinks(links).then((result) => {
        console.log('All validations complete!', result);
      }).catch((error) => {
        console.log(error);
      });
    } else if (options.stats === true) {
      validateLinks(links).then((result) => {
        stats(result);
      }).catch((error) => {
        console.log(error);
      });
    } else {
      console.log('Links: ', links);
    }
  });
}

module.exports = mdLinks 
