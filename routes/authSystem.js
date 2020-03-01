const express = require("express");
const router = express.Router();
const csrf = require("csurf");
const User= require("../models/user");
//var session = require("express-session");

//var loginFail = 0;
//router.use(csrfProtection);

const userController = require("../Controller/userController");

router.post("/addUser/", function(req, res, next){
    res.locals.session = req.session;
    next()
},
userController.addUser);

router.get("/leader/", function(req, res, next){
    res.locals.session = req.session;
    next()
},
userController.leader);
router.get("/developer/", function(req, res, next){
    res.locals.session = req.session;
    next()
},
userController.develop);
//from
router.get("/hint/", function(req, res, next){
    res.locals.session = req.session;
    next()
},
userController.hint);
//end
//from
router.get("/finish/", function(req, res, next){
    res.locals.session = req.session;
    next()
},
userController.finish);
//end
router.get("/logged/", function (req, res, next) {

    if (!req.session.email){
        //req.session.email = "hari@gmail.com";
        res.redirect("/");
    }
    
    res.locals.session = req.session
    res.set({
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
    })
    next()
},
    userController.loggedPage
);

router.post("/loginCheck/", function (req, res, next) {
    res.locals.session = req.session;
    res.locals.session.loginFail = 0;
    next();
},
    userController.loginCheck
);

router.get("/logout/", function (req, res, next) {
    req.session.email = null;
    res.redirect("/");
});

router.get("/", function (req, res, next) {
    if (req.session.email)
        res.redirect("/logged/");
    res.set({
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
    });
    res.locals.session = req.session;
    next()
},
    userController.landingPage
);

router.post("/validateAnswer/", function (req, res, next) {
   res.locals.session = req.session
   res.locals.text = req.body.name
   next()
},
    userController.validateAnswer
);



router.post("/checkEmail/", function(req, res, next){
    //console.log(req.body.email);
    res.locals.email = req.body.email
    next()
},
    userController.checkEmail
);

router.post("/logged/", function(req, res, next){
    res.redirect("/logged/");
});


router.get("/franchise/", function(req, res, next){
    res.locals.session = req.session;
    next();
},
    userController.franchise);

router.post("/franchise/", function(req,res,next){
        var players=req.body.play;
        var p1=players[0];
        var p2= players[1];
        var p3= players[2];
        //var franchise= res.locals.franchise;
        var email= req.session.email;
        console.log(players);
        var k=0,franchise;
        var myquery = { email: email };
        var newvalues = { $set: {player1 : p1, player2 : p2, player3 : p3}};
        User.updateOne(myquery, newvalues, function(err, res){
            if(err) throw err;
        });

res.redirect("/logged/");
});

router.post("/addFranchise/", function(req, res, next){
    console.log("hi");
    console.log("The email is " + req.session.email);
    res.locals.email = req.session.email;
    res.locals.franchise = req.body.franchise;
    next();
},
userController.addFranchise
);

router.post("/addPlayer/",function(req,res,next){
    res.locals.email=req.session.email;
    res.locals.pla1=req.body.pl1;
    res.locals.pla2=req.body.pl2;
    res.locals.pla3=req.body.pl3;
},userController.addPlayer);


//router.get("
module.exports = router;