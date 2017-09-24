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
                exclude: /node_modules/
            }
        ],
    }
};