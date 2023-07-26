#!/usr/bin/env node 

const mdLinks  = require('./index.js')

console.log(process.argv);
// conditional to check if options are passed 
//make cli executable with md-links command not with node cli.js
mdLinks(process.argv[2]).then(() => {

}).catch((error) => {
  console.log(error);
});
