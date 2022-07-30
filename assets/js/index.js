var APIKey = "fffd659f7674c5ce9fb2ce87ff19d10f";
var cityFormEl = document.querySelector('#city-form');
var cityInputEl = document.querySelector('#cityname');


var formSubmitHandler = function (event) {
    event.preventDefault();
  
    var cityName = cityInputEl.value.trim();
  
    if (cityName) {
      getWeatherRepos(cityName);
  
    //   repoContainerEl.textContent = '';
      cityInputEl.value = '';
    } else {
      alert('Please enter the name of a city');
    }
  };


var getWeatherRepos = function (city) {
    var apiUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

    fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        console.log(response);
        response.json().then(function (data) {
          console.log(data);
        //   displayRepos(data, user);
        });
      } else {
        alert('Error: ' + response.statusText);
      }
    })
    .catch(function (error) {
      alert('Unable to connect to OpenWeather');
    });

}





cityFormEl.addEventListener('submit', formSubmitHandler);