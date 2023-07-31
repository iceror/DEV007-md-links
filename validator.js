const axios = require('axios');

const validateLinks = async (links) => {
  const promises = links.map(async (link) => {
    try {
      const response = await axios.get(link.href);
      console.log({
        href: link.href,
        text: link.text,
        file: link.file,
        status: response.status,
        ok: response.status >= 200 && response.status < 400 ? 'ok' : 'fail'
      });
      return {
        ...link,
        status: response.status,
        ok: response.status >= 200 && response.status < 400 ? 'ok' : 'fail'
      };
    } catch (error) {
      console.log({
        href: link.href,
        text: link.text,
        file: link.file,
        status: error.response ? error.response.status : null,
        ok: 'fail'
      });
      return {
        ...link,
        status: error.response ? error.response.status : null,
        ok: 'fail'
      };
    }
  });

  const results = await Promise.all(promises);
  return results;
}

module.exports = validateLinks;