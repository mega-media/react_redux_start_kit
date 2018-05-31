const path = require('path');
const url = require('url');
const webpack = require('webpack');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const globalConstants = require('./config/global-constants');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;

module.exports = {
  cache: true,
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['babel-loader?cacheDirectory=true'],
        exclude: /node_modules/,
        include: path.resolve(__dirname, 'app')
      },
      {
        test: /\.json$/,
        loaders: ['json-loader'],
        exclude: /node_modules/,
        include: path.resolve(__dirname, 'app')
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          `url-loader?limit=10000&name=images/[hash].[ext]`,
          'img-loader?progressive=true'
        ],
        exclude: /node_modules/,
        include: path.resolve(__dirname, 'app')
      },
      {
        test: /\.ico$/i,
        loader: `file-loader?name=images/[name].[ext]`,
        exclude: /node_modules/,
        include: path.resolve(__dirname, 'app')
      },
      {
        test: /\.(mp4|swf)$/,
        loader: `file-loader?name=media/[name].[ext]`,
        exclude: /node_modules/,
        include: path.resolve(__dirname, 'app')
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: `url-loader?limit=10000&mimetype=application/font-woff&name=fonts/[name].[ext]`,
        exclude: /node_modules/,
        include: path.resolve(__dirname, 'app')
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: `file-loader?name=fonts/[name].[ext]`,
        exclude: /node_modules/,
        include: path.join(__dirname, 'app/assets/fonts')
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '~': path.resolve(__dirname, 'app/dist'),
      '@': path.resolve(__dirname, 'app/assets'),
      ext: path.resolve(__dirname, 'app/extensions')
    }
  },
  externals: {
    Config: JSON.stringify(globalConstants)
  },
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      reportFilename: 'report.html',
      defaultSizes: 'parsed',
      openAnalyzer: false,
      generateStatsFile: false,
      statsOptions: null,
      logLevel: 'info'
    }),
    new webpack.DefinePlugin({
      VERSION: JSON.stringify(require('./package.json').version)
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
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
