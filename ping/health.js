var http=require('http');
module.exports = function(callback){
	                var health
					
					var search_req = http.get("http://apim-gateway.mmtcloud.com/mmt-htlsearch/1.0/PingService/v1.0/pingSOA?responseFormat=json&echoMessage=healthStatus", function(healthRes) {
	   					healthRes.setEncoding('utf8');
	    				healthRes.on('data', function (chunk) {
	    					health=JSON.parse(chunk).ResponseCode.success
                            callback(health)
                            
	    	 				});
					}).on('error',function(e){
			        console.log("Something went wrong: " + e.message);
	
    		});
					
					
				//return health
                    
}