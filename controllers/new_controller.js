// Our Fist-to-Five controller
// =====================

var express = require("express");
var router = express.Router();
var db = require("../models/");

// GET ROUTES
router.get("/", function(req, res) {
    db.Fist5.findAll({

        attribute: ['topic'],
        order: 'ID DESC',
        limit: 5
    }).then(function(dbFist5) {
        console.log(JSON.stringify(dbFist5[0].dataValues));
        res.render("index", {"items": dbFist5})

    });
})

router.get("/add", function(req, res) {
    res.render("add")
});

router.get("/history", function(req, res) {
    res.render("history")
});

// POST ROUTES
router.post("/", function(req, res) {
    var count = req.body.count;
    db.Fist5.findById(1).then(dbFist5 => {
        return (dbFist5).increment({
            'count': 1,
            count: 1
        })
    });
    console.log(count);
    //needs to post updates to F1, F2, F3, F4, F5
    res.redirect("/")
})

router.post("/add", function(req, res) {
    var task = req.body.task;
    console.log(task);
    db.Fist5.create({
            topic: task,
            count: 0,
            f1: 0,
            f2: 0,
            f3: 0,
            f4: 0,
            f5: 0,
            ftotal: 0,
            favg: 0,
        })
        // pass the result of our call
        .then(function(dbFist5) {
            // log the result to our terminal/bash window
            // redirect
            console.log(dbFist5);
            var data = JSON.stringify(dbFist5);
            console.log("data: = " + data);
            console.log(data.topic);
            res.redirect("/");
        });

})

module.exports = router;