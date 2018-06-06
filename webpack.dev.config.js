const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const WebpackNotifierPlugin = require('webpack-notifier');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const baseConfig = require('./webpack.base.config');
const {
  PROJECT_NAME,
  PROJECT_HOST,
  PROJECT_PORT
} = require('./config/global-constants');

module.exports = Object.assign(baseConfig, {
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'output/development'),
    filename: '[name].js',
    publicPath: '/'
  },
  devServer: {
    host: PROJECT_HOST,
    port: PROJECT_PORT,
    hot: true,
    inline: true,
    historyApiFallback: true
  },
  module: {
    rules: baseConfig.module.rules.concat([
      {
        test: /\.(s)?css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[path][name]/[local]/[hash:base64:5]',
              autoprefixer: true
            }
          },
          'postcss-loader',
          'sass-loader'
        ],
        exclude: /node_modules/,
        include: path.resolve(__dirname, 'app')
      }
    ])
  },
  optimization: {
    splitChunks: { chunks: 'all' },
    runtimeChunk: true
  },
  plugins: baseConfig.plugins.concat([
    new webpack.HotModuleReplacementPlugin(),
    new WebpackNotifierPlugin(),
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
