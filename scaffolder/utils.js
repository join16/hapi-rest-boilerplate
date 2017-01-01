'use strict';

const _ = require('lodash');

module.exports = {
  pascalCase
};

function pascalCase(str) {
  return _.camelCase(str).replace(/^[a-z]/, (matched) => matched.toUpperCase());
}