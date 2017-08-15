const webpack = require('webpack');
const path = require('path');

var HTMLWebpackPlugin = require('html-webpack-plugin');
var HTMLWebpackPluginConfig = new
HTMLWebpackPlugin({
  //filepath to the current HTML file
  template: __dirname + '/src/client/index.html',
  //name of the html file
  filename: 'index.html',
  //inject's value should be a string either 'head' or 'body'
  inject: 'body'
});

var BUILD_DIR = path.resolve(__dirname, '/src/client/public/');
var APP_DIR = path.resolve(__dirname, '/src/client/app');

var config = {
  entry: __dirname + APP_DIR,
  //specify where to put the transformed files
  output: {
    //in Node.js __dirname refers to the currently executing file
    path: __dirname + BUILD_DIR,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        //this regular expression represents all the patterns that end with js
        //this means the loader will preform the transformation on all of the js files
        test: /\.jsx?/,
        //include: APP_DIR,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  plugins: [HTMLWebpackPluginConfig]
};

module.exports = config;