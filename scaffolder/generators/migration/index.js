'use strict';

const Generator = require('yeoman-generator');
const pluralize = require('pluralize');
const _ = require('lodash');

const fs = require('fs');
const path = require('path');

const utils = require('../../utils');

const DEFAULT_MIGRATION_PATH = 'db/migrations';

module.exports = class extends Generator {
  
  constructor(args, opts) {
    super(args, opts);
    
    this.argument('migrationName', { type: String, required: true });
  }
  
  paths() {
    const pkgPath = path.join(this.destinationRoot(), 'package.json');
    let migrationBasePath = DEFAULT_MIGRATION_PATH;
    
    if (fs.existsSync(pkgPath)) {
      let pkg = require(pkgPath);
      
      if (pkg.scaffold && pkg.scaffold.migration) {
        migrationBasePath = pkg.scaffold.migration;
      }
    }

    const name = this.options.migrationName;
    const context = {
      name,
      create: false,
      remove: false,
      tableName: null
    };

    // parse migrationName to extract predefined commands
    const m = /^([a-z]+)\_(.*)$/.exec(name);
    if (m) {
      let action = m[1];

      if (action === 'create') {
        context.create = true;
        context.tableName = m[2];
      }
      if (action === 'remove') {
        context.remove = true;
        context.tableName = m[2];
      }
    }

    // migration file
    this.fs.copyTpl(
      this.templatePath('migration.js'),
      this.destinationPath(migrationBasePath, `${Date.now()}_${name}.js`),
      context
    );
  }
  
};