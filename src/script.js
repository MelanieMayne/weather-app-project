function formatDate(date) {
  let currentDate = date.getDate();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let currentDay = days[date.getDay()];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let currentMonth = months[date.getMonth()];
  let currentHour = date.getHours();
  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }
  let currentMinutes = date.getMinutes();
  if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
  }
  let dateAndTime = document.querySelector("#date-and-time");
  dateAndTime.innerHTML = `<small>${currentDay}, ${currentMonth} ${currentDate} | ${currentHour}:${currentMinutes}</small>`;
}
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return days[day];
}
function showForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="card-group">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
        <div class="card text-center">
          <div class="card-body weekday-cards">
            <h5 class="card-title weekday">${formatDay(forecastDay.dt)}</h5>
            <p class="card-text small-weather-icon"><img src="https://openweathermap.org/img/wn/${
              forecastDay.weather[0].icon
            }@2x.png" alt="${forecastDay.weather[0].description}"/>
            </p>
            <p class="card-text">
            <small class="text-muted small-high-low">H: <span id="forecast-high-temp">${Math.round(
              forecastDay.temp.max
            )}</span>° L: <span id="forecast-low-temp">${Math.round(
          forecastDay.temp.min
        )}</span>°</small>
            </p>
          </div>
        </div>
        `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
function getForecast(coordinates) {
  let apiKey = "ecdc34b15a757eb8ea71f46be9b2f189";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  axios.get(`${apiUrl}`).then(showForecast);
}
function showWeather(response) {
  let searchedCity = document.querySelector("#city-location");
  searchedCity.innerHTML = response.data.name;
  let cityTemp = document.querySelector("#temperature-of-city-location");
  cityTemp.innerHTML = Math.round(response.data.main.temp);
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;
  let windSpeed = document.querySelector("#wind-speed");
  windSpeed.innerHTML = Math.round(response.data.wind.speed);
  let todaysHighTemp = document.querySelector("#today-high-temp");
  todaysHighTemp.innerHTML = Math.round(response.data.main.temp_max);
  let todaysLowTemp = document.querySelector("#today-low-temp");
  todaysLowTemp.innerHTML = Math.round(response.data.main.temp_min);
  let weatherIcon = document.querySelector("#main-weather-icon");
  let weatherDescription = response.data.weather[0].description;
  weatherIcon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  weatherIcon.setAttribute("alt", weatherDescription);
  getForecast(response.data.coord);
}
function getLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "ecdc34b15a757eb8ea71f46be9b2f189";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`;
  axios.get(`${apiUrl}`).then(showWeather);
}
function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getLocation);
}
function searchCity(city) {
  let apiKey = "ecdc34b15a757eb8ea71f46be9b2f189";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(`${apiUrl}`).then(showWeather);
}
function handleSubmit(event) {
  event.preventDefault();
  let cityImput = document.querySelector("#search-bar-input");
  let city = cityImput.value;
  searchCity(city);
}

let now = new Date();
let searchForm = document.querySelector("#search-form");
let currentLocationButton = document.querySelector("#current-location-button");
let changeButton = document.querySelector("#temp-unit-button");

currentLocationButton.addEventListener("click", getPosition);
searchForm.addEventListener("submit", handleSubmit);

formatDate(now);
searchCity("Los Angeles");
