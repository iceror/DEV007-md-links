const {
  pathIsAbsolute,
  pathExists,
  pathIsDirectory,
  getFilesInDirectory,
  pathIsFile,
  getFileExtension,
} = require('./path-utils');
const { readMdFiles, getLinks } = require('./read-md');

const mdLinks = (givenPath, options) => {
  // mdLinks should return a promise
  return new Promise((resolve, reject) => {
    // Verify if path is absolute. if relative, make it absolute
    const absolutePath = pathIsAbsolute(givenPath);
    // console.log('Absolute path: ', chalk.underline(absolutePath));

    // mdLinks should check if the path exists. if it doesn't exists, reject Promise
    const existingPath = pathExists(absolutePath);

    if (!existingPath) {
      reject(new Error('ERROR path does not exist!'));
      return;
    }
    // console.log(chalk.bgGreen('Path exists!', chalk.underline(absolutePath)));
    // check if path is directory
    const directoryPath = pathIsDirectory(existingPath);
    // check if path is file
    const filePath = pathIsFile(existingPath);

    let mdFilesArray = [];
    let contentArray = [];
    if (filePath) {
      const mdFile = getFileExtension(filePath);
      if (mdFile) {
        mdFilesArray.push(mdFile);
        contentArray = readMdFiles(mdFilesArray);
      } else {
        reject(new Error('File is not .md'));
        return;
      }
    } else if (directoryPath) {
      // console.log(chalk.green('Path is directory:', directoryPath));
      mdFilesArray = getFilesInDirectory(directoryPath);
      contentArray = readMdFiles(mdFilesArray);
    }

    const links = getLinks(contentArray);
    if (links.length === 0) {
      reject(new Error('ERROR no links found'));
      return;
    }

    const result = Promise.resolve(links);
    resolve(result)
  });
};

module.exports = mdLinks;
