'use strict';

module.exports = (NODE) => {
  const { execute_kw } = require('../utils.js');

  const identifiersOut = NODE.getOutputByName('identifiers');
  identifiersOut.on('trigger', async (conn, state) => {
    const identifiers = await execute_kw(NODE, state, 'search');
    return [].concat(...identifiers);
  });
};
