// Our Fist-to-Five controller
// =====================

var express = require("express");
var router = express.Router();
var db = require("../models/");

// GET ROUTES
router.get("/", function(req, res) {
    res.render("index")
});

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

    //needs to post updates to Topic
    res.redirect("/")
})

module.exports = router;