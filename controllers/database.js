
var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');
var mongoDBURI = process.env.MONGODB_URI || 'mongodb://agentkip:password3@ds259245.mlab.com:59245/heroku_w56bp7lk';


var bodyParser = require('body-parser');
var path = require('path');
var querystring = require('querystring');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));
var asdf

module.exports.storeData =  function (request, response) {

    var orderTotal = request.body.order // designates variables for easier use below
    var code = request.body.code;
    var name = request.body.name;
    var quantity = request.body.quantity;
    var price = request.body.price;
    var firstname = request.body.firstname;
    var lastname = request.body.lastname;
    var street = request.body.street;
    var city = request.body.city;
    var state = request.body.state
    var zipcode = request.body.zipcode;
    var email = request.body.email;
    var product_vector = request.body.products;
    var creditnumber = request.body.creditnumber;
    var credittype = request.body.credittype;
    var creditsecuritynumber = request.body.creditsecuritynumber;
    var expiryear = request.body.expiryear;

    mongodb.MongoClient.connect(mongoDBURI, function (err, db) {
        if (err) throw err;

        var billingID = Math.floor((Math.random() * 1000000000000) + 1);
        var customerID = Math.floor((Math.random() * 1000000000000) + 1);
        var ordersID = Math.floor((Math.random() * 1000000000000) + 1);
        var shippingID = Math.floor((Math.random() * 1000000000000) + 1);

        //get collections
        var Billing = db.collection('BILLING');
        var Customers = db.collection('CUSTOMERS');
        var Orders = db.collection('ORDERS');
        var Shipping = db.collection('SHIPPING');

        //customer collection operation
        var customerData = {
            _id: customerID,
            FIRSTNAME: firstname,
            LASTNAME: lastname,
            STREET: street,
            CITY: city,
            STATE: state,
            ZIP: zipcode,
            EMAIL: email
        };

        Customers.insertOne(customerData, function (err, result) {
            if (err) throw err;
        });

        //shipping collection operation
        var shippingData = {
            _id: shippingID,
            CUSTOMER_ID: customerID,
            SHIPPING_STREET: street,
            SHIPPING_CITY: city,
            SHIPPING_STATE: state,
            SHIPPING_ZIP: zipcode
        };

        Shipping.insertOne(shippingData, function (err, result) {
            if (err) throw err;
        });

        //billing collection operation
        var billingData = {
            _id: billingID,
            CUSTOMER_ID: customerID,
            CREDITCARDNUM: creditnumber,
            CREDITCARDTYPE: credittype,
            CREDITCARDEXP: expiryear,
            CREDITCARDSECURITYNUM: creditsecuritynumber
        };

        Billing.insertOne(billingData, function (err, result) {
            if (err) throw err;
        });

        //orders collection operation
        var date = new Date();
        var current_date = (date.getMonth() + date.getDate() + date.getFullYear());
        var ordersData = {
            _id: ordersID,
            CUSTOMER_ID: customerID,
            BILLING_ID: billingID,
            SHIPPING_ID: shippingID,
            DATE: current_date,
            PRODUCT_VECTOR: {code, name, quantity, price},
            ORDER_TOTAL: orderTotal
        };

        Orders.insertOne(ordersData, function (err, result) {
            if (err) throw err;
        });

        //close connection when your app is terminating.
        db.close(function (err) {
            if (err) throw err;
        });
    });//end of connect
};//end function