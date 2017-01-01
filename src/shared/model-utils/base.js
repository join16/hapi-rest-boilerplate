'use strict';

const config = require('config');
const knex = require('knex')(config.get('database'));
const bookshelf = require('bookshelf')(knex);

exports.knex = knex;
exports.BaseModel = bookshelf.Model.extend({
  hasTimestamps: ['createdAt', 'updatedAt']
});
exports.BaseCollection = bookshelf.Collection;