'use strict';

const fs = require('fs');
const path = require('path');

fs
  .readdirSync(__dirname)
  .filter(_isJsFile)
  .forEach((file) => {
    const content = require(path.join(__dirname, file));
    
    Object.assign(exports, content);
  });

function _isJsFile(file) {
  return /\.js$/.test(file) && (file !== 'index.js');
}