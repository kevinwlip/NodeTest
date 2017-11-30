
var express = require('express'); // Include the Express JS module
var router = express.Router(); // route handler for GET, POST, and similar methods
var mongodb = require('mongodb'); // Include MongoDB module
var mongoDBURI = process.env.MONGODB_URI || 'mongodb://agentkip:password3@ds259245.mlab.com:59245/heroku_w56bp7lk'; // For MongoDB connection
var multer = require('multer'); // Node JS middleware for handling multipart/form-data, for uploading files
var upload = multer();
var bodyParser = require('body-parser'); // Module for handling POST, extracts body portion of an incoming request
var path = require('path');
var querystring = require('querystring');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));
router.use(upload.array());

module.exports.storeData =  function (request, response) {

    var body = JSON.stringify(req.body); // 'Stringify' converts a value into a JSON string
    var params = JSON.stringify(req.params);

    // Customers imported data
    var firstname = request.body.firstname; // designates variables for easier use below
    var lastname = request.body.lastname;
    var street = request.body.street;
    var city = request.body.city;
    var state = request.body.usastate
    var zipcode = request.body.zipcode;
    var email = request.body.email;

    // Billing imported data
    var credittype = request.body.credittype;
    var creditnumber = request.body.creditnumber;
    var expiryear = request.body.expiryear;
    var creditsecuritynumber = request.body.creditsecuritynumber;

    // Shipping imported data
    var shippingstreet = request.body.shippingstreet;
    var shippingcity = request.body.shippingcity;
    var shippingstate = request.body.shippingstate;
    var shippingzip = request.body.shippingzip;

    // Orders imported data
    var ordertotal = request.body.ordertotal;
    // var product_vector = request.body.products;

    var date = new Date();
    var currentdate = ((date.getMonth() + 1 ) + "-" + date.getDate() + "-" + date.getFullYear());

    mongodb.MongoClient.connect(mongoDBURI, function (err, db) {
        if (err) throw err;

        // To Generate a Random ID
        var customerID = Math.floor((Math.random() * 1000000000000) + 1);
        var billingID = Math.floor((Math.random() * 1000000000000) + 1);
        var shippingID = Math.floor((Math.random() * 1000000000000) + 1);
        var orderID = Math.floor((Math.random() * 1000000000000) + 1);


        // Get the MongoDB Collections
        var Customers = db.collection('CUSTOMERS');
        var Billing = db.collection('BILLING');
        var Shipping = db.collection('SHIPPING');
        var Orders = db.collection('ORDERS');


        // The customer document
        var customerInfo = {
            _id: customerID,
            FIRSTNAME: firstname,
            LASTNAME: lastname,
            STREET: street,
            CITY: city,
            STATE: state,
            ZIP: zipcode,
            EMAIL: email
        };

        // Inserts customer information into the collection
        Customers.insertOne(customerInfo, function (err, result) {
            if (err) throw err; // reports an error
        });


        // The billing document
        var billingInfo = {
            _id: billingID,
            CUSTOMER_ID: customerID,
            CREDITCARDNUM: creditnumber,
            CREDITCARDTYPE: credittype,
            CREDITCARDEXP: expiryear,
            CREDITCARDSECURITYNUM: creditsecuritynumber
        };

        // Inserts billing information into the collection
        Billing.insertOne(billingInfo, function (err, result) {
            if (err) throw err; // reports an error
        });


        // The shipping document
        var shippingInfo = {
            _id: shippingID,
            CUSTOMER_ID: customerID,
            SHIPPING_STREET: shippingstreet,
            SHIPPING_CITY: shippingcity,
            SHIPPING_STATE: shippingstate,
            SHIPPING_ZIP: shippingzip
        };

        // Inserts shipping information into the collection
        Shipping.insertOne(shippingInfo, function (err, result) {
            if (err) throw err; // reports an error
        });

        // The orders document
        var orderInfo = {
            _id: orderID,
            CUSTOMER_ID: customerID,
            BILLING_ID: billingID,
            SHIPPING_ID: shippingID,
            DATE: currentdate,
            //PRODUCT_VECTOR: {code, name, quantity, price},
            ORDER_TOTAL: ordertotal
        };

        // Inserts order information into the collection
        Orders.insertOne(orderInfo, function (err, result) {
            if (err) throw err; // reports an error
        });

        // Close the database connection when the app terminates
        db.close(function (err) {
            if (err) throw err; // reports an error
            respond.send("Testing")
        });
    });//end of connect
};//end function