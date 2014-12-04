

	var currentBubble = null;
	var infobubbles = new nokia.maps.map.component.InfoBubbles();
	var a=parseFloat(window.localStorage.getItem("a"));
	var b=parseFloat(window.localStorage.getItem("b"));
	var MAP = new nokia.maps.map.Display(document.getElementById("player"), {
			center: new nokia.maps.geo.Coordinate(11.992725155615206, 123.01454359946268),
			zoomLevel: 5,
			components: [infobubbles, new nokia.maps.map.component.Behavior(),
			 new nokia.maps.map.component.ZoomBar()]
		});
	
	var geo = nokia.places.search.manager;

	function write_debug(buffer){
		if('console' in window && 'log' in window.console){
			console.log(buffer);		
		}
	}
		
  
	

	function eventHandd(obj, key, value, oldValue){		
		write_debug("eventHandd key: " + key + ", value: " + value + ", oldValue: " + oldValue);
	}
			

	var locations;
	var revgeoCallBack = function (data, requestStatus, requestId) {
	
	if (requestStatus == "OK") {
							
		locations = data.results ? data.results.items : [data.location];
		// We check that at least one location has been found
		if (locations.length > 0) {		
				
				// hide any existing bubbles
				if(currentBubble != null){
					infobubbles.removeBubble(currentBubble);
					currentBubble = null;
				}
				
				currentBubble = infobubbles.addBubble(locations[0].address.text, locations[0].position);
				
				//document.getElementById("revgeo_result_label").value = observedManager.locations[0].label;
				
				document.getElementById("street").innerHTML=locations[0].address.street;
				document.getElementById("city").innerHTML=locations[0].address.city;
				document.getElementById("country").innerHTML=locations[0].address.county;
			}else{
				document.getElementById("revgeo_process_box").value = "No results";
			}

		}else if(value == "failed") {
			document.getElementById("revgeo_process_box").value =  "Failed";
			alert("The geocoding request failed.");
		}
	}	
		function mapStartRevGeoCode(){
			
		// hide any existing bubbles
		if(currentBubble != null){
			infobubbles.removeBubble(currentBubble);
			currentBubble = null;
		}
		var latt = parseFloat(document.getElementById("rev_geo_Latitude").value);
		var lonn = parseFloat(document.getElementById("rev_geo_Longitude").value);
		var reverseGeoCodeTerm = new nokia.maps.geo.Coordinate(latt,lonn);

		
geo.reverseGeoCode({
	latitude: reverseGeoCodeTerm.latitude,
	longitude: reverseGeoCodeTerm.longitude,
	onComplete: revgeoCallBack
	});
}			
		

				