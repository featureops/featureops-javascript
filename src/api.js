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
        data.getFlags(authKey).then(function (value) {
            for (var i = 0; i < value.length; i ++) {
                var isInCache = false;

                for (var i2 = 0; i2 < cache.length; i2 ++) {
                    if (value[i].codeToken == cache[i2].codeToken) {
                        isInCache = true;

                        if (cache[i2].isCanary && value[i].isCanary) {
                            // do nothing, persist original request for duration of user session
                        }
                        else {
                            cache[i2] = value[i];
                        }

                        break;
                    }
                }

                if (!isInCache) {
                    cache.push(value[i]);
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
            data.getFlags(authKey).then(function (value) {
                cache = value;
                setInterval(refreshCache, options.pollingInterval);
                resolve();
            })
            .catch(function (error) {
                var errorMessage = 'Feature Ops failed to initialize with the API: ' + error.toString();
                console.error(errorMessage)
                reject(errorMessage);
            });
        });
    };

    api.evalFlag = function (codeToken, targets) {
        targets = targets ? targets : [];
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
                    data.updateFlagRequest(authKey, codeToken).then(function (value) {
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