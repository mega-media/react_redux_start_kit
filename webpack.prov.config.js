"use strict";

const path = require('path');
const fs = require("fs");
const webpack = require('webpack');
const Config = require('./config/config.prod.json');
const autoInstall = require('./custom.autoInstall');
const defineConstants = require("./custom.defineConstants");
const defaultConfig = require("./custom.webpack.config");

//===============================================================
/* 寫入 container */
autoInstall.run();
//===============================================================

let entryFiles = {
    "bundle": [path.resolve(__dirname, 'app/main.js')]
};
const config = Object.assign(defaultConfig,
    {
        output: {
            path: path.resolve(__dirname, 'build'),
            filename: '[name].js',
            publicPath: '/'
        },
        entry: entryFiles,
        plugins: defaultConfig.ExtractFiles.concat([
            new webpack.NoErrorsPlugin(),
            new webpack.optimize.UglifyJsPlugin({
                output: {
                    comments: false
                }
            }),
            new webpack.DefinePlugin({
                __DEV__: false,
                'process.env.NODE_ENV': JSON.stringify('production')
            })
        ]),
        externals: {
            'Config': JSON.stringify(defineConstants(Config))
        }
    });

module.exports = config;
