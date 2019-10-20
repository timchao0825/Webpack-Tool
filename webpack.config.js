const path = require('path');
const webpack = require('webpack');

/* html */
const HtmlWebpackPlugin = require('html-webpack-plugin');
/* css */
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const SassPlugin = require('sass-webpack-plugin');
/* js */

/* others */
const CopyPlugin = require('copy-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const imageminMozjpeg = require('imagemin-mozjpeg');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

/* setting */
let htmlPlugins = [];
let entries = {};
const public = {
    publicPath: '../',
    partake: 'dist/'
};
const webpackServer = {
    protocol:'http://',
    host:'127.0.0.1',
    port:'8080'  
}
const ProvidePlugin = new webpack.ProvidePlugin({
    $: 'jquery', 
    jQuery: 'jquery',
});

/* module setting */
module.exports = {
    devtool:"cheap-module-source-map",
    entry: {
        index: path.resolve(__dirname, 'src/js/index.js'),
    },
    output:{
        filename:"js/[name].bundle.[hash].js",
        path:path.resolve(__dirname,"dist"),
    },
    module:{
        rules:[
            {
                test: /\.(sa|sc|c)ss$/,
                exclude: /node_modules/,
                use: [
                    {
                      loader: MiniCssExtractPlugin.loader,
                    },
                    'css-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
        ]
    },/* end module */
    devServer:{
        host: webpackServer.host,
        port: webpackServer.port,
        inline: true,
    }, 
    plugins:[
        new CleanWebpackPlugin(), /* clean dist file */
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(__dirname, 'src/page/index.html'),
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
        }),
        new CopyPlugin([
            { from: 'src/images', to: 'images' },
        ]),
        new ImageminPlugin({ 
            test: /\.(jpg|jpeg|png|gif|svg)$/i,
            optipng: {
                optimizationLevel: 9
            },
            plugins: [
                imageminMozjpeg({
                  quality: 80,
                  progressive: true
                })
            ]
        }),
        ProvidePlugin,
    ],/* end plugins */
};/* end setting */