 
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
	$('#roomtwo').hide();
	$('#roomthree').hide();
	$('#roomfour').hide();
	$('#roomfive').hide();
	$('#roomsix').hide();
	$('#childage1room1').hide();
	$('#childage2room1').hide();
	$('#childage3room1').hide();
	$('#childage1room2').hide();
	$('#childage2room2').hide();
	$('#childage3room2').hide();
	$('#childage1room3').hide();
	$('#childage2room3').hide();
	$('#childage3room3').hide();
	$('#childage1room4').hide();
	$('#childage2room4').hide();
	$('#childage3room4').hide();
	$('#childage1room5').hide();
	$('#childage2room5').hide();
	$('#childage3room5').hide();
	$('#childage1room6').hide();
	$('#childage2room6').hide();
	$('#childage3room6').hide();
	

	$('#selectrooms').change(function(){
		if($('#selectrooms').val()==1)
			{   $('#numberofadultsroom2').val(null);
				$('#numberofadultsroom3').val(null);
				$('#numberofadultsroom4').val(null);
				$('#numberofadultsroom5').val(null);
				$('#numberofadultsroom6').val(null);
				$('#roomtwo').hide();
				$('#roomthree').hide();
				$('#roomfour').hide();
				$('#roomfive').hide();
				$('#roomsix').hide();
				
			}
		if($('#selectrooms').val()==2)
			{   $('#numberofadultsroom3').val(null)
				$('#numberofadultsroom4').val(null)
				$('#numberofadultsroom5').val(null)
				$('#numberofadultsroom6').val(null)
				$('#roomtwo').show();
				$('#roomthree').hide();
				$('#roomfour').hide();
				$('#roomfive').hide();
				$('#roomsix').hide();
				$('#numberofadultsroom2').val(1)
				
			}
		
		if($('#selectrooms').val()==3)
			{
				$('#roomtwo').show();
				$('#roomthree').show();
				$('#roomfour').hide();
				$('#roomfive').hide();
				$('#roomsix').hide();
				$('#numberofadultsroom2').val(1)
				$('#numberofadultsroom3').val(1)
				$('#numberofadultsroom4').val(null)
				$('#numberofadultsroom5').val(null)
				$('#numberofadultsroom6').val(null)
			}
		
		if($('#selectrooms').val()==4)
			{
				$('#roomtwo').show();
				$('#roomthree').show();
				$('#roomfour').show();
				$('#roomfive').hide();
				$('#roomsix').hide();
				$('#numberofadultsroom2').val(1)
				$('#numberofadultsroom3').val(1)
				$('#numberofadultsroom4').val(1)
				$('#numberofadultsroom5').val(null)
				$('#numberofadultsroom6').val(null)
			}
		if($('#selectrooms').val()==5)
			{
				$('#roomtwo').show();
				$('#roomthree').show();
				$('#roomfour').show();
				$('#roomfive').show();
				$('#roomsix').hide();
				$('#numberofadultsroom2').val(1)
				$('#numberofadultsroom3').val(1)
				$('#numberofadultsroom4').val(1)
				$('#numberofadultsroom5').val(1)
				$('#numberofadultsroom6').val(null)
			}
		if($('#selectrooms').val()==6)
			{
				$('#roomtwo').show();
				$('#roomthree').show();
				$('#roomfour').show();
				$('#roomfive').show();
				$('#roomsix').show();
				$('#numberofadultsroom2').val(1)
				$('#numberofadultsroom3').val(1)
				$('#numberofadultsroom4').val(1)
				$('#numberofadultsroom5').val(1)
				$('#numberofadultsroom6').val(1)
			}

	});
 	$('#selectchildroom1').change(function(){
 		if($('#selectchildroom1').val()==1)
			{
				$('#childage1room1').show();
				$('#childage2room1').hide();
				$('#childage3room1').hide();
				
			}
		if($('#selectchildroom1').val()==2)
			{
				$('#childage1room1').show();
				$('#childage2room1').show();
				$('#childage3room1').hide();
			}
		if($('#selectchildroom1').val()==3)
			{
				$('#childage1room1').show();
				$('#childage2room1').show();
				$('#childage3room1').show();
			}
		if($('#selectchildroom1').val()==0)
			{
				$('#childage1room1').hide();
				$('#childage2room1').hide();
				$('#childage3room1').hide();
				
			}
	});
 	
 	$('#selectchildroom2').change(function(){
 		if($('#selectchildroom2').val()==1)
			{
				$('#childage1room2').show();
				$('#childage2room2').hide();
				$('#childage3room2').hide();
				
			}
		if($('#selectchildroom2').val()==2)
			{
				$('#childage1room2').show();
				$('#childage2room2').show();
				$('#childage3room2').hide();
			}
		if($('#selectchildroom2').val()==3)
			{
				$('#childage1room2').show();
				$('#childage2room2').show();
				$('#childage3room2').show();
			}
		if($('#selectchildroom2').val()==0)
			{
				$('#childage1room2').hide();
				$('#childage2room2').hide();
				$('#childage3room2').hide();
				
			}
	});

	$('#selectchildroom3').change(function(){
 		if($('#selectchildroom3').val()==1)
			{
				$('#childage1room3').show();
				$('#childage2room3').hide();
				$('#childage3room3').hide();
				
			}
		if($('#selectchildroom3').val()==2)
			{
				$('#childage1room3').show();
				$('#childage2room3').show();
				$('#childage3room3').hide();
			}
		if($('#selectchildroom3').val()==3)
			{
				$('#childage1room3').show();
				$('#childage2room3').show();
				$('#childage3room3').show();
			}
		if($('#selectchildroom3').val()==0)
			{
				$('#childage1room3').hide();
				$('#childage2room3').hide();
				$('#childage3room3').hide();
				
			}
	});

	$('#selectchildroom4').change(function(){
 		if($('#selectchildroom4').val()==1)
			{
				$('#childage1room4').show();
				$('#childage2room4').hide();
				$('#childage3room4').hide();
				
			}
		if($('#selectchildroom4').val()==2)
			{
				$('#childage1room4').show();
				$('#childage2room4').show();
				$('#childage3room4').hide();
			}
		if($('#selectchildroom4').val()==3)
			{
				$('#childage1room4').show();
				$('#childage2room4').show();
				$('#childage3room4').show();
			}
		if($('#selectchildroom4').val()==0)
			{
				$('#childage1room4').hide();
				$('#childage2room4').hide();
				$('#childage3room4').hide();
				
			}
	});

	$('#selectchildroom5').change(function(){
 		if($('#selectchildroom5').val()==1)
			{
				$('#childage1room5').show();
				$('#childage2room5').hide();
				$('#childage3room5').hide();
				
			}
		if($('#selectchildroom5').val()==2)
			{
				$('#childage1room5').show();
				$('#childage2room5').show();
				$('#childage3room5').hide();
			}
		if($('#selectchildroom5').val()==3)
			{
				$('#childage1room5').show();
				$('#childage2room5').show();
				$('#childage3room5').show();
			}
		if($('#selectchildroom5').val()==0)
			{
				$('#childage1room5').hide();
				$('#childage2room5').hide();
				$('#childage3room5').hide();
				
			}
	});

	$('#selectchildroom6').change(function(){
 		if($('#selectchildroom6').val()==1)
			{
				$('#childage1room6').show();
				$('#childage2room6').hide();
				$('#childage3room6').hide();
				
			}
		if($('#selectchildroom6').val()==2)
			{
				$('#childage1room6').show();
				$('#childage2room6').show();
				$('#childage3room6').hide();
			}
		if($('#selectchildroom6').val()==3)
			{
				$('#childage1room6').show();
				$('#childage2room6').show();
				$('#childage3room6').show();
			}
		if($('#selectchildroom6').val()==0)
			{
				$('#childage1room6').hide();
				$('#childage2room6').hide();
				$('#childage3room6').hide();
				
			}
	});
	

 });
