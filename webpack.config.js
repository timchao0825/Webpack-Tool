const path = require('path');
const webpack = require('webpack');
// html
const HtmlWebpackPlugin = require('html-webpack-plugin');
// css
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const SassPlugin = require('sass-webpack-plugin');
// js
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
// others
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

/* setting */
const public = {
    publicPath: '../',
    partake: 'dist/'
};
module.exports = {
    entry: './src/js/app.js',
    output:{
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    //指定開發資料夾
    resolve: {
        modules: [
            path.resolve('src'),
            path.resolve('src/js'),
            path.resolve('src/sass'),
            path.resolve('src/images'),
            path.resolve('src/assets'),
            path.resolve('node_modules')
        ],
        extensions: ['.js'] //加上JS附檔名
    },
    module:{
        rules:[

        ]
    },/* end module */
    plugins:[
        new HtmlWebpackPlugin(), /* init new hash assets file */
        new CleanWebpackPlugin(), /* clean dist file */
    ],/* end plugins */
};/* end setting */