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
            var geoData = data;
            console.log(geoData);
            console.log(geoData[0]);
            console.log(geoData[0].lat);
            console.log(geoData[0].lon);

            var lat = geoData[0].lat;
            var lon = geoData[0].lon;

            var newData = {
                "latitude": lat,
                "longitude": lon
            }
            console.log(newData);

            getWeather(newData);
        });
    });
}

var getWeather = function () {

}

getGeoCode();