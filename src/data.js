const request = require('./request.js');
const baseUrl = 'https://app.featureops.com/api/';

module.exports = {
    getFlags: function (authKey) {
        return request.get(authKey, baseUrl + 'flags');
    },
    updateFlagRequest: function (authKey, codeToken) {
        return request.post(baseUrl + 'flags', { authKey, codeToken });
    }
};