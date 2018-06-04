'use strict';

module.exports = (NODE) => {
  const { execute_kw } = require('../utils.js');

  const objectsIn = NODE.getInputByName('objects');

  const doneOut = NODE.getOutputByName('done');
  const identifiersOut = NODE.getOutputByName('identifiers');

  const triggerIn = NODE.getInputByName('trigger');
  triggerIn.on('trigger', async (conn, state) => {
    const objs = await objectsIn.getValues(state);
    const identifiers = [];
    for (const obj of objs) {
      identifiers.push(await execute_kw(NODE, state, 'create', obj));
    }

    state.set(NODE, {
      identifiers: [].concat(...identifiers)
    });

    doneOut.trigger(state);
  });

  identifiersOut.on('trigger', async (conn, state) => {
    const thisState = state.get(NODE);
    if (!thisState || !thisState.identifiers) {
      return;
    }

    return thisState.identifiers;
  });
};
