/**
 * Created by arShown on 2016/7/15.
 */
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const ExtractCSS = new ExtractTextPlugin("styles.css");
const ExtractPublic = new ExtractTextPlugin("public.css");
var Config = {};
if(process.env.DEBUG)
    Config = require('./config/config.dev.json');
else
    Config = require('./config/config.prod.json');

const assetDir = Config.Constants.assetsDir;

module.exports =
{
    ExtractFiles: [ExtractCSS, ExtractPublic],
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
                loaders: process.env.DEBUG ? ['react-hot', 'babel?cacheDirectory=true'] : ['babel?cacheDirectory=true','strip-loader?strip[]=debug,strip[]=console.log,strip[]=console.debug,strip[]=console.error,strip[]=console.info'],
                include: path.join(__dirname, 'app')
            },
            {

                test: /\.s?css$/,
                loader: ExtractPublic.extract(
                    'style-loader',
                    'css-loader?modules&importLoaders=1&localIdentName=[name]-[local]-[hash:base64:5]!sass'
                ),
                include: path.join(__dirname, 'app/assets')
            },
            {
                test: /\.s?css$/,
                loader: ExtractCSS.extract(
                    'style-loader',
                    'css-loader?modules&importLoaders=1&localIdentName=[name]-[local]-[hash:base64:5]!sass'
                ),
                include: path.join(__dirname, 'app/dist')
            },
            {
                test: /\.json$/,
                loaders: ['json-loader'],
                include: path.join(__dirname, 'app')
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loaders: [`url-loader?limit=10000&name=${assetDir}images/[hash].[ext]`, 'img-loader?progressive=true']
            },
            {
                test: /\.ico$/i,
                loader: `file-loader?name=${assetDir}images/[name].[ext]`
            },
            {
                test: /\.(mp4|swf)$/,
                loader: `file-loader?name=${assetDir}videos/[name].[ext]`
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: `url-loader?limit=10000&mimetype=application/font-woff&name=${assetDir}fonts/[name].[ext]`
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: `file-loader?name=${assetDir}fonts/[name].[ext]`,
                include: path.join(__dirname, 'app/assets/fonts')
            }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    imagemin: {
        gifsicle: {interlaced: false},
        jpegtran: {
            progressive: true,
            arithmetic: false
        },
        optipng: {optimizationLevel: 5},
        pngquant: {
            floyd: 0.5,
            speed: 2
        },
        svgo: {
            plugins: [
                {removeTitle: true},
                {convertPathData: false}
            ]
        }
    }
};
