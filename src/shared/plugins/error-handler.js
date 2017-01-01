'use strict';

const _ = require('lodash');
const config = require('config');

const errorUtils = require('../error-utils');

exports.register = register;
exports.register.attributes = {
  name: 'errorHandler'
};

function register(server, options, next) {

  server.ext('onPreResponse', function (request, reply) {
    const response = request.response;

    if (!response.isBoom) {
      return reply.continue();
    }

    let error = response;

    if (_isJoiError(error)) {
      const detail = error.output.payload.validation;
      error = errorUtils.InvalidPayload(detail);
    }

    // it is unexpected error
    if (!error.isHandled) {
      const detail = errorUtils.debugError(error);
      error = errorUtils.InternalError(null, detail);
    }

    // response parsing
    const outputPayload = {
      statusCode: error.status,
      type: error.type
    };

    if (error.data) outputPayload.data = error.data;
    if (error.debug) {
      // log debugging information
      console.log(error.debug);

      if (_isDebugEnabled(error.debug)) outputPayload.debug = error.debug;
    }
    
    response.output.statusCode = outputPayload.statusCode;
    response.output.payload = outputPayload;

    reply.continue();
  });

  next();
}

function _isJoiError(error) {
  return error.isJoi || (_.isObject(error.data) && error.data.isJoi);
}

function _isDebugEnabled() {
  return config.get('exposeDebugResponse') === true;
}