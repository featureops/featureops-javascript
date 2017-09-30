const featureops = require('./api.js');

if (typeof window === 'undefined') {
}
else {
    window.featureops = featureops;
}

module.exports = featureops;