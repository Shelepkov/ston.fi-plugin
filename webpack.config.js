const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ZipPlugin = require('zip-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'combined.js',
        path: path.resolve(__dirname, 'plugin'),
    },
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
        ],
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                { from: 'public/', to: './' }
            ],
        }),
        new ZipPlugin({
            filename: 'murash.zip',
            path: path.resolve(__dirname, 'zip'),
            pathPrefix: ''
        })
    ],
};
