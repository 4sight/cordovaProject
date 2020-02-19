document.getElementById("getPosition").addEventListener("click", getPosition);
document.getElementById("watchPosition").addEventListener("click", watchPosition);
document.getElementById("currentWeather").addEventListener("click", currentWeather);

function getPosition() {
   var options = {
      enableHighAccuracy: true,
      maximumAge: 3600000
   }
   var watchID = navigator.geolocation.getCurrentPosition(onSuccess, onError, options);

   function onSuccess(position) {
      alert('Latitude: '          + position.coords.latitude          + '\n' +
         'Longitude: '         + position.coords.longitude         + '\n' +
         'Altitude: '          + position.coords.altitude          + '\n' +
         'Accuracy: '          + position.coords.accuracy          + '\n' +
         'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
         'Heading: '           + position.coords.heading           + '\n' +
         'Speed: '             + position.coords.speed             + '\n' +
         'Timestamp: '         + position.timestamp                + '\n');
   };

   function onError(error) {
      alert('code: '    + error.code    + '\n' + 'message: ' + error.message + '\n');
   }
}

function watchPosition() {
   var options = {
      maximumAge: 3600000,
      timeout: 3000,
      enableHighAccuracy: true,
   }
   var watchID = navigator.geolocation.watchPosition(onSuccess, onError, options);

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

function currentWeather() {
    if (navigator.geolocation) {
     navigator.geolocation.getCurrentPosition(function(position) {
        var x = position.coords.latitude;
        var y = position.coords.longitude;
        fetch("http://api.openweathermap.org/data/2.5/weather?lat="+x+"&lon="+y+"&units=imperial&APPID=e9b433f7ed306860db69ea25723a5f48").then(function(response) {
          if (response.status !== 200) {
            alert('Error: ' + response.status);
          return;
          }
          response.json().then(function(data) {
          var city = data.name;
          var temp = Math.round(data.main.temp);
          var weather = data.weather[0].description;
          var image = "<img src='http://openweathermap.org/img/w/" + data.weather[0].icon + ".png'>";
          $("#displayBox").html(city+"<br><br>"+temp+"<br><br>"+weather+"<br>"+image);
      });
    }
  )
  .catch(function(err) {
    alert('Fetch Error!', err);
    }
  )})
}};