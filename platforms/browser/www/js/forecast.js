var weatherLocation = window.location.search;
var place = weatherLocation.substring(1);
var station;
var rawTemperaturesToday = [];
var celciusTemperaturesToday = [];
var historicalTemperaturesToday = [];
var now = new Date();
var date = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate();
console.log(date);

var placeSearch = place.substring(0, place.indexOf(','));
console.log(placeSearch);
let placeLookup = new XMLHttpRequest();
      placeLookup.open("GET", 'https://api.meteostat.net/v1/stations/search?q=' + placeSearch + '&key=bwA1ySha');
      placeLookup.send();
      placeLookup.onload = () => {
        if (placeLookup.status === 200) {
          // by default the response comes in the string format, we need to parse the data into JSON
          var data = JSON.parse(placeLookup.response);
          station = data.data[0].id;
          console.log(station);
          let request = new XMLHttpRequest();
		      request.open("GET", 'https://api.meteostat.net/v1/history/hourly?station=' + station + '&start=' + date + '&end=' + date + '&time_zone=EST&exclude_model=1&key=bwA1ySha');
		      request.send();
		      request.onload = () => {
		        if (request.status === 200) {
		          // by default the response comes in the string format, we need to parse the data into JSON
		          // celciusTemperaturesToday.push(JSON.stringify(request.response));
		        	let historical = JSON.parse(request.response);
		        	console.log(historical.data);
					var h;
					for (h = 0; h < historical.data.length; h++){
						celciusTemperaturesToday.push(historical.data[h].temperature);
					}
					$.getJSON('https://api.openweathermap.org/data/2.5/weather?q=' + place + '&appid=cfc6d5b9b5c3a52a649857702433e58b',function(json){
					    rawTemp = JSON.stringify(json.main.temp);
					    let currentTemp;
					    currentTemp = ((9 / 5 * (rawTemp - 273.15) + 32).toFixed(2));
					    console.log(currentTemp);
					    document.getElementById('temp').textContent = 'Current temperature: ' + currentTemp + '°F';
	      				console.log(celciusTemperaturesToday);
						historicalTemperaturesToday = Array.from(celciusTemperaturesToday, x => (9 / 5 * x + 32).toFixed(2));
						historicalTemperaturesToday.push(currentTemp);
						console.log(historicalTemperaturesToday);
					  }).fail(function(jqxhr, textStatus, error) {
					      window.alert('Please enter a different location.')});

					$.getJSON('https://api.openweathermap.org/data/2.5/forecast?q=' + place + '&appid=cfc6d5b9b5c3a52a649857702433e58b',function(json){
						console.log(json);
						var d = new Date();
						var tomorrow = d.getDate() + 1;
						var weekday = new Array(7);
							weekday[0] = "Sunday";
							weekday[1] = "Monday";
							weekday[2] = "Tuesday";
							weekday[3] = "Wednesday";
							weekday[4] = "Thursday";
							weekday[5] = "Friday";
							weekday[6] = "Saturday";
						var todayPlus1 = weekday[(d.getDay() + 1) % 7];
						document.getElementById('day1').innerHTML += todayPlus1;
						var todayPlus2 = weekday[(d.getDay() + 2) % 7];
						document.getElementById('day2').innerHTML += todayPlus2;
						var todayPlus3 = weekday[(d.getDay() + 3) % 7];
						document.getElementById('day3').innerHTML += todayPlus3;
						var todayPlus4 = weekday[(d.getDay() + 4) % 7];
						document.getElementById('day4').innerHTML += todayPlus4;
						var i = 0;
						do {
							rawTemperaturesToday.push(JSON.stringify(json.list[i].main.temp))
						  	var fullDate = JSON.stringify(json.list[i].dt_txt);
						  	console.log(fullDate);
						  	var forecastDay = fullDate.substring(9, 12);
						  	i += 1;
						} while (forecastDay != tomorrow);
						temperaturesToday = Array.from(rawTemperaturesToday, x => (9 / 5 * (x - 273.15) + 32).toFixed(2));
						let allTemperaturesToday = historicalTemperaturesToday.concat(temperaturesToday);
					  	console.log(allTemperaturesToday);
						var high = Math.max(...allTemperaturesToday);
						var low  = Math.min(...allTemperaturesToday);
						document.getElementById('high').textContent = 'High: ' + high;
						document.getElementById('low').textContent = 'Low: ' + low;

						var j;
					 	var rawTemperaturesTomorrow = [];
						for (j = i; forecastDay == JSON.stringify(json.list[j].dt_txt).substring(9, 12); j++){
						  	rawTemperaturesTomorrow.push(JSON.stringify(json.list[(j - 1)].main.temp));
						}
						rawTemperaturesTomorrow.push(JSON.stringify(json.list[j].main.temp));
						temperaturesTomorrow = Array.from(rawTemperaturesTomorrow, x => (9 / 5 * (x - 273.15) + 32).toFixed(2));
						var highTomorrow = Math.max(...temperaturesTomorrow);
						var lowTomorrow  = Math.min(...temperaturesTomorrow);
						document.getElementById('day1high').textContent = 'High: ' + highTomorrow;
						document.getElementById('day1low').textContent = 'Low: ' + lowTomorrow;

						var k;
						var rawTemperaturesTodayPlus2 = [];
						var l = 0;
						for (k = j + 1; l < 8; l++){
							rawTemperaturesTodayPlus2.push(JSON.stringify(json.list[(k)].main.temp));
							k++;
						}
						temperaturesTodayPlus2 = Array.from(rawTemperaturesTodayPlus2, x => (9 / 5 * (x - 273.15) + 32).toFixed(2));
						var highTodayPlus2 = Math.max(...temperaturesTodayPlus2);
						var lowTodayPlus2  = Math.min(...temperaturesTodayPlus2);
						document.getElementById('day2high').textContent = 'High: ' + highTodayPlus2;
						document.getElementById('day2low').textContent = 'Low: ' + lowTodayPlus2;

						var m;
						var rawTemperaturesTodayPlus3 = [];
						var n = 0;
						for (m = k + 1; n < 8; n++){
							rawTemperaturesTodayPlus3.push(JSON.stringify(json.list[(m)].main.temp));
							m++;
						}
						temperaturesTodayPlus3 = Array.from(rawTemperaturesTodayPlus3, x => (9 / 5 * (x - 273.15) + 32).toFixed(2));
						var highTodayPlus3 = Math.max(...temperaturesTodayPlus3);
						var lowTodayPlus3  = Math.min(...temperaturesTodayPlus3);
						document.getElementById('day3high').textContent = 'High: ' + highTodayPlus3;
						document.getElementById('day3low').textContent = 'Low: ' + lowTodayPlus3;

						var o;
						var rawTemperaturesTodayPlus4 = [];
						var p = 0;
						for (o = m + 1; p < 8; p++){
							rawTemperaturesTodayPlus4.push(JSON.stringify(json.list[(o)].main.temp));
							o++;
						}
						temperaturesTodayPlus4 = Array.from(rawTemperaturesTodayPlus4, x => (9 / 5 * (x - 273.15) + 32).toFixed(2));
						var highTodayPlus4 = Math.max(...temperaturesTodayPlus4);
						var lowTodayPlus4  = Math.min(...temperaturesTodayPlus4);
						document.getElementById('day4high').textContent = 'High: ' + highTodayPlus4;
						document.getElementById('day4low').textContent = 'Low: ' + lowTodayPlus4;
					});

		        } else {
		          console.log(`error ${request.status} ${request.statusText}`);
		        }
		      };
        } else {
          console.log(`error ${placeLookup.status} ${placeLookup.statusText}`);
        }
      };