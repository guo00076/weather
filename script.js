let appId = "8f755e06ae492ee35ffbed274e90de34";
let units = "metric";
let searchMethod;

function getsearchMethod(searchTerm) {
	if(searchTerm.length === 5 && Number.parseInt(searchTerm) + "" === searchTerm){
		searchMethod = "zip";
	}else{
		searchMethod = "q";
	}
}

function searchWeather(searchTerm) {
	getsearchMethod(searchTerm);
	fetch(`http://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&APPID=${appId}&units=${units}`).then(result => {
		return result.json();
	}).then(result => {
		init(result);
	})
}

function init(resultfromServer) {
	
	switch(resultfromServer.weather[0].main){
		case "Clear":
			document.body.style.backgroundImage = "url('Clear.jpg')";
			break;
		case "Cloudy":
			document.body.style.backgroundImage = "url('Cloudy.jpg')";
			break;
		case "Rain":
		case "Drizzle":
		case "Mist":
			document.body.style.backgroundImage = "url('Rain.jpg')";
			break;
		case "Thunderstorm":
			document.body.style.backgroundImage = "url('Storm.jpg')";
			break;
		case "Snow":
			document.body.style.backgroundImage = "url('Snow.jpg')";
			break;
		default:
			break;
	}

	let WeatherDescriptionHeader = document.getElementById("weatherDescription");
	let temperatureElement = document.getElementById("temperature");
	let humidityElement = document.getElementById("humidity");
	let windSpeedElement = document.getElementById("windSpeed");
	let cityHeader = document.getElementById("cityheader");
	let weatherIcon = document.getElementById("documentIconImage");

	let resultDescription = resultfromServer.weather[0].description;
	WeatherDescriptionHeader.innerText = resultDescription.charAt(0).toUpperCase() + resultDescription.slice(1);

	weatherIcon.src = 'http://openweathermap.org/img/w/' + resultfromServer.weather[0].icon + '.png';

	temperatureElement.innerHTML = Math.floor(resultfromServer.main.temp) + "&#176";
	windSpeedElement.innerHTML = "Winds at " + Math.floor(resultfromServer.wind.speed) + ' m/s';
	cityHeader.innerHTML = resultfromServer.name;
	humidityElement.innerHTML = "Humidity level at " + resultfromServer.main.humidity + '%';
    
 }

document.getElementById("searchBtn").addEventListener("click", () => {
	let searchTerm = document.getElementById("searchInput").value;
	if(searchTerm){
		searchWeather(searchTerm);
	}
})

