function stats(result) {
  // get Total and Unique links
  const links = [];
  result.forEach((link) => {
    links.push(link.href);
  });

  const uniqueLinks = [];
  const repeatedLinks = [];
  for (let i = 0; i < links.length; i++) {
    const link = links[i];
    const nextLink = links[i + 1];
    if (link === nextLink) {
      repeatedLinks.push(link);
    } else {
      uniqueLinks.push(link);
    }
  }

  console.log('Total: ', result.length);
  console.log('Unique: ', uniqueLinks.length);
}

function brokenLinks(result) {
  const links = [];
  result.forEach((link) => {
    links.push(link.ok);
  });

  const broken = [];
  for (let i = 0; i < links.length; i++) {
    const link = links[i];
    if (link === 'fail') {
      broken.push(link);
    }
  }
  console.log('Broken: ', broken.length);
}

module.exports = { stats, brokenLinks };
