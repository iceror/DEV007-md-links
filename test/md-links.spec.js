const mdLinks = require('../index.js');

describe('mdLinks', () => {

  it('should be a function', () => {
    expect(typeof mdLinks).toBe('function')
  });

  // it('should return a promise', () => {
  //   expect(mdLinks()).toBe(typeof Promise)
  // });

  it('should reject the promise when path is not valid', () => {
    console.log(mdLinks);
    return mdLinks('/user/folder/path.md').catch((error) =>{
      expect(error).toBe('ERROR path is not valid')
    })
  })

});
