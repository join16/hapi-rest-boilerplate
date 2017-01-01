'use strict';

const Generator = require('yeoman-generator');
const _ = require('lodash');

const fs = require('fs');
const path = require('path');

const DEFAULT_BASE_PATH = 'src/';
const DEFAULT_TEST_BASE_PATH = 'test/e2e';

module.exports = class extends Generator {

  constructor(args, opts) {
    super(args, opts);

    this.argument('name', { type: String, required: true });
  }

  paths() {
    const pkgPath = path.join(this.destinationRoot(), 'package.json');
    let basePath = DEFAULT_BASE_PATH;
    let testBasePath = '';

    if (fs.existsSync(pkgPath)) {
      let pkg = require(pkgPath);

      if (pkg.scaffold && pkg.scaffold.component) {
        basePath = pkg.scaffold.component;
      }
      if (pkg.scaffold && pkg.scaffold.e2e) {
        testBasePath = pkg.scaffold.e2e;
      }
    }

    const name = _.kebabCase(this.options.name);
    const context = { name };
    const componentPath = path.join(basePath, name);

    this.fs.copyTpl(
      this.templatePath('index.js'),
      this.destinationPath(componentPath, 'index.js'),
      context
    );
    this.fs.copyTpl(
      this.templatePath('routes.js'),
      this.destinationPath(componentPath, `${name}.routes.js`),
      context
    );
    this.fs.copyTpl(
      this.templatePath('controller.js'),
      this.destinationPath(componentPath, `${name}.controller.js`),
      context
    );
    this.fs.copyTpl(
      this.templatePath('validation.js'),
      this.destinationPath(componentPath, `${name}.validation.js`),
      context
    );
    this.fs.copyTpl(
      this.templatePath('models/index.js'),
      this.destinationPath(componentPath, 'models/index.js'),
      context
    );
    this.fs.copyTpl(
      this.templatePath('e2e.js'),
      this.destinationPath(testBasePath, `${name}.e2e.js`),
      context
    );

    const configPath = this.destinationPath(basePath, 'components.config.js');

    const content = this.fs.read(configPath);
    const newContent = content.replace(/\}\]\;/, [
      `}, {`,
      `  plugin: require('./${name}'),`,
      `  options: {`,
      `    routes: {`,
      `      prefix: '/${name}'`,
      `    }`,
      `  }`,
      `}];`
    ].join('\n'));
    
    this.fs.write(configPath, newContent);
  }


};