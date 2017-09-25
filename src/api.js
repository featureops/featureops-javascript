const data = require('./data.js');

module.exports = function (authKey, options) {
    var api = {};
    var cache = [];
    options = options || {};
    
    if (!authKey) {
        throw new Error('You must provide a Feature Ops Environment Auth Key.');
    }

    api.connect = function () {
        data.getFlags(authKey, function (response) {
            cache = response.value;
        });
    };

    api.checkFlag = function (codeToken, targets) {

    };

    return api;
};