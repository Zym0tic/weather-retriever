var APIKey = "fffd659f7674c5ce9fb2ce87ff19d10f";
var cityFormEl = document.querySelector("#city-form");
var cityInputEl = document.querySelector("#cityname");
var cityInfoEl = document.querySelector("#cityInfo");
var temp = document.querySelector(".temp");
var wind = document.querySelector(".wind");
var humidity = document.querySelector(".humidity");
var uv = document.querySelector(".uv");
var icon = document.querySelector(".weather-icon");

var formSubmitHandler = function (event) {
  event.preventDefault();

  var cityName = cityInputEl.value.trim();

  if (cityName) {
    getWeather(cityName);

    //   repoContainerEl.textContent = '';

    cityInputEl.value = "";
  } else {
    alert("Please enter the name of a city");
  }
};

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

// var getWeather = function (city) {
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
//         .then(function (data) {
//           console.log("data", data);
//           var lat = data[0].lat;
//           var lon = data[0].lon;
//         }}

//           fetch(
//             "https://api.openweathermap.org/data/2.5/onecall?lat=" +
//               lat +
//               "&lon=" +
//               lon +
//               "&appid=" +
//               APIKey
//           );
//         })
//         .then(function (response) {
//           return response.json();
//         })
//         .then(function (data) {
//           console.log("weather", data);
//           displayWeather(data, city);
//         })
//           .catch(function (error) {
//             console.log(error);
//           })
//     }
//   });
// };

var displayWeather = function (data) {
  cityInfoEl.textContent =
    data.name + " (" + moment().format("MMM Do YY") + ")";
  temp.textContent =
    "Temp: " + Math.round((data.main.temp * 9) / 5 - 459.67) + "°F";
  wind.textContent = "Wind: " + data.wind.speed + " MPH";
  humidity.textContent = "Humidity: " + data.main.humidity + "%";
  // uv.textContent = "UV Index: " + ;
};

cityFormEl.addEventListener("submit", formSubmitHandler);
