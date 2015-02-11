var express = require('express');
var router = express.Router();

var http = require('http');
var builder = require('xmlbuilder');
var healthstatus= require('../ping/health');
var expedia= require('expedia')({apiKey:"7pb5axaj6nm9yrk3f2ujajf5",cid:"55505",minorRev:"28",currencyCode:"INR"});

router.post('/search', function(req, res) {
		var options = {
  						"customerSessionId" : "thisisauniqueID",
  						"customerIpAddress" : "127.0.0.1",
  						"customerUserAgent" : "Chrome",
  						"HotelListRequest": {
  											"city": req.param('location'),
    										"stateProvinceCode": "IND",
											"countryCode": "IND",
    										"arrivalDate": req.param('checkindate'),
    										"departureDate":req.param('checkoutdate'),
    										"RoomGroup":{
     													 "Room": { "numberOfAdults": "2" }
     													}
     										}
						}//end of options	


		healthstatus(function(health){
			if(health=='True')
			{	
				expedia.hotels.list(options, function(err, hotel_search_response){
    			if(err)throw new Error(err);
    			//console.log(hotel_search_response.HotelListResponse.HotelList.HotelSummary.length);
    			//For saving The star value of hotel in the array star 
						var star= new Array(); 
						for(i=0;i<hotel_search_response.HotelListResponse.HotelList.HotelSummary.length;i++) 
							{ 
								var s=hotel_search_response.HotelListResponse.HotelList.HotelSummary[i].hotelRating 
						 
								star[i]=parseInt(s); 

							} 

						//console.log(star);
						console.log(req) 
						

						
    			
    			res.render('index',{title:'Hotel Search',hotels:hotel_search_response,star:star,user:req.user});
				});
				
			}//end of if
			else
			{
				res.redirect('/');
			}//end of else


		});// end of the function health status
	
	
});// end of post search

module.exports = router;

