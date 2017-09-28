const express = require('express');
const app = express();
const path = require('path');
const featureops = require('featureops');

var client = new featureops('{ENVIRONMENT AUTH KEY}');

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use(express.static('public'))

app.get("/", (req, res) => {
    client.evalFlag('{CODE TOKEN}').then(function (isOn) {
        res.render("index", { status: 'Feature Is ' + (isOn ? 'On' : 'Off') });
    })
    .catch(function (error) { /* Take Error Action */ });
});

client.init().then(function () {
    app.listen(3000, function () {
        console.log('Example listening on port 3000!');
    });
})
.catch(function (error) { /* Take Error Action */ });