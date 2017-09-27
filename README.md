# Feature Ops - JavaScript (Client & Node.js) SDK
Official JavaScript (Client & Node.js) Library for the Feature Ops Web API

## Features
- Provide feature flags settings to the client and/or the server
- Catpure and store feature flag statistics

## Support
The Feature Ops JavaScript Client SDK supports the following browsers:

* Chrome
* Internet Explorer (IE10+)
* Firefox
* Safari

## Install

### Client or Server

`$ npm install featureops`

`import featureops from 'featureops'`

(The client is compatible with Browserify or Webpack.)

### Client

The client can also be installed via a `script` tag:

`<script src="https://app.featureops.com/featureops.min.js">`

## Quick Start

```js

    var options = {
        pollingInterval: 5 // number in minutes, default is 5
    };

    var client = FeatureOps('{ENVIRONMENT AUTH KEY}', options);

    // Initialization of Feature Ops Client
    client.init().then(function () {
        // Upon succesful initilization, fetch feature flags settings
        var targets = [ /* Optional array of target strings to evaluate feature against */];
        client.processFlag('{CODE TOKEN}', targets).then(function (isOn) {
            if (isOn) {
                // Feature Is On
            }
            else {
                // Feature Is Off
            }
        })
        .catch(function (error) {
            // Process Flag Error
        });
    })
    .catch(function (error) {
        // Initialization Error
    });
```
## License

[MIT License](https://github.com/featureops/featureops-javascript/blob/master/LICENSE.md)