'use strict';

module.exports = {
  callApi
};

/**
 * Calls other api, with some additional options
 * @param request
 * @param options
 * @param [options.$withHeaders]
 * @param t
 * @returns {*}
 */
function *callApi(request, options, t) {
  if (t) {
    options.app = options.app || {};
    options.app.t = t;
  }

  const response = yield request.server.inject(options);
  const result = response.result;

  if (result.statusCode >= 400) {
    throw new Error('Invalid Api Request');
  }
  
  if (options.$withHeaders) {
    return {
      payload: result,
      headers: response.headers
    };
  }

  return result;
}