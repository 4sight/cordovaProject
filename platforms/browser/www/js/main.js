
document.getElementById("currentPosition").addEventListener("click", currentPosition);
document.getElementById("currentWeather").addEventListener("click", currentWeather);
function gettingJSON(){
  var weatherLocation = document.getElementById('weatherLocation').value;
  if (location === '') {
        window.alert('Please enter a location.')
  } else {
      window.open('forecast.html?' + weatherLocation,'_self');
  }
};

function getPosition() {
   var options = {
      enableHighAccuracy: true,
      maximumAge: 3600000
   }
   var watchID = navigator.geolocation.getCurrentPosition(onSuccess, onError, options);

   function onSuccess(position) {
      // alert('Latitude: '       + position.coords.latitude          + '\n' +
      //    'Longitude: '         + position.coords.longitude         + '\n' +
      //    'Altitude: '          + position.coords.altitude          + '\n' +
      //    'Accuracy: '          + position.coords.accuracy          + '\n' +
      //    'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
      //    'Heading: '           + position.coords.heading           + '\n' +
      //    'Speed: '             + position.coords.speed             + '\n' +
      //    'Timestamp: '         + position.timestamp                + '\n');

      // Begin map centering code

        var platform = new H.service.Platform({
          'apikey': 'Dg9tQuydT0tmOKcyIi2kiTERLFkSVXp7SJy1OQnsgCE'
        });

        var targetElement = document.getElementById('mapContainer');

        // Obtain the default map types from the platform object:
        var defaultLayers = platform.createDefaultLayers();

        // Instantiate (and display) a map object:
        var map = new H.Map(
            document.getElementById('mapContainer'),
            defaultLayers.vector.normal.map,
            {
              zoom: 10,
              center: { lat: position.coords.latitude, lng: position.coords.longitude }
            });

        var svgMarkup = '<svg width="24" height="24" ' +
    'xmlns="http://www.w3.org/2000/svg">' +
    '<rect stroke="white" fill="#1b468d" x="1" y="1" width="22" ' +
    'height="22" /><text x="12" y="18" font-size="12pt" ' +
    'font-family="Arial" font-weight="bold" text-anchor="middle" ' +
    'fill="white"></text></svg>';

        // Create an icon, an object holding the latitude and longitude, and a marker:
        var icon = new H.map.Icon(svgMarkup),
            coords = {lat: position.coords.latitude, lng: position.coords.longitude},
            marker = new H.map.Marker(coords, {icon: icon});

        // Add the marker to the map and center the map at the location of the marker:
        map.addObject(marker);
        map.setCenter(coords);

        // Enable the event system on the map instance:
        var mapEvents = new H.mapevents.MapEvents(map);

        // Add event listener:
        map.addEventListener('tap', function(evt) {
            // Log 'tap' and 'mouse' events:
            console.log(evt.type, evt.currentPointer.type); 
        });

        // Instantiate the default behavior, providing the mapEvents object:
        var behavior = new H.mapevents.Behavior(mapEvents);

        // Create the parameters for the reverse geocoding request:
        var reverseGeocodingParameters = {
              prox: '52.5309,13.3847,150',
              mode: 'retrieveAddresses',
              maxresults: 1
            };

        // Define a callback function to process the response:
        function onSuccess(result) {
          var location = result.Response.View[0].Result[0];

        // Create an InfoBubble at the returned location with
        // the address as its contents:
        ui.addBubble(new H.ui.InfoBubble({
            lat: location.Location.DisplayPosition.Latitude,
            lng: location.Location.DisplayPosition.Longitude
           }, { content: location.Location.Address.Label }));
        };

        // Get an instance of the geocoding service:
        var geocoder = platform.getGeocodingService();

        // Call the geocode method with the geocoding parameters,
        // the callback and an error callback function (called if a
        // communication error occurs):
        geocoder.reverseGeocode(
            reverseGeocodingParameters,
            onSuccess,
            function(e) { alert(e); });

      // End map centering code
      
   };

   function onError(error) {
      alert('code: '    + error.code    + '\n' + 'message: ' + error.message + '\n');
   }
}

function currentPosition() {
   var options = {
      maximumAge: 3600000,
      timeout: 3000,
      enableHighAccuracy: true,
   }
   var watchID = navigator.geolocation.getCurrentPosition(onSuccess, onError, options);

   function onSuccess(position) {
      alert('Latitude: '       + position.coords.latitude          + '\n' +
         'Longitude: '         + position.coords.longitude         + '\n' +
         'Altitude: '          + position.coords.altitude          + '\n' +
         'Accuracy: '          + position.coords.accuracy          + '\n' +
         'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
         'Heading: '           + position.coords.heading           + '\n' +
         'Speed: '             + position.coords.speed             + '\n' +
         'Timestamp: '         + position.timestamp                + '\n');
   };

   function onError(error) {
      alert('code: '    + error.code    + '\n' +'message: ' + error.message + '\n');
   }
}

function currentWeather(){
    if (navigator.geolocation) {
     navigator.geolocation.getCurrentPosition(function(position) {
        var x = position.coords.latitude;
        var y = position.coords.longitude;
        fetch("https://api.openweathermap.org/data/2.5/weather?lat="+x+"&lon="+y+"&units=imperial&APPID=e9b433f7ed306860db69ea25723a5f48").then(function(response) {
          if (!response.ok) {
            return response.json();
          } else { 
            return response.json().then(function(data) {
          var city = data.name;
          var temp = Math.round(data.main.temp);
          var weather = data.weather[0].description;
          var image = "<img src='https://openweathermap.org/img/w/" + data.weather[0].icon + ".png'>";
          fetch("https://api.sunrise-sunset.org/json?lat="+x+"&lng="+y+"&date=today").then(function(response) {
            if (!response.ok) {
              return response.json();
            } else { 
              return response.json().then(function(results) {
              let parsed = JSON.parse(JSON.stringify(results));
              let month = new Date().getMonth() + 1;
              let date = new Date().getDate();
              let year = new Date().getFullYear();
              let fullDate = month + '/' + date + '/' + year;
              let rawSunrise = parsed.results.sunrise;
              let rawSunset = parsed.results.sunset;
              let UTCsunrise = fullDate + ' ' + rawSunrise + ' UTC';
              let UTCsunset = fullDate + ' ' + rawSunset + ' UTC';
              let sunrise = new Date(UTCsunrise);
              let sunset = new Date(UTCsunset);
              console.log(sunrise);
              console.log(sunset);
              alert('Temperature: ' + temp + '\n' + 
                    'Weather: ' + weather + '\n' +
                    'Sunrise: ' + sunrise + '\n' +
                    'Sunset: ' + sunset);
            }).catch(function(err) {
    alert('Fetch Error!', err);
    }
  )
 
    }
  })
      }).catch(function(err) {
    alert('Fetch Error!', err);
    }
  )
 
    }
  })
})}};

document.getElementById('input').addEventListener('change', function(){
  var reader = new FileReader();
  reader.onload = function(){
    document.getElementById('displayBox').textContent = this.result;
  };
  reader.readAsText(this.files[0]);
});

// Geolocation

// var view = new ol.View({
//   center: [0, 0],
//   zoom: 2
// });

// var map = new ol.Map({
//   layers: [
//     new ol.layer.Tile({
//       source: new ol.source.OSM()
//     })
//   ],
//   target: 'map',
//   view: view
// });

var geolocation = new ol.Geolocation({
  // enableHighAccuracy must be set to true to have the heading value.
  trackingOptions: {
    enableHighAccuracy: true
  },
  projection: view.getProjection()
});

function el(id) {
  return document.getElementById(id);
}

// handle geolocation error.
geolocation.on('error', function(error) {
  var info = document.getElementById('info');
  info.innerHTML = error.message;
  info.style.display = '';
});

var accuracyFeature = new ol.Feature();
geolocation.on('change:accuracyGeometry', function() {
  accuracyFeature.setGeometry(geolocation.getAccuracyGeometry());
});

var positionFeature = new ol.Feature();
positionFeature.setStyle(new ol.style.Style({
  image: new ol.style.Circle({
    radius: 6,
    fill: new ol.style.Fill({
      color: '#3399CC'
    }),
    stroke: new ol.style.Stroke({
      color: '#fff',
      width: 2
    })
  })
}));

geolocation.on('change:position', function() {
  var coordinates = geolocation.getPosition();
  positionFeature.setGeometry(coordinates ?
    new ol.geom.Point(coordinates) : null);
});

new ol.source.Vector({
  map: map,
  source: new ol.source.Vector({
    features: [accuracyFeature, positionFeature]
  })
});