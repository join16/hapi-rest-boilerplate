'use strict';

const bootstrap = require('./shared/bootstrap');
const componentsConfig = require('./components.config');

exports.register = register;
exports.register.attributes = {
  name: 'mainApp'
};

function register(server, options, next) {
  return Promise
    .resolve()
    .then(() => {
      return bootstrap.registerComponents(server, componentsConfig);
    })
    .then(() => {
      next();
    })
    .catch(next);
}
