'use strict';

const Hapi = require('hapi');

const mainApp = require('../src/main');

const server = new Hapi.Server();

server.connection({
  host: '0.0.0.0',
  port: 3000
});

server
    .register(mainApp)
    .then(() => {
      return server.start();
    })
    .then(() => {
      console.log(`Server Running At: ${server.info.uri}`);
    })
    .catch((err) => {
      console.log(err);
      process.exit(1);
    });