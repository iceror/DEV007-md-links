const mdLinks  = require('./index.js')

mdLinks('user/folder/fakepath.md').then(() => {

}).catch((error) => {
  console.log(error);
})