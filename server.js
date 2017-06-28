"use strict"

var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var UserWatched = require("./model/userwatched");

var app = express();
var router = express.Router();

var port = process.env.API_PORT || 8080;

mongoose.connect('mongodb://admin:admin@ds119380.mlab.com:19380/reactmovieapp');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
 res.setHeader("Access-Control-Allow-Origin", "*");
 res.setHeader("Access-Control-Allow-Credentials", "true");
 res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
 res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");

 res.setHeader("Cache-Control", "no-cache");
 next();
});

router.get("/", function(req, res) {
 res.json({ message: "API Initialized!"});
});

router.route("/userwatched")
 
 .get(function(req, res) {
 
 UserWatched.find( function(err, userwatched) {
     
 if (err)
 res.send(err);

 res.json(userwatched)
 });
 })

 .post(function(req, res) {
 var userwatched = new UserWatched();

 userwatched.userID = req.body.userID;
 userwatched.movieID = req.body.movieID;
 userwatched.addedOrder = req.body.addedOrder;
 userwatched.save(function(err) {
 if (err)
 res.send(err);
 res.json({ message: "UserWatched successfully added!" });
 });
 });

router.route("/userwatched/:userID")

.get(function(req, res) {

UserWatched.find(req.query, function(err, userwatched) {
     
 if (err)
 res.send(err);

 res.json(userwatched)
 });
    
})

router.route("/userwatched")

 .delete(function(req, res) {
 UserWatched.findOneAndRemove({movieID: req.query.movieID, userID:req.query.userID,}, function(err, userwatched) {
 if (err)
 res.send(err);
 res.json({ message: "userwatched has been deleted", movie: req.query.movieID, user: req.query.userID })
 })
 });

app.use("/api", router);

app.listen(port, function() {
 console.log(`api running on port ${port}`);
});