'use strict';

const lout = require('lout');
const vision = require('vision');
const inert = require('inert');

const bootstrap = require('./shared/bootstrap');
const componentsConfig = require('./components.config');

const plugins = {
  errorHandler: require('./shared/plugins/error-handler')
};

exports.register = register;
exports.register.attributes = {
  name: 'mainApp'
};

function register(server, options, next) {
  
  return Promise
    .resolve()
    .then(() => {
      return server.register([vision, inert, {
        register: lout,
        options: {
          endpoint: '/docs/api'
        }
      }]);
    })
    .then(() => {
      return bootstrap.registerComponents(server, componentsConfig);
    })
    .then(() => {
      return server.register(plugins.errorHandler);
    })
    .then(() => {
      next();
    })
    .catch(next);
}
