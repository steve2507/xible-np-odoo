'use strict';

module.exports = (NODE) => {
  const { execute_kw } = require('../utils.js');

  const countOut = NODE.getOutputByName('count');
  countOut.on('trigger', async (conn, state) => {
    const counts = await execute_kw(NODE, state, 'search_count');
    return counts.reduce((acc, val) => acc + val);
  });
};
