# Feature Ops - JavaScript (Client & Node.js) SDK
Official JavaScript (Client & Node.js) Library for the Feature Ops Web API

## Features
- Provide (and evaluate) feature flags settings for the client and/or the server
- Capture and store feature flag statistics within the Feature Ops application
- Improve performance via feature flag caching

## Support
The Feature Ops JavaScript Client SDK supports the following browsers:

* Chrome
* Internet Explorer (IE10+)
* Firefox
* Safari

## Install

### Client or Server

`$ npm install featureops`

`import featureops from 'featureops';`

(The client is compatible with [Browserify](http://browserify.org/) or [Webpack](https://webpack.js.org/).)

### Client

If you are not using a front-end build process, the client can also be installed via a `script` tag.

Production version:

`<script src="https://app.featureops.com/featureops.min.js"></script>`

Development version:

`<script src="https://app.featureops.com/featureops.js"></script>`

(If you are using the client without Browserify or Webpack, `featureops` will be accessible from the global.)

## Quick Start

```js
var options = {
    pollingInterval: 5 // number, in minutes, to refresh local feature flag cache, default is 5
};
var client = featureops('{ENVIRONMENT_AUTH_KEY}', options);

client.init().then(function () {
    var targets = [ /* Optional array of target strings to evaluate feature against */];

    client.evalFlag('{CODE_TOKEN}', targets).then(function (isOn) {
        if (isOn) {
            // Feature Is On
        }
        else {
            // Feature Is Off
        }
    })
    .catch(function (error) { /* Take Error Action */ });
})
.catch(function (error) { /* Take Error Action */ });
```

## API

An instance of the Feature Ops client can be obtained by passing your `environmentAuthKey` along with an optional `options` object containing configuration properties.  You should only create one client during the lifetime of your applicaiton.

`var client = featureops(environmentAuthKey, options);`

`environmentAuthKey`:  Your private environment key accessed, from within the Feature Ops application, by selecting the environment for which you choose to target.

`options`: An optional object of properties that are used to configure the Feature Ops client.

|Key|Type|Value|
|---|---|---|
|pollingInterval|number|The amount of time, in minutes, that the Feature Ops client should check for changes to its feature flags cache|

### Client Methods

`client.init()`

Returns a [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) after the call is complete.  This method call should be made on application load as it will fetch and locally cache feature flag settings for the environment that you are targeting.  Upon success, you are free to make calls to `evalFlag`, as needed, to evaluate whether a feature is 'on' or 'off'.

```js
client.init().then(function () {
    // Ready to go!
})
.catch(function (error) { /* Take Error/Fallback Action */ });
```

***

`client.evalFlag(codeToken, targets)`

Returns a [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) after the call is complete.  This method call should be made when you need to determine if a feature, for a given user, is 'on' or 'off'.

`codeToken`:  A string that was defined when adding the feature to the Feature Ops application.  This is the unique code identifier when accessing its feature flag settings.

`targets`:  An array of strings, which pertain to the end user, that will be used to evaluate whether or not a feature flag should be 'on' or 'off'.  These will only impact the feature flag evaluation if the feature flag setting, for the environment that you are targeting, is set to 'Targets On' otherwise the `targets` will simply be ignored.

```js
client.evalFlag(codeToken, targets).then(function (isOn) {
    if (isOn) {
        // Feature Is On
    }
    else {
        // Feature Is Off
    }
})
.catch(function (error) { /* Take Error/Fallback Action */ });
```

***

## License

[MIT License](https://github.com/featureops/featureops-javascript/blob/master/LICENSE)