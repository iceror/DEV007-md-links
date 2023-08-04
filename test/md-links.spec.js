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
})

describe('pathExists', () => {
  it('should be a function', () => {
    expect(typeof pathExists).toBe('function');
  });
})

describe('pathIsDirectory', () => {
  it('should be a function', () => {
    expect(typeof pathIsDirectory).toBe('function');
  });
})

describe('getFilesInDirectory', () => {
  it('should be a function', () => {
    expect(typeof getFilesInDirectory).toBe('function');
  });
})

describe('pathIsFile', () => {
  it('should be a function', () => {
    expect(typeof pathIsFile).toBe('function');
  });
})

describe('getFileExtension', () => {
  it('should be a function', () => {
    expect(typeof getFileExtension).toBe('function');
  });
})
