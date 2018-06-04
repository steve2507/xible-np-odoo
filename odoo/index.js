'use strict';

module.exports = (NODE) => {
  const Odoo = require('odoo-xmlrpc');

  const odooOut = NODE.getOutputByName('odoo');

  let odoo;

  odooOut.on('trigger', async (conn, state) => {
    if (odoo) {
      return odoo;
    }

    odoo = new Odoo({
      url: NODE.data.url,
      db: NODE.data.db,
      username: NODE.data.username,
      password: NODE.data.password
    });

    return new Promise((resolve, reject) => {
      odoo.connect((err) => {
        if (err) {
          NODE.addStatus({
            message: 'authentication failed',
            color: 'red'
          });

          NODE.error(err, state);

          reject(err);
          return;
        }

        NODE.addStatus({
          message: 'authentication success',
          color: 'green'
        });
        resolve(odoo);
      });
    });
  });
};
