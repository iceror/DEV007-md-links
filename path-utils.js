const fs = require('fs');
const path = require('path');

function pathIsAbsolute(givenPath) {
  let absolutePath;
  if (path.isAbsolute(givenPath)) {
    absolutePath = givenPath;
  } else {
    absolutePath = path.resolve(givenPath);
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
  const stats = fs.statSync(existingPath);
  let directoryPath;
  if (stats.isDirectory()) {
    directoryPath = existingPath;
  }
  return directoryPath;
}

function getFilesInDirectory(directoryPath) {
  // read files inside directory
  const filesInDirectory = fs.readdirSync(directoryPath);

  // Find subdirectories
  let mdFilesArray = [];
  filesInDirectory.forEach((file) => {
    const filePath = `${directoryPath}/${file}`;
    if (pathIsFile(filePath)) {
      const extension = getFileExtension(filePath);
      if (extension) {
        mdFilesArray.push(filePath);
      }
    } else if (pathIsDirectory(filePath)) {
      const mdFilesInSubdirectory = getFilesInDirectory(filePath);
      mdFilesArray = mdFilesArray.concat(mdFilesInSubdirectory);
    }
  });
  return filesInDirectory, mdFilesArray;
}

function pathIsFile(existingPath) {
  const stats = fs.statSync(existingPath);
  let filePath;
  if (stats.isFile()) {
    filePath = existingPath;
  }
  return filePath;
}

function getFileExtension(filePath) {
  if (path.extname(filePath) === '.md') {
    return filePath;
  }
  return false;
}

module.exports = {
  pathIsAbsolute,
  pathExists,
  pathIsDirectory,
  getFilesInDirectory,
  pathIsFile,
  getFileExtension,
};
