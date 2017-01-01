'use strict';

const validation = require('./<%= name%>.validation');

exports.welcome = {
  handler: function (request, reply) {
    reply({ message: 'Component works!' });
  }
};