const FeatureOps = require('./api.js');

if (typeof window === 'undefined') {
}
else {
    window.FeatureOps = FeatureOps;
}

module.exports = FeatureOps;