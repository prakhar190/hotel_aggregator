var express = require('express');
var router = express.Router();

var http = require('http');
var colors = require('colors');
var healthstatus = require('../ping/health');
var config  = require('../config/config');
var request = require('request');
var expedia = require('expedia')({apiKey:"7pb5axaj6nm9yrk3f2ujajf5",cid:"55505",minorRev:"28",currencyCode:"INR"});
var disclaimer='It is the responsibility of the hotel chain and/or the individual property to ensure the accuracy of the photos displayed. Hotel Aggregator is not responsible for any inaccuracies in the photos.';






// To get the List of Hotels
router.post('/search', function (req, res) {
    var room1
    var room2
    var room3
    var room4
    var room5
    var room6
// Setting the variables for 0 child
    if(req.param('numberofchild')==0)
        {
            room1=req.param('numberofadults')
        }
    if(req.param('numberofchildroom2')==0)
        {
            room2=req.param('numberofadultsroom2')
        }
    if(req.param('numberofchildroom3')==0)
        {
            room3=req.param('numberofadultsroom3')
        }
    if(req.param('numberofchildroom4')==0)
        {
            room4=req.param('numberofadultsroom4')
        }
    if(req.param('numberofchildroom5')==0)
        {
            room5=req.param('numberofadultsroom5')
        }
    if(req.param('numberofchildroom6')==0)
        {
            room6=req.param('numberofadultsroom6')
        }


// Setting the variables for 1 child
    if(req.param('numberofchild')==1)
        {
            room1=req.param('numberofadults')+","+req.param('ageofchild1room1')
        }
    if(req.param('numberofchildroom2')==1)
        {
            room2=req.param('numberofadultsroom2')+","+req.param('ageofchild1room2')
        }
    if(req.param('numberofchildroom3')==1)
        {
            room3=req.param('numberofadultsroom3')+","+req.param('ageofchild1room3')
        }
     if(req.param('numberofchildroom4')==1)
        {
            room4=req.param('numberofadultsroom4')+","+req.param('ageofchild1room4')
        }
    if(req.param('numberofchildroom5')==1)
        {
            room5=req.param('numberofadultsroom5')+","+req.param('ageofchild1room5')
        }
    if(req.param('numberofchildroom6')==1)
        {
            room6=req.param('numberofadultsroom6')+","+req.param('ageofchild1room6')
        }



// Setting the variables for 2 child
    if(req.param('numberofchild')==2)
        {
            room1=req.param('numberofadults')+","+req.param('ageofchild1room1')+","+req.param('ageofchild2room1')
        }
    if(req.param('numberofchildroom2')==2)
        {
            room2=req.param('numberofadultsroom2')+","+req.param('ageofchild1room2')+","+req.param('ageofchild2room2')
        }
    if(req.param('numberofchildroom3')==2)
        {
            room3=req.param('numberofadultsroom3')+","+req.param('ageofchild1room3')+","+req.param('ageofchild2room3')
        }
    if(req.param('numberofchildroom4')==2)
        {
            room4=req.param('numberofadultsroom4')+","+req.param('ageofchild1room4')+","+req.param('ageofchild2room4')
        }
    if(req.param('numberofchildroom5')==2)
        {
            room5=req.param('numberofadultsroom5')+","+req.param('ageofchild1room5')+","+req.param('ageofchild2room5')
        }
    if(req.param('numberofchildroom6')==2)
        {
            room6=req.param('numberofadultsroom6')+","+req.param('ageofchild1room6')+","+req.param('ageofchild2room6')
        }


// Setting the variables for 3 child
    if(req.param('numberofchild')==3)
        {
            room1=req.param('numberofadults')+","+req.param('ageofchild1room1')+","+req.param('ageofchild2room1')+","+req.param('ageofchild3room1')
        }
    if(req.param('numberofchildroom2')==3)
        {
            room2=req.param('numberofadultsroom2')+","+req.param('ageofchild1room2')+","+req.param('ageofchild2room2')+","+req.param('ageofchild3room2')
        }
    if(req.param('numberofchildroom3')==3)
        {
            room3=req.param('numberofadultsroom3')+","+req.param('ageofchild1room3')+","+req.param('ageofchild2room3')+","+req.param('ageofchild3room3')
        }
    if(req.param('numberofchildroom4')==3)
        {
            room4=req.param('numberofadultsroom4')+","+req.param('ageofchild1room4')+","+req.param('ageofchild2room4')+","+req.param('ageofchild3room4')
        }
    if(req.param('numberofchildroom5')==3)
        {
            room5=req.param('numberofadultsroom5')+","+req.param('ageofchild1room5')+","+req.param('ageofchild2room5')+","+req.param('ageofchild3room2')
        }
    if(req.param('numberofchildroom6')==3)
        {
            room6=req.param('numberofadultsroom6')+","+req.param('ageofchild1room6')+","+req.param('ageofchild2room6')+","+req.param('ageofchild3room2')
        }

		var options = {
  						"customerSessionId" : config.customerSessionId,
  						"customerIpAddress" : req.header('x-forwarded-for') || req.connection.remoteAddress,
  						"customerUserAgent" : req.headers['user-agent'],
  						"locale":"en_US",
                        "currencyCode":"INR",
                        "city": req.param('location'),
    					"stateProvinceCode": "IND",
						"countryCode": config.countryCode,
    					"arrivalDate": req.param('checkindate'),
    					"departureDate":req.param('checkoutdate')
    					
                    }//end of options	

		healthstatus(function (health){
			if(health=='True')
			{
               request({
                        url:"http://dev.api.ean.com/ean-services/rs/hotel/v3/list?minorRev=28&cid=55505&apiKey=7pb5axaj6nm9yrk3f2ujajf5&customerUserAgent="
                        +options.customerUserAgent+"&customerIpAddress="
                        +options.customerIpAddress+"&customerSessionId="
                        +options.customerSessionId+"&locale=en_US&currencyCode=INR&city="
                        +options.city+"&stateProvinceCode=&countryCode=&arrivalDate="
                        +options.arrivalDate+"&departureDate="
                        +options.departureDate
                        +"&room1="+room1//+","+options.child1room1+","+options.child2room1+","+options.child3room1
                        +"&room2="+room2//+","+options.child1room2+","+options.child2room2+","+options.child3room2
                        +"&room3="+room3//+","+options.child1room3+","+options.child2room3+","+options.child3room3
                        +"&room4="+room4//+","+options.child1room4+","+options.child2room4+","+options.child3room4
                        +"&room5="+room5//+","+options.child1room5+","+options.child2room5+","+options.child3room5
                        +"&room6="+room6,//+","+options.child1room6+","+options.child2room6+","+options.child3room6,
                        method:'POST'
                        
                    }, function (error, response, hotel_search_response){
    				    if(error)throw new Error(error);
                        var hotellist=JSON.parse(hotel_search_response)
                        var sessionid=hotellist.HotelListResponse.customerSessionId;
                        var ip = req.header('x-forwarded-for') || req.connection.remoteAddress;
                        console.log(hotellist);
                        console.log(room1);
                        console.log(room2);
                        console.log(room3);
                        console.log(room4);
                        console.log(room5);
                        console.log(room6);
						console.log(sessionid);
                        console.log(ip);

						
						if(hotellist.HotelListResponse.HotelList)
						{    
                            //console.log(hotel_search_response);
							var star= new Array();
							//console.log(hotel_search_response.HotelListResponse.HotelList.HotelSummary.length);
							//For saving The star value of hotel in the array star  
							for(i=0;i<hotellist.HotelListResponse.HotelList.HotelSummary.length;i++) 
								{ 
									var s=hotellist.HotelListResponse.HotelList.HotelSummary[i].hotelRating 
						 
									star[i]=parseInt(s); 

								}
							//console.log(star);
							//console.log(hotel_search_response);
							
                        // Binding values to the request object to maintain the session    
                            req.session['checkindate']=req.param('checkindate');
				            req.session['checkoutdate']=req.param('checkoutdate');
                            req.session['numberofrooms']=req.param('numberofrooms');
                            req.session['roomone']=room1;
                            req.session['roomtwo']=room2;
                            req.session['roomthree']=room3;
                            req.session['roomfour']=room4;
                            req.session['roomfive']=room5;
                            req.session['roomsix']=room6;
                            req.session['sessionId']=sessionid;
						    
							console.log("Success>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>".green.bold.underline);
							res.render('index',{title:'Hotel Search',hotels:hotellist,star:star,user:req.user,disclaimer:disclaimer});
						} 
						else
						{
							console.log("No Data Received>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>".red.bold.underline);
							res.redirect('/');
						}
				}	//end of function
                ); //end of request	

						
    		}//end of if
			else
			{
				res.redirect('/');
			}//end of else


		});// end of the function health status
	
	
});// end of post search

// For Displaying Hotel Information
router.get('/hotelinfo/:hotelId', function (req, res){
		
		//var checkout;
		//var checkin;
		var options = {
  						"customerSessionId" : req.session['sessionId'],
                        "customerIpAddress" : req.header('x-forwarded-for') || req.connection.remoteAddress,
                        "customerUserAgent" : req.headers['user-agent'],
  						"HotelInformationRequest": {
    												"hotelId": req.param('hotelId'),
    												"options": "0"
  												}
				}// end of options
		var availableoptions = {
								"customerSessionId" : req.session['sessionId'],
                                "customerIpAddress" : req.header('x-forwarded-for') || req.connection.remoteAddress,
                                "customerUserAgent" : req.headers['user-agent'],
  								"hotelId": req.param('hotelId'),
								"arrivalDate": req.session['checkindate'],
								"departureDate": req.session['checkoutdate'],
								"includeDetails": "true",
								"includeRoomImages":"true",
                                "room1":req.session['roomone'],
                                "room2":req.session['roomtwo'],
                                "room3":req.session['roomthree'],
                                "room4":req.session['roomfour'],
                                "room5":req.session['roomfive'],
                                "room6":req.session['roomsix']
    															
  															
							}// end of available options
		var roomimageoptions = {
  						"customerSessionId" : req.session['sessionId'],
                        "customerIpAddress" : req.header('x-forwarded-for') || req.connection.remoteAddress,
                        "customerUserAgent" : req.headers['user-agent'],
  						"HotelRoomImagesRequest": {
    												"hotelId": req.param('hotelId'),
  												}
					};
        var payamentoptions = {
                        "customerSessionId" : req.session['sessionId'],
                        "customerIpAddress" : req.header('x-forwarded-for') || req.connection.remoteAddress,
                        "customerUserAgent" : req.headers['user-agent'],
                        "HotelPaymentRequest": {
                                                "hotelId": req.param('hotelId'),
                                                "supplierType": "E",
                                                "rateType": "MerchantStandard"
                                            }
                                        };
		healthstatus(function (health){
			if(health=='True')
			{
				expedia.hotels.info(options, function (err, hotel_information_response){
    				if(err)throw new Error(err);
    				console.log(hotel_information_response);
    				var star=hotel_information_response.HotelInformationResponse.HotelSummary.hotelRating;
    				console.log("Success>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>".green.bold.underline);
    				console.log(req.param('hotelId'));
    				request({
                            url:"http://dev.api.ean.com/ean-services/rs/hotel/v3/avail?minorRev=28&cid=55505&apiKey=7pb5axaj6nm9yrk3f2ujajf5&customerUserAgent="
                                +availableoptions.customerUserAgent+"&customerIpAddress="
                                +availableoptions.customerIpAddress+"&customerSessionId="
                                +availableoptions.customerSessionId+"&locale=en_US&currencyCode=INR&hotelId="
                                +availableoptions.hotelId+"&arrivalDate="
                                +availableoptions.arrivalDate+"&departureDate="
                                +availableoptions.departureDate+"&includeDetails="
                                +availableoptions.includeDetails+"&includeRoomImages="
                                +availableoptions.includeRoomImages+
                                "&room1="+availableoptions.room1+
                                "&room2="+availableoptions.room2+
                                "&room3="+availableoptions.room3+
                                "&room4="+availableoptions.room4+
                                "&room5="+availableoptions.room5+
                                "&room6="+availableoptions.room6,
                            method:'GET',
                            Json: true
                        }, function (error, response , hotel_available_response){
    					if(error)throw new Error(error);
                        var hotelavail=JSON.parse(hotel_available_response)
    					//checkin=req.session['checkindate'];
    					//checkout=req.session['checkoutdate'];
						//var checkout=req.session.checkoutdate;
                        
    					//console.log(checkin);
    					console.log(hotelavail);
                        
    					expedia.hotels.roomImages(roomimageoptions, function (err, hotel_roomimage_response){
    						if(err)throw new Error(err);
    						//console.log(JSON.stringify(hotel_available_response.HotelRoomAvailabilityResponse));
                           
                            expedia.hotels.acceptedPayments(payamentoptions, function(err, payamentresponse){
                               if(err)throw new Error(err);
                               console.log(JSON.stringify(payamentresponse));
                               var payament=payamentresponse.HotelPaymentResponse.PaymentType
                               req.session['payamentresponse']=payament;

                               //console.log(req.session['payamentresponse'])
    					       if(hotel_information_response.HotelInformationResponse.EanWsError)
                                {
                                    var presentationMessage=hotel_information_response.HotelInformationResponse.EanWsError.presentationMessage
                                    res.render('bookingerror',{title:'Error',message:presentationMessage,user:req.user});
                                }
                               if(payamentresponse.HotelPaymentResponse.EanWsError)
                                {
                                    var presentationMessage=payamentresponse.HotelPaymentResponse.EanWsError.presentationMessage
                                    res.render('bookingerror',{title:'Error',message:presentationMessage,user:req.user});
                                }
                               if(hotelavail.HotelRoomAvailabilityResponse.EanWsError)
                                {
                                    var presentationMessage=hotelavail.HotelRoomAvailabilityResponse.EanWsError.presentationMessage
                                    res.render('bookingerror',{title:'Error',message:presentationMessage,user:req.user});
                                }
                               else
                                {
        					       res.render('hotelinfo',{title:'Hotel Information',hotelInfo:hotel_information_response,hotelAvail:hotelavail,user:req.user,star:star,disclaimer:disclaimer});
                                }
                            });// end of accepted payaments
    					});// end of expedia.hotels.roomImages
    				});//end of hotel room availability request
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
	res.render('booking',{title:'Hotel Reservation',req:req,user:req.user,rooms:req.session['numberofrooms'],payamentresponse:req.session['payamentresponse']})

});
// To book a room in hotel
router.post('/book', function(req,res){
	var split=req.param('cardholdername').split(' ');
	var options={ 
                    "customerSessionId" : req.session['sessionId'],
                    "customerIpAddress" : req.header('x-forwarded-for') || req.connection.remoteAddress,
                    "customerUserAgent" : req.headers['user-agent'],
					'hotelId':req.param('hotelId'),
					'arrivalDate':req.session['checkindate'],
					'departureDate':req.session['checkoutdate'],
					'supplierType':req.param('supplierType'),
					'rateKey':req.param('rateKey'),
					'roomTypeCode':req.param('roomTypeCode'),
					'rateCode':req.param('rateCode'),
					'chargeableRate':req.param('chargeableRate'),
					'room1':req.session['roomone'],
                    'room2':req.session['roomtwo'],
                    'room3':req.session['roomthree'],
                    'room4':req.session['roomfour'],
                    'room5':req.session['roomfive'],
                    'room6':req.session['roomsix'],
					'room1FirstName':req.param('firstname'),
					'room1LastName':req.param('lastname'),
					'room1BedTypeId':req.param('bedTypeId'),
					'room1SmokingPreference':'NS',
                    'room2FirstName':req.param('firstnameroom2'),
                    'room2LastName':req.param('lastnameroom2'),
                    'room3FirstName':req.param('firstnameroom3'),
                    'room3LastName':req.param('lastnameroom3'),
                    'room4FirstName':req.param('firstnameroom4'),
                    'room4LastName':req.param('lastnameroom4'),
                    'room5FirstName':req.param('firstnameroom5'),
                    'room5LastName':req.param('lastnameroom5'),
                    'room6FirstName':req.param('firstnameroom6'),
                    'room6LastName':req.param('lastnameroom6'),
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
    			url:"https://book.api.ean.com/ean-services/rs/hotel/v3/res?apiKey=7pb5axaj6nm9yrk3f2ujajf5&cid=55505&customerIpAddress="
                    +options.customerIpAddress+"&customerUserAgent="
                    +options.customerUserAgent+"&customerSessionId="
                    +options.customerSessionId+"&minorRev=28&locale=en_US&currencyCode=INR&hotelId="
    				+options.hotelId+					"&arrivalDate="
    				+options.arrivalDate+				"&departureDate="
    				+options.departureDate+				"&supplierType="
    				+options.supplierType+				"&rateKey="
    				+options.rateKey+					"&roomTypeCode="
    				+options.roomTypeCode+				"&rateCode="
    				+options.rateCode+					"&chargeableRate="
    				+options.chargeableRate+			"&room1="
    				+options.room1+						"&room2="
                    +options.room2+                     "&room3=" 
                    +options.room3+                     "&room4="
                    +options.room4+                     "&room5="
                    +options.room5+                     "&room6="
                    +options.room6+                     "&room1FirstName="
    				+options.room1FirstName+			"&room1LastName="
    				+options.room1LastName+				"&room1BedTypeId="
    				+options.room1BedTypeId+			"&room1SmokingPreference="
    				+options.room1SmokingPreference+	"&room2FirstName="
                    +options.room2FirstName+            "&room2LastName=" 
                    +options.room2LastName+             "&room3FirstName="
                    +options.room3FirstName+            "&room3LastName="
                    +options.room3LastName+             "&room4FirstName="
                    +options.room4FirstName+            "&room4LastName="
                    +options.room4LastName+             "&room5FirstName="
                    +options.room5FirstName+            "&room5LastName="
                    +options.room5LastName+             "&room6FirstName="
                    +options.room6FirstName+            "&room6LastName="
                    +options.room6LastName+             "&email="
    				+options.email+						"&firstName="
    				+options.firstName+					"&lastName="
    				+options.lastName+					"&homePhone="
    				+options.homePhone+					"&workPhone="
    				+options.workPhone+					"&creditCardType="
    				+options.creditCardType+			"&creditCardNumber="
    				+options.creditCardNumber+			"&creditCardIdentifier="
    				+options.creditCardIdentifier+		"&creditCardExpirationMonth="
    				+options.creditCardExpirationMonth+	"&creditCardExpirationYear="
    				+options.creditCardExpirationYear+	"&address1="
    				+options.address1+					"&city="
    				+options.city+						"&stateProvinceCode="
    				+options.stateProvinceCode+			"&countryCode="
    				+options.countryCode+				"&postalCode="
    				+options.postalCode,
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
    					res.render('bookingconfirmation',{title:'Booking Confirm',user:req.user,bookingresponse:body});
    					console.log("Booking Done>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>".red.bold)
    				}
    				else
    				{
    					res.render('bookingerror',{title:'Booking Error',user:req.user});	
    				}

				}//end of function
		);
	
});//End of Post book

//Display Booking Canceletion Page
router.get('/cancelbooking', function(req, res){
    res.render('bookingcancel',{title:'Hotel Canceletion',user:req.user})
});

// To cancel the Booking
router.post('/cancelbooking', function(req,res){
    var options = {
                    "customerSessionId" : config.customerSessionId,
                    "customerIpAddress" : req.header('x-forwarded-for') || req.connection.remoteAddress,
                    "customerUserAgent" : req.headers['user-agent'],
                    "HotelRoomCancellationRequest":{
                                                    "itineraryId": req.param('itineraryid'),
                                                    "email":req.param('email'),
                                                    "reason": req.param('presentation'),
                                                    "confirmationNumber": req.param('connumber')
                                                    }
                }

    expedia.reservation.cancel(options, function(err, cancel_res){
        if(err)throw new Error(err);
        console.log(cancel_res);
        if(cancel_res.HotelRoomCancellationResponse.EanWsError.itineraryId==req.param('itineraryid'))
            {
                res.render('cancelconfirmation',{title:'Cancel Confirmation',user:req.user})
            }
        else
            {
                var message=cancel_res.HotelRoomCancellationResponse.EanWsError.presentationMessage
                res.render('bookingerror',{title:'Error',message:message,user:req.user});
            }
    });

});// end of Post Cancel booking



module.exports = router;