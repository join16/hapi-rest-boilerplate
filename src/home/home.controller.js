'use strict';

const Joi = require('joi');

const serverUtils = require('../shared/server-utils');
const validation = require('./home.validation');

exports.welcome = {
  handler: function * (request, reply) {
    console.log('debug');
    const data = yield serverUtils.callApi(request, {
      method: 'POST',
      url: '/home',
      payload: {
        message: 'hi!'
      }
    });
    console.log(data);

    reply({ message: 'Component works!'});
  }
};

exports.create = {
  validate: {
    payload: {
      message: Joi.string().required()
    }
  },
  handler: function (request, reply) {
    console.log(request.app);
    reply(request.payload);
  }
};