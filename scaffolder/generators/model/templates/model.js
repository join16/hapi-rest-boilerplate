'use strict';

const modelUtils = require('../../shared/model-utils');

const <%= ModelName %> = modelUtils.BaseModel.extend({
  tableName: '<%= tableName %>'
});

const <%= CollectionName %> = modelUtils.BaseCollection.extend({
  model: <%= ModelName %>
});