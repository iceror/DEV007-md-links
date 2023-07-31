#!/usr/bin/env node 

const mdLinks  = require('./index.js')

console.log(process.argv);
// conditional to check if options are passed 
const options = {};
if(process.argv[3] === '--validate' || process.argv[4] === '--validate' ){
  options.validate = true;
} else {
  options.validate = false;
}

if(process.argv[3] === '--stats' || process.argv[4] === '--stats' ){
  options.stats = true;
} else {
  options.stats = false;
}
//make cli executable with md-links command not with node cli.js
mdLinks(process.argv[2], options).then(() => {

}).catch((error) => {
  console.log(error);
});
