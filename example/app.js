const express = require('express');
const app = express();
const path = require('path');

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
    res.render("index");
});

app.listen(3000, function () {
    console.log('Example listening on port 3000!')
})