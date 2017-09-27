const data = require('./data.js');

module.exports = function (authKey, options) {
    var api = {};
    var cache = [];
    options = options || {};
    options.pollingInterval = options.pollingInterval ? 60 * 1000 * options.pollingInterval : 60 * 1000 * 5;

    if (!authKey) {
        throw new Error('You must provide a Feature Ops Environment Auth Key.');
    }

    var refreshCache = function () {
        data.getFlags(authKey)
            .then(function (response) {
                for (var i = 0; i < response.body.value.length; i ++) {
                    var isInCache = false;

                    for (var i2 = 0; i2 < cache.length; i2 ++) {
                        if (response.body.value[i].codeToken == cache[i2].codeToken) {
                            isInCache = true;

                            if (cache[i2].isCanary && response.body.value[i].isCanary) {
                                // do nothing, persist original request for duration of user session
                            }
                            else {
                                cache[i2] = response.body.value[i];
                            }

                            break;
                        }
                    }

                    if (!isInCache) {
                        cache.push(response.body.value[i]);
                    }
                }
            })
            .catch(function (error) {
                var errorMessage = 'Unable to refresh Feature Ops cache: ' + error.toString();
                console.error(errorMessage);
            });
    }

    api.init = function () {
        return new Promise(function (resolve, reject) {
            data.getFlags(authKey)
                .then(function (response) {
                    if (!response.body.success) {
                        var errorMessage = 'Feature Ops failed to initialize with the API: ' + response.body.message;
                        console.error(errorMessage)
                        reject(errorMessage);
                    }
                    else {
                        cache = response.body.value;
                        setInterval(refreshCache, options.pollingInterval);
                        resolve();
                    }
                })
                .catch(function (error) {
                    var errorMessage = 'Feature Ops failed to initialize with the API: ' + error.toString();
                    console.error(errorMessage)
                    reject(errorMessage);
                });
        });
    };

    api.processFlag = function (codeToken, targets) {
        var isFlagFound = false;
        return new Promise(function (resolve, reject) {
            for (let i = 0; i < cache.length; i ++) {
                if (cache[i].codeToken.toLowerCase() === codeToken.toLowerCase()) {
                    if (cache[i].isOn && cache[i].targets.length === 0) {
                        resolve(true);
                    }
                    else if (cache[i].isOn && cache[i].targets.length > 0) {
                        for (var targetIdx = 0; targetIdx < targets.length; targetIdx ++) {
                            for (var cacheTargetIdx = 0; cacheTargetIdx < cache[i].targets.length; cacheTargetIdx ++) {
                                if (targets[targetIdx].toLowerCase() === cache[i].targets[cacheTargetIdx].toLowerCase()) {
                                    resolve(true);
                                }
                            }
                        }
                        resolve(false);
                    }
                    else {
                        resolve(false);
                    }
                    data.updateFlagRequest(authKey, codeToken)
                        .then(function (value) {
                            // take action if needed
                        })
                        .catch(function (error) {
                            // take action if needed
                        });
                    break;
                }
            }

            if (!isFlagFound) {
                resolve(false);
            }
        });
    };

    return api;
};