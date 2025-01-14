#!/usr/bin/env node
const chalk = require('chalk');
const mdLinks = require('./index');
const { stats, brokenLinks } = require('./stats');
const validateLinks = require('./validator');

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

const givenPath = process.argv[2]
mdLinks(givenPath, options).then((links) => {

  if (options.stats === true && options.validate === true) {
    validateLinks(links).then((result) => {
      const statsResult = stats(result);
      const brokenResult = brokenLinks(result);
      console.log('Statistics after validating links found in', chalk.underline.italic.whiteBright(givenPath), ':')
      console.log('Total: ', statsResult.total);
      console.log('Unique: ', statsResult.unique);
      console.log('Broken: ', brokenResult);
    }).catch((error) => {
      console.log(error);
    });
  } else if (options.validate === true) {
    validateLinks(links).then((result) => {
      console.log('All validations from', chalk.underline.italic.whiteBright(givenPath),'complete!', result);
    }).catch((error) => {
      console.log(error);
    });
  } else if (options.stats === true) {
    validateLinks(links).then((result) => {
      const statsResult = stats(result);
      console.log('Statistics after validating links found in', chalk.underline.italic.whiteBright(givenPath), ':')
      console.log('Total: ', statsResult.total);
      console.log('Unique: ', statsResult.unique);
    }).catch((error) => {
      console.log(error);
    });
  } else {
    console.log('Links found in' , chalk.underline.italic.whiteBright(givenPath), ': ', links);
  }
}).catch((error) => {
  console.log(chalk.bgRed(error));
});
