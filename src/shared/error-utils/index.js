'use strict';

const _ = require('lodash');

const errors = require('./errors');

const errorUtils = {};

module.exports = errorUtils;

// dynamically add methods from errors

errors.forEach(error => {
  errorUtils[error.type] = (data) => {
    return _buildError({
      type: error.type,
      status: error.status,
      data
    });
  };
});

function _buildError(obj) {
  const err = new Error(obj.type);
  
  _.forIn(obj, (value, key) => {
    err[key] = value;
  });
  
  return err;
}