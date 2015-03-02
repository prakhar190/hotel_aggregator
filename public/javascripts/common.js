 
$(document).ready(function(){
	

	$('#input_checkindate').pickadate({
		min: 1,
		format: 'mm/dd/yyyy',
		formatSubmit: 'dd/mm/yyyy'
		
	});
	$('#input_checkoutdate').pickadate({
		min:2,
		format: 'mm/dd/yyyy',
		formatSubmit: 'dd/mm/yyyy'
	});
	$.validate({
      modules : 'date, security',
      onModulesLoaded : function() {

      								
      							}
      });
	$('#presentation').restrictLength( $('#pres-max-length') );
	$( "#autocomplete" ).autocomplete({
      source: [ "Patnitop" , "Lonavala" , "Dharamshala" , "Port Blair" , "Mussoorie" , "Puri" , "Mount Abu" , "Rishikesh" , "Alappuzha" , "Mahabaleshwar" , "Jaisalmer" , "Kanyakumari" , "Leh" , "Gangtok" , "Kodaikanal" , "Nanital" , "Munnar" , "Manali" , "Pondicherry" , "Shimla" , "Darjeeling" , "Goa" , "Thanjavur" , "Haridwar" , "Puducherry" , "Tiruvottiyur" , "Bharatpur" , "Durg" , "Bathinda" ,"Tirupati" , "Bihar Sharif", "Alwar" ,"Thrissur" , "Chandrapur" , "Kamarhati" , "Kullu" , "Kollam" , "Mathura" , "Dhule" , "Panihati" , "Gopalpur" , "Kozhikode" , "Tirupur" , "Maheshtala" , "Udaipur" , "Gaya" , "Ambattur" , "Mangalore" , "Jammu" , "Siliguri" , "Loni" , "Ajmer" , "Dehradun" , "Cochin" , "Kochi" , "Firozabad" , "Cuttack" , "Bhilai" , "Jamshedpur" , "Bikaner" , "Guntur" , "Thiruvananthapuram" , "Trivandrum" , "Salem" , "Bhubaneswar", "Tiruchirappalli" , "Jalandhar" , "Gurgaon" , "Mysore" , "Chandigarh" , "Guwahati" , "Madurai" , "Jodhpur" , "Jabalpur" , "Coimbatore" , "Howrah" , "Allahabad" , "Navi Mumbai" , "Amritsar" , "Aurangabad", "Varanasi", "Rajkot" , "Faridabad" , "Ludhiana" , "Ghaziabad" , "Vadodara" , "Pimpri-Chinchwad" ,"Visakhapatnam" , "Bhopal" , "Thane" , "Indore" , "Nagpur" , "Surat" , "Pune", "Hyderabad" , "Lucknow", "New Delhi", "Delhi" , "Mumbai", "Madras", "Agra", "Bengaluru", "Kolkata", "Jaipur", "Noida" , "Ahmedabad"]
      });

      
});
