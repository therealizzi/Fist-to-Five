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
        // console.log(JSON.stringify(dbFist5[0].dataValues));
        var hbsObject = { fist5: dbFist5 };
        // console.log("what " + hbsObject);
        return res.render("index", hbsObject);
        // res.render(dbFist5)

    });
})

router.get("/add", function(req, res) {
    res.render("add")
});

router.get("/history", function(req, res) {
    db.Fist5.findAll({
            order: 'ID DESC'
        })
        .then(function(dbFist5) {
            var hbsObject = { fist5: dbFist5 };
            return res.render("index", hbsObject);


        });

});

// POST ROUTES
router.post("/", function(req, res) {
    var fistSplit = req.body.count;
    fistSplit = (fistSplit).split(".");
    fistSelected = fistSplit[1];
    console.log(fistSplit);
    var topicID = parseInt(fistSplit[0]);
    var fist1 = 0;
    var fist2 = 0;
    var fist3 = 0;
    var fist4 = 0;
    var fist5 = 0;
    switch (fistSelected) {
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
    // console.log("request body" + req.body.count);
    db.Fist5.findById(topicID).then(dbFist5 => {
        console.log("Help ME!");
        var total = (JSON.stringify(dbFist5.ftotal) + fistNum);
        var count = (JSON.stringify(dbFist5.count) + 1);
        var average = total / count;
        console.log("Total = " + total);
        console.log("count = " + count);
        console.log("average = " + average);
        (dbFist5).update({
            'favg': average
        })
        return (dbFist5).increment({
            'count': 1,
            'f1': fist1,
            'f2': fist2,
            'f3': fist3,
            'f4': fist4,
            'f5': fist5,
            'ftotal': fistNum
        })

    });
    // console.log(count);
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