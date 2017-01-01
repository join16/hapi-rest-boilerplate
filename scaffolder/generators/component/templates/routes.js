'use strict';

const controller = require('./<%= name %>.controller');

module.exports = [{
  method: 'GET',
  path: '/',
  config: controller.welcome
}];