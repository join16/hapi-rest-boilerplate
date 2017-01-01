'use strict';

const controller = require('./home.controller');

module.exports = [{
  method: 'GET',
  path: '/',
  config: controller.welcome
}, {
  method: 'POST',
  path: '/create',
  config: controller.create
}];