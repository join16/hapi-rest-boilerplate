'use strict';

const Generator = require('yeoman-generator');
const pluralize = require('pluralize');
const _ = require('lodash');

const fs = require('fs');
const path = require('path');

const utils = require('../../utils');

const DEFAULT_BASE_PATH = 'src/';
const DEFAULT_MIGRATION_PATH = 'db/migrations';

module.exports = class extends Generator {

  constructor(args, opts) {
    super(args, opts);

    this.argument('name', { type: String, required: true });
  }

  paths() {
    const pkgPath = path.join(this.destinationRoot(), 'package.json');
    let basePath = DEFAULT_BASE_PATH;
    let migrationBasePath = DEFAULT_MIGRATION_PATH;

    if (fs.existsSync(pkgPath)) {
      let pkg = require(pkgPath);

      if (pkg.scaffold && pkg.scaffold.component) {
        basePath = pkg.scaffold.component;
      }
      if (pkg.scaffold && pkg.scaffold.migration) {
        migrationBasePath = pkg.scaffold.migration;
      }
    }

    const m = /^([^\/]+)\/([^\/]+)$/.exec(this.options.name);
    if (!m) throw new Error('invalid model name: ' + this.options.name);

    const componentName = m[1];
    basePath = path.join(basePath, componentName, 'models');
    
    const name = m[2];
    const ModelName = utils.pascalCase(name);
    const context = {
      ModelName,
      CollectionName: pluralize.plural(ModelName),
      tableName: pluralize.plural(_.snakeCase(name))
    };

    // writing model file
    this.fs.copyTpl(
      this.templatePath('model.js'),
      this.destinationPath(basePath, `${name}.model.js`),
      context
    );

    // migration file
    this.fs.copyTpl(
      this.templatePath('migration.js'),
      this.destinationPath(migrationBasePath, `${Date.now()}_create_${context.tableName}.js`),
      context
    );
  }

};