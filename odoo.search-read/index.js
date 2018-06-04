'use strict';

module.exports = (NODE) => {
  const { execute_kw } = require('../utils.js');

  const resultOut = NODE.getOutputByName('result');
  resultOut.on('trigger', async (conn, state) =>
    execute_kw(NODE, state, 'search_read')
  );
};
