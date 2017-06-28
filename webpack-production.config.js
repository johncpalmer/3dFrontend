var WebpackStripLoader = require('strip-loader');
var devConfig = require('./webpack.config.js');
var webpack = require('webpack');
var stripLoader = {
 test: [/\.js$/, /\.es6$/],
 exclude: /node_modules/,
 loader: WebpackStripLoader.loader('console.log')
}
devConfig.module.loaders.push(stripLoader);
devConfig.entry = ['./src/index'];
devConfig.plugins = [new webpack.EnvironmentPlugin(['NODE_ENV'])];
console.log('prod entry: ' + devConfig.entry);
module.exports = devConfig;