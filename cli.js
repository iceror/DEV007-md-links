const mdLinks  = require('./index.js')

// mdLinks('md-links-cli/index.js').then(() => {

// }).catch((error) => {
//   console.log(error);
// })

mdLinks('./mock-files/mock-folder').then(() => {

}).catch((error) => {
  console.log(error);
});

// mdLinks('mock-files/mock.md').then(() => {

// }).catch((error) => {
//   console.log(error);
// });

// mdLinks('mock-files/mock.json').then(() => {

// }).catch((error) => {
//   console.log(error);
// });

// mdLinks('/Users/ilsecervantes/Documents/GitHub/DEV007-md-links/mock-files/another-mock.md').then(() => {

// }).catch((error) => {
//   console.log(error);
// });