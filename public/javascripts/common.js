 
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
});
