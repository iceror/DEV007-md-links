const fs = require('fs');

function readMdFiles(mdFilesArray) {
  const contentArray = [];
  mdFilesArray.forEach((mdFile) => {
    const content = fs.readFileSync(mdFile, { encoding: 'utf8', flag: 'r' });
    contentArray.push({ content, filePath: mdFile });
  });

  return contentArray;
}

function getLinks(contentArray) {
  const linkRegex = /\[([^\]]+)\](\S+)/g;
  const links = [];

  for (const { content, filePath } of contentArray) {
    let match;
    while ((match = linkRegex.exec(content)) !== null) {
      const linkText = match[1];
      const linkURL = match[2];

      links.push({ text: linkText.length >= 50 ? `${linkText.substring(0, 50)}...` : linkText, href: linkURL, file: filePath });
    }
  }

  return links;
}

module.exports = {
  readMdFiles,
  getLinks,
};
