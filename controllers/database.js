
var mongodb = require('mongodb');
var mongoDBURI = process.env.MONGODB_URI || 'mongodb://agentkip:password3@ds259245.mlab.com:59245/heroku_w56bp7lk';


/** getAllOrders controller logic that current does model logic too -connects to Mongo database and
 * queries the Orders collection to retrieve all the orders and build the output usig the
 * ejs template mongodb.ejs found in views directory
 * @param request
 * @param response
 *
 */
module.exports.getAllOrders =  function (request, response) {

    mongodb.MongoClient.connect(mongoDBURI, function(err, db) {
        if(err) throw err;

        //get collection of orders
        var Orders = db.collection('Orders');


        //FIRST showing you one way of making request for ALL orders and cycle through with a forEach loop on returned Cursor
        //   this request and loop  is to display content in the  console log
        var c = Orders.find({});

        c.forEach(
            function(myDoc) {
                console.log( "name: " + myDoc.name );  //just  loging the output to the console
            }
        );


        //SECOND -show another way to make request for ALL Orders  and simply collect the  documents as an
        //   array called docs that you  forward to the  getAllOrders.ejs view for use there
        Orders.find().toArray(function (err, docs) {
            if(err) throw err;

            response.render('getAllOrders', {results: docs});

        });


        //Showing in comments here some alternative read (find) requests
        //this gets Orders where frequency>=10 and sorts by name
        // Orders.find({ "frequency": { "$gte": 10 } }).sort({ name: 1 }).toArray(function (err, docs) {
        // this sorts all the Orders by name
        //  Orders.find().sort({ name: 1 }).toArray(fu namenction (err, docs) {


        //close connection when your app is terminating.
        db.close(function (err) {
            if(err) throw err;
        });
    });//end of connect
};//end function