'use strict';

module.exports = (NODE) => {
  const modelOut = NODE.getOutputByName('model');
  modelOut.on('trigger', async () =>
    NODE.data.model
  );
};
