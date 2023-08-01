#!/usr/bin/env node 
const mdLinks  = require('./index.js')

// console.log(process.argv);
// conditional to check if options are passed 
const options = {};
for (let i = 2; i < process.argv.length; i++) {
  const arg = process.argv[i];
  if (arg === '--validate') {
    options.validate = true;
  } else if (arg === '--stats') {
    options.stats = true;
  }
}

mdLinks(process.argv[2], options).then(() => {

}).catch((error) => {
  console.log(error);
});
