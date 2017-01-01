'use strict';

const _ = require('lodash');

const errors = require('../../errors.config');

const predefinedErrors = [{
  type: 'InvalidPayload',
  status: 400
}, {
  type: 'PageNotFound',
  status: 404
}, {
  type: 'InternalError',
  status: 500
}];
const errorUtils = {
  debugError
};

module.exports = errorUtils;

/**
 * Returns debug information of error
 * @param err
 */
function debugError(err) {
  return {
    message: err.message,
    stack: err.stack
  };
}

// dynamically add methods from errors

_.concat(predefinedErrors, errors).forEach(error => {
  errorUtils[error.type] = (data, debug) => {
    const params = {
      type: error.type,
      status: error.status,
      data,
      isHandled: true
    };
    
    if (debug) params.debug = debug;
    
    return _buildError(params);
  };
});

function _buildError(obj) {
  const err = new Error(obj.type);
  
  _.forIn(obj, (value, key) => {
    err[key] = value;
  });
  
  return err;
}