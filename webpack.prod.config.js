const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const baseConfig = require('./webpack.base.config');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractCSS = new ExtractTextPlugin('css/styles.css');
const ExtractPublic = new ExtractTextPlugin('css/public.css');
const { PROJECT_NAME } = require('./config/global-constants');

module.exports = Object.assign(baseConfig, {
  output: {
    path: path.resolve(__dirname, 'output/production'),
    filename: 'js/[name].js',
    publicPath: '../'
  },
  module: {
    loaders: baseConfig.module.loaders.concat([
      {
        /* 將共用樣式檔寫入 public.css */
        test: /\.(s)?css$/,
        loader: ExtractPublic.extract({
          fallback: 'style-loader',
          use: [
            'css-loader' +
              '?modules' +
              '&importLoaders=1' +
              '&localIdentName=[local]-[hash:base64:5]' +
              '&-autoprefixer',
            'postcss-loader',
            'sass-loader'
          ]
        }),
        exclude: /node_modules/,
        include: path.join(__dirname, 'app/assets')
      },
      {
        /* 將 Containers 樣式檔寫入 styles.css */
        test: /\.(s)?css$/,
        loader: ExtractCSS.extract({
          fallback: 'style-loader',
          use: [
            'css-loader' +
              '?modules' +
              '&importLoaders=1' +
              '&localIdentName=[local]-[hash:base64:5]' +
              '&-autoprefixer',
            'postcss-loader',
            'sass-loader'
          ]
        }),
        exclude: /node_modules/,
        include: path.join(__dirname, 'app/dist')
      }
    ])
  },
  plugins: baseConfig.plugins.concat([
    ExtractCSS,
    ExtractPublic,
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.optimize.UglifyJsPlugin({
      // 删除所有的註解
      comments: false,
      compress: {
        // 在UglifyJs删除沒有用到的代碼時不輸出警告
        warnings: false,
        // 删除所有的 `console` 语句
        drop_console: true,
        // 内嵌定义了但是只用到一次的变量
        collapse_vars: true
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: module => /node_modules/.test(module.resource)
    }),
    new HtmlWebpackPlugin({
      title: PROJECT_NAME,
      hash: true,
      cache: false,
      filename: 'index.html',
      favicon: 'app/assets/images/favicon.ico',
      template: 'entrance/index.html'
    })
  ])
});
