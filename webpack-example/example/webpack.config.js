const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const Visualizer = require('webpack-visualizer-plugin');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: `${__dirname}/dist`,
        //publicPath: '/dist/',
        filename: '[name].js',
    },
    devtool: 'source-map',
    module: {
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader',
            options: {
                presets: [[ 'env', { modules: false } ]],
                plugins: [ 'dynamic-import-webpack' ],
            },
        }, {
            test: /\.css$/,
            use: [
                'style-loader',
                'css-loader',

                // 'style-loader/url',
                // 'file-loader',

                // MiniCssExtractPlugin.loader,
                // 'css-loader',
            ],
        }, {
            test: /\.scss$/,
            use: [
                'style-loader',
                'css-loader',
                'sass-loader',
            ],
        }, {
            test: /\.gif$/,
            // loader: 'url-loader',
            // options: {
            //     limit: 1000000,
            //     name: '[name].[hash].[ext]',
            // },
            loader: 'file-loader',
            options: {
                name: '[name].[hash].[ext]',
            },
        }],
    },
    plugins: [
        // new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({
            template: './index.html'
        }),
        new Visualizer(),
    ],
    devServer: {
        index: 'index.html',
        inline: true,
        contentBase: `${__dirname}/dist`,
        publicPath: '/',
        port: 8000,
    },
};
