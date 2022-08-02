var APIKey = "fffd659f7674c5ce9fb2ce87ff19d10f";
var cityFormEl = document.querySelector("#city-form");
var cityInputEl = document.querySelector("#cityname");
var cityInfoEl = document.querySelector("#cityInfo");
var temp = document.querySelector(".temp");
var wind = document.querySelector(".wind");
var humidity = document.querySelector(".humidity");
var uv = document.querySelector(".uv");
var icon = document.querySelector(".weather-icon");
var searches = document.querySelector("#search-container");
// var cityBtn = document.querySelector(".city-btn");

// form submit handler

var formSubmitHandler = function (event) {
  event.preventDefault();

  var cityName = cityInputEl.value.trim();

  if (cityName) {
    getWeather(cityName);
    // getForecast(cityName);
    saveCity(cityName);

    //  cityBtn.textContent = '';

    cityInputEl.value = "";
  } else {
    alert("Please enter the name of a city");
  }
};

// retrieve weather data from API

var getWeather = function (city) {
    var apiUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

    fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        console.log(response);
        response.json().then(function (data) {
          console.log(data);

          displayWeather(data, city);

        });
      } else {
        alert('Error: ' + response.statusText);
      }
    })
    .catch(function (error) {
      alert('Unable to connect to OpenWeather');
    });

}

// -----------I tried for many hours to get this to work. ended up being able to fetch the city location and forcast but ran out of time

// var getForecast = function (city) {
//   var cityUrl =
//     "http://api.openweathermap.org/geo/1.0/direct?q=" +
//     city +
//     "&limit=5&appid=" +
//     APIKey;

//   fetch(cityUrl).then(function (response) {
//     if (response.ok) {
//       console.log("response", response);
//       response
//         .json()
//         .then(function (cityData) {
//           console.log("data", cityData);
//           var lat = cityData[0].lat;
//           var lon = cityData[0].lon;

//           fetch(
//             "https://api.openweathermap.org/data/2.5/onecall?lat=" +
//               lat +
//               "&lon=" +
//               lon +
//               "&appid=" +
//               APIKey
//           )
//         .then(function (response) {
//           return response.json();
//         })
//         .then(function (forecastData) {
//           console.log("weather", forecastData);
//           displayWeather(forecastData, city);
//         })
//         .catch(function (error) {
//           console.log(error);
//         });
//       })
//     }
//   });
// };

// display the current weather

var displayWeather = function (data) {
  cityInfoEl.textContent =
    data.name + " (" + moment().format("MMM Do YY") + ")";
  temp.textContent =
    "Temp: " + Math.round((data.main.temp * 9) / 5 - 459.67) + "°F";
  wind.textContent = "Wind: " + data.wind.speed + " MPH";
  humidity.textContent = "Humidity: " + data.main.humidity + "%";
  // uv.textContent = "UV Index: " + ;
};


// display forecast

var displayForecast = function (forecastData) {

}

// display buttons for saved cities 
var saveCity = function (city) {
  localStorage.setItem(city, JSON.stringify(city));
  var button = document.createElement("button");
  button.classList.add("btn");
  var storedCity = JSON.parse(localStorage.getItem(city));
  button.textContent = storedCity;
  console.log(button.textContent);
  searches.appendChild(button);
};

cityFormEl.addEventListener("submit", formSubmitHandler);
