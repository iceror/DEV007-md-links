const fs = require('fs')
const path = require('path');

function pathIsAbsolute(givenPath) {
  let absolutePath;
  if (path.isAbsolute(givenPath)) {
    absolutePath = givenPath;
    // mandar chalk al cli para tests
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

  // Find subdirectories
  let mdFilesArray = []
  filesInDirectory.forEach((file) => {
    const filePath = directoryPath + '/' + file;
    // const notMdFilesArray = []
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
  // console.log('outside if', mdFilesArray);
  return mdFilesArray;
}

function pathIsFile(existingPath) {
  let stats = fs.statSync(existingPath);
  if (stats.isFile()) {
    let filePath = existingPath;
    // console.log(chalk.redBright('Path is not directory:', filePath));
    //función para obtener extensión
    // getFileExtension(filePath);
    return filePath;
  }
}

function getFileExtension(filePath) {
  if (path.extname(filePath) === '.md') {
    console.log(chalk.greenBright('File extension is .MD', filePath));
    return filePath;
  } else {
    console.log(chalk.redBright('File extension is not .MD', filePath));
    return false;
  }
}