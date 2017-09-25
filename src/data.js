const request = require('./request.js');
const baseUrl = 'https://app.featureops.com/api/';

module.exports = {
    getFlags: function (authKey, callback) {
        request.get(authKey, baseUrl + 'flags', function (err, resp, body) {
            callback(body);
        });
    }
};