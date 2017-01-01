'use strict';

const bootstrap = require('../shared/bootstrap');

const routes = require('./<%= name %>.routes');

exports.register = register;
exports.register.attributes = {
  name: '<%= name %>Component'
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