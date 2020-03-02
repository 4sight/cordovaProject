var weatherLocation = window.location.search;
var place = weatherLocation.substring(1);
console.log(place);
$.getJSON('https://api.openweathermap.org/data/2.5/weather?q=' + place + '&appid=cfc6d5b9b5c3a52a649857702433e58b',function(json){
      temp = JSON.stringify(json.main.temp);
      document.getElementById('temp').textContent = ((9 / 5 * (temp - 273.15) + 32).toFixed(2) + '°F');
  }).fail(function(jqxhr, textStatus, error) {
      window.alert('Please enter a different location.')});
$.getJSON('https://api.openweathermap.org/data/2.5/forecast?q=' + place + '&appid=cfc6d5b9b5c3a52a649857702433e58b',function(json){
	  var d = new Date();
	  var date = d.getDate();
	  console.log(date);
	  var weekday = new Array(7);
		weekday[0] = "Sunday";
		weekday[1] = "Monday";
		weekday[2] = "Tuesday";
		weekday[3] = "Wednesday";
		weekday[4] = "Thursday";
		weekday[5] = "Friday";
		weekday[6] = "Saturday";
	  var tomorrow = weekday[d.getDay() + 1];
	  document.getElementById('day1').textContent = tomorrow;
	  var todayPlus1 = weekday[d.getDay() + 2];
	  document.getElementById('day2').textContent = todayPlus1;
	  var todayPlus2 = weekday[d.getDay() + 3];
	  document.getElementById('day3').textContent = todayPlus2;
	  var todayPlus3 = weekday[d.getDay() + 4];
	  document.getElementById('day4').textContent = todayPlus3;
	  var todayPlus4 = weekday[d.getDay() + 5];
	  document.getElementById('day5').textContent = todayPlus4;
	  console.log(json.list[0].dt_txt);
});