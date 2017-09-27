const { resolve } = require('path');
const webpack = require('webpack');

module.exports = {
    entry: [
        'babel-polyfill',
        './src/index.js'
    ],

    module: {
        rules: [
            {
                use: ['babel-loader'],
                exclude: /node_modules/
            }
        ],
    }
};