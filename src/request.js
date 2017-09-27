const request = require('superagent');

module.exports = {
    get: function (authKey, url) {
        return new Promise(function (resolve, reject) {
            request.get(url).set('x-featureops-auth-token', authKey).then(function (response) {
                if (!response.body.success) {
                    reject(response.body.message);
                }
                else {
                    resolve(response.body.value);
                }
            })
            .catch(function (error) {
                reject(error);
            });
        });
    },
    post: function (url, value) {
        return new Promise(function (resolve, reject) {
            request.post(url).send(value).then(function (response) {
                if (!response.body.success) {
                    reject(response.body.message);
                }
                else {
                    resolve(response.body.value);
                }
            })
            .catch(function (error) {
                reject(error);
            });
        });
    }
};