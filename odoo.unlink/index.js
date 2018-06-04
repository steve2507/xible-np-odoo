'use strict';

module.exports = (NODE) => {
  const { execute_kw } = require('../utils.js');

  const identifiersIn = NODE.getInputByName('identifiers');

  const doneOut = NODE.getOutputByName('done');

  const triggerIn = NODE.getInputByName('trigger');
  triggerIn.on('trigger', async (conn, state) => {
    await execute_kw(NODE, state, 'unlink', await identifiersIn.getValues(state));

    doneOut.trigger(state);
  });
};
