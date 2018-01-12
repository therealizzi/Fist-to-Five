// Fist-to-Five Controller
// =====================

// These are the dependencies
var express = require("express");
var router = express.Router();
var db = require("../models/");

// The Routes
// =====================

// This is the main index get route
router.get("/", function(req, res) {

    // Calls the database models and grabs the top 5 topics
    db.Fist5.findAll({
        attribute: ['topic'],
        order: 'ID DESC',
        limit: 5

        // Renders the index handlebars along with the topics
    }).then(function(dbFist5) {
        var hbsObject = { fist5: dbFist5 };
        return res.render("index", hbsObject);
    });
})

// This is the 'add' get route
router.get("/add", function(req, res) {

    // Renders the add html
    res.render("add")
});

// This is the 'history' get route
router.get("/history", function(req, res) {

    // Goes to the database and gets all topics
    db.Fist5.findAll({
        order: 'ID DESC'
    })

    // Renders the history html and topics
    .then(function(dbFist5) {
        var hbsObject = { fist5: dbFist5 };
        return res.render("history", hbsObject);
    });
});

// This is the main index post route
router.post("/", function(req, res) {

    // Gets the request body and grabs the button information
    var fistSplit = req.body.count;
    fistSplit = (fistSplit).split(".");
    fistSelected = fistSplit[1];
    var topicID = parseInt(fistSplit[0]);

    // Sets up empty variables for each button
    var fist0 = 0;
    var fist1 = 0;
    var fist2 = 0;
    var fist3 = 0;
    var fist4 = 0;
    var fist5 = 0;

    // Identifies which button was pressed and loads that variable with a '1'
    switch (fistSelected) {
        case "f0":
            var fistNum = 0;
            fist0 = 1;
            break;
        case "f1":
            var fistNum = 1;
            fist1 = 1;
            break;
        case "f2":
            var fistNum = 2;
            fist2 = 1;
            break;
        case "f3":
            var fistNum = 3;
            fist3 = 1;
            break;
        case "f4":
            var fistNum = 4;
            fist4 = 1;
            break;
        case "f5":
            var fistNum = 5;
            fist5 = 1;
            break;
        default:
            var fistNum = 0;
    }

    // Finds the topic that was used in the request
    db.Fist5.findById(topicID).then(dbFist5 => {
        var total = (JSON.stringify(dbFist5.ftotal) + fistNum);
        var count = (JSON.stringify(dbFist5.count) + 1);
        var average = total / count;
        var percent = average / 5 * 100;

        // Updates the favg column 
        (dbFist5).update({
            'favg': average,
            'fpct': percent
        })

        // Increments the appropriate button column
        return (dbFist5).increment({
            'count': 1,
            'f0': fist0,
            'f1': fist1,
            'f2': fist2,
            'f3': fist3,
            'f4': fist4,
            'f5': fist5,
            'ftotal': fistNum
        })
    });

    // Returns the client to the index page
    res.redirect("/")
})


// This is the post route for the add page
router.post("/add", function(req, res) {

    // Stores the new task from the request in a 'task' variable
    var task = req.body.task;

    // Creates a new topic in the database with all counts = 0
    db.Fist5.create({
        topic: task,
        count: 0,
        f0: 0,
        f1: 0,
        f2: 0,
        f3: 0,
        f4: 0,
        f5: 0,
        ftotal: 0,
        favg: 0,
        fpct: 0,
    })

    // Then passes the result and redirects client to index
    .then(function(dbFist5) {
        var data = JSON.stringify(dbFist5);
        res.redirect("/");
    });
})

module.exports = router;