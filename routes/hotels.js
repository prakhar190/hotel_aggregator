var express = require('express');
var router = express.Router();

var http = require('http');
var colors =require('colors');
var healthstatus= require('../ping/health');
var expedia= require('expedia')({apiKey:"7pb5axaj6nm9yrk3f2ujajf5",cid:"55505",minorRev:"28",currencyCode:"INR"});







// To get the List of Hotels
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
     													 "Room": { "numberOfAdults": req.param('numberofadults') }
     													}
     										}
						}//end of options	

		healthstatus(function(health){
			if(health=='True')
			{	
				expedia.hotels.list(options, function(err, hotel_search_response){
    				if(err)throw new Error(err);
						

						
						if(hotel_search_response.HotelListResponse.HotelList)
						{
							var star= new Array();
							//console.log(hotel_search_response.HotelListResponse.HotelList.HotelSummary.length);
							//For saving The star value of hotel in the array star  
							for(i=0;i<hotel_search_response.HotelListResponse.HotelList.HotelSummary.length;i++) 
								{ 
									var s=hotel_search_response.HotelListResponse.HotelList.HotelSummary[i].hotelRating 
						 
									star[i]=parseInt(s); 

								}
							//console.log(star);
							//console.log(req);
							req.session['checkindate']=req.param('checkindate');
					

							req.session['checkoutdate']=req.param('checkoutdate');
						 
							console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<Success>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>".green.bold.underline);
							res.render('index',{title:'Hotel Search',hotels:hotel_search_response,star:star,user:req.user});
						} 
						else
						{
							console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<No Data Received>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>".red.bold.underline);
							res.redirect('/');
						}
				});	//end of expedia.hotels.list	

						
    		}//end of if
			else
			{
				res.redirect('/');
			}//end of else


		});// end of the function health status
	
	
});// end of post search

// For Displaying Hotel Information
router.get('/hotelinfo/:hotelId', function(req, res){
		
		//var checkout;
		//var checkin;
		var options = {
  						"customerSessionId" : "thisisauniqueID",
						"customerIpAddress" : "127.0.0.1",
  						"customerUserAgent" : "Chrome",
  						"HotelInformationRequest": {
    												"hotelId": req.param('hotelId'),
    												"options": "0"
  												}
				}// end of options
		var availableoptions = {
								"customerSessionId" : "thisisauniqueID",
  								"customerIpAddress" : "127.0.0.1",
  								"customerUserAgent" : "Chrome",
  								"HotelRoomAvailabilityRequest": {
    															"hotelId": req.param('hotelId'),
    															"arrivalDate": req.session['checkindate'],
    															"departureDate": req.session['checkoutdate'],
    															"includeDetails": "true",
    															"includeRoomImages":"true",
    															"RoomGroup": {
      																			"Room": { "numberOfAdults": "2"}
    																		}
  															}
							}// end of available options
		var roomimageoptions = {
  						"customerSessionId" : "thisisauniqueID",
  						"customerIpAddress" : "127.0.0.1",
  						"customerUserAgent" : "Chrome",
  						"HotelRoomImagesRequest": {
    												"hotelId": req.param('hotelId'),
  												}
					};
		healthstatus(function(health){
			if(health=='True')
			{
				expedia.hotels.info(options, function(err, hotel_information_response){
    				if(err)throw new Error(err);
    				//console.log(hotel_information_response);
    				var star=hotel_information_response.HotelInformationResponse.HotelSummary.hotelRating;
    				console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<Success>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>".green.bold.underline);
    				console.log(req.param('hotelId'));
    				expedia.hotels.availability(availableoptions, function(err, hotel_available_response){
    					if(err)throw new Error(err);
    					//checkin=req.session['checkindate'];
    					//checkout=req.session['checkoutdate'];
						var checkout=req.session.checkoutdate;
    					console.log(hotel_available_response);
    					//console.log(checkin);
    					//console.log(checkout);
    					expedia.hotels.roomImages(roomimageoptions, function(err, hotel_roomimage_response){
    						if(err)throw new Error(err);
    						console.log(JSON.stringify(hotel_roomimage_response));

					
    					res.render('hotelinfo',{title:'Hotel Information',hotelInfo:hotel_information_response,hotelAvail:hotel_available_response,user:req.user,star:star});
    					});// end of expedia.hotels.roomImages
    				});//end of expedia.hotels.availability
				});//end of expedia.hotels.info

				

				

			}

			else
			{
				res.redirect('/');
			}
			
		})// end of health status

});// end of get Hotel information

// To show Booking Page
router.get('/hotelbooking/:hotelId/:supplierType/:rateKey/:roomTypeCode/:rateCode/:chargeableRate/:bedTypeId', function(req, res){
	res.render('booking',{title:'Hotel Reservation'})

});
// To book a room in hotel
router.post('/book', function(req,res){
	var	options	={
					"customerSessionId" : "thisisauniqueID",
					"customerIpAddress" : "127.0.0.1",
					"customerUserAgent" : "Chrome",
					"HotelRoomReservationRequest":{
													"hotelId": "212503",
													"arrivalDate": "11/03/2015",
													"departureDate": "11/04/2015",
													"supplierType": "E",
    												"rateKey": "45ce2163-f172-48d4-bca7-2a96790c8831",
    												"roomTypeCode": "202383",
    												"rateCode": "491730",
    												"chargeableRate": "15176.71",
    												"RoomGroup":{
																	"Room":{
																			"numberOfAdults": "2",
																			"firstName": "Prakhar",
																			"lastName": "sharma",
																			"bedTypeId": "15",
																			"smokingPreference": "NS"
																		}
    														},
    												"ReservationInfo": {
      																	"email": "prakhar.sharma190@gmail.com",
      																	"firstName": "Prakhar",
      																	"lastName": "sharma",
      																	"homePhone": "8896150662",
      																	"workPhone": "9876543210",
      																	"creditCardType": "CA",
      																	"creditCardNumber": "5401999999999999",
      																	"creditCardIdentifier": "123",
      																	"creditCardExpirationMonth": "11",
      																	"creditCardExpirationYear": "2015"
    														},
    												"AddressInfo": {
      																"address1": "travelnow",
      																"city": "Lucknow",
      																"stateProvinceCode": "UP",
      																"countryCode": "IND",
      																"postalCode": "226016"
    															}
  												}
				};// End of Options



		expedia.reservation.book(options, function(err, hotel_booking_response){
    	if(err)throw new Error(err);
    	console.log(hotel_booking_response);
    	res.redirect('/');
	});
});//End of Hotel Booking


module.exports = router;