const request = require('superagent');

module.exports = {
    get: function (authKey, url) {
        return request.get(url).set('x-featureops-auth-token', authKey);
    },
    post: function (url, value) {
        return request.post(url).send(value);
    }
};