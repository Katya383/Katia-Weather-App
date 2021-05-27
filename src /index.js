function enterCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let currentCity = document.querySelector("#forecast-input");

  currentCity.innerHTML = `${cityInput.value}`;
  retrieveWeather(cityInput.value);
}
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", enterCity);

function retrieveWeather(city) {
  let apiKey = "b32788ce5bf96127de5c083612e6a07f";
  let unit = "metric";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${apiKey}`;
  axios.get(apiURL).then(showTemperature);
}
function getLocation(position) {
  let apiKey = "b32788ce5bf96127de5c083612e6a07f";
  let unit = "metric";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=${unit}&appid=${apiKey}`;
  axios.get(apiURL).then(showTemperature);
}

let currentLocationButton = document.querySelector("#current-city-btn");
currentLocationButton.addEventListener("click", getPosition);

function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getLocation);
}
function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let currentCity = document.querySelector("#forecast-input");
  let temperatureElement = document.querySelector("#temperature");
  currentCity.innerHTML = response.data.name;

  temperatureElement.innerHTML = temperature;
}

function getDate(event) {
  let now = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = document.querySelector("#day-input");
  day.innerHTML = days[now.getDay()];
  let hour = document.querySelector("#hour-input");
  if (hour < 10) {
    hour = `0 ${hour}`;
  }
  hour.innerHTML = now.getHours();
  let minutes = document.querySelector("#minute-input");
  if (minutes < 10) {
    minutes = `0 $ {minutes}`;
  }
  minutes.innerHTML = now.getMinutes();
}
getDate();

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let temperature = temperatureElement.innerHTML;
  temperature = Number(temperature);
  temperatureElement.innerHTML = `${temperature}`;
}

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);
