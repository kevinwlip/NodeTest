// index.js
var express = require('express');
var router = express.Router();
var mongodb = require('mongodb')
var mongoDBURI = process.env.MONGODB_URI || 'mongodb://agentkip:password3@ds259245.mlab.com:59245/heroku_w56bp7lk';


//LOAD the various controllers
//var controllerMain = require('../controllers/main');   //this will load the main controller file
var controllerMongoCollection = require('../controllers/database'); //load controller code dealing with database mongodb and Orders collection

//MAY HAVE OTHER CODE in index.js

router.get('/mongodb', function (request, response) {

    mongodb.MongoClient.connect(mongoDBURI, function(err, db) {
        if(err) throw err;

        //get collection of orders
        var Orders = db.collection('Orders');

        //get all Orders
        Orders.find({ }).sort({ name: 1 }).toArray(function (err, docs) {

            if(err) throw err;

            response.render('/getAllOrders', {results: docs});

        });

        //close connection when your app is terminating.
        db.close(function (err) {
            if(err) throw err;
        });

    });//end of connect

});//end router.get



//CODE to route /getAllOrders to appropriate  Controller function
//**************************************************************************
//***** mongodb get all of the Orders in Orders collection w
//      and Render information iwith an ejs view
router.get('/getAllOrders', controllerMongoCollection.getAllOrders);

module.exports = router;