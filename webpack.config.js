"use strict";

const path = require('path');
const fs = require("fs");
const webpack = require('webpack');
const WebpackNotifierPlugin = require('webpack-notifier');

const Config = require('./config/config.dev.json');
const host = Config.Constants.host;
const port = Config.Constants.port;
const autoInstall = require('./custom.autoInstall');
const defineConstants = require("./custom.defineConstants");
const defaultConfig = require("./custom.webpack.config");

//===============================================================
/* 寫入 container */
autoInstall.run();
//===============================================================

let entryFiles = {
    "bundle": [
        'webpack-dev-server/client?http://' + host + ':' + port,
        'webpack/hot/dev-server',
        path.resolve(__dirname, 'app/main.js')
    ]
};

const config = Object.assign(defaultConfig,
    {
        output: {
            path: path.resolve(__dirname, 'build-develop'),
            filename: '[name].js',
            publicPath: '/'
        },
        devServer: {
            host,
            port,
            contentBase: "./build-develop",
            historyApiFallback: true
        },
        entry: entryFiles,
        plugins: defaultConfig.ExtractFiles.concat([
            new webpack.NoErrorsPlugin(),
            new WebpackNotifierPlugin(),
            new webpack.DefinePlugin(
                {
                    __DEV__: JSON.parse(process.env.DEBUG || 'false'),
                    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
                }
            )
        ]),
        externals: {
            'Config': JSON.stringify(defineConstants(Config))
        }
    });

module.exports = config;
