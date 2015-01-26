var express = require('express');
var router = express.Router();

var http = require('http');
var builder = require('xmlbuilder');
// http.setHeader('Authorization','Basic QUZGMjE4NzgxOmluZGlhbjE5MA==');
// http.setHeader('Content-Type','application/xml')
// var fs = require('fs');

/* GET home page. */
router.post('/search', function(req, res) {
	// var health = checkHealth();
  
  	// Set up the request
	var search_req = http.get("http://apim-gateway.mmtcloud.com/mmt-htlsearch/1.0/PingService/v1.0/pingSOA?responseFormat=json&echoMessage=healthStatus", function(healthRes) {
	    healthRes.setEncoding('utf8');
	    healthRes.on('data', function (chunk) {
	    	var healthStatus = JSON.parse(chunk).ResponseCode.success;
	        if(healthStatus){
	        	// continue search
	        	var searchXML = builder.create('MMTHotelSearchRequest')
	        							.ele('POS')
	        								.ele('Requestor',{'type': 'B2C','idContext': 'AFF','id':'AFF218781','channel':'B2Cweb'})
	        								.up()
	        								.ele('Source', {'iSOCurrency':'INR'})
	        								.up().up()
	        							.ele('ResultTransformer')
	        								.ele('GuestRecommendationEnabled', { 'maxRecommendations':'1' }, true)
	        							.end({pretty: true})
	        	console.log(searchXML)

	        }else{
	        	// redirect with error message
	        	res.redirect('/');
	        }
	    });
	}).on('error',function(e){
		console.log("Something went wrong: " + e.message);
	});

	// post the data
  	// search_req.write();
  	// search_req.end();
});

module.exports = router;
