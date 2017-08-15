const path = require('path');
const webpack = require('webpack');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const Config = require('./config/env.config');
const defineConstants = require('./config/define-constants');
const { ASSERTS_DIR } = Config;

module.exports = {
  cache: true,
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loaders: ['babel-loader?cacheDirectory=true'],
        include: path.join(__dirname, 'app')
      },
      {
        test: /\.json$/,
        loaders: ['json-loader'],
        include: path.join(__dirname, 'app')
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          `url-loader?limit=10000&name=${ASSERTS_DIR}images/[hash].[ext]`,
          'img-loader?progressive=true'
        ]
      },
      {
        test: /\.ico$/i,
        loader: `file-loader?name=${ASSERTS_DIR}images/[name].[ext]`
      },
      {
        test: /\.(mp4|swf)$/,
        loader: `file-loader?name=${ASSERTS_DIR}videos/[name].[ext]`
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: `url-loader?limit=10000&mimetype=application/font-woff&name=${ASSERTS_DIR}fonts/[name].[ext]`
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: `file-loader?name=${ASSERTS_DIR}fonts/[name].[ext]`,
        include: path.join(__dirname, 'app/assets/fonts')
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  externals: {
    Config: JSON.stringify(defineConstants(Config))
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new LodashModuleReplacementPlugin({
      shorthands: true,
      collections: true
    })
  ],
  entry: {
    bundle: [
      'babel-polyfill',
      'es6-promise',
      'whatwg-fetch',
      path.resolve(__dirname, 'app/main.js')
    ]
  }
};
