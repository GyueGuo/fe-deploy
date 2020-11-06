const path = require('path');

const distPath = path.resolve('dist');

const srcPath = path.resolve('src');

const pagePath = path.resolve(path.join(srcPath, 'pages'));

const publicPath = ['//47.242.66.102:3000/cdn', path.resolve().split(path.sep).pop()].join('/');

module.exports = {
  entry: [path.resolve('src/app.js')],
  distPath,
  srcPath,
  pagePath,
  publicPath,
};
