'use strict';

const bootstrap = require('../shared/bootstrap');

const routes = require('./home.routes');

exports.register = register;
exports.register.attributes = {
  name: 'homeComponent'
};

function register(server, options, next) {
  return Promise
    .resolve()
    .then(() => {
      bootstrap.registerRoutes(server, routes);
      next();
    })
    .catch(next);
}