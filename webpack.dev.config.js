const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const WebpackNotifierPlugin = require('webpack-notifier');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const env = require('./config/env/dev');
const baseConfig = require('./webpack.base.config');

const { PROJECT_NAME, DEVELOP_HOST, DEVELOP_PORT } = env;

module.exports = Object.assign(baseConfig, {
  output: {
    path: path.resolve(__dirname, 'output/development'),
    filename: '[name].js',
    publicPath: './'
  },
  devServer: {
    host: DEVELOP_HOST,
    port: DEVELOP_PORT,
    hot: true,
    inline: true,
    contentBase: './build-develop',
    historyApiFallback: true
  },
  module: {
    loaders: baseConfig.module.loaders.concat([
      {
        test: /\.(s)?css$/,
        loaders: [
          'style-loader',
          'css-loader' +
            '?modules' +
            '&importLoaders=1' +
            '&localIdentName=[path][name]-[local]-[hash:base64:5]' +
            '&-autoprefixer',
          'postcss-loader',
          'sass-loader'
        ]
      }
    ])
  },
  plugins: baseConfig.plugins.concat([
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new WebpackNotifierPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(
        process.env.NODE_ENV || 'development'
      )
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: module => /node_modules/.test(module.resource)
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'buffer'
    }),
    new HtmlWebpackPlugin({
      title: PROJECT_NAME,
      hash: true,
      cache: true,
      filename: 'index.html',
      favicon: 'app/assets/images/favicon.ico',
      template: 'entrance/index.html'
    })
  ])
});
