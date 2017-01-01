'use strict';

const Hapi = require('hapi');
const Promise = require('bluebird');
const _ = require('lodash');
const expect = require('chai').expect;

const qs = require('qs');

const main = require('../../src/main');

let server = null;

// initialize server if runs by mocha
if (_.isFunction(before)) {
  before(() => {
    return _initializeServer();
  });
}

module.exports = {
  sendRequest,
  overlap,
  buildQuery
};

//// functions

/**
 * Sends mock request to server using server.inject(), with some custom options
 * @param options
 * @param overlapOptions
 * @param [options.expectStatus]
 */
function sendRequest(options, overlapOptions) {
  const _options = _.assign({}, options, overlapOptions);
  
  return server
    .inject(_options)
    .then((response) => {
      if (_options.expectStatus) {
        expect(response.result.statusCode).to.equal(_options.expectStatus);
      }
      
      return response;
    });
}

function overlap(options, overlap) {
  return _.merge({}, options, overlap);
}

function buildQuery(url, query) {
  if (query.q) {
    query.q = qs.stringify(query.q);
  }

  return url + '?' + qs.stringify(query);
}

function _initializeServer() {
  server = new Hapi.Server();

  server.connection({
    port: 71023,
    host: 'localhost'
  });

  return server
    .register(main)
    .then(() => {
      return server.initialize();
    });
}