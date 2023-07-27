// CommonJS Modules require/module.exports 
const fs = require('fs');
const path = require('path');
const chalk = require("chalk");
const axios = require('axios');

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

    let mdFilesArray = [];
    let contentArray = [];
    if (filePath) {
      mdFilesArray.push(getFileExtension(filePath));
      contentArray = readMdFiles(mdFilesArray);
    } else if (directoryPath) {
      mdFilesArray = getFilesInDirectory(directoryPath);
      contentArray = readMdFiles(mdFilesArray)
    }

    // resolve devolver un array con el archivo
    const links = getLinks(contentArray);
    validateLinks(links).then((result) => {
      console.log('All validations complete', result);
    }).catch((error) => {
      console.log(error);
    });
  });
}

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

function readMdFiles(mdFilesArray) {
  let contentArray = [];
  mdFilesArray.forEach((mdFile) => {
    let content = fs.readFileSync(mdFile, { encoding: 'utf8', flag: 'r' });
    contentArray.push({ content, filePath: mdFile });
  })
  console.log(contentArray);
  return contentArray;
}

function getLinks(contentArray) {
  const linkRegex = /\[([^\]]+)\](\S+)/g; // Modified regex for link without parentheses
  const links = [];

  for (const { content, filePath } of contentArray) {
    let match;
    while ((match = linkRegex.exec(content)) !== null) {
      const linkText = match[1];
      const linkURL = match[2];
      links.push({ text: linkText, href: linkURL, file: filePath });
    }
  }

  console.log('Links:', links);
  return links;
}

const validateLinks = async (links) => {
  const promises = links.map(async (link) => {
    try {
      const response = await axios.get(link.href);
      console.log({
        href: link.href,
        text: link.text,
        file: link.file,
        status: response.status,
        ok: response.status >= 200 && response.status < 400 ? 'ok' : 'fail'
      });
      return {
        ...link,
        status: response.status,
        ok: response.status >= 200 && response.status < 400 ? 'ok' : 'fail'
      };
    } catch (error) {
      console.log({
        href: link.href,
        text: link.text,
        file: link.file,
        status: error.response ? error.response.status : null,
        ok: 'fail'
      });
      return {
        ...link,
        status: error.response ? error.response.status : null,
        ok: 'fail'
      };
    }
  });

  const results = await Promise.all(promises);
  return results;
}

// truncar el texto a 50 caracteres 

module.exports = mdLinks 
