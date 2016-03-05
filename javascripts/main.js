$(function(){
	var query= {"appid":"effc0084ed304b81b81ed7c6987a7865"};

	requestLocation();

	function requestLocation(){
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(getPosition,getError);
		} else {
			sweetAlert("Oops...", "Geolocation is not supported by this browser!", "error");
		}
	}

	function getPosition(position) {
		query["lat"]=position.coords.latitude;
		query["lon"]=position.coords.longitude;
		fetchData();
	}

	function getError(error) {
		var errorMessage;
		switch(error.code) {
			case error.PERMISSION_DENIED:
			errorMessage = "Oh!, Geolocation is not allowed";
			break;
			case error.POSITION_UNAVAILABLE:
			errorMessage = "Oh!, Geolocation is not available.";
			break;
			case error.TIMEOUT:
			errorMessage= "Oh!, It took more than often";
			break;
			case error.UNKNOWN_ERROR:
			errorMessage= "Oh!, something very weird just happpened";
			break;
		}
		showError(errorMessage);
	}

	function showError(errorMessage) {
		swal({title: errorMessage,   
			text: "No problem, we've got it, just type in your postal code or city:",   
			type: "input",   
			showCancelButton: false,   
			closeOnConfirm: false,   
			animation: "slide-from-top",   
			inputPlaceholder: "London" }, function(inputValue){   
				if (inputValue === false) return false;      
				if (inputValue === "") {     
					swal.showInputError("You are funny, just type in your city name ;)");     
					return false   
				}      
				if ($.isNumeric(inputValue)) {
					query["zip"]=inputValue;
				}else{
					query["q"]=inputValue;
				}
				fetchData();
			});
	}

	function fetchData(){
		$.getJSON( "http://api.openweathermap.org/data/2.5/weather?",query, function( data ) {
			var table = $("table.information");
			var html = "";
			$("#city").text(data.name+","+data.sys.country);
			html += "<tr><td>Temperature:</td><td>"+data.main.temp+"&deg;F</td></tr>";
			html += "<tr><td>Description:</td><td>"+data.weather[0].description+"</td></tr>";
			html += "<tr><td>Humidity:</td><td>"+data.main.humidity+"%</td></tr>";
			html += "<tr><td>Pressure:</td><td>"+data.main.pressure+" hpa</td></tr>";
			table.html(html);
		}).done(function() {
			swal({title:"We've made it!", 
				text:"Here is your weather!", 
				type: "success",
				timer: 2000,
				showConfirmButton: false
			});
		}).fail(function() {
			sweetAlert("Oops...", "There was a problem with the server, try again later!", "error");
		});
	}
});

