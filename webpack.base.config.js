const path = require('path');
const url = require('url');
const webpack = require('webpack');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;
/* config */
const configEnv = require('./config/env');
const configLocale = require('./config/locale');
const configRemote = require('./config/remote');
const configRoutes = require('./config/routes');
const hljs = require('highlight.js');

module.exports = {
  cache: true,
  module: {
    rules: [
      {
        test: /\.md$/,
        use: [
          {
            loader: 'html-loader'
          },
          {
            loader: 'markdown-it-loader',
            options: {
              highlight: function(str, lang) {
                if (lang && hljs.getLanguage(lang)) {
                  try {
                    return (
                      '<pre class="hljs"><code class="language-' +
                      lang +
                      '">' +
                      hljs.highlight(lang, str, true).value +
                      '</code></pre>'
                    );
                  } catch (__) {}
                }

                return '';
              }
            }
          }
        ],
        exclude: /node_modules/,
        include: path.resolve(__dirname, 'app')
      },
      {
        test: /\.jsx?$/,
        type: 'javascript/auto',
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true
            }
          }
        ],
        exclude: /node_modules/,
        include: path.resolve(__dirname, 'app')
      },
      {
        test: /\.json$$/,
        type: 'javascript/auto',
        use: [
          {
            loader: 'json-loader'
          }
        ],
        exclude: /node_modules/,
        include: path.resolve(__dirname, 'app')
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: 'images/[hash].[ext]'
            }
          },
          {
            loader: 'img-loader'
          }
        ],
        exclude: /node_modules/,
        include: path.resolve(__dirname, 'app')
      },
      {
        test: /\.(mp4|swf)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'media/[name].[ext]'
            }
          }
        ],
        exclude: /node_modules/,
        include: path.resolve(__dirname, 'app')
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              mimetype: 'application/font-woff',
              name: 'fonts/[name].[ext]'
            }
          }
        ],
        exclude: /node_modules/,
        include: path.resolve(__dirname, 'app')
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'fonts/[name].[ext]'
            }
          }
        ],
        exclude: /node_modules/,
        include: path.resolve(__dirname, 'app/assets/fonts')
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '@assets': path.resolve(__dirname, 'app/assets'),
      '@core': path.resolve(__dirname, 'app/core'),
      '@src': path.resolve(__dirname, 'app/src'),
      '@ext': path.resolve(__dirname, 'app/extensions')
    }
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
      VERSION: JSON.stringify(require('./package.json').version),
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      CONFIG: {
        ENV: JSON.stringify(configEnv),
        LOCALE: JSON.stringify(configLocale),
        REMOTE: JSON.stringify(configRemote),
        ROUTE: JSON.stringify(configRoutes)
      }
    }),
    new LodashModuleReplacementPlugin({
      shorthands: true,
      collections: true
    })
  ],
  entry: {
    bundle: [
      '@babel/polyfill',
      'es6-promise',
      'whatwg-fetch',
      path.resolve(__dirname, 'app/main.js')
    ]
  }
};
