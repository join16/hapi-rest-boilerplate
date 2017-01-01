'use strict';

exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('<%= tableName %>', (table) => {
      table.increments();
      table.timestamp('createdAt').defaultTo(knex.fn.now());
      table.timestamp('updatedAt').defaultTo(knex.fn.now());
    })
  ]);
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('<%= tableName %>')
  ]);
};