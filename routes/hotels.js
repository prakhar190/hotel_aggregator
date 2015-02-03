var express = require('express');
var router = express.Router();

var http = require('http');
var builder = require('xmlbuilder');
var healthstatus= require('../ping/health');

/* GET home page. */
router.post('/search', function(req, res) {
	// var health = checkHealth();
	var options = {
		hostname: 'apim-gateway.mmtcloud.com',
		path: '/mmt-htlsearch/1.0/search/v1.0/hotelSearch?responseFormat=json',
		method: 'POST',
		headers: {
			'Authorization': 'Basic QUZGMjE4NzgxOmluZGlhbjE5MA==',
			'Content-Type': 'application/xml'
		}
	};

	var search_response_body='';
  
  	// Set up the request
	healthstatus(function(health){
	        if(health){
	        	
	        	// continue search
	        	var searchXML = builder.create('MMTHotelSearchRequest')
	        							.ele('POS')
	        								.ele('Requestor',{'type': 'B2C','idContext': 'AFF','id':'AFF218781','channel':'B2Cweb'})
	        								.up()
	        								.ele('Source', {'iSOCurrency':'INR'})
	        								.up().up()
	        							.ele('ResultTransformer')
	        								.ele('GuestRecommendationEnabled', { 'maxRecommendations':'1' }, true).up()
	        								.ele('PriceBreakupEnabled', true).up()
	        								.ele('CancellationPolicyRulesReq', { 'text':'yes' }).up()
	        							.up()
	        							.ele('ResultPreferences')
	        								.ele('ResultPreference')
	        									.ele('Pagination',{'paginate':'false'}).up()
	        								.up()
	        							.up()
	        							.ele('SearchCriteria')
	        								.ele('Criterion')
	        									.ele('Area')
	        										.ele('CityCode','LKO').up()
	        										.ele('CountryCode','IN').up()
	        									.up()
	        									.ele('RoomStayCandidates')
	        										.ele('RoomStayCandidate')
	        											.ele('GuestCounts')
	        												.ele('GuestCount',{'count':1,'ageQualifyingCode':10}).up()
	        											.up()
	        										.up()
	        									.up()
	        									.ele('StayDateRanges')
	        										.ele('StayDateRange',{'start':'2015-02-14','end':"2015-02-16"}).up()
	        									.up()
	        								.up()
	        							.up()  
	        							.end({pretty: true})
	        	console.log(searchXML);
	        	var search_req = http.request(options,function(searchRes){
	        		searchRes.setEncoding('utf8');
					searchRes.on('data', function (chunk) {
					   // console.log('RES BODY: ' + chunk);
					   search_response_body += chunk;
					});
					searchRes.on('end',function(){
						//For saving The star value of hotel in the array star
						var star= new Array();
						for(i=0;i<JSON.parse(search_response_body).HotelSearchResults.Hotels.length;i++)
							{
								var s=JSON.parse(search_response_body).HotelSearchResults.Hotels[i].PropertyInfo.Facets[0].FacetValue.value;
						
								star[i]=parseInt(s);

							}

						//console.log(star);

						res.render('index',{ title: 'Hotel Search', hotels: JSON.parse(search_response_body),star:star,user: req.user  } )
					});
	        	
					});

	        	// post the data
  				search_req.write(searchXML);
  				search_req.end();

	        }else{
	        	// redirect with error message
	        	res.redirect('/');
	        }
	    	
	    
	
	});
});
router.get('/signout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

module.exports = router;
