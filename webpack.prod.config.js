const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const baseConfig = require('./webpack.base.config');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

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
              localIdentName: '[hash:base64:7]',
              autoprefixer: true
            }
          },
          'postcss-loader',
          'sass-loader'
        ],
        exclude: /node_modules/,
        include: path.resolve(__dirname, 'app')
      },
      {
        test: /\.(s)?css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[local]',
              autoprefixer: true
            }
          },
          'postcss-loader',
          'sass-loader'
        ],
        include: /node_modules/,
        exclude: path.resolve(__dirname, 'app')
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
          name: 'vendor',
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
    new OptimizeCSSAssetsPlugin()
  ])
});
