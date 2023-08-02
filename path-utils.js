const fs = require('fs')
const path = require('path');

function pathIsAbsolute(givenPath) {
  let absolutePath;
  if (path.isAbsolute(givenPath)) {
    absolutePath = givenPath;
    // mandar chalk al cli para tests
    // console.log(chalk.underline.cyan('Absolute path', absolutePath));
  } else {
    absolutePath = path.resolve(givenPath);
    // console.log(chalk.underline.cyan('Relative path', absolutePath));
  }
  return absolutePath;
}

function pathExists(absolutePath) {
  let existingPath;
  if (fs.existsSync(absolutePath)) {
    existingPath = absolutePath;
  } else {
    return false;
  }
  return existingPath;
}

function pathIsDirectory(existingPath) {
  let stats = fs.statSync(existingPath);
  if (stats.isDirectory()) {
    let directoryPath = existingPath;
    return directoryPath;
  }
}

function getFilesInDirectory(directoryPath) {
  // read files inside directory
  const filesInDirectory = fs.readdirSync(directoryPath)

  // Find subdirectories
  let mdFilesArray = []
  filesInDirectory.forEach((file) => {
    const filePath = directoryPath + '/' + file;
    if (pathIsFile(filePath)) {
      const extension = getFileExtension(filePath);
      if (extension) {
        mdFilesArray.push(filePath);
      }
    } else if (pathIsDirectory(filePath)) {
      const mdFilesInSubdirectory = getFilesInDirectory(filePath);
      mdFilesArray = mdFilesArray.concat(mdFilesInSubdirectory);
    }
  })
  return filesInDirectory ,mdFilesArray;
}

function pathIsFile(existingPath) {
  let stats = fs.statSync(existingPath);
  if (stats.isFile()) {
    let filePath = existingPath;
    return filePath;
  }
}

function getFileExtension(filePath) {
  if (path.extname(filePath) === '.md') {
    return filePath;
  } else {
    return false;
  }
}

module.exports = {
  pathIsAbsolute,
  pathExists,
  pathIsDirectory,
  getFilesInDirectory,
  pathIsFile,
  getFileExtension
}