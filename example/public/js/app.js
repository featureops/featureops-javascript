var client = FeatureOps('{ENVIRONMENT AUTH KEY}');

client.init().then(function () {

    client.processFlag('{CODE TOKEN}').then(function (isOn) {
        if (isOn) {

        }
        else {

        }
    })
    .catch(function (error) {

    });

})
.catch(function (error) {

});