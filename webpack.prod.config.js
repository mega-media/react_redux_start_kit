const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const baseConfig = require('./webpack.base.config');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { PROJECT_NAME } = require('./config/global-constants');

module.exports = Object.assign(baseConfig, {
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'output/production'),
    filename: 'js/[name].js',
    publicPath: '../'
  },
  module: {
    rules: baseConfig.module.rules.concat([
      {
        test: /\.(s)?css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[local]-[hash:base64:5]',
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
    splitChunks: {
      cacheGroups: {
        default: false,
        // Custom common chunk
        bundle: {
          name: 'commons',
          chunks: 'all',
          minChunks: 3,
          reuseExistingChunk: false
        },
        // Customer vendor
        vendors: {
          chunks: 'initial',
          name: 'vendors',
          test: m => /node_modules/.test(m.context)
        },
        publicStyles: {
          name: 'public',
          test: m =>
            m.constructor.name === 'CssModule' &&
            /(app\/asset\/)/.test(m.context),
          chunks: 'all',
          enforce: true
        },
        appStyles: {
          name: 'app',
          test: m =>
            m.constructor.name === 'CssModule' &&
            /(app\/dist\/)/.test(m.context),
          chunks: 'all',
          enforce: true
        }
      }
    }
  },
  plugins: baseConfig.plugins.concat([
    new MiniCssExtractPlugin({
      filename: 'css/[name].css'
    }),
    new OptimizeCSSAssetsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
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
