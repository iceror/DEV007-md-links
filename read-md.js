const fs = require('fs');

function readMdFiles(mdFilesArray) {
  let contentArray = [];
  mdFilesArray.forEach((mdFile) => {
    let content = fs.readFileSync(mdFile, { encoding: 'utf8', flag: 'r' });
    contentArray.push({ content, filePath: mdFile });
  })
  console.log(contentArray);
  return contentArray;
}

function getLinks(contentArray) {
  const linkRegex = /\[([^\]]+)\](\S+)/g; // Modified regex for link without parentheses
  const links = [];

  for (const { content, filePath } of contentArray) {
    let match;
    while ((match = linkRegex.exec(content)) !== null) {
      const linkText = match[1];
      const linkURL = match[2];
      links.push({ text: linkText, href: linkURL, file: filePath });
    }
  }

  console.log('Links:', links);
  return links;
}