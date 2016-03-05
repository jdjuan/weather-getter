$(function(){
	if (navigator.geolocation) {
		navigator.geolocation.watchPosition(showPosition,showError);
	} else {
		alert("Geolocation is not supported by this browser.")
	}

	function showPosition(position) {
		var latitude = position.coords.latitude;
		var longitude = position.coords.longitude
		// var latlon = latitude + "," + longitude;
		$.getJSON( "http://api.openweathermap.org/data/2.5/weather?",{
			lat : latitude,
			lon : longitude,
			appid: "effc0084ed304b81b81ed7c6987a7865"
		}, function( data ) {
			var table = $("table.information");
			var html = "";
			html += "<tr><td>Temperature:</td><td>"+data.main.temp+"°F</td></tr>";
			html += "<tr><td>Description:</td><td>"+data.weather[0].description+"</td></tr>";
			html += "<tr><td>Humidity:</td><td>"+data.main.humidity+"%</td></tr>";
			html += "<tr><td>Pressure:</td><td>"+data.main.pressure+" hpa</td></tr>";
			$("#city").text(data.name);
			table.html(html);	
			// alert(data.coord.lon);
		}).done(function() {
			console.log( "second success" );
		}).fail(function() {
			console.log( "error" );
		});

		// var img_url = "http://maps.googleapis.com/maps/api/staticmap?center="+latlon+"&zoom=14&size=400x300&sensor=false";
		// message.html(latlon);
		// message.html(message.html() + "<img src='"+img_url+"'>");
	}

	function showError(error) {
		var errorMessage;
		switch(error.code) {
			case error.PERMISSION_DENIED:
			errorMessage = "User denied the request for Geolocation."
			break;
			case error.POSITION_UNAVAILABLE:
			errorMessage = "Location information is unavailable."
			break;
			case error.TIMEOUT:
			errorMessage= "The request to get user location timed out."
			break;
			case error.UNKNOWN_ERROR:
			errorMessage= "An unknown error occurred."
			break;
		}
		alert(errorMessage);
	}
});

