var http=require('http');
var expedia= require('expedia')({apiKey:"7pb5axaj6nm9yrk3f2ujajf5",cid:"55505",minorRev:"28"});
module.exports = function(callback){
	                var health
					
					var options={
					"customerSessionId":"thisisauniqueID",
					"customerIpAddress":"localhost",
					"customerUserAgent":"Chrome",
					"PingRequest": 
									{ "echo": "True" }
					}
					expedia.ping(options, function(err, res){
    				if(err)throw new Error(err);
    				health=res.PingResponse.echo;
    				callback(health);

					});
					/*var search_req = http.get("http://apim-gateway.mmtcloud.com/mmt-htlsearch/1.0/PingService/v1.0/pingSOA?responseFormat=json&echoMessage=healthStatus", function(healthRes) {
	   					healthRes.setEncoding('utf8');
	    				healthRes.on('data', function (chunk) {
	    					health=JSON.parse(chunk).ResponseCode.success
                            callback(health)
                            
	    	 				});
					}).on('error',function(e){
			        console.log("Something went wrong: " + e.message);
	
    		});*/
					
					
				//return health
                    
}
