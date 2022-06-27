var apiKey = "appid=d68b4bb3b1bf58ab1bbd62b4fa0d5699"


var geoArr = [];

// var cityArr = [];

var citySearch = document.getElementById("searchBtn");

// get value of search-bar and intitate first search
citySearch.addEventListener('click', function () {
    var searchParameter = document.getElementById("citySearch").value;

    console.log(searchParameter);


    var geoCode = `https://api.openweathermap.org/geo/1.0/direct?q=${searchParameter},US&${apiKey}`;
    getGeoCode(geoCode);
});

var getGeoCode = async function (geoCode) {
    var response = await fetch(geoCode).then(function (response) {
        response.json().then(function (locationData) {
            var lat = locationData[0].lat;
            var lon = locationData[0].lon;
            var city = locationData[0].name;



            var geoObj = {
                "lat": lat,
                "lon": lon,
                "city": city
            }

            // console.log(geoObj);

            geoArr.push(geoObj);

            // console.log(geoArr);

            localStorage.setItem("coordinates", JSON.stringify(geoArr));

            document.getElementById("city").innerHTML = city;

            getCurrentWeather(geoObj);
        });
    });
}

var badgeArea = document.getElementById("searchHistory");

var getCurrentWeather = async function () {
    var getGeoData = JSON.parse(localStorage.getItem("coordinates"));
    // console.log(getGeoData);
    var lat = getGeoData[0].lat;
    var lon = getGeoData[0].lon;

    var weatherSearch = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&${apiKey}`;
    // console.log(weatherSearch);

    // weatherResponse(weatherSearch);
    var weatherResponse = await fetch(weatherSearch).then(function (weatherResponse) {
        weatherResponse.json().then(function (data) {
            // console.log("weather data", data);
            var currentDayWeather = data;
            console.log(currentDayWeather);
            var currentTemp = currentDayWeather.current.temp + " °F";
            var currentHumidity = currentDayWeather.current.humidity + " %";
            var currentUvi = currentDayWeather.current.uvi;
            var currentWind = currentDayWeather.current.wind_speed + " MPH";

            var charlotteTemp = document.getElementById("temp").innerHTML = currentTemp;
            var charlotteWind = document.getElementById("wind").innerHTML = currentWind;
            var charlotteHumidity = document.getElementById("humidity").innerHTML = currentHumidity;
            var charlotteUvi = document.getElementById("uvi").innerHTML = currentUvi;

            fiveDayForecast(data);

        });
    });
};

var fiveDayForecast = function (forecastData) {
    var week = forecastData.daily.slice(0, 5);
    console.log(week);
}

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = mm + '/' + dd + '/' + yyyy;
console.log(today);

document.getElementById("date").innerHTML = today;



// citySearchHistory();

// getGeoCode();

// getCurrentWeather();

// fiveDayForecast();

// addSearchHistory();





















































// var cityName = "charlotte";
// var stateCode = "nc";
// var countryCode = "us";





// .onclick = function () {
//     var citySearch = document.getElementById("citySearch").value;
//     console.log("search", citySearch);
//     // var searchBtn = document.getElementById("search");
//     // searchBtn.addEventListener('click',)


//     // console.log(geoCode);
//     getGeoCode(geoCode);

// }






            // cityBadge.add("badge", "rounded-pill", "bg-secondary", "text-white", "col-12");
            // console.log(cityBadge);
            // var cityBadgeText = document.createTextNode(city);
            // console.log(cityBadgeText);
            // cityBadge.appendChild(cityBadgeText);
            // badgeArea.appendChild(cityBadge);










// var addSearchHistory = function () {
//     var cityArr = JSON.parse(localStorage.getItem('coordinates'));
//     console.log(cityArr);
//     for (i = 0; i < cityArr.length; i++) {
//         var cityName = cityArr[i].city;

//         var cityBadge = document.createElement("p");
//         cityBadge.setAttribute("class", "badge rounded-pill bg-secondary text-white col-12");
//         cityBadge.innerHTML = cityName;
//         badgeArea.appendChild(cityBadge);
//     }
// }