
var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');
var path = require ('path');
var querystring = require('querystring');

router.use(bodyParser.urlencoded({ extended: true }));

//now processing post
router.post('/readNameAndRespond', function(req, res, next) {
//expecting data variable called name --retrieve value using body-parser
    var value_name = req.body.name;  //retrieve the data associated with name
    res.send("hello " + value_name);
});
