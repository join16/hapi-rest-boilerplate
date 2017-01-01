'use strict';

module.exports = [{
  plugin: require('./home'),
  options: {
    routes: {
      prefix: '/home'
    }
  }
}];