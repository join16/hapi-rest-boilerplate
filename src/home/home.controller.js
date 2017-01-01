'use strict';

const validation = require('./home.validation');

exports.welcome = {
  handler: function (request, reply) {
    reply({ message: 'Component works!' });
  }
};