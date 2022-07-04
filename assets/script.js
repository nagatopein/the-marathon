var apiKey = "appid=d68b4bb3b1bf58ab1bbd62b4fa0d5699"


var geoArr = [];


var citySearch = document.getElementById("searchBtn");

// get value of search-bar and intitate first search
citySearch.addEventListener('click', function () {
    var searchParameter = document.getElementById("citySearch").value;

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


            geoArr.push(geoObj);


            localStorage.setItem("coordinates", JSON.stringify(geoArr));

            document.getElementById("city").innerHTML = city + " (" + today + ")";

            createSearchHistory(geoArr);
            getCurrentWeather(geoObj);
        });
    });
}

var createSearchHistory = function (geoArr) {
    var cityArr = [];
    console.log(geoArr);
    for (i = 0; i < geoArr.length; i++) {
        var city = geoArr[i].city;
        cityArr.push(city);
    }
}



var getCurrentWeather = async function () {
    var getGeoData = JSON.parse(localStorage.getItem("coordinates"));

    var lat = getGeoData[0].lat;
    var lon = getGeoData[0].lon;

    var weatherSearch = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&${apiKey}`;

    // weatherResponse(weatherSearch);
    var weatherResponse = await fetch(weatherSearch).then(function (weatherResponse) {
        weatherResponse.json().then(function (data) {



            var currentDayWeather = data;
            var currentTemp = currentDayWeather.current.temp + "°F";
            var currentWind = currentDayWeather.current.wind_speed + " MPH";
            var currentHumidity = currentDayWeather.current.humidity + " %";
            var currentUvi = currentDayWeather.current.uvi;

            var icon = currentDayWeather.current.weather[0].icon;
            var weatherImage = document.getElementById('weatherIcon');
            weatherImage.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;

            var cityTemp = document.getElementById("temp").innerHTML = currentTemp;
            var cityWind = document.getElementById("wind").innerHTML = currentWind;
            var cityHumidity = document.getElementById("humidity").innerHTML = currentHumidity;
            var uviEl = document.getElementById('uvi');
            uviEl.innerHTML = currentUvi;

            if (currentUvi <= 3) {
                uviEl.setAttribute('class', 'badge badge-pill badge-success');
            } else if (currentUvi <= 7) {
                uviEl.setAttribute('class', 'badge badge-pill badge-warning');
            } else {
                uviEl.setAttribute('class', 'badge badge-pill badge-danger');
            }

            fiveDayForecast(data);

        });
    });
};

var fiveDayForecast = function (forecastData) {
    var week = forecastData.daily.slice(0, 5);

    for (i = 0; i < week.length; i++) {
        var temp = week[i].temp.max;
        var wind = week[i].wind_speed;
        var humidity = week[i].humidity;
        var icon = week[i].weather[0].icon;

        document.getElementById(i).innerHTML =
            // '<h2>' + today++ + '</h2>' +
            '<img src=' + `https://openweathermap.org/img/wn/${icon}@2x.png` + ' height=40% width=40%>' + '</img>' +
            '<p>' + 'Temp: ' + temp + '°F' + '</p>' +
            '<p>' + 'Wind: ' + wind + ' MPH' + '</p>' +
            '<p>' + 'Humidity: ' + humidity + '%' + '</p>';

    }
}

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0
var yyyy = today.getFullYear();

today = mm + '/' + dd + '/' + yyyy;

document.getElementById("city").innerHTML = today;



// citySearchHistory();

// getGeoCode();

// getCurrentWeather();

// fiveDayForecast();

// addSearchHistory();












































        // var date = new Date();
        // var dd = String(date.getDate() + i).padStart(2, '0');
        // var mm = String(date.getMonth() + 1).padStart(2, '0');
        // var yyyy = date.getFullYear();

        // date = mm + '/' + dd + '/' + yyyy;
        // console.log(date);

        // var d = new Date(date.toDateString());

        // d.setDate(d.getDate() + i);
        // console.log(d);










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