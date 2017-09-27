var featureOps = FeatureOps('');

featureOps.init()
    .then(function () {
        featureOps.processFlag('FEATURE_A').then(function (isOn) {
            if (isOn) {
                console.log('Is On');
            }
            else {
                console.log('Is Off');
            }
        });
    })
    .catch(function (error) {
        console.error(error);
    });