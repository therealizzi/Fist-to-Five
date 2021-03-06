// set up the dependencies
var path = require("path");
var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");

// bring in the models
var db = require("./models");

var app = express();
// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(path.join(__dirname, 'public')));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}));
// override with POST having ?_method=DELETE
app.use(methodOverride("_method"));
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({
    defaultLayout: "main"
}));
app.set("view engine", "handlebars");

var router = require("./controllers/controller.js");

app.use("/", router);
app.use("/add", router);
app.use("/history", router);


// listen on port 3000
var port = process.env.PORT || 3000;
db.sequelize.sync().then(function() {
    app.listen(port);
});


module.exports = app;