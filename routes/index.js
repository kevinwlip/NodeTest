
var express = require('express');
var router = express.Router();

//now processing post
router.post('/readNameAndRespond', function(req, res, next) {
//expecting data variable called name --retrieve value using body-parser
    var value_name = req.body.name;  //retrieve the data associated with name
    res.send("hello " + value_name);
}
);

module.exports = router;
