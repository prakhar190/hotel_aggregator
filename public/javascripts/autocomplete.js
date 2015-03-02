
	function initialize() {
		var options = {
						types: ['(cities)'],
						componentRestrictions: {country: "IN"}
					}
		var input = document.getElementById('searchTextField');
		var autocomplete = new google.maps.places.Autocomplete(input,options);
			}
		
