const xhr = require('request');

module.exports = {
    get: function (authKey, url, callback) {
        xhr.get(url,
            {
                headers: {
                    'x-featureops-auth-token': authKey,
                    'Content-Type': 'application/json'
                }
            }
        , callback);
    }
};