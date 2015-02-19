var express = require('express');
var router = express.Router();

var http = require('http');
var colors =require('colors');
var healthstatus= require('../ping/health');
var request = require('request');
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
						 
							console.log("Success>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>".green.bold.underline);
							res.render('index',{title:'Hotel Search',hotels:hotel_search_response,star:star,user:req.user});
						} 
						else
						{
							console.log("No Data Received>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>".red.bold.underline);
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
    				console.log("Success>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>".green.bold.underline);
    				console.log(req.param('hotelId'));
    				expedia.hotels.availability(availableoptions, function(err, hotel_available_response){
    					if(err)throw new Error(err);
    					//checkin=req.session['checkindate'];
    					//checkout=req.session['checkoutdate'];
						var checkout=req.session.checkoutdate;
    					//console.log(hotel_available_response);
    					//console.log(checkin);
    					//console.log(checkout);
    					expedia.hotels.roomImages(roomimageoptions, function(err, hotel_roomimage_response){
    						if(err)throw new Error(err);
    						//console.log(JSON.stringify(hotel_roomimage_response));

					
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
	res.render('booking',{title:'Hotel Reservation',req:req})

});
// To book a room in hotel
router.post('/book', function(req,res){
	var split=req.param('cardholdername').split(' ');
	var options={ 
					'hotelId':req.param('hotelId'),
					'arrivalDate':req.session['checkindate'],
					'departureDate':req.session['checkoutdate'],
					'supplierType':req.param('supplierType'),
					'rateKey':req.param('rateKey'),
					'roomTypeCode':req.param('roomTypeCode'),
					'rateCode':req.param('rateCode'),
					'chargeableRate':req.param('chargeableRate'),
					'room1':'2',
					'room1FirstName':req.param('firstname'),
					'room1LastName':req.param('lastname'),
					'room1BedTypeId':req.param('bedTypeId'),
					'room1SmokingPreference':'NS',
					'email':req.param('confirmationemail'),
					'firstName':split[0],
					'lastName': split[1],
					'homePhone':req.param('mobilenumber'),
					'workPhone':'789456',
					'creditCardType':'CA',
					'creditCardNumber':req.param('cardnumber'),
					'creditCardIdentifier':'123',
					'creditCardExpirationMonth':req.param('month'),
					'creditCardExpirationYear':req.param('year'),
					'address1':'travelnow',
					'city':'Lucknow',
					'stateProvinceCode':'UP',
					'countryCode':'IN',
					'postalCode':'226016'
					
				}
	request({
    			url:"https://book.api.ean.com/ean-services/rs/hotel/v3/res?apiKey=7pb5axaj6nm9yrk3f2ujajf5&cid=55505&customerIpAddress=&customerUserAgent=&customerSessionId=&minorRev=28&locale=en_US&currencyCode=INR&hotelId="+
    				options.hotelId+					"&arrivalDate="+
    				options.arrivalDate+				"&departureDate="+
    				options.departureDate+				"&supplierType="+
    				options.supplierType+				"&rateKey="+
    				options.rateKey+					"&roomTypeCode="+
    				options.roomTypeCode+				"&rateCode="+
    				options.rateCode+					"&chargeableRate="+
    				options.chargeableRate+				"&room1="+
    				options.room1+						"&room1FirstName="+
    				options.room1FirstName+				"&room1LastName="+
    				options.room1LastName+				"&room1BedTypeId="+
    				options.room1BedTypeId+				"&room1SmokingPreference="+
    				options.room1SmokingPreference+		"&email="+
    				options.email+						"&firstName="+
    				options.firstName+					"&lastName="+
    				options.lastName+					"&homePhone="+
    				options.homePhone+					"&workPhone="+
    				options.workPhone+					"&creditCardType="+
    				options.creditCardType+				"&creditCardNumber="+
    				options.creditCardNumber+			"&creditCardIdentifier="+
    				options.creditCardIdentifier+		"&creditCardExpirationMonth="+
    				options.creditCardExpirationMonth+	"&creditCardExpirationYear="+
    				options.creditCardExpirationYear+	"&address1="+
    				options.address1+					"&city="+
    				options.city+						"&stateProvinceCode="+
    				options.stateProvinceCode+			"&countryCode="+
    				options.countryCode+				"&postalCode="+
    				options.postalCode,
    			method: "POST",
    			json: true
    			
			}, function (error, response, body){
    				console.log(body);
    			    if(body.HotelRoomReservationResponse.EanWsError)
    			    {	
    			    	if(body.HotelRoomReservationResponse.EanWsError.ErrorAttributes)
    					{
    					var presentationMessage=body.HotelRoomReservationResponse.EanWsError.ErrorAttributes.presentationMessage
    					res.render('bookingerror',{title:'Booking Error',message:presentationMessage,user:req.user});
    					console.log("Error Generated>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>".red.bold);
    					console.log(presentationMessage);
    					}
    					if(body.HotelRoomReservationResponse.EanWsError)
    					{
    					var presentationMessage=body.HotelRoomReservationResponse.EanWsError.presentationMessage
    					res.render('bookingerror',{title:'Booking Error',message:presentationMessage,user:req.user});
    					console.log("Error Generated>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>".red.bold);
    					console.log(presentationMessage);
    					}
    				}	
    				if(body.HotelRoomReservationResponse.processedWithConfirmation==true)
    				{
    					res.render('bookingconfirmation',{title:'Booking Confirm',user:req.user});
    					console.log("Booking Done>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>".red.bold)
    				}
    				else
    				{
    					res.render('bookingerror',{title:'Booking Error',user:req.user});	
    				}

				}//end of function
		);
	
});//End of Post book


module.exports = router;