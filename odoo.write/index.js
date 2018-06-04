'use strict';

module.exports = (NODE) => {
  const { execute_kw } = require('../utils.js');

  const identifiersIn = NODE.getInputByName('identifiers');
  const objectsIn = NODE.getInputByName('objects');

  const doneOut = NODE.getOutputByName('done');

  const triggerIn = NODE.getInputByName('trigger');
  triggerIn.on('trigger', async (conn, state) => {
    const objs = await objectsIn.getValues(state);
    const identifiers = await identifiersIn.getValues(state);
    for (const obj of objs) {
      identifiers.push(await execute_kw(NODE, state, 'write', identifiers, obj));
    }

    doneOut.trigger(state);
  });
};
