var apiKey = "&appid=d68b4bb3b1bf58ab1bbd62b4fa0d5699"
var cityName = "charlotte";
var stateCode = "nc";
var countryCode = "us";

var text1 = "http://api.openweathermap.org/geo/1.0/direct?q=";
var text2 = cityName + "," + stateCode + "," + countryCode + apiKey;
var geoCode = text1.concat(text2);

console.log(geoCode);

var getGeoCode = function () {
    var response = fetch(geoCode).then(function (response) {
        response.json().then(function (data) {
            var locationData = data;
            console.log(locationData);
            console.log(locationData[0]);
            console.log(locationData[0].lat);
            console.log(locationData[0].lon);
            console.log(locationData[0].name);

            var lat = locationData[0].lat;
            var lon = locationData[0].lon;
            var city = locationData[0].name;



            var geoData = {
                "latitude": lat,
                "longitude": lon,
                "city": city
            }

            console.log(geoData);

            geoArr.push(geoData);

            localStorage.setItem("coordinates", geoArr);

            getCurrentWeather(geoData);


            var cityDisplay = document.getElementById("city").innerHTML = city;

            // var badgeArea = document.getElementById("showbadge");
            // var cityBadge = document.createElement("p").classList;
            // cityBadge.add("badge", "rounded-pill", "bg-secondary", "text-white", "col-12");
            // console.log(cityBadge);
            // var cityBadgeText = document.createTextNode(city);
            // console.log(cityBadgeText);
            // cityBadge.appendChild(cityBadgeText);
            // badgeArea.appendChild(cityBadge);
        });
    });
}

var geoArr = [];


var getCurrentWeather = function (geoArr) {
    console.log(geoArr);
    var string1 = "https://api.openweathermap.org/data/2.5/onecall?";
    var string2 = "lat=" + geoArr.latitude + "&" + "lon=" + geoArr.longitude + apiKey;
    var weatherSearch = string1.concat(string2);
    console.log(weatherSearch);

    var weatherResponse = fetch(weatherSearch).then(function (weatherResponse) {
        weatherResponse.json().then(function (data) {
            console.log("weather data", data);
            var currentDayWeather = data;
            var currentTemp = currentDayWeather.current.temp;
            var currentHumidity = currentDayWeather.current.humidity;
            var currentUvi = currentDayWeather.current.uvi;
            var currentWind = currentDayWeather.current.wind_speed;

            var charlotteTemp = document.getElementById("temp").innerHTML = currentTemp;
            var charlotteWind = document.getElementById("wind").innerHTML = currentWind;
            var charlotteHumidity = document.getElementById("humidity").innerHTML = currentHumidity;
            var charlotteUvi = document.getElementById("uvi").innerHTML = currentUvi;

        });
    });

}

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = mm + '/' + dd + '/' + yyyy;
console.log(today);

document.getElementById("date").innerHTML = today;
// document.write(today);

// console.log(newArr);

// var lat = geoData[0].lat;
// var lon = geoData[0].lon;
// var text3 = "https://api.openweathermap.org/data/2.5/onecall?";
// var text4 = lat + "&" + lon;

// var weatherSearch = text3.concat(text4);

// console.log(weatherSearch);


// var text3 = "https://api.openweathermap.org/data/2.5/onecall?lat=";

// 35.2272086 & lon=-80.8430827 & appid=d68b4bb3b1bf58ab1bbd62b4fa0d5699


getGeoCode();

getCurrentWeather();