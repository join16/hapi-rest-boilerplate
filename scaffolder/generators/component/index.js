'use strict';

const Generator = require('yeoman-generator');
const _ = require('lodash');

const fs = require('fs');
const path = require('path');

const DEFAULT_BASE_PATH = 'src/';

module.exports = class extends Generator {

  constructor(args, opts) {
    super(args, opts);

    this.argument('name', { type: String, required: true });
  }

  paths() {
    const pkgPath = path.join(this.destinationRoot(), 'package.json');
    let basePath = DEFAULT_BASE_PATH;

    if (fs.existsSync(pkgPath)) {
      let pkg = require(pkgPath);

      if (pkg.scaffold && pkg.scaffold.component) {
        basePath = pkg.scaffold.component;
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

    const configPath = this.destinationPath(basePath, 'components.config.js');

    this.fs.copy(configPath, configPath, {
      process: (content) => {
        return content.toString().replace(/\}\]\;/, [
          `}, {`,
          `  plugin: require('./${name}'),`,
          `  options: {`,
          `    routes: {`,
          `      prefix: '/${name}'`,
          `    }`,
          `  }`,
          `}];`
        ].join('\n'));
      }
    });
  }


};