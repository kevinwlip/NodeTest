
var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');
var mongoDBURI = process.env.MONGODB_URI || 'mongodb://agentkip:password3@ds259245.mlab.com:59245/heroku_w56bp7lk';

var bodyParser = require('body-parser');
var path = require('path');
var querystring = require('querystring');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

//LOAD the various controllers
//var controllerMain = require('../controllers/main');   //this will load the main controller file
var controllerMongoCollection = require('../controllers/database'); //load controller code dealing with database mongodb and Orders collection


router.post('/', function (request, response) {
    console.log(req.body);
    var body = JSON.stringify(req.body);
    var params = JSON.stringify(req.params);

});//end router.post

//CODE to route /storeData to appropriate  Controller function
//*
//* mongodb get all of the Orders in Orders collection
//      and Render information with an ejs view
router.post('/storeData', controllerMongoCollection.storeData);

module.exports = router;