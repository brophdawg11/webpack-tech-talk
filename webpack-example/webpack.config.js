// Demo Agenda:
//  - Zero-config
//  - development mode -> bundled file
//  - Enable babel-loader to show transformed code
//     - Remove prior to tree shaking
//  - Load images via file loader, then via url-loader
//  - Move styles into imports
//  - Show html-webpack-plugin
//  - Show Visualizer Plugin
//  - Show tree shaking
//  - Show dynamic imports
//  - Show hot reloading
//  - Show aliases?

const HtmlWebpackPlugin = require('html-webpack-plugin');
const Visualizer = require('webpack-visualizer-plugin');

module.exports = {
    mode: 'development',
    devtool: 'source-map', // false,
    stats: 'verbose',
    module: {
        rules: [{
            test: /.js$/,
            loader: 'babel-loader',
            options: {
                presets: [ 'env' ],
                plugins: [ 'dynamic-import-webpack' ],
            },
        }, {
            test: /.css$/,
            use: [
                'style-loader/url',
                'file-loader'
            ],
        }, {
            test: /.gif$/,
            // loader: 'file-loader',
            loader: 'url-loader',
            options: {
                limit: 1000000,
            },
        }],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html'
        }),
        new Visualizer(),
    ],
    devServer: {
        index: 'index.html',
        inline: true,
        hot: true,
        hotOnly: true,
        contentBase: `${__dirname}/dist`,
        publicPath: '/',
        port: 8000,
    },
};




