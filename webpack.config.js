const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const SassPlugin = require('sass-webpack-plugin');
// var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

/* setting */
const public = {
    publicPath: '../',
    partake: 'dist/'
};
module.exports = {
    mode:'none',
    entry: './src/js/app.js',
    output:{
        path: path.resolve(__dirname, './dist'),
        // filename: '[name].js',
        publicPath: public.partake,
    },
    // resolve:{
    //     modules: [
    //         path.resolve('src'),
    //         path.resolve('src/js'),
    //         path.resolve('src/sass'),
    //         path.resolve('src/images'),
    //     ],
    //     extensions: ['.js'] //加上JS附檔名
    // },/* end resolve */
    module:{
        rules:[
            {
                test:/\.html$/,
                use: [
                    {
                        loader:'file-loader',
                        options:{
                            name:'[name].[ext]'
                        }
                    }
                ],
                exclude: path.resolve('./node_modules'),
            },/* end file loader */
            {
                test: /\.(sass|scss|css)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                ],
                exclude: path.resolve('./node_modules'),
            },/* end sass loader */
            {
                test: /\.(js)$/,
                use:'babel-loader',
                include: path.resolve('.'),
                exclude: path.resolve('./node_modules'),
            },/* end js loader */
        ]
    },/* end module */
    plugins:[
        new CleanWebpackPlugin(), /* clean dist file */
        new HtmlWebpackPlugin(), /* init new hash assets file */
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
        }),
    ],/* end plugins */
};/* end setting */