'use strict';

const modelBase = require('../../shared/model-base');

const <%= ModelName %> = modelBase.BaseModel.extend({
  tableName: '<%= tableName %>'
});

const <%= CollectionName %> = modelBase.BaseCollection.extend({
  model: <%= ModelName %>
});