const mdLinks = require('../index');

describe('mdLinks', () => {
  it('should be a function', () => {
    expect(typeof mdLinks).toBe('function');
  });

  // it('should return a promise', () => {
  //   expect(mdLinks()).toBe(typeof Promise)
  // });

  it('should reject the promise when path is not valid', () => {
    return mdLinks('/user/folder/path.md').catch((error) => {
      expect(error).toEqual('ERROR path does not exist!');
    });
  });

  it('should reject the promise when no .md files are found', () => {
    return mdLinks('mock-files/mock.js').catch((error) => {
      expect(error).toEqual('File is not .md');
    });
  });

  it('should reject the promise when no links are found', () => {
    return mdLinks('mock-files/mock1.md').catch((error) => {
      expect(error).toEqual('ERROR no links found');
    });
  });
});
