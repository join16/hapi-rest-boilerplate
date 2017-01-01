'use strict';

const co = require('co');
const Promise = require('bluebird');

module.exports = {
  registerRoutes,
  registerComponents
};

function registerRoutes(server, routes) {
  routes.forEach((route) => {
    // convert generator handler
    if (!route.config) return route;
    if (!_isGeneratorFunction(route.config.handler)) return;
    
    route.config.handler = function $handler(request, reply) {
      co
        .wrap(route.config.handler)(request, reply)
        .catch((err) => {
          reply(err);
        });
    };
  });
  
  server.route(routes);
}

function registerComponents(server, componentConfigs) {
  let promise = Promise.resolve();
  
  componentConfigs.forEach(config => {
    const args = [config.plugin];
    
    if (config.options) {
      args.push(config.options);
    }
    
    promise = promise.then(() => {
      return server.register(...args);
    });
  });
  
  return promise;
}

function _isGeneratorFunction(func) {
  return func.constructor.name === 'GeneratorFunction';
}