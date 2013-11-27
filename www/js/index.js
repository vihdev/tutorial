var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
        this.testZone = {};
        this.lat = 0;
        this.long = 0;
    },

    bindEvents: function() {
        document.addEventListener("deviceready", this.onDeviceReady, false);
    },

    onDeviceReady: function() {
        console.log("Ready");
        app.testZone = document.getElementById("test-zone");
        
        navigator.geolocation.getCurrentPosition(app.onGeoSuccess, app.onGeoError);
        app.testZone.addEventListener("click", app.getPlace, false);
    },
    
    onGeoSuccess: function(position) {
	    app.testZone.innerHTML = '' +
	    		'Latitude: '          + position.coords.latitude          + '<br />' +
	          	'Longitude: '         + position.coords.longitude         + '<br />' +
	          	'Altitude: '          + position.coords.altitude          + '<br />' +
	          	'Accuracy: '          + position.coords.accuracy          + '<br />' +
	          	'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '<br />' +
	          	'Heading: '           + position.coords.heading           + '<br />' +
	          	'Speed: '             + position.coords.speed             + '<br />' +
	          	'Timestamp: '         + position.timestamp                + '<br />';
		app.lat = position.coords.latitude;
		app.long = position.coords.longitude;
	},
	
	onGeoError: function(error) {
	    alert('code: '    + error.code    + '\n' +
	          'message: ' + error.message + '\n');
	},
	
	getPlace: function() {
		$.getJSON('http://maps.googleapis.com/maps/api/geocode/json?latlng='+app.lat+','+app.long+'&sensor=true', function(data) {
			app.testZone.innerHTML = data.results[0].address_components[0].long_name;
		});
	}
};
