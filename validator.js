const axios = require('axios');

const validateLinks = async (links) => {
  const promises = links.map(async (link) => {
    try {
      const response = await axios.get(link.href);
      return {
        ...link,
        status: response.status,
        ok: response.status >= 200 && response.status < 400 ? 'ok' : 'fail',
      };
    } catch (error) {
      return {
        ...link,
        status: error.response ? error.response.status : null,
        ok: 'fail',
      };
    }
  });

  const results = await Promise.all(promises);
  return results;
};

module.exports = validateLinks;
