var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload'
});
var http = require('http');

var ctrlProfile = require('../controllers/profile');
var ctrlAuth = require('../controllers/authentication');

// profile
router.get('/profile', auth, ctrlProfile.profileRead);

// authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

router.post('/search', function (req, res) {
    //http request to postegre
	console.log("in search api : " + req.body.brand_name);
    clean_brand_name=req.body.brand_name.replace(/\s/g, '%20');

	console.log("in search api : " + req.body.brand_name.replace(/\s/g, '%20'));
	var options = {
	  	host: '127.0.0.1',
		port: '6543',
	  	//path: '/api//brands?name=\'' + req.body.brand_name + '\''
	  	path: req.body.brand_name.replace(/\s/g, '%20')
	};
		
	callback = function(response) {
	  	var str = '';
        var json_obj={};
	
	  	//another chunk of data has been recieved, so append it to `str`
	  	response.on('data', function (chunk) {
	    	str += chunk;
		});

	  	//the whole response has been recieved, so we just print it out here
	  	response.on('end', function () {
            json_obj = JSON.stringify(eval("(" + str + ")"));
            //if (typeof JSON.parse(JSON.stringify(eval("(" + str + ")"))).data !== 'undefined' && JSON.parse(JSON.stringify(eval("(" + str + ")"))).data.lenght>0) {
            if (JSON.parse(JSON.stringify(eval("(" + str + ")"))).data[0]) {
                console.log("there is data");
                //console.log(JSON.parse(JSON.stringify(eval("(" + str + ")"))).data);
                res.status(200).send(str);
            } else {
                console.log("no data");
                //console.log(typeof (JSON.parse(JSON.stringify(eval("(" + str + ")"))).data))
                //console.log(JSON.parse(JSON.stringify(eval("(" + str + ")"))).data.lenght)
                //console.log(JSON.parse(JSON.stringify(eval("(" + str + ")"))).data)
                res.status(404).send(str);
            }
	  	});
	}
	
	
	http.request(options, callback).end();
});




module.exports = router;
