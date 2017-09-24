const path = require('path');
const Merge = require('webpack-merge');
const CommonConfig = require('./webpack.common');

module.exports = function () {
    return Merge(CommonConfig, {
        devtool: 'source-map',

        output: {
            path: path.join(__dirname, '../lib'),
            filename: 'featureops.sdk.min.js'
        }
    })
}