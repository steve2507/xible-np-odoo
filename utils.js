'use strict';

async function execute_kw(NODE, state, method, ...params) {
  const odooIn = NODE.getInputByName('odoo');
  const odoos = await odooIn.getValues(state);

  let model = NODE.data.model;
  const modelIn = NODE.getInputByName('model');
  if (modelIn && modelIn.isConnected()) {
    model = (await modelIn.getValues(state))[0];
  }

  if (!params.length) {
    const paramsIn = NODE.getInputByName('params');
    params = [await paramsIn.getValues(state)];
  }

  return Promise.all(odoos.map((odoo) => {
    return new Promise((resolve, reject) => {
      odoo.execute_kw(model, method, [params], (err, value) => {
        if (err) {
          NODE.error(err, state);
          reject(err);
          return;
        }

        resolve(value);
      });
    });
  }));
}

module.exports = { execute_kw };
