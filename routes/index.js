
var express = require('express'); // Include the Express JS module
var router = express.Router(); // route handler for GET, POST, and similar methods
var mongodb = require('mongodb'); // Include MongoDB module
var mongoDBURI = process.env.MONGODB_URI || 'mongodb://agentkip:password3@ds259245.mlab.com:59245/heroku_w56bp7lk'; // For MongoDB connection
var multer = require('multer'); // Node JS middleware for handling multipart/form-data, for uploading files
var upload = multer();
var bodyParser = require('body-parser'); // Module for handling POST, extracts body portion of an incoming request
var path = require('path'); // Modulre for path manipulation of directories and files, strips duplicate slashes
var querystring = require('querystring'); // Module for parsing and formatting URL query strings

router.use(bodyParser.json()); // For parsing json
router.use(bodyParser.urlencoded({extended: true})); // For parsing urlencoded
router.use(upload.array()); // For uploading an array of files

//LOAD the various controllers
var controllerMongoCollection = require('../controllers/database'); //load controller code dealing with database mongodb and Orders collection

//CODE to route /storeData to appropriate Controller function
//*
//* mongodb get all of the Orders in Orders collection
//      and Render information with an ejs view
router.post('/storeData', controllerMongoCollection.storeData);

module.exports = router;