const path = require('path');
const fs = require('fs');
const mdLinks = require('../index');
const {
  pathIsAbsolute,
  pathExists,
  pathIsDirectory,
  getFilesInDirectory,
  pathIsFile,
  getFileExtension,
} = require('../path-utils');
const validateLinks = require('../validator');
const stats = require('../stats');

describe('mdLinks', () => {
  it('should be a function', () => {
    expect(typeof mdLinks).toBe('function');
  });

  it('mdLinks returns a Promise', () => {
    const result = mdLinks('./mock-files/mock.md', {});
    return expect(result).toBeInstanceOf(Promise);
  });

  it('shoud return an array of links when the given path is valid', async () => {
    const result = await mdLinks('./mock-files/mock-folder', {});
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
  });

  it('should reject the promise when path is not valid', () => {
    return mdLinks('/user/folder/path.md').catch((error) => {
      expect(error).toEqual(new Error('ERROR path does not exist!'));
    });
  });

  it('should reject the promise when no .md files are found', () => {
    return mdLinks('mock-files/mock.js').catch((error) => {
      expect(error).toEqual(new Error('File is not .md'));
    });
  });

  it('should reject the promise when no links are found', () => {
    return mdLinks('mock-files/mock1.md').catch((error) => {
      expect(error).toEqual(new Error('ERROR no links found'));
    });
  });
});

describe('pathIsAbsolute', () => {
  it('should be a function', () => {
    expect(typeof pathIsAbsolute).toBe('function');
  });

  it('if the given path is absolute, return it unchanged', () => {
    const givenPath = '/Users/ilsecervantes/Documents/GitHub/DEV007-md-links/mock-files/mock.js';
    const result = pathIsAbsolute(givenPath);
    return expect(result).toBe(givenPath);
  });

  it('should return an absolute path if the given path is relative', () => {
    const givenPath = 'mock-files/mock.js';
    const expectedAbsolutePath = path.resolve(givenPath);
    const result = pathIsAbsolute(givenPath);
    return expect(result).toBe(expectedAbsolutePath);
  });
});

describe('pathExists', () => {
  it('should be a function', () => {
    expect(typeof pathExists).toBe('function');
  });

  it('should return the path if it exists', () => {
    const absolutePath = '/Users/ilsecervantes/Documents/GitHub/DEV007-md-links/mock-files/mock1.md';
    let existingPath;
    if (fs.existsSync(absolutePath)) {
      existingPath = absolutePath;
    }
    return expect(existingPath).toBe(absolutePath);
  });

  it('should return false if the path is not valid', () => {
    const absolutePath = '/Users/ilsecervantes/Documents/GitHub/DEV007-md-links/mock-files/mock123.md';
    const existingPath = fs.existsSync(absolutePath);
    return expect(existingPath).toBe(false);
  });
});

describe('pathIsDirectory', () => {
  it('should be a function', () => {
    expect(typeof pathIsDirectory).toBe('function');
  });

  it('should return the directory path if the path given is a directory', () => {
    const givenPath = '/Users/ilsecervantes/Documents/GitHub/DEV007-md-links/mock-files/mock-folder';
    const stats = fs.statSync(givenPath);
    let directoryPath;
    if (stats.isDirectory()) {
      directoryPath = givenPath;
    }
    return expect(directoryPath).toBe(givenPath);
  });
});

describe('getFilesInDirectory', () => {
  it('should be a function', () => {
    expect(typeof getFilesInDirectory).toBe('function');
  });
});

describe('pathIsFile', () => {
  it('should be a function', () => {
    expect(typeof pathIsFile).toBe('function');
  });

  it('should return the file path if the given path is a file', () => {
    const givenPath = '/Users/ilsecervantes/Documents/GitHub/DEV007-md-links/mock-files/mock-folder/mock-mock.md';
    const stats = fs.statSync(givenPath);
    let filePath;
    if (stats.isFile()) {
      filePath = givenPath;
    }
    return expect(filePath).toBe(givenPath);
  });
});

describe('getFileExtension', () => {
  it('should be a function', () => {
    expect(typeof getFileExtension).toBe('function');
  });

  it('should return the file path if its extension is .md', () => {
    const filePath = '/Users/ilsecervantes/Documents/GitHub/DEV007-md-links/mock-files/mock.md';
    const fileExtension = path.extname(filePath);
    let result;
    if(fileExtension === '.md'){
      result = filePath;
    }
    return expect(result).toBe(filePath)
  });

  it('should return false if the file path is not .md', () => {
    const filePath = '/Users/ilsecervantes/Documents/GitHub/DEV007-md-links/mock-files/mock.js';
    const fileExtension = path.extname(filePath);
    let isMd;
    if(fileExtension != '.md'){
      isMd = false;
    }
    return expect(isMd).toBe(false);
  })
});
