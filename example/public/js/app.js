var client = featureops('{ENVIRONMENT AUTH KEY}');

client.init().then(function () {
    client.evalFlag('{CODE TOKEN}').then(function (isOn) {
        if (isOn) {
            document.getElementById('feature').innerHTML = 'Feature Is On';
        }
        else {
            document.getElementById('feature').innerHTML = 'Feature Is Off';
        }
    })
    .catch(function (error) { /* Take Error Action */ });
})
.catch(function (error) { /* Take Error Action */ });