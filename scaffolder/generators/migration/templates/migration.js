'use strict';

exports.up = function (knex, Promise) {
  return Promise.all([<% if (create) { %>
    knex.schema.createTable('<%= tableName %>', (table) => {
      table.increments();
      table.timestamp('createdAt').defaultTo(knex.fn.now());
      table.timestamp('updatedAt').defaultTo(knex.fn.now());
    }) <% } else if (remove) { %>
    knex.schema.dropTable('<%= dropTable %>') <% } else { %>
    knex.schema.table('', (table) => {
    }) <% } %>
  ]);
};

exports.down = function (knex, Promise) {
  return Promise.all([<% if (create) { %>
    knex.schema.dropTable('<%= tableName %>')<% } else if (remove) { %>
    knex.schema.createTable('<%= tableName %>', (table) => {
    })<% } else { %>
    knex.schema.table('', (table) => {
    })<% } %>
  ]);
};